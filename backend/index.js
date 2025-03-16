const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const supabaseUrl = 'https://<your-supabase-url>.supabase.co';
const supabaseKey = '<your-supabase-key>';
const supabase = createClient(supabaseUrl, supabaseKey);

app.post('/submit-score', async (req, res) => {
const { username, score } = req.body;
const { data, error } = await supabase
    .from('leaderboard')
    .insert([{ username, score }]);
if (error) {
    return res.status(500).json({ error: error.message });
}
res.sendStatus(200);
});

app.get('/leaderboard', async (req, res) => {
const { data, error } = await supabase
    .from('leaderboard')
    .select('*')
    .order('score', { ascending: false })
    .limit(10);
if (error) {
    return res.status(500).json({ error: error.message });
}
res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});