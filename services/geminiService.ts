import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are 'SP Bot', a creative digital marketing strategist for 'SP Digital'. 
Your agency focuses on helping Brazilian business owners in the USA (United States).
Your tone is professional, energetic, innovative, and friendly. 
You can speak English or Portuguese, depending on the user's input, but default to English mixed with warm Brazilian charisma.

The agency services include:
- High-end Web Design
- Branding & Logos (Neon/Modern/Glass styles)
- Social Media Strategy for specific niches: Cleaning Services, Construction, Beauty Salons, Churches/Non-profits, and Daycares.

If a user asks for advice, give specific examples relevant to the Brazilian-American market. 
Keep responses concise (under 100 words unless asked for more).
`;

export const sendMessageToGemini = async (history: { role: string; text: string }[], newMessage: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key not found");
    }

    const ai = new GoogleGenAI({ apiKey });

    // Construct the conversation context
    // We map our simplified history to the format Gemini expects or just send the last prompt with context
    // For a simple chat, we will use generateContent with the system instruction.
    
    // Create a chat session
    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
        }
    });

    // We can't easily replay full history in this stateless function wrapper effectively without managing history object
    // So we will simulate a "turn" by sending the message. In a real app, we'd persist the 'chat' object.
    // For this demo, we'll send the new message.
    
    // To provide context of previous turns (if any), we could concatenate, but for this simpler implementation 
    // we will rely on the user's current prompt or use the chat object if we kept it alive in React state.
    // Let's assume we just send the message for now to keep it stateless.
    
    const response = await chat.sendMessage({
        message: newMessage
    });

    return response.text || "Sorry, I couldn't generate a creative idea right now. Let's try again.";

  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to the creative server. Please ensure your API key is valid.";
  }
};