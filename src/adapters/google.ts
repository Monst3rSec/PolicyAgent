import type { AdapterRequest, AdapterResponse, LlmAdapter } from './base.js';

export class GoogleAdapter implements LlmAdapter {
  name = 'google';

  async execute(request: AdapterRequest): Promise<AdapterResponse> {
    return {
      text: `Google adapter placeholder for mode "${request.mode}" with input: ${request.input}`,
      citations: request.contextFiles ?? []
    };
  }
}

