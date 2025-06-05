
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';

const AuthPage = () => {
  return (
    <AuthLayout>
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="login" className="text-sm">Sign In</TabsTrigger>
          <TabsTrigger value="register" className="text-sm">Sign Up</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login" className="space-y-4">
          <LoginForm />
        </TabsContent>
        
        <TabsContent value="register" className="space-y-4">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </AuthLayout>
  );
};

export default AuthPage;
