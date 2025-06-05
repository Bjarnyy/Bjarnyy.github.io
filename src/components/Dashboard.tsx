
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, User, AtSign, Calendar, Settings } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, {user?.name}!</p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-1 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <Avatar className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-600 to-purple-600">
                  <AvatarFallback className="text-white text-xl font-bold">
                    {user ? getInitials(user.name) : 'U'}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-xl">{user?.name}</CardTitle>
              <CardDescription>@{user?.username}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                <User className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Full Name</p>
                  <p className="text-sm text-gray-600">{user?.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                <AtSign className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Username</p>
                  <p className="text-sm text-gray-600">@{user?.username}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Member Since</p>
                  <p className="text-sm text-gray-600">Today</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <Card className="lg:col-span-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Here are some things you can do with your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="h-20 flex-col space-y-2 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                >
                  <User className="h-6 w-6" />
                  <span>Edit Profile</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col space-y-2 hover:bg-purple-50 hover:border-purple-200 transition-colors"
                >
                  <Settings className="h-6 w-6" />
                  <span>Settings</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col space-y-2 hover:bg-green-50 hover:border-green-200 transition-colors"
                >
                  <AtSign className="h-6 w-6" />
                  <span>Change Username</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col space-y-2 hover:bg-orange-50 hover:border-orange-200 transition-colors"
                >
                  <Calendar className="h-6 w-6" />
                  <span>Calendar</span>
                </Button>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  🎉 Welcome to your Dashboard!
                </h3>
                <p className="text-gray-600 mb-4">
                  This is a demo authentication system with unique usernames. Your data is stored locally in your browser's localStorage. 
                  Try creating another account with a different username to test the uniqueness validation!
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>💡</span>
                  <span>Username "@{user?.username}" is now reserved for you!</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
