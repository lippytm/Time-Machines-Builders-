import { validateConfig, safeValidateConfig } from '../validation';

describe('Config Validation', () => {
  describe('validateConfig', () => {
    it('should validate a valid config object', () => {
      const validConfig = {
        port: 3001,
        nodeEnv: 'development',
        openai: {
          apiKey: 'sk-test-key',
          organization: 'org-123',
        },
        database: {
          postgres: {
            host: 'localhost',
            port: 5432,
            database: 'testdb',
            user: 'testuser',
            password: 'testpass',
          },
          mongodb: {
            uri: 'mongodb://localhost:27017/test',
          },
        },
        api: {
          rateLimit: {
            windowMs: 900000,
            max: 100,
          },
        },
        cors: {
          origin: 'http://localhost:3000',
          credentials: true,
        },
      };

      const result = validateConfig(validConfig);
      expect(result).toBeDefined();
      expect(result.port).toBe(3001);
      expect(result.openai.apiKey).toBe('sk-test-key');
    });

    it('should throw error for invalid config', () => {
      const invalidConfig = {
        port: 'invalid', // should be number
        nodeEnv: 'development',
        openai: {
          apiKey: '', // should not be empty
        },
      };

      expect(() => validateConfig(invalidConfig)).toThrow('Invalid configuration');
    });

    it('should apply default values', () => {
      const minimalConfig = {
        openai: {
          apiKey: 'sk-test-key',
        },
        database: {
          postgres: {
            password: 'testpass',
          },
          mongodb: {
            uri: 'mongodb://localhost:27017/test',
          },
        },
        cors: {
          origin: 'http://localhost:3000',
        },
      };

      const result = validateConfig(minimalConfig);
      expect(result.port).toBe(3001);
      expect(result.nodeEnv).toBe('development');
      expect(result.database.postgres.host).toBe('localhost');
    });
  });

  describe('safeValidateConfig', () => {
    it('should return success for valid config', () => {
      const validConfig = {
        port: 3001,
        nodeEnv: 'development',
        openai: {
          apiKey: 'sk-test-key',
        },
        database: {
          postgres: {
            password: 'testpass',
          },
          mongodb: {
            uri: 'mongodb://localhost:27017/test',
          },
        },
        cors: {
          origin: 'http://localhost:3000',
        },
      };

      const result = safeValidateConfig(validConfig);
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.errors).toBeUndefined();
    });

    it('should return errors for invalid config', () => {
      const invalidConfig = {
        port: 'invalid',
      };

      const result = safeValidateConfig(invalidConfig);
      expect(result.success).toBe(false);
      expect(result.data).toBeUndefined();
      expect(result.errors).toBeDefined();
      expect(result.errors?.length).toBeGreaterThan(0);
    });
  });

  describe('smoke test - no network required', () => {
    it('should validate config parsing without network calls', () => {
      const testConfig = {
        port: 3001,
        nodeEnv: 'test' as const,
        openai: {
          apiKey: 'test-key',
        },
        database: {
          postgres: {
            host: 'localhost',
            port: 5432,
            database: 'test',
            user: 'test',
            password: 'test',
          },
          mongodb: {
            uri: 'mongodb://localhost:27017/test',
          },
        },
        api: {
          rateLimit: {
            windowMs: 900000,
            max: 100,
          },
        },
        cors: {
          origin: 'http://localhost:3000',
          credentials: true,
        },
      };

      // This should succeed without any network access
      const result = validateConfig(testConfig);
      expect(result).toBeDefined();
      expect(result.nodeEnv).toBe('test');
    });
  });
});
