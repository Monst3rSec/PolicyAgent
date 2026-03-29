import type { AdapterRequest, AdapterResponse, LlmAdapter } from './base.js';

export class GenericAdapter implements LlmAdapter {
  name = 'generic';

  async execute(request: AdapterRequest): Promise<AdapterResponse> {
    return {
      text: `Generic adapter placeholder for mode "${request.mode}" with input: ${request.input}`,
      citations: request.contextFiles ?? []
    };
  }
}

