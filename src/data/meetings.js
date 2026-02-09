import { addDays, addHours, startOfHour, setHours } from 'date-fns';

// Mock Meetings Data
export const meetings = [
    {
        id: 'm1',
        hostId: 'e1',
        attendeeId: 'i1',
        title: 'Initial Pitch - InnovateTech',
        description: 'Discussing the seed round funding requirements and product roadmap.',
        start: addDays(setHours(startOfHour(new Date()), 10), 1).toISOString(),
        end: addDays(setHours(startOfHour(new Date()), 11), 1).toISOString(),
        status: 'confirmed', // confirmed, pending, cancelled
        type: 'pitch'
    },
    {
        id: 'm2',
        hostId: 'e1',
        attendeeId: 'i2',
        title: 'Follow-up Q&A',
        description: 'Answering technical due diligence questions.',
        start: addDays(setHours(startOfHour(new Date()), 14), 2).toISOString(),
        end: addDays(setHours(startOfHour(new Date()), 15), 2).toISOString(),
        status: 'pending',
        type: 'follow_up'
    },
    {
        id: 'm3',
        hostId: 'e1',
        attendeeId: 'i3',
        title: 'Product Demo',
        description: 'Live walkthrough of the beta platform.',
        start: addDays(setHours(startOfHour(new Date()), 11), 3).toISOString(),
        end: addDays(setHours(startOfHour(new Date()), 12), 3).toISOString(),
        status: 'confirmed',
        type: 'demo'
    }
];

// Mock Availability Slots
export const availabilitySlots = [
    { id: 'a1', userId: 'e1', day: 'Monday', startTime: '09:00', endTime: '12:00' },
    { id: 'a2', userId: 'e1', day: 'Wednesday', startTime: '14:00', endTime: '17:00' },
    { id: 'a3', userId: 'i1', day: 'Tuesday', startTime: '10:00', endTime: '15:00' },
];

// Helper to get meetings for a user
export const getMeetingsForUser = (userId) => {
    return meetings.filter(m => m.hostId === userId || m.attendeeId === userId);
};

// Helper to get upcoming confirmed meetings
export const getUpcomingMeetings = (userId) => {
    const now = new Date();
    return getMeetingsForUser(userId)
        .filter(m => new Date(m.start) > now && m.status === 'confirmed')
        .sort((a, b) => new Date(a.start) - new Date(b.start));
};

// Helper to get pending meeting requests FOR a user (where they are the attendee/receiver)
export const getPendingRequestsForUser = (userId) => {
    return meetings.filter(m => m.attendeeId === userId && m.status === 'pending');
};

// Helper to create a new meeting request
export const createMeeting = (meetingData) => {
    const newMeeting = {
        id: `m${meetings.length + 1}`,
        status: 'pending',
        ...meetingData
    };
    meetings.push(newMeeting);
    return newMeeting;
};

// Helper to update meeting status
export const updateMeetingStatus = (meetingId, status) => {
    const index = meetings.findIndex(m => m.id === meetingId);
    if (index !== -1) {
        meetings[index] = { ...meetings[index], status };
        return true;
    }
    return false;
};

// Availability Helpers
export const getAvailabilityForUser = (userId) => {
    return availabilitySlots.filter(slot => slot.userId === userId);
};

export const addAvailabilitySlot = (userId, slotData) => {
    const newSlot = {
        id: `a${availabilitySlots.length + 1}`,
        userId,
        ...slotData
    };
    availabilitySlots.push(newSlot);
    return newSlot;
};

export const removeAvailabilitySlot = (slotId) => {
    const index = availabilitySlots.findIndex(slot => slot.id === slotId);
    if (index !== -1) {
        availabilitySlots.splice(index, 1);
        return true;
    }
    return false;
};
