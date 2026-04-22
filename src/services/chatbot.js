/**
 * Chatbot service for VoteVerse India.
 * Handles knowledge-base matching and Gemini API integration.
 */
import { KNOWLEDGE_BASE } from '../utils/constants';

/**
 * Generate a chatbot response based on user input.
 * First tries Gemini API, falls back to local knowledge base.
 * @param {string} input - User's question
 * @returns {Promise<string>} Bot response
 */
export async function getChatResponse(input) {
  if (!input.trim()) return '';

  const lowerInput = input.toLowerCase();

  // Try Gemini API if available
  const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (geminiKey) {
    try {
      const response = await callGeminiAPI(input, geminiKey);
      if (response) return response;
    } catch {
      // Fall through to local knowledge base
    }
  }

  // Local knowledge base matching
  return matchKnowledgeBase(lowerInput);
}

/**
 * Match input against the local knowledge base.
 */
function matchKnowledgeBase(input) {
  // Check for myth-busting queries
  const myths = {
    'hack': '🛡️ Myth Busted: EVMs cannot be hacked remotely. They are standalone devices with no wireless connectivity, no operating system, and use one-time programmable chips. The Election Commission conducts rigorous testing before every election.',
    'rigged': '🛡️ Myth Busted: Indian elections are monitored by thousands of observers, including international ones. EVMs undergo first-level checking (FLC), randomized distribution, and VVPAT verification. The system has multiple layers of security.',
    'vote not count': '🛡️ Myth Busted: Every valid vote is counted. The counting process is transparent, with representatives from all parties present. VVPAT slips can be cross-verified with electronic counts.',
    'no difference': '🛡️ Myth Busted: In 2004, a Lok Sabha seat was won by just 1 vote. In recent state elections, margins of 100-500 votes have decided outcomes. Your vote absolutely matters!',
    'booth capture': '🛡️ Myth Busted: Modern EVMs have a maximum vote rate limit — they can register only 5 votes per minute. Combined with CCTV monitoring, central forces deployment, and strict identification protocols, booth capturing is virtually impossible today.',
  };

  for (const [key, response] of Object.entries(myths)) {
    if (input.includes(key)) return response;
  }

  // FAQ patterns (run before KNOWLEDGE_BASE to avoid partial word matches like 'vote' in 'first time voter')
  if (input.includes('when') && input.includes('election')) {
    return 'Elections in India are held as per the schedule announced by the Election Commission. General elections occur every 5 years. State elections are held independently. Check eci.gov.in for the latest schedule.';
  }

  if (input.includes('how') && (input.includes('old') || input.includes('age'))) {
    return KNOWLEDGE_BASE.age;
  }

  if (input.includes('first time') || input.includes('new voter')) {
    return 'Welcome, first-time voter! 🎉\n\nHere\'s your quick guide:\n1. Register at nvsp.in (Form 6)\n2. Get your Voter ID (EPIC card)\n3. Find your polling booth\n4. Carry valid photo ID on election day\n5. Vote and get your finger inked!\n\nUse our EVM Simulator to practice!';
  }

  // Standard knowledge base
  for (const [key, response] of Object.entries(KNOWLEDGE_BASE)) {
    if (input.includes(key)) return response;
  }

  // Default response with suggestions
  return 'I can help you with many election-related topics! Try asking about:\n\n• Voter Registration\n• EVM & VVPAT\n• Required Documents\n• Finding your polling booth\n• NOTA\n• Common election myths\n• First-time voter guide\n\nWhat would you like to know?';
}

/**
 * Call Google Gemini API for AI-powered responses.
 */
async function callGeminiAPI(userInput, apiKey) {
  const systemPrompt = `You are VoteVerse AI, an expert assistant for Indian elections and voting. 
You help citizens understand:
- How to register as a voter
- The voting process
- EVM and VVPAT technology
- Finding polling booths
- Required documents
- Election myths and facts

Rules:
- Be concise (under 200 words)
- Be factual and cite ECI (Election Commission of India) guidelines
- Use emojis sparingly for readability
- If asked about political parties or who to vote for, remain neutral
- Respond in the language the user writes in`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: systemPrompt }] },
          { role: 'model', parts: [{ text: 'Understood. I am VoteVerse AI, ready to help with Indian election queries.' }] },
          { role: 'user', parts: [{ text: userInput }] },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
        },
      }),
    }
  );

  if (!response.ok) return null;

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
}
