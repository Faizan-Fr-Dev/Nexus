import React from 'react';
import { User, Lock, Bell, Globe, Palette, CreditCard, ChevronRight, Camera } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { useAuth } from '../../context/AuthContext';

export const SettingsPage = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and settings</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings navigation */}
        <div className="lg:col-span-1 space-y-2">
          <button className="w-full flex items-center justify-between p-3 rounded-xl bg-primary-600 text-white shadow-lg shadow-primary-200 shadow-md">
            <div className="flex items-center gap-3 font-semibold">
              <User size={20} />
              <span>Profile</span>
            </div>
            <ChevronRight size={18} />
          </button>
          
          <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-100 text-gray-700 transition-all group">
            <div className="flex items-center gap-3">
              <Lock size={20} className="text-gray-400 group-hover:text-gray-700" />
              <span>Security</span>
            </div>
            <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-700" />
          </button>
          
          <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-100 text-gray-700 transition-all group">
            <div className="flex items-center gap-3">
              <Bell size={20} className="text-gray-400 group-hover:text-gray-700" />
              <span>Notifications</span>
            </div>
            <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-700" />
          </button>
          
          <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-100 text-gray-700 transition-all group">
            <div className="flex items-center gap-3">
              <Globe size={20} className="text-gray-400 group-hover:text-gray-700" />
              <span>Language</span>
            </div>
            <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-700" />
          </button>
          
          <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-100 text-gray-700 transition-all group">
            <div className="flex items-center gap-3">
              <Palette size={20} className="text-gray-400 group-hover:text-gray-700" />
              <span>Appearance</span>
            </div>
            <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-700" />
          </button>

          <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-100 text-gray-700 transition-all group">
            <div className="flex items-center gap-3">
              <CreditCard size={20} className="text-gray-400 group-hover:text-gray-700" />
              <span>Billing</span>
            </div>
            <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-700" />
          </button>
        </div>
        
        {/* Main settings content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader border={false}>
              <h3 className="font-semibold text-gray-900">Profile Settings</h3>
            </CardHeader>
            <CardBody className="pt-0 space-y-6">
              <div className="flex flex-col md:flex-row items-center gap-6 py-4 border-b border-gray-100">
                <div className="relative">
                  <Avatar src={user.avatarUrl} size="xl" />
                  <button className="absolute bottom-0 right-0 p-2 bg-primary-600 text-white rounded-full border-4 border-white shadow-md hover:bg-primary-700 transition-all">
                    <Camera size={14} />
                  </button>
                </div>
                <div className="text-center md:text-left">
                  <h4 className="font-bold text-gray-900">Profile Picture</h4>
                  <p className="text-sm text-gray-500 italic mt-1">JPG, GIF or PNG. Max size of 800K</p>
                  <div className="flex gap-2 mt-4">
                    <Button variant="primary" size="sm">Change Photo</Button>
                    <Button variant="ghost" size="sm" className="text-red-500">Remove</Button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Full Name" defaultValue={user.name} fullWidth />
                <Input label="Email Address" defaultValue={user.email} fullWidth disabled />
                <Input label="Startup Name" defaultValue={user.startupName || ''} fullWidth />
                <Input label="Location" defaultValue={user.location || ''} fullWidth />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900 italic">Bio</label>
                <textarea 
                  className="w-full h-32 bg-white border-gray-200 border rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all"
                  defaultValue={user.bio}
                ></textarea>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="ghost">Cancel</Button>
                <Button variant="primary" className="px-8">Save Changes</Button>
              </div>
            </CardBody>
          </Card>
          
          {/* Security Settings */}
          <Card>
            <CardHeader border={false}>
              <h3 className="font-semibold text-gray-900">Security Settings</h3>
            </CardHeader>
            <CardBody className="pt-0 space-y-6">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-gray-900">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-500 mt-1">Add an extra layer of security to your account</p>
                  <p className="text-xs font-bold text-red-500 mt-2">Not Enabled</p>
                </div>
                <Button variant="outline" size="sm">Enable</Button>
              </div>
              
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h4 className="font-bold text-gray-900">Change Password</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input type="password" label="Current Password" placeholder="••••••••" fullWidth />
                  <Input type="password" label="New Password" placeholder="••••••••" fullWidth />
                  <Input type="password" label="Confirm Password" placeholder="••••••••" fullWidth />
                </div>
                <div className="flex justify-start">
                  <Button variant="secondary" size="sm">Update Password</Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
