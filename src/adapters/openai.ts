import type { AdapterRequest, AdapterResponse, LlmAdapter } from './base.js';

export class OpenAIAdapter implements LlmAdapter {
  name = 'openai';

  async execute(request: AdapterRequest): Promise<AdapterResponse> {
    return {
      text: `OpenAI adapter placeholder for mode "${request.mode}" with input: ${request.input}`,
      citations: request.contextFiles ?? []
    };
  }
}

