export const config = {
  api: {
    bodyParser: true, // Ensures Vercel parses JSON automatically
  },
};

export default async function handler(req, res) {
  try {
    const response = await fetch("https://graphql.bitquery.io", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "ory_at_iz-WrBEGsFX3dt7Seajvbpxn3z2wF4k6LYSS4yEBsdE.g_4yCyGCo8wygEKYSg6biDTfEtjVzgpzu9N71Gi4dPY"
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Something went wrong", details: error.message });
  }
}
