import { User } from '@/types/User';

interface ProfileInfoProps {
  user: User;
  onEdit: () => void;
  onLogout: () => void;
}

export default function ProfileInfo({ user, onEdit, onLogout }: ProfileInfoProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-600">Tên người dùng</label>
          <p className="mt-1 text-lg text-gray-800">{user.userName}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Họ</label>
          <p className="mt-1 text-lg text-gray-800">{user.firstName}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Tên</label>
          <p className="mt-1 text-lg text-gray-800">{user.lastName}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Vai trò</label>
          <p className="mt-1 text-lg text-gray-800">{user.role}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Ngày tạo</label>
          <p className="mt-1 text-lg text-gray-800">{user.createdAt}</p>
        </div>
      </div>
      <div className="flex justify-center space-x-4 mt-8">
        <button
          onClick={onEdit}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Chỉnh sửa
        </button>
        <button
          onClick={onLogout}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
}