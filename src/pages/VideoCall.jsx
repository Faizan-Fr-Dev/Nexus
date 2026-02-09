import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Video, Mic, MicOff, VideoOff, PhoneOff, Monitor, Users, MessageSquare } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const VideoCall = () => {
    const { user } = useAuth();
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [inCall, setInCall] = useState(false);

    const remoteUser = user?.role === 'entrepreneur'
        ? { name: 'Michael Rodriguez', image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg', label: 'VC' }
        : { name: 'Sarah Johnson', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg', label: 'Sarah' };

    const toggleMute = () => setIsMuted(!isMuted);
    const toggleVideo = () => setIsVideoOff(!isVideoOff);
    const toggleScreenShare = () => setIsScreenSharing(!isScreenSharing);
    const toggleCall = () => setInCall(!inCall);

    return (
        <div className="h-[calc(100vh-6rem)] flex flex-col space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Video Conference</h1>
                    <p className="text-gray-600">Connect with investors and entrepreneurs</p>
                </div>
                <div className="flex gap-2">
                    {!inCall ? (
                        <Button variant="primary" onClick={toggleCall} className="flex items-center gap-2">
                            <Video size={18} /> Start Call
                        </Button>
                    ) : (
                        <Badge variant="success" className="animate-pulse">Live</Badge>
                    )}
                </div>
            </div>

            <div className="flex-1 flex gap-4 overflow-hidden">
                {/* Main Video Area */}
                <div className="flex-1 flex flex-col gap-4">
                    <Card className="flex-1 bg-gray-900 relative overflow-hidden flex items-center justify-center">
                        {!inCall ? (
                            <div className="text-center text-gray-400">
                                <Video size={64} className="mx-auto mb-4 opacity-50" />
                                <h3 className="text-xl font-semibold">Ready to join?</h3>
                                <p className="mb-6">Start the call to connect with others.</p>
                                <Button variant="primary" onClick={toggleCall}>Start Call</Button>
                            </div>
                        ) : (
                            <>
                                {/* Placeholder for remote video */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    {isVideoOff ? (
                                        <div className="text-gray-500 flex flex-col items-center">
                                            <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center mb-4">
                                                <span className="text-3xl font-bold text-gray-400">{remoteUser.name.split(' ').map(n => n[0]).join('')}</span>
                                            </div>
                                            <p>{remoteUser.name}</p>
                                        </div>
                                    ) : (
                                        <img
                                            src={remoteUser.image}
                                            alt="Remote User"
                                            className="w-full h-full object-cover opacity-80"
                                        />
                                    )}
                                </div>

                                {/* Local User View (Pip) */}
                                <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-800 rounded-lg border-2 border-gray-700 overflow-hidden shadow-lg">
                                    <div className="w-full h-full bg-black flex items-center justify-center">
                                        <span className="text-gray-500 text-xs">You</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </Card>

                    {/* Controls Bar */}
                    <div className="h-20 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center gap-6 px-8">
                        <button
                            onClick={toggleMute}
                            className={`p-4 rounded-full transition-all ${isMuted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                        </button>

                        <button
                            onClick={toggleVideo}
                            className={`p-4 rounded-full transition-all ${isVideoOff ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
                        </button>

                        <button
                            onClick={toggleCall}
                            className="p-4 rounded-full bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-200 transition-all transform hover:scale-105"
                        >
                            <PhoneOff size={24} />
                        </button>

                        <button
                            onClick={toggleScreenShare}
                            className={`p-4 rounded-full transition-all ${isScreenSharing ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            <Monitor size={24} />
                        </button>
                    </div>
                </div>

                {/* Sidebar (Optional) */}
                {inCall && (
                    <div className="w-80 flex flex-col gap-4">
                        <Card className="flex-1">
                            <div className="p-4 border-b border-gray-100">
                                <h3 className="font-semibold text-gray-900">Participants (2)</h3>
                            </div>
                            <div className="p-4 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xs">You</div>
                                    <span className="text-sm font-medium text-gray-700">You</span>
                                    <MicOff size={14} className="ml-auto text-red-500" />
                                </div>
                                <div className="flex items-center gap-3">
                                    <img src={remoteUser.image} className="w-8 h-8 rounded-full object-cover" alt="User" />
                                    <span className="text-sm font-medium text-gray-700">{remoteUser.name}</span>
                                    <Mic size={14} className="ml-auto text-gray-400" />
                                </div>
                            </div>
                        </Card>
                        <Card className="flex-1">
                            <div className="p-4 border-b border-gray-100">
                                <h3 className="font-semibold text-gray-900">Chat</h3>
                            </div>
                            <div className="p-4 flex flex-col h-full bg-gray-50/50">
                                <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                                    No messages yet
                                </div>
                                <div className="mt-4">
                                    <input
                                        type="text"
                                        placeholder="Type a message..."
                                        className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

// Helper Badge component if not imported
const Badge = ({ children, variant, className }) => {
    const variants = {
        success: "bg-green-100 text-green-700",
        secondary: "bg-gray-100 text-gray-700"
    };
    return <span className={`px-2 py-0.5 rounded text-xs font-medium ${variants[variant] || variants.secondary} ${className}`}>{children}</span>;
}

export default VideoCall;
