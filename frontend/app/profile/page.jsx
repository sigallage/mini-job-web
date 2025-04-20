'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push('/login'); // Redirect if not logged in
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-bg p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <Image
          src={user.profile_pic || '/default-avatar.png'}
          alt="Profile"
          width={100}
          height={100}
          className="rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-primary mb-2">{user.username}</h2>
        <p className="text-gray-600 mb-6">{user.email}</p>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
