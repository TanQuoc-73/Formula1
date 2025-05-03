import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormData } from '@/types/auth';

interface RegisterFormProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export default function RegisterForm({ formData, handleInputChange, handleSubmit, loading }: RegisterFormProps) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          type="text"
          id="name"
          value={formData.firstName}
          onChange={handleInputChange}
          required
          placeholder="Enter your full name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          value={formData.userName}
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
          value={formData.passWord}
          onChange={handleInputChange}
          required
          placeholder="Create a password"
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Processing...' : 'Register'}
      </Button>
    </form>
  );
}