import { User } from '@/types/User';

interface ProfileEditFormProps {
  user: User;
  formData: Partial<User>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function ProfileEditForm({
  user,
  formData,
  handleInputChange,
  handleSubmit,
  onCancel,
}: ProfileEditFormProps) {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-600">Tên người dùng</label>
          <p className="mt-1 text-lg text-gray-800">{user.userName}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Họ</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName || ''}
            onChange={handleInputChange}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Tên</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName || ''}
            onChange={handleInputChange}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
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
          type="submit"
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
        >
          Lưu
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300"
        >
          Hủy
        </button>
      </div>
    </form>
  );
}