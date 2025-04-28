import { User } from '@/types/User';

interface ProfileAvatarProps {
  user: User;
}

export default function ProfileAvatar({ user }: ProfileAvatarProps) {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-3xl font-bold border-4 border-gray-300">
        {user.firstName.charAt(0).toUpperCase()}
      </div>
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">
        {user.firstName} {user.lastName}
      </h2>
      <p className="text-gray-500">{user.role}</p>
    </div>
  );
}