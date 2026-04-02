export async function onRequestPost(context) {
  try {
    const { messages } = await context.request.json();
    
    // Check if API Key exists
    if (!context.env.GROQ_API_KEY) {
      return new Response(JSON.stringify({ error: "API Key missing in Cloudflare settings!" }), { status: 500 });
    }

    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${context.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: messages,
      })
    });

    const data = await groqResponse.json();
    
    if (data.error) {
      return new Response(JSON.stringify({ error: data.error.message }), { status: 400 });
    }

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
