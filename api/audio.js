export default async function handler(req, res) {
  const cloudName = process.env.CLOUD_NAME;
  const apiKey = process.env.API_KEY;
  const apiSecret = process.env.API_SECRET;

  // basic auth (Cloudinary API)
  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/video`,
      {
        headers: {
          Authorization: `Basic ${auth}`
        }
      }
    );

    const data = await response.json();

    // ambil & rapihin data audio
    const audios = data.resources.map(item => ({
      name: item.public_id,
      url: item.secure_url
    }));

    return res.status(200).json(audios);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch audio" });
  }
}
