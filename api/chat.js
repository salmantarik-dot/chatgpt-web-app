export default async function handler(req, res) {
  const { message } = req.body;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer sk-...",  // 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
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [{ role: "user", content: message }]
    })
  });

  const data = await response.json();
  res.status(200).json({ reply: data.choices?.[0]?.message?.content || "No reply." });
}
