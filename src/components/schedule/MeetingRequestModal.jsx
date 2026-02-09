import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Button } from '../ui/Button';
import { createMeeting } from '../../data/meetings';
import toast from 'react-hot-toast';

export const MeetingRequestModal = ({ isOpen, onClose, selectedDate, currentUser }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('10:00');
  const [duration, setDuration] = useState('60');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title || !startTime) {
      toast.error('Please fill in required fields');
      return;
    }

    // Calculate start and end times
    const startDateTime = new Date(selectedDate);
    const [hours, minutes] = startTime.split(':').map(Number);
    startDateTime.setHours(hours, minutes);

    const endDateTime = new Date(startDateTime);
    endDateTime.setMinutes(endDateTime.getMinutes() + parseInt(duration));

    const newMeeting = {
      hostId: currentUser.id,
      attendeeId: 'i_placeholder', // In real app, this would be selected user
      title,
      description,
      start: startDateTime.toISOString(),
      end: endDateTime.toISOString(),
      type: 'general'
    };

    createMeeting(newMeeting);
    toast.success('Meeting requested successfully!');
    onClose();
    
    // Reset form
    setTitle('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Request Meeting</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <div className="flex items-center text-gray-600 bg-gray-50 px-3 py-2 rounded-md border border-gray-200">
              <CalendarIcon size={16} className="mr-2" />
              <span>{selectedDate?.toLocaleDateString()}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g. Pitch Deck Review"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Clock size={16} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="15">15 min</option>
                <option value="30">30 min</option>
                <option value="45">45 min</option>
                <option value="60">1 hour</option>
                <option value="90">1.5 hours</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Brief agenda or questions..."
            />
          </div>

          <div className="pt-2 flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Send Request
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
