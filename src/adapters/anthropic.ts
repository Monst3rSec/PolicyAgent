import type { AdapterRequest, AdapterResponse, LlmAdapter } from './base.js';

export class AnthropicAdapter implements LlmAdapter {
  name = 'anthropic';

  async execute(request: AdapterRequest): Promise<AdapterResponse> {
    return {
      text: `Anthropic adapter placeholder for mode "${request.mode}" with input: ${request.input}`,
      citations: request.contextFiles ?? []
    };
  }
}

