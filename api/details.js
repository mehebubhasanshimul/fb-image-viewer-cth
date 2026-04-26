import axios from 'axios';

export default async function handler(req, res) {
  const { url } = req.query; // ফ্রন্টএন্ড থেকে ফেসবুক লিংক আসবে
  if (!url) return res.status(400).json({ error: "URL is required" });

  const options = {
    method: 'GET',
    url: 'https://facebook-profile-picture-viewer.p.rapidapi.com/',
    params: { fburl: url },
    headers: {
      'x-rapidapi-key': '4307defba7msh48e43bbee1fd3bap1bde15jsn7327916d00c3',
      'x-rapidapi-host': 'facebook-profile-picture-viewer.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    // এই এপিআই সরাসরি ছবির ইউআরএল এবং ডাটা রিটার্ন করে
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "RapidAPI call failed" });
  }
}
