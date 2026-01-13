const express = require('express');
const dotenv = require('dotenv');
const OpenAI = require('openai');
const path = require('path');
const cors = require('cors');   // <-- add this

dotenv.config();
const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(cors());                // <-- allow requests from React (port 3001)
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Chat endpoint
app.post('/chat', async (req, res) => {
  const userMsg = req.body.message;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful assistant for Botari AI.' },
        { role: 'user', content: userMsg }
      ]
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.json({ reply: "Sorry, I'm having trouble responding right now." });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
