const axios = require('axios');

export default async function handler(req, res) {
    const { id } = req.query;

    if (!id) {
        return res.status(400).send('User ID is required');
    }

    // ফেসবুকের ডিরেক্ট ইমেজ ইউআরএল
    const fbUrl = `https://www.facebook.com/${id}/picture?type=large&width=1000&height=1000`;

    try {
        const response = await axios.get(fbUrl, {
            responseType: 'arraybuffer',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        // ব্রাউজারকে জানানো হচ্ছে এটি একটি ইমেজ
        res.setHeader('Content-Type', 'image/jpeg');
        res.setHeader('Cache-Control', 'public, max-age=86400');
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching image. Profile might be private or ID is wrong.');
    }
}
