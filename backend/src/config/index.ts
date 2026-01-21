import dotenv from 'dotenv';
import { validateConfig } from './validation';

dotenv.config();

const rawConfig = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',

  // OpenAI Configuration
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    organization: process.env.OPENAI_ORG_ID || '',
  },

  // Database Configuration
  database: {
    postgres: {
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      database: process.env.POSTGRES_DB || 'timemachines',
      user: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || '',
    },
    mongodb: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/timemachines',
    },
  },

  // API Configuration
  api: {
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    },
  },

  // CORS Configuration
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  },

  // Telemetry Configuration (optional)
  telemetry: {
    enabled: process.env.TELEMETRY_ENABLED === 'true',
    serviceName: process.env.TELEMETRY_SERVICE_NAME || 'time-machines-backend',
    otlpEndpoint: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
  },
};

// Validate configuration at startup
export const config = validateConfig(rawConfig);
