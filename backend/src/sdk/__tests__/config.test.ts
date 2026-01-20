/**
 * SDK Config Loader Test
 * 
 * Simple smoke test to validate configuration loading
 */

import { loadSDKConfig, validateConfig } from '../config';

describe('SDK Configuration', () => {
  describe('loadSDKConfig', () => {
    it('should load configuration without errors', () => {
      const config = loadSDKConfig();
      
      expect(config).toBeDefined();
      expect(config.ai).toBeDefined();
      expect(config.web3).toBeDefined();
      expect(config.messaging).toBeDefined();
      expect(config.data).toBeDefined();
    });

    it('should have AI configuration structure', () => {
      const config = loadSDKConfig();
      
      expect(config.ai.openai).toBeDefined();
      expect(config.ai.huggingface).toBeDefined();
      expect(config.ai.langchain).toBeDefined();
      expect(config.ai.llamaindex).toBeDefined();
      expect(config.ai.vectorStores).toBeDefined();
    });

    it('should have Web3 configuration structure', () => {
      const config = loadSDKConfig();
      
      expect(config.web3.evm).toBeDefined();
      expect(config.web3.solana).toBeDefined();
      expect(config.web3.anchor).toBeDefined();
    });

    it('should have Messaging configuration structure', () => {
      const config = loadSDKConfig();
      
      expect(config.messaging.slack).toBeDefined();
      expect(config.messaging.discord).toBeDefined();
    });

    it('should have Data configuration structure', () => {
      const config = loadSDKConfig();
      
      expect(config.data.postgres).toBeDefined();
      expect(config.data.redis).toBeDefined();
      expect(config.data.s3).toBeDefined();
      expect(config.data.ipfs).toBeDefined();
    });
  });

  describe('validateConfig', () => {
    it('should not throw when no required fields specified', () => {
      const config = loadSDKConfig();
      expect(() => validateConfig(config, [])).not.toThrow();
    });

    it('should throw when required field is missing', () => {
      const config = loadSDKConfig();
      // Clear OpenAI key to test validation
      config.ai.openai.apiKey = '';
      
      expect(() => validateConfig(config, ['ai.openai.apiKey'])).toThrow();
    });

    it('should validate nested paths correctly', () => {
      const config = loadSDKConfig();
      
      // Should not throw for existing values
      config.web3.evm.rpcUrl = 'https://example.com';
      expect(() => validateConfig(config, ['web3.evm.rpcUrl'])).not.toThrow();
      
      // Should throw for missing values
      config.web3.evm.rpcUrl = '';
      expect(() => validateConfig(config, ['web3.evm.rpcUrl'])).toThrow();
    });
  });
});
