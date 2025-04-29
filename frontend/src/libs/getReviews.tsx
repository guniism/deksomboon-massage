export default async function getReviews(id: string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/api/v1/massage-shops/${id}/reviews`,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    const json = await res.json();
    return json.data
};