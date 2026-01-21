import { z } from 'zod';

/**
 * Configuration schema using Zod for type-safe validation
 */
const configSchema = z.object({
  port: z.coerce.number().int().min(1).max(65535).default(3001),
  nodeEnv: z.enum(['development', 'production', 'test']).default('development'),

  openai: z.object({
    apiKey: z.string().min(1, 'OpenAI API key is required'),
    organization: z.string().optional(),
  }),

  database: z.object({
    postgres: z.object({
      host: z.string().default('localhost'),
      port: z.coerce.number().int().min(1).max(65535).default(5432),
      database: z.string().default('timemachines'),
      user: z.string().default('postgres'),
      password: z.string(),
    }),
    mongodb: z.object({
      uri: z
        .string()
        .url()
        .or(z.string().regex(/^mongodb:\/\/.+/)),
    }),
  }),

  api: z
    .object({
      rateLimit: z
        .object({
          windowMs: z
            .number()
            .int()
            .positive()
            .default(15 * 60 * 1000),
          max: z.number().int().positive().default(100),
        })
        .default({ windowMs: 15 * 60 * 1000, max: 100 }),
    })
    .default({ rateLimit: { windowMs: 15 * 60 * 1000, max: 100 } }),

  cors: z.object({
    origin: z.string().or(z.array(z.string())),
    credentials: z.boolean().default(true),
  }),

  // Optional telemetry configuration
  telemetry: z
    .object({
      enabled: z.coerce.boolean().default(false),
      serviceName: z.string().default('time-machines-backend'),
      otlpEndpoint: z.string().url().optional(),
    })
    .optional(),
});

export type Config = z.infer<typeof configSchema>;

/**
 * Validates configuration object against schema
 * @param config Raw configuration object
 * @returns Validated and typed configuration
 */
export function validateConfig(config: unknown): Config {
  try {
    return configSchema.parse(config);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Configuration validation failed:');
      error.errors.forEach((err) => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
      throw new Error('Invalid configuration');
    }
    throw error;
  }
}

/**
 * Validates configuration with detailed error reporting
 * @param config Raw configuration object
 * @returns Validation result with success flag and errors if any
 */
export function safeValidateConfig(config: unknown) {
  const result = configSchema.safeParse(config);
  return {
    success: result.success,
    data: result.success ? result.data : undefined,
    errors: !result.success ? result.error.errors : undefined,
  };
}
