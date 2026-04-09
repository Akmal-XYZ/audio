export default async function handler(req, res) {
  const cloudName = "dzbpzdqao";
  const apiKey = "978144777229154";
  const apiSecret = "kb5h-WryZaiBzR7g3qulAF45iTo";

  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/video?max_results=100`,
      {
        headers: {
          Authorization: `Basic ${auth}`
        }
      }
    );

    const data = await response.json();

    const audios = (data.resources || []).map(item => ({
      name: item.public_id,
      url: item.secure_url,
      created: item.created_at
    }));

    return res.status(200).json(audios);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch audio" });
  }
}
