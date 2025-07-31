try {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer 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',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'openai/gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }]
    })
  });

  const data = await response.json();
  console.log('🧠 OpenRouter raw response:', data);  // <--- Add this line

  const reply = data.choices?.[0]?.message?.content || 'No reply from model';
  res.status(200).json({ reply });
} catch (err) {
  console.error('❌ Error calling OpenRouter:', err);
  res.status(500).json({ error: 'Failed to fetch AI response' });
}