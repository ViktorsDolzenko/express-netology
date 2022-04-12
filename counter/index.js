const express = require('express');
const redis = require('redis');

const PORT = process.env.PORT;
const REDIS_URL = process.env.REDIS_URL;

const client = redis.createClient({url: REDIS_URL});
const app = express();

(async () => {
    await client.connect()
})();

app.post('/counter/:bookId/incr', async (req,res) => {
    const {bookId} = req.params;
    const cnt = await client.incr(bookId);
    console.log(cnt);
    res.json(cnt);
})

app.listen(PORT, () => {
    console.log(`Server listening PORT: ${PORT}`)
})
