export default function JobCard({ job }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1">
      <h2 className="text-xl font-semibold text-primary">{job.title}</h2>
      <p className="text-gray-600">{job.company} — {job.location}</p>
      <p className="text-sm mt-2">{job.description}</p>
      <span className="inline-block bg-secondary text-white px-3 py-1 mt-4 rounded-full text-xs">
        {job.type}
      </span>
      {job.contact_email && (
        <div className="mt-3">
          <p className="text-sm text-blue-600">
            Contact: <a href={`mailto:${job.contact_email}`} className="underline">{job.contact_email}</a>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Posted on: {new Date(job.created_at).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
}
