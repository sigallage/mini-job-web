'use client';
import { useEffect, useState } from 'react';

export default function PublicJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/public-jobs');
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error('Failed to fetch jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Public Job Listings</h1>
      {loading ? (
        <p className="text-center">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-center">No public jobs found.</p>
      ) : (
        <ul className="space-y-6">
          {jobs.map((job) => (
            <li key={job.id} className="p-6 bg-white shadow-md rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-primary">{job.title}</h2>
              <p className="text-gray-700 italic">{job.company}</p>
              <p className="mt-2">{job.description}</p>
              <p className="mt-2 text-sm text-gray-500">
                Contact: <a href={`mailto:${job.contact_email}`} className="text-accent underline">{job.contact_email}</a>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Posted on: {new Date(job.created_at).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
