export interface AdapterRequest {
  mode: 'draft' | 'map' | 'explain' | 'ask';
  input: string;
  contextFiles?: string[];
}

export interface AdapterResponse {
  text: string;
  citations?: string[];
}

export interface LlmAdapter {
  name: string;
  execute(request: AdapterRequest): Promise<AdapterResponse>;
}

