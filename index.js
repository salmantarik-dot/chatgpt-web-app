<script>
  async function sendMessage() {
    const userMessage = document.getElementById('userInput').value;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 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',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }]
      })
    });

    const data = await response.json();
    document.getElementById('response').innerText = data.choices?.[0]?.message?.content || 'No reply from AI';
  }
</script>