export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  // Handle CORS preflight
  res.setHeader("Access-Control-Allow-Origin", "https://terminaltestt.carrd.co");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    if (!req.body || !req.body.query) {
      return res.status(400).json({ error: "No GraphQL query provided" });
    }

    const response = await fetch("https://streaming.bitquery.io/eap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "ory_at_iz-WrBEGsFX3dt7Seajvbpxn3z2wF4k6LYSS4yEBsdE.g_4yCyGCo8wygEKYSg6biDTfEtjVzgpzu9N71Gi4dPY"
      },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();

    try {
      const data = JSON.parse(text);
      res.status(200).json(data);
    } catch {
      throw new Error("Bitquery returned non-JSON: " + text);
    }
  } catch (error) {
    console.error("Proxy error:", error.message);
    res.status(500).json({ error: "Proxy failed", details: error.message });
  }
}
