export default async function handler(req, res) {
  const GAS_URL = "https://script.google.com/macros/s/AKfycbwCwahZV1D-iLHLxDB9lzeDQWOaL2rgH9yCTscgaIHEdojtHmfB3sTcp1DXT1f6QWf5/exec";

  try {
    const url = new URL(GAS_URL);

    // Teruskan query string (?a=1&b=2 dst)
    Object.entries(req.query).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const response = await fetch(url.toString(), {
      method: req.method,
      headers: {
        "Content-Type": req.headers["content-type"] || "application/json",
      },
    });

    const data = await response.text();

    res.setHeader("Content-Type", response.headers.get("content-type") || "text/html");
    res.status(200).send(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
