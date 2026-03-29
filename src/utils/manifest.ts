export interface PolicyAgentManifest {
  spec_version: string;
  name: string;
  version: string;
  description: string;
  owners?: string[];
  reviewers?: string[];
  adapters?: {
    default?: string;
    enabled?: string[];
  };
  policy_paths?: string[];
  control_frameworks?: string[];
}

