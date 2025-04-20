'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    loadUser();

    const handleStorageChange = () => {
      loadUser();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    window.dispatchEvent(new Event('storage'));
    router.push('/login');
  };

  return (
    <header className="bg-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mini Job Board</h1>
        <nav>
          <ul className="flex items-center space-x-4 relative">
            <li>
              <a href="/" className="hover:text-accent transition">Home</a>
            </li>

            {/* Public Job Dropdown */}
            <li className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="hover:text-accent transition"
              >
                Public Job List ▾
              </button>

              {dropdownOpen && (
                <ul className="absolute bg-white text-black right-0 mt-2 w-48 rounded-md shadow-lg z-50">
                  <li>
                    <a
                      href="/public-job-form"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Post a Job
                    </a>
                  </li>
                  <li>
                    <a
                      href="/public-jobs"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      View Public Job List
                    </a>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <a href="/dashboard" className="hover:text-accent transition">Dashboard</a>
            </li>

            {user ? (
              <>
                <li>
                  <a href="/profile">
                    <img
                      src={user.profile_pic || 'https://i.pravatar.cc/40'}
                      alt="Profile"
                      className="w-8 h-8 rounded-full border-2 border-white hover:border-accent transition"
                    />
                  </a>
                </li>
                <li>
                  <button onClick={handleLogout} className="hover:text-accent">Logout</button>
                </li>
              </>
            ) : (
              <>
                <li><a href="/login" className="hover:text-accent transition">Login</a></li>
                <li><a href="/signup" className="hover:text-accent transition">Signup</a></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
