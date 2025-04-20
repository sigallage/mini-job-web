'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AnimatedButton from '@/components/AnimatedButton';
import { addJob as addJobAPI } from '../api/addJob'; // backend API call

export default function DashboardPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    type: '',
    description: '',
    contact_email: ''
  });

  // Auth check on page load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addJob = async (e) => {
    e.preventDefault();
    if (!form.title || !form.company || !form.contact_email) return;

    try {
      await addJobAPI(form); // Call backend API to save
      setForm({
        title: '',
        company: '',
        location: '',
        type: '',
        description: '',
        contact_email: ''
      });
    } catch (err) {
      alert('Failed to add job');
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold text-center text-secondary mb-6">
        Admin Dashboard
      </h2>

      {/* Add Job Form */}
      <form
        onSubmit={addJob}
        className="bg-white p-6 rounded-lg shadow-md mb-10 animate-fade-in space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Job Title"
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Company Name"
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="type"
            value={form.type}
            onChange={handleChange}
            placeholder="Job Type (e.g., Full-time)"
            className="border p-2 rounded"
          />
        </div>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Job Description"
          rows={3}
          className="w-full border p-2 rounded"
        ></textarea>

        <input
          type="email"
          name="contact_email"
          value={form.contact_email}
          onChange={handleChange}
          placeholder="Contact Email"
          required
          className="w-full border p-2 rounded"
        />

        <AnimatedButton text="Add Job" />
      </form>
    </div>
  );
}
