'use client';
import { useEffect, useState } from 'react';
import JobCard from '@/components/JobCard';

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 5;

  // Fetch paginated jobs from backend
  const fetchJobs = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/jobs?page=${page}&limit=${limit}`);
      const data = await res.json();

      setJobs(data);
      setHasMore(data.length === limit); // If fewer than limit, no more pages
    } catch (error) {
      console.error('Error fetching jobs:', error.message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page]);

  //  Filter jobs client-side (from current page)
  const filteredJobs = jobs.filter(job => {
    const term = searchTerm.toLowerCase();
    return (
      job.title.toLowerCase().includes(term) ||
      job.company.toLowerCase().includes(term) ||
      job.location.toLowerCase().includes(term) ||
      job.type.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-bg px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8 text-dark">Available Jobs</h2>

        {/*  Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by title, company, location, or type..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>

        {/*Job Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => <JobCard key={index} job={job} />)
          ) : (
            <p className="text-center text-gray-500 col-span-2">No jobs found.</p>
          )}
        </div>

        {/*  Pagination Buttons */}
        <div className="flex justify-center mt-10 gap-4">
          <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 font-medium">Page {page}</span>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={!hasMore}
            className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
