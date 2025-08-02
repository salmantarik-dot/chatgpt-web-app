export default async function handler(req, res) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'No message provided' });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer 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`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }]
      })
    });

    const data = await response.json();

    const reply = data.choices?.[0]?.message?.content || 'No reply from model';
    res.status(200).json({ reply });
  } catch (err) {
    console.error('Error calling OpenRouter:', err);
    res.status(500).json({ error: 'Failed to fetch AI response' });
  }
}