"use client";

import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import SocialButtons from './SocialButtons';

export default function AuthPage() {
  const { isLogin, setIsLogin, formData, handleInputChange, handleSubmit, error, loading } = useAuth();

  return (
    <div className="flex flex-col bg-gray-200 min-h-screen">
      <NavBar />
      <div className="flex-grow flex items-center justify-center bg-gray-100 py-12 mt-20">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">
              {isLogin ? 'Login to Your Account' : 'Create a New Account'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={isLogin ? 'login' : 'register'} onValueChange={(value) => setIsLogin(value === 'login')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <LoginForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                  loading={loading}
                />
              </TabsContent>
              <TabsContent value="register">
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <RegisterForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                  loading={loading}
                />
              </TabsContent>
            </Tabs>
            <div className="mt-6">
              <p className="text-sm text-gray-600 text-center">Or continue with</p>
              <SocialButtons />
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}