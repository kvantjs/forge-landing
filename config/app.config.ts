export const appConfig = {
  ai: {
    defaultModel: "google/gemini-3.1-pro-preview",
    availableModels: [
      "openai/gpt-5",
      "moonshotai/kimi-k2-instruct-0905",
      "anthropic/claude-sonnet-4-20250514",
      "google/gemini-3.1-pro-preview",
    ],
    modelDisplayNames: {
      "openai/gpt-5": "GPT-5",
      "moonshotai/kimi-k2-instruct-0905": "Kimi K2 (Groq)",
      "anthropic/claude-sonnet-4-20250514": "Sonnet 4",
      "google/gemini-3.1-pro-preview": "Gemini 3.1 Pro (Preview)",
    } as Record<string, string>,
  },
};
