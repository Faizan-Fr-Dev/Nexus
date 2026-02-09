import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { useAuth } from '../../context/AuthContext';
import { 
  getMeetingsForUser, 
  getPendingRequestsForUser, 
  updateMeetingStatus,
  getAvailabilityForUser,
  addAvailabilitySlot,
  removeAvailabilitySlot
} from '../../data/meetings';
import { MeetingRequestModal } from '../../components/schedule/MeetingRequestModal';
import { Button } from '../../components/ui/Button';
import { Card, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Plus, Check, X as CloseIcon, Clock, Calendar as CalendarIcon, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const SchedulePage = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState('dayGridMonth');

  // New Availability Form State
  const [newDay, setNewDay] = useState('Monday');
  const [newStart, setNewStart] = useState('09:00');
  const [newEnd, setNewEnd] = useState('17:00');

  // Handle responsive calendar view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCalendarView('listWeek');
      } else {
        setCalendarView('dayGridMonth');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load data on mount and updates
  const loadData = () => {
    if (user) {
      const userMeetings = getMeetingsForUser(user.id);
      const formattedEvents = userMeetings.map(m => ({
        id: m.id,
        title: m.title,
        start: m.start,
        end: m.end,
        backgroundColor: getEventColor(m.status),
        borderColor: getEventColor(m.status),
        extendedProps: {
          description: m.description,
          status: m.status
        }
      }));
      setEvents(formattedEvents);

      // Load pending requests
      setPendingRequests(getPendingRequestsForUser(user.id));

      // Load availability
      setAvailability(getAvailabilityForUser(user.id));
    }
  };

  useEffect(() => {
    loadData();
  }, [user, isModalOpen]);

  const getEventColor = (status) => {
    switch (status) {
      case 'confirmed': return '#2563eb'; // blue-600
      case 'pending': return '#d97706'; // amber-600
      case 'cancelled': return '#dc2626'; // red-600
      default: return '#6b7280';
    }
  };

  const handleDateClick = (arg) => {
    setSelectedDate(arg.date);
    setIsModalOpen(true);
  };

  const handleStatusUpdate = (meetingId, status) => {
    if (updateMeetingStatus(meetingId, status)) {
      toast.success(`Meeting ${status}`);
      loadData();
    }
  };

  const handleAddAvailability = (e) => {
    e.preventDefault();
    addAvailabilitySlot(user.id, { day: newDay, startTime: newStart, endTime: newEnd });
    toast.success('Availability added');
    loadData();
  };

  const handleRemoveAvailability = (slotId) => {
    if (removeAvailabilitySlot(slotId)) {
      toast.success('Availability removed');
      loadData();
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-1">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Schedule & Meetings</h1>
          <p className="text-sm text-gray-500 font-medium">Manage your availability and upcoming sessions.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto font-bold py-3 shadow-lg shadow-primary-200">
          <Plus size={18} className="mr-2" />
          Request Meeting
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Calendar */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-2 sm:p-6 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <style>{`
              .fc-event { cursor: pointer; border-radius: 6px !important; padding: 2px 4px !important; font-size: 11px !important; font-weight: 700 !important; }
              .fc-list-event { cursor: pointer; }
              .fc-toolbar-title { font-size: 1rem !important; font-weight: 800 !important; color: #111827 !important; }
              @media (min-width: 768px) {
                .fc-toolbar-title { font-size: 1.5rem !important; }
              }
              .fc-button-primary { 
                background-color: #f9fafb !important; 
                border-color: #f3f4f6 !important; 
                color: #4b5563 !important;
                font-weight: 700 !important;
                text-transform: capitalize !important;
                font-size: 12px !important;
              }
              .fc-today-button { font-size: 12px !important; border-radius: 8px !important; }
              .fc-button-active, .fc-button-primary:active, .fc-button-primary:hover { 
                background-color: #2563eb !important; 
                border-color: #2563eb !important; 
                color: white !important;
              }
              .fc-toolbar { flex-wrap: wrap; gap: 8px; justify-content: center !important; }
              @media (min-width: 768px) {
                .fc-toolbar { justify-content: space-between !important; }
              }
              .fc-scrollgrid { border-radius: 12px; overflow: hidden; border: none !important; }
              .fc-theme-standard td, .fc-theme-standard th { border-color: #f3f4f6 !important; }
            `}</style>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
              initialView={calendarView}
              key={calendarView}
              headerToolbar={{
                left: window.innerWidth < 768 ? 'prev,next' : 'prev,next today',
                center: 'title',
                right: window.innerWidth < 768 ? 'listWeek,dayGridMonth' : 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              events={events}
              dateClick={handleDateClick}
              height="auto"
              aspectRatio={window.innerWidth < 768 ? 0.8 : 1.8}
              listDayFormat={{ weekday: 'short', month: 'numeric', day: 'numeric' }}
              nowIndicator={true}
            />
          </div>

          {/* Pending Requests Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 px-1">
              Pending Requests
              {pendingRequests.length > 0 && (
                <Badge variant="warning">{pendingRequests.length}</Badge>
              )}
            </h2>
            
            {pendingRequests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pendingRequests.map(req => (
                  <Card key={req.id} className="border-l-4 border-l-yellow-500 overflow-hidden">
                    <CardBody className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900">{req.title}</h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                            <CalendarIcon size={12} />
                            <span>{new Date(req.start).toLocaleDateString()}</span>
                            <Clock size={12} className="ml-1" />
                            <span>{new Date(req.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mb-4 line-clamp-2 italic">"{req.description}"</p>
                      <div className="flex gap-2">
                        <Button 
                          size="xs" 
                          className="flex-1 bg-green-600 hover:bg-green-700 font-bold"
                          onClick={() => handleStatusUpdate(req.id, 'confirmed')}
                        >
                          <Check size={14} className="mr-1" /> Accept
                        </Button>
                        <Button 
                          size="xs" 
                          variant="outline" 
                          className="flex-1 text-red-600 border-red-100 hover:bg-red-50 font-bold"
                          onClick={() => handleStatusUpdate(req.id, 'cancelled')}
                        >
                          <CloseIcon size={14} className="mr-1" /> Decline
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <p className="text-sm text-gray-500 font-medium">No pending meeting requests</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Availability Management */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock size={20} className="text-primary-600" />
              My Availability
            </h3>
            
            <div className="space-y-3 mb-6">
              {availability.length > 0 ? (
                availability.map(slot => (
                  <div key={slot.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl group transition-all hover:bg-white hover:shadow-md hover:ring-1 hover:ring-primary-100">
                    <div>
                      <p className="text-sm font-bold text-gray-900">{slot.day}</p>
                      <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                        {slot.startTime} - {slot.endTime}
                      </p>
                    </div>
                    <button 
                      onClick={() => handleRemoveAvailability(slot.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-500 text-center py-4 italic">No availability slots added yet.</p>
              )}
            </div>

            <hr className="border-gray-100 mb-6" />

            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Add New Slot</h4>
            <form onSubmit={handleAddAvailability} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 ml-1">Day</label>
                <select 
                  className="w-full bg-gray-50 border-gray-100 rounded-xl text-sm font-semibold p-2.5 outline-none focus:ring-2 focus:ring-primary-500"
                  value={newDay}
                  onChange={(e) => setNewDay(e.target.value)}
                >
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 ml-1">Start</label>
                  <input 
                    type="time" 
                    className="w-full bg-gray-50 border-gray-100 rounded-xl text-sm font-semibold p-2.5 outline-none focus:ring-2 focus:ring-primary-500"
                    value={newStart}
                    onChange={(e) => setNewStart(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 ml-1">End</label>
                  <input 
                    type="time" 
                    className="w-full bg-gray-50 border-gray-100 rounded-xl text-sm font-semibold p-2.5 outline-none focus:ring-2 focus:ring-primary-500"
                    value={newEnd}
                    onChange={(e) => setNewEnd(e.target.value)}
                  />
                </div>
              </div>
              <Button variant="primary" fullWidth className="font-bold py-3 mt-2">
                Save Availability
              </Button>
            </form>
          </div>

          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 text-white shadow-xl shadow-primary-200">
            <h4 className="font-bold text-lg leading-tight mb-2">Sync with Google Calendar</h4>
            <p className="text-xs text-primary-100 leading-relaxed mb-6 opacity-90">
              Connect your external calendar to automatically block booked slots and never miss a pitch.
            </p>
            <Button className="bg-white text-primary-600 hover:bg-primary-50 w-full font-black text-xs uppercase tracking-widest">
              Connect Now
            </Button>
          </div>
        </div>
      </div>

      <MeetingRequestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
        currentUser={user}
      />
    </div>
  );
};
