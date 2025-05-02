import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { FormData } from '@/types/auth';

interface LoginFormProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export default function LoginForm({ formData, handleInputChange, handleSubmit, loading }: LoginFormProps) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          placeholder="Enter your email"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          placeholder="Enter your password"
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember" className="text-sm text-gray-600">Remember me</Label>
        </div>
        <a href="#" className="text-sm text-primary hover:underline">
          Forgot password?
        </a>
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Processing...' : 'Login'}
      </Button>
    </form>
  );
}