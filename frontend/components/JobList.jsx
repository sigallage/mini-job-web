'use client';
import React, { useEffect, useState } from 'react';
import { getJobs } from '../api/jobs/getJobs';

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getJobs();
      setJobs(data);
    }
    fetchData();
  }, []);

  return (
    <div className="bg-bg min-h-screen p-6">
      <h2 className="text-3xl font-bold text-dark mb-6">Available Jobs</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map(job => (
          <div
            key={job.id}
            className="bg-white rounded-2xl p-5 shadow hover:scale-[1.02] hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold text-primary">{job.title}</h3>
            <p className="text-secondary font-medium">{job.company}</p>
            <p className="text-gray-600">{job.location} — {job.type}</p>
            <p className="mt-2 text-sm text-gray-700">{job.description}</p>
            {job.contact_email && (
              <p className="mt-3 text-sm text-gray-800">
                <span className="font-medium">Contact:</span>{' '}
                <a
                  href={`mailto:${job.contact_email}`}
                  className="text-blue-600 hover:underline"
                >
                  {job.contact_email}
                </a>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
