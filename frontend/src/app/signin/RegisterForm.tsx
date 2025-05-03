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
        <Label htmlFor="firstName">First Name</Label>
        <Input
          type="text"
          id="firstName"
          value={formData.firstName || ''} // Đảm bảo giá trị mặc định
          onChange={handleInputChange}
          required
          placeholder="Enter your first name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          type="text"
          id="lastName"
          value={formData.lastName || ''} // Đảm bảo giá trị mặc định
          onChange={handleInputChange}
          required
          placeholder="Enter your last name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="userName">Email/Username</Label>
        <Input
          type="email"
          id="userName"
          value={formData.userName || ''} // Đảm bảo giá trị mặc định
          onChange={handleInputChange}
          required
          placeholder="Enter your email or username"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          value={formData.password || ''} // Đảm bảo giá trị mặc định
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