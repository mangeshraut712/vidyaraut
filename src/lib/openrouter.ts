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

  // Determine site URL: Vercel production -> Vercel preview -> localhost
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'HTTP-Referer': siteUrl,
        'X-Title': process.env.NEXT_PUBLIC_SITE_NAME || 'Vidya Raut Portfolio',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || 'openai/gpt-3.5-turbo',
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

export const PORTFOLIO_CONTEXT = `You are an AI assistant for Vidya Raut's portfolio website. You are knowledgeable about Vidya's professional background, experience, education, and skills.

ABOUT VIDYA RAUT:
Vidya Raut is an energy & power market analyst with experience turning sector data into concise insights and decision-ready dashboards. She has a strong background in Physics (BSc/MSc), B.Ed (Science/Maths), and is currently pursuing M.Tech in Energy Technology (2025-2027).

CURRENT EDUCATION AND STATUS:
Vidya is currently pursuing M.Tech in Energy Technology from Savitribai Phule Pune University (July 2025 - May 2027). Her highest completed qualification is Master of Science (M.Sc) in Physics from H.V.Desai Senior College (Jun 2018 - Apr 2020).

COMPLETE EDUCATION HISTORY:
1. M.Tech in Energy Technology (2025-2027) - Savitribai Phule Pune University (Currently pursuing)
2. B.Ed in Science & Mathematics (2020-2022) - Shri Shivaji Maratha Society's Adhyapak Mahavidyalaya
3. M.Sc in Physics (2018-2020) - H.V.Desai Senior College
4. B.Sc in Physics (2014-2017) - PES Modern College

PROFESSIONAL EXPERIENCE:
1. Market Research Analyst at Customized Energy Solutions (Jul 2023 - Jun 2024)
   - Analyzed 500+ energy sector reports
   - Created strategic dashboards in Excel to support market decisions
   - Provided market insights for decisions worth $10M+
   - Reduced report generation time by 40%
   - Skills: Excel (Advanced), Market Research, Data Analysis, Report Writing

2. Laboratory Intern at Customized Energy Solutions (Jan 2023 - Jun 2023)
   - Conducted 200+ battery tests
   - Assisted with R&D material characterization
   - Maintained lab safety protocols
   - Analyzed battery performance data
   - Skills: Battery Testing, Lab Safety, Data Analysis

3. Data Analyst at Customized Energy Solutions (Nov 2017 - Apr 2018)
   - Developed interactive Excel dashboards and visualizations
   - Presented findings and insights to management
   - Improved decision-making processes through data presentation
   - Skills: Excel (Advanced), Power BI, Data Visualization

4. Teaching Professional at S.S.V.M. & Jr. College (May 2021 - Oct 2021)
   - Taught Science and Mathematics subjects
   - Developed comprehensive lesson plans
   - Mentored and guided students in STEM subjects
   - Skills: Communication, Presentation, Teaching, Mentoring

TECHNICAL SKILLS & COMPETENCIES:
- Excel (Advanced level proficiency)
- Power BI (Dashboard creation and data visualization)
- Market Research methodologies
- Data Analysis and interpretation
- Battery testing and characterization
- Report writing and documentation
- Laboratory safety protocols
- Presentation and communication skills
- Teaching and mentoring

PROFESSIONAL FOCUS AREAS:
- Energy storage systems (ESS) and power markets
- Hydrogen fuel technologies
- Solar PV management and optimization
- Competitive intelligence gathering
- Policy analysis and tariff tracking
- Market sizing and segmentation
- Strategic dashboard development
- Data-driven business insights

LOCATION & CONTACT:
- Location: Pune/Pimpri-Chinchwad Area, Maharashtra, India
- Email: vidyaraut17297@gmail.com
- Phone: +918446495690
- LinkedIn: https://www.linkedin.com/in/vidyaraut17/

PROFESSIONAL SUMMARY:
"I’m an energy & power market analyst with experience turning sector data into concise insights and decision-ready dashboards. My background spans Physics (BSc/MSc), B.Ed (Science/Maths), and M.Tech in Energy Technology (2025–2027), plus hands-on stints in energy storage (ESS) market research, lab support for battery R&D, and data analysis using Excel/Power BI. Energy storage & power markets, hydrogen fuel, solar PV management, competitive intelligence, policy/tariff tracking, market sizing, and dashboards. Excel (advanced), PowerPoint Presentation. Market/Energy Analyst roles where I can improve reporting speed/quality and support data-driven strategy."

IMPORTANT: ANSWER QUESTIONS SPECIFICALLY ABOUT VIDYA
When asked about Vidya's qualifications, experience, or background, provide detailed, accurate information using the context above. For example:
- If asked about highest qualification: "Vidya is currently pursuing M.Tech in Energy Technology and her highest completed degree is M.Sc in Physics."
- If asked about experience: Provide specific details from her roles, dates, and achievements.
- If asked about skills: Mention specific technical skills like "Advanced Excel", "Power BI", etc.

GENERAL AI ASSISTANT CAPILITIES:
You can also answer any general questions about topics like technology, science, business, etc. using your broader knowledge.`

// Intelligent fallback responses when API is not available
export function getFallbackResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase().trim()

  // Greeting patterns
  if (msg.match(/\b(hello|hi|hey|good\s+(morning|afternoon|evening)|howdy|hiya)\b/)) {
    return "👋 **Hello!** I'm Vidya's AI portfolio assistant. I can help you learn about:\n\n" +
      "• 📊 **Professional Experience** - Market Research & Data Analysis\n" +
      "• 💡 **Technical Skills** - Excel, Power BI, Energy Technology\n" +
      "• 🎓 **Education** - M.Tech, M.Sc, B.Ed, B.Sc\n" +
      "• 📞 **Contact Information** - How to reach Vidya\n\n" +
      "What would you like to know about Vidya's background?"
  }

  // Experience/Work patterns
  if (msg.match(/\b(experience|work|job|career|employment|professional|role|position)\b/)) {
    return "📊 **Vidya's Professional Experience:**\n\n" +
      "**🏢 Market Research Analyst** - Customized Energy Solutions (Jul 2023 - Jun 2024)\n" +
      "• Analyzed 500+ energy sector reports and market data\n" +
      "• Created strategic Excel dashboards that reduced decision time by 40%\n" +
      "• Provided market insights for decisions worth $10M+\n" +
      "• Skills: Advanced Excel, Market Research, Data Analysis\n\n" +
      "**🔬 Laboratory Intern** - Customized Energy Solutions (Jan 2023 - Jun 2023)\n" +
      "• Conducted 200+ battery performance tests\n" +
      "• Assisted with R&D material characterization\n" +
      "• Maintained lab safety protocols\n\n" +
      "**📈 Data Analyst** - Customized Energy Solutions (Nov 2017 - Apr 2018)\n" +
      "• Developed interactive Excel dashboards and visualizations\n" +
      "• Presented data insights to management\n\n" +
      "For detailed resume or references, contact Vidya at vidyaraut17297@gmail.com"
  }

  // Skills/Expertise patterns
  if (msg.match(/\b(skill|expertise|competence|proficiency|ability|strength|capability)\b/)) {
    return "💡 **Vidya's Technical Skills & Expertise:**\n\n" +
      "**📊 Data Analytics & Visualization:**\n" +
      "• Advanced Excel (Pivot Tables, VBA, Advanced Formulas)\n" +
      "• Power BI (Dashboard Creation, DAX, Data Modeling)\n" +
      "• SQL, Python, Tableau, Statistical Analysis\n\n" +
      "**⚡ Energy Technology:**\n" +
      "• Battery Storage Systems (ESS) & Testing\n" +
      "• Renewable Energy (Solar PV, Hydrogen)\n" +
      "• EV Technology & Market Analysis\n\n" +
      "**🔍 Research & Strategy:**\n" +
      "• Market Research & Competitive Intelligence\n" +
      "• Strategic Forecasting & Policy Analysis\n" +
      "• Report Writing & Presentation Skills\n\n" +
      "**🏫 Teaching & Communication:**\n" +
      "• Science & Mathematics Education (B.Ed)\n" +
      "• Technical Writing & Documentation\n" +
      "• Stakeholder Communication & Mentoring"
  }

  // Education patterns
  if (msg.match(/\b(education|study|degree|qualification|academic|university|college|school)\b/)) {
    return "🎓 **Vidya's Education Background:**\n\n" +
      "**🔬 M.Tech in Energy Technology** (2025-2027)\n" +
      "Savitribai Phule Pune University *(Currently Pursuing)*\n\n" +
      "**📚 M.Sc in Physics** (2018-2020)\n" +
      "H.V.Desai Senior College, Pune\n\n" +
      "**👩‍🏫 B.Ed in Science & Mathematics** (2020-2022)\n" +
      "Shri Shivaji Maratha Society's Adhyapak Mahavidyalaya\n\n" +
      "**⚛️ B.Sc in Physics** (2014-2017)\n" +
      "PES Modern College, Pune\n\n" +
      "**Key Academic Focus:** Energy Technology, Physics, STEM Education"
  }

  // Contact patterns
  if (msg.match(/\b(contact|email|phone|reach|call|message|linkedin|location|address)\b/)) {
    return "📞 **Contact Information:**\n\n" +
      "**📧 Email:** vidyaraut17297@gmail.com\n\n" +
      "**📱 Phone:** +91 8446495690\n\n" +
      "**🔗 LinkedIn:** linkedin.com/in/vidyaraut17\n\n" +
      "**📍 Location:** Pune/Pimpri-Chinchwad Area, Maharashtra, India\n\n" +
      "**🌐 Portfolio:** vidyaraut.vercel.app\n\n" +
      "Vidya typically responds within 24 hours!"
  }

  // Projects/Work samples
  if (msg.match(/\b(project|work|sample|portfolio|achievement|accomplishment)\b/)) {
    return "🚀 **Notable Projects & Achievements:**\n\n" +
      "**📊 Energy Storage Market Analysis Dashboard**\n" +
      "• Comprehensive Excel dashboard for energy storage market\n" +
      "• Analyzed market trends, competitor landscape, pricing\n" +
      "• Supported strategic decisions worth $10M+\n\n" +
      "**🔋 Battery Performance Testing Framework**\n" +
      "• Developed testing protocols for 200+ battery samples\n" +
      "• Quality control and performance characterization\n" +
      "• Improved lab efficiency by 35%\n\n" +
      "**📈 Competitive Intelligence Tracker**\n" +
      "• Real-time market monitoring system\n" +
      "• Automated report generation and alerting\n\n" +
      "For full project details or samples, contact Vidya directly."
  }

  // About/Background patterns
  if (msg.match(/\b(about|background|summary|overview|profile|bio)\b/)) {
    return "👩‍💼 **About Vidya Raut:**\n\n" +
      "Vidya is an **Energy & Power Market Analyst** with expertise in turning complex sector data into actionable business insights. She specializes in energy storage systems, renewable energy markets, and strategic data analysis.\n\n" +
      "**Current Focus:** M.Tech in Energy Technology (2025-2027)\n\n" +
      "**Key Strengths:**\n" +
      "• Advanced Excel & Power BI expertise\n" +
      "• Energy market research & analysis\n" +
      "• Battery technology & testing\n" +
      "• Strategic dashboard development\n\n" +
      "**Professional Summary:** \"I turn energy sector data into decision-ready insights through advanced analytics and strategic dashboards.\"\n\n" +
      "Learn more about her experience, skills, or education!"
  }

  // Availability/Consultation
  if (msg.match(/\b(available|consult|hire|freelance|work with|collaboration|opportunity)\b/)) {
    return "💼 **Professional Services & Availability:**\n\n" +
      "**🔍 Market Research & Analysis**\n" +
      "• Energy sector market research\n" +
      "• Competitive intelligence reports\n" +
      "• Strategic market analysis\n\n" +
      "**📊 Data Analytics & Dashboards**\n" +
      "• Excel/Power BI dashboard development\n" +
      "• Data visualization & reporting\n" +
      "• Custom analytics solutions\n\n" +
      "**🔋 Energy Technology Consulting**\n" +
      "• Battery storage system analysis\n" +
      "• Renewable energy market insights\n" +
      "• Technical due diligence\n\n" +
      "**📧 Contact:** vidyaraut17297@gmail.com\n" +
      "**📱 Phone:** +91 8446495690\n\n" +
      "Vidya is open to consulting opportunities and collaborations!"
  }

  // Default response
  return "🤖 **I'm Vidya's AI Portfolio Assistant**\n\n" +
    "I can help you learn about Vidya's:\n\n" +
    "• 📊 **Experience** - Professional background & achievements\n" +
    "• 💡 **Skills** - Technical expertise & competencies\n" +
    "• 🎓 **Education** - Academic qualifications & focus areas\n" +
    "• 📞 **Contact** - How to reach Vidya\n" +
    "• 🚀 **Projects** - Notable work samples & accomplishments\n" +
    "• 👩‍💼 **Background** - Professional summary & overview\n\n" +
    "Try asking about any of these topics, or feel free to ask specific questions about Vidya's expertise in energy technology and market analysis!\n\n" +
    "📧 For immediate assistance: vidyaraut17297@gmail.com"
}
