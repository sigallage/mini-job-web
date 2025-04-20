export async function getJobs() {
    try {
      const res = await fetch("http://localhost:5000/api/jobs");
      if (!res.ok) throw new Error("Failed to fetch jobs");
      return await res.json();
    } catch (error) {
      console.error("Error fetching jobs:", error.message);
      return [];
    }
  }
  