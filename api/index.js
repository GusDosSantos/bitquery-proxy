export const config = {
  api: {
    bodyParser: true, // ensures req.body is automatically parsed
  },
};

export default async function handler(req, res) {
  try {
    const body = req.body;

    if (!body || !body.query) {
      return res.status(400).json({ error: "No GraphQL query provided" });
    }

    const response = await fetch("https://graphql.bitquery.io", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "ory_at_iz-WrBEGsFX3dt7Seajvbpxn3z2wF4k6LYSS4yEBsdE.g_4yCyGCo8wygEKYSg6biDTfEtjVzgpzu9N71Gi4dPY"
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Proxy crashed", details: error.message });
  }
}
