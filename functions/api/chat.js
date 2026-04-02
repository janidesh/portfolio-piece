export async function onRequestPost(context) {
  // 1. Get the user's message history from the frontend
  const { messages } = await context.request.json();

  // 2. Define Janith GPT's personality and instructions
  const systemPrompt = {
    role: "system",
    content: "You are Janith GPT, a helpful and friendly assistant on this website. You can help users navigate the site, answer questions about the premium assets, or just chat like a general AI assistant. Keep responses concise and helpful."
  };

  // 3. Call the Groq API (using the OpenAI-compatible endpoint)
  try {
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${context.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192", // Groq's ultra-fast Llama 3 model
        messages: [systemPrompt, ...messages],
        temperature: 0.7,
      })
    });

    const data = await groqResponse.json();
    
    // 4. Send the response back to the frontend
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to connect to Groq" }), { status: 500 });
  }
}