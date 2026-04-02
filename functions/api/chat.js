export async function onRequestPost(context) {
  try {
    // 1. Parse the incoming request
    const body = await context.request.json();
    const messages = body.messages || [];

    // 2. Safety Check: If messages are empty, don't call Groq
    if (messages.length === 0) {
      return new Response(JSON.stringify({ error: "No messages provided" }), { status: 400 });
    }

    // 3. Define the System Prompt (Janith GPT's personality)
    const systemMessage = {
      role: "system",
      content: "You are Janith GPT, a helpful assistant. You are friendly and concise."
    };

    // 4. Call Groq
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${context.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [systemMessage, ...messages], // Combine personality + user chat
        temperature: 0.7
      })
    });

    const data = await groqResponse.json();

    // 5. Handle Groq's internal errors
    if (!groqResponse.ok) {
      return new Response(JSON.stringify({ error: data.error?.message || "Groq API Error" }), { status: groqResponse.status });
    }

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}