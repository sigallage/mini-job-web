'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function JobDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/jobs/${id}`);
        if (!res.ok) {
          router.push('/jobs'); // Redirect if job doesn't exist
          return;
        }
        const data = await res.json();
        setJob(data);
      } catch (err) {
        console.error('Failed to fetch job details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchJob();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!job) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-3xl font-bold text-primary mb-2">{job.title}</h1>
      <p className="text-gray-600 mb-1">{job.company} – {job.location}</p>
      <p className="text-sm text-gray-400 mb-4">Posted on {new Date(job.created_at).toLocaleDateString()}</p>
      
      <div className="prose">
        <p>{job.description}</p>
      </div>
    </div>
  );
}
