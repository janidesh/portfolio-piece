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
      content: "You are Janith GPT, a highly advanced, futuristic AI assistant embedded in Janith Rathnayake's workspace. You are friendly, concise, and helpful."
    };

    // 4. Call Groq API
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${context.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [systemMessage, ...messages], // Combine personality + user chat
        temperature: 0.7
      })
    });

    const data = await groqResponse.json();

    // 5. Handle Groq's internal errors
    if (!groqResponse.ok) {
      return new Response(JSON.stringify({ error: data.error?.message || "Failed to fetch from Groq" }), { status: groqResponse.status });
    }

    // 6. Return the success payload to the front-end
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    // Catch any syntax/network errors from our worker
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}