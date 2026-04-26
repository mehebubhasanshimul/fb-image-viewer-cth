const axios = require('axios');

export default async function handler(req, res) {
    const { url } = req.query;

    if (!url) return res.status(400).json({ error: "URL is required" });

    try {
        const response = await axios.post('https://tools.xrespond.com/api/facebook/all-details', 
        { url: url }, 
        {
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'https://viewri.com',
                'Referer': 'https://viewri.com/'
            }
        });

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data from the source." });
    }
}
