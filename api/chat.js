export default async function handler(req, res) {
  const body = await req.json();
  const userInput = body.user_input;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: userInput }
      ]
    }),
  });

  const data = await response.json();
  const reply = data.choices[0].message.content;

  res.status(200).json({ reply });
}
