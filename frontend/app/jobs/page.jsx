'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function JobListPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/jobs');
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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-primary">Available Jobs</h1>

      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li key={job.id} className="bg-white p-4 shadow rounded hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-primary">{job.title}</h2>
              <p className="text-gray-600">{job.company} – {job.location}</p>
              <p className="text-sm text-gray-400">Posted on {new Date(job.created_at).toLocaleDateString()}</p>
              <Link
                href={`/jobs/${job.id}`}
                className="text-accent mt-2 inline-block"
              >
                View Details →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
