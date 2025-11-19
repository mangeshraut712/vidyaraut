export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface OpenRouterResponse {
  id: string
  choices: Array<{
    message: {
      role: string
      content: string
    }
    finish_reason: string
  }>
  model: string
}

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'

export async function sendChatMessage(
  messages: ChatMessage[],
  apiKey?: string
): Promise<string> {
  const key = apiKey || process.env.OPENROUTER_API_KEY

  if (!key) {
    throw new Error('OpenRouter API key not configured')
  }

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': process.env.NEXT_PUBLIC_SITE_NAME || 'Vidya Raut Portfolio',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.NEXT_PUBLIC_AI_MODEL || 'openai/gpt-3.5-turbo',
        messages,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`)
    }

    const data: OpenRouterResponse = await response.json()

    if (!data.choices || data.choices.length === 0) {
      throw new Error('No response from AI model')
    }

    return data.choices[0].message.content
  } catch (error) {
    console.error('OpenRouter API Error:', error)
    throw error
  }
}

export const PORTFOLIO_CONTEXT = `You are an AI assistant for Vidya Raut's portfolio website. Here's information about Vidya:

PROFESSIONAL SUMMARY:
Vidya Raut is an energy & power market analyst with experience turning sector data into concise insights and decision-ready dashboards.

EDUCATION:
- M.Tech in Energy Technology (2025-2027) - Savitribai Phule Pune University (In Progress)
- B.Ed in Science & Mathematics (2020-2022) - Shri Shivaji Maratha Society's Adhyapak Mahavidyalaya
- M.Sc in Physics (2018-2020) - H.V.Desai Senior College
- B.Sc in Physics (2014-2017) - PES Modern College

EXPERIENCE:
1. Market Research Analyst at Customized Energy Solutions (Jul 2023 - Jun 2024)
   - Analyzed 500+ energy sector reports
   - Created strategic dashboards in Excel
   - Provided market insights for decisions worth $10M+
   - Reduced report generation time by 40%

2. Laboratory Intern at Customized Energy Solutions (Jan 2023 - Jun 2023)
   - Conducted 200+ battery tests
   - Assisted with R&D material characterization
   - Maintained lab safety protocols

3. Data Analyst at Customized Energy Solutions (Nov 2017 - Apr 2018)
   - Developed interactive Excel dashboards
   - Presented findings to management

4. Teaching Professional at S.S.V.M. & Jr. College (May 2021 - Oct 2021)
   - Taught Science and Mathematics

SKILLS:
- Excel (Advanced)
- Power BI
- Market Research
- Data Analysis
- Battery Testing
- Report Writing
- Data Visualization
- Communication & Presentation

FOCUS AREAS:
Energy storage & power markets, hydrogen fuel, solar PV management, competitive intelligence, policy/tariff tracking, market sizing, and dashboards.

CONTACT:
- Email: vidyaraut17297@gmail.com
- Phone: +918446495690
- Location: Pune/Pimpri-Chinchwad Area, India
- LinkedIn: https://www.linkedin.com/in/vidyaraut17/

Answer questions about Vidya professionally and helpfully based on the context above.

IMPORTANT INSTRUCTIONS:
1. You are also a general-purpose AI assistant. You can answer questions about ANY topic (e.g., "Who is the CEO of Google?", "What is quantum physics?", etc.) using your general knowledge.
2. If the user asks about Vidya, use the provided context to give detailed and accurate answers.
3. If the user asks about something unrelated to Vidya, answer it helpfully as a standard AI assistant would.
4. Be polite, professional, and concise.`
