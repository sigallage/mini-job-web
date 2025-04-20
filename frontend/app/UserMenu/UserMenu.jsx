'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function UserMenu({ user: propUser, handleLogout }) {
  const router = useRouter();
  const [user, setUser] = useState(propUser || null);

  useEffect(() => {
    // If user is not passed as prop, fallback to localStorage
    if (!propUser) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [propUser]);

  if (!user) return null;

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-200">{user.username}</span>
      <Image
        src={user.profile_pic || '/default-avatar.png'}
        alt="User avatar"
        width={32}
        height={32}
        className="rounded-full cursor-pointer border-2 border-white hover:border-accent transition"
        onClick={() => router.push('/profile')}
      />
      <button
        onClick={handleLogout}
        className="text-sm text-white hover:text-accent transition"
      >
        Logout
      </button>
    </div>
  );
}
