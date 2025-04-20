// /app/api/addJob.js
export async function addJob(jobData) {
    try {
      const res = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jobData)
      });
  
      if (!res.ok) throw new Error('Failed to add job');
  
      return await res.json();
    } catch (err) {
      console.error('Add Job Error:', err);
      throw err;
    }
  }
  