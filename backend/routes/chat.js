// backend/routes/chat.js
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { ratelimit } from '../middleware/ratelimit.js';

dotenv.config();

const router = express.Router();

// Main chat endpoint using OpenRouter with simple model fallback
router.post('/chat', ratelimit, async (req, res) => {
  try {
    const { message, context } = req.body || {};

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Message is required and must be a non-empty string',
      });
    }

    const trimmedMessage = message.trim();
    const contextStr = JSON.stringify(context || {});

    const apiKey = process.env.OPENROUTER_API_KEY;
    
    if (!apiKey) {
      return res.status(503).json({
        success: false,
        error: 'AI service is not configured',
        message:
          'The backend does not have an OpenRouter API key configured. Please add OPENROUTER_API_KEY in backend/.env.',
      });
    }

    const modelsToTry = [
      process.env.AI_MODEL_PRIMARY || 'minimax/minimax-m2:free',
      process.env.AI_MODEL_FALLBACK || 'openrouter/sherlock-think-alpha',
      process.env.AI_MODEL_SECONDARY || 'openrouter/sherlock-dash-alpha',
    ];

    let response;
    let lastError;
    let usedModel = null;

    for (const model of modelsToTry) {
      try {
        response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
            'HTTP-Referer': process.env.VERCEL_URL || 'https://vidyaraut.vercel.app',
            'X-Title': 'Vidya Raut Portfolio',
            'User-Agent': 'Vidya-Raut-Portfolio/1.0',
          },
          body: JSON.stringify({
            model,
            messages: [
              {
                role: 'system',
                content: `You are Vidya Raut's AI assistant. You can help with questions about Vidya's portfolio and expertise, as well as general questions on various topics.

Guidelines:
- Be friendly, professional, and helpful
- For portfolio-related questions, reference the portfolio context provided
- Keep responses under 150 words for portfolio questions, under 100 words for general questions
- For general questions not related to the portfolio, provide helpful responses using your knowledge
- Emphasize Vidya's energy sector and data analysis expertise when relevant
- Highlight Excel/data analysis expertise when appropriate
- If asked about availability, mention she's seeking Energy/Market Analyst roles
- Direct complex professional inquiries to the contact form
- Don't make up information not in the context for portfolio-specific details
- If you don't know something about Vidya specifically, say "I'd recommend checking the contact section to ask Vidya directly"
- Maintain a conversational but professional tone

Portfolio Context: ${contextStr}`,
              },
              {
                role: 'user',
                content: trimmedMessage,
              },
            ],
            temperature: Number(process.env.AI_TEMPERATURE) || 0.8,
            max_tokens: Number(process.env.AI_MAX_TOKENS) || 800,
            top_p: Number(process.env.AI_TOP_P) || 0.9,
            presence_penalty:
              Number(process.env.AI_PRESENCE_PENALTY) || 0.6,
            frequency_penalty:
              Number(process.env.AI_FREQUENCY_PENALTY) || 0.5,
            stream: false,
          }),
        });

        if (response.ok) {
          usedModel = model;
          break;
        } else {
          const errorText = await response.text();
          lastError = { status: response.status, errorText };
        }
      } catch (err) {
        lastError = { status: 0, errorText: err.message };
        continue;
      }
    }

    if (!response || !response.ok) {
      if (lastError?.status === 429) {
        return res.status(429).json({
          success: false,
          error: 'AI model temporarily busy',
          message:
            'All AI models are currently experiencing high demand. Please try again in a few minutes.',
        });
      }
      if (lastError?.status === 401) {
        return res.status(401).json({
          success: false,
          error: 'API configuration error',
          message: 'Please check your OpenRouter API key configuration.',
        });
      }

      return res.status(500).json({
        success: false,
        error: 'AI service temporarily unavailable',
        message: lastError?.errorText || 'Unknown error from AI provider',
      });
    }

    const data = await response.json();
    const aiResponse =
      data.choices?.[0]?.message?.content ||
      "I'm having trouble responding right now.";

    const metadata = {
      generation_id: data.id,
      provider_name: data.provider_name || 'OpenRouter',
      model: data.model || usedModel || modelsToTry[0],
      tokens_prompt: data.usage?.prompt_tokens || 0,
      tokens_completion: data.usage?.completion_tokens || 0,
      total_tokens: data.usage?.total_tokens || 0,
      finish_reason: data.choices?.[0]?.finish_reason || 'unknown',
      ai_model_used: data.model || usedModel || modelsToTry[0],
      responseTime: data.usage?.total_time
        ? `${Math.round(data.usage.total_time * 1000)}ms`
        : 'n/a',
      quality: 'high',
      cached: false,
      isOnline: true,
    };

    return res.status(200).json({
      success: true,
      response: aiResponse,
      answer: aiResponse,
      metadata,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in /api/chat route:', error);

    return res.status(500).json({
      success: false,
      error: 'Unable to process your request',
      message: 'There was an issue with the AI service. Please try again.',
    });
  }
});

export default router;
