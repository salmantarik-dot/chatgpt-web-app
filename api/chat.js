export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { message } = req.body;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer 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', // 🔁 REPLACE THIS WITH YOUR OPENROUTER KEY
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'openai/gpt-3.5-turbo', // You can change this model later
      messages: [
        { role: 'user', content: message }
      ]
    })
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content;

  res.status(200).json({ reply });
}