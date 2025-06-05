
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Lock, User, Eye, EyeOff, AtSign } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const RegisterForm = () => {
  const { register, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [registerData, setRegisterData] = useState({ name: '', username: '', password: '' });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await register(registerData.name, registerData.username, registerData.password);
    if (!success) {
      toast({
        title: "Registration Failed",
        description: "This username is already taken. Please choose another one.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Account Created!",
        description: "Your account has been created successfully.",
      });
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="register-name" className="text-sm font-medium">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="register-name"
            type="text"
            placeholder="Enter your full name"
            value={registerData.name}
            onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
            className="pl-10 h-11"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="register-username" className="text-sm font-medium">Username</Label>
        <div className="relative">
          <AtSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="register-username"
            type="text"
            placeholder="Choose a username"
            value={registerData.username}
            onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
            className="pl-10 h-11"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="register-password" className="text-sm font-medium">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="register-password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            value={registerData.password}
            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            className="pl-10 pr-10 h-11"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full h-11 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating account...
          </>
        ) : (
          'Create Account'
        )}
      </Button>
    </form>
  );
};

export default RegisterForm;
