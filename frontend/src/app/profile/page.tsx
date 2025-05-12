"use client";

import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ProfileAvatar from '@/components/ProfileAvatar';
import ProfileInfo from '@/components/ProfileInfo';
import ProfileEditForm from '@/components/ProfileEditForm';
import { useProfile } from '@/hooks/useProfile';

export default function Profile() {
  const {
    user,
    isEditing,
    formData,
    error,
    success,
    setIsEditing,
    handleInputChange,
    handleSubmit,
    handleLogout,
  } = useProfile();

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      <NavBar />
      <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Hồ sơ cá nhân</h1>

        {user ? (
          <div className="bg-white rounded-xl shadow-lg p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg">
                <p>{error}</p>
              </div>
            )}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-lg">
                <p>{success}</p>
              </div>
            )}

            <ProfileAvatar user={user} />

            {!isEditing ? (
              <ProfileInfo user={user} onEdit={() => setIsEditing(true)} onLogout={handleLogout} />
            ) : (
              <ProfileEditForm
                user={user}
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                onCancel={() => setIsEditing(false)}
              />
            )}
          </div>
        ) : (
          <div className="text-center text-gray-600 animate-pulse">Đang tải thông tin...</div>
        )}
      </div>
      <Footer />
    </div>
  );
}