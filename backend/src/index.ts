import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from './config';
import { postgresService } from './services/postgres.service';
import { mongoService } from './services/mongo.service';
import openaiRoutes from './routes/openai.routes';
import { errorHandler, notFound } from './middleware/error.middleware';

class Server {
  private app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddleware();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddleware(): void {
    // Security middleware
    this.app.use(helmet());
    
    // CORS
    this.app.use(cors(config.cors));
    
    // Body parsing
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    
    // Rate limiting
    const limiter = rateLimit(config.api.rateLimit);
    this.app.use('/api/', limiter);
  }

  private initializeRoutes(): void {
    // Health check
    this.app.get('/health', (req, res) => {
      res.json({ status: 'ok', timestamp: new Date().toISOString() });
    });

    // API routes
    this.app.use('/api/openai', openaiRoutes);
  }

  private initializeErrorHandling(): void {
    this.app.use(notFound);
    this.app.use(errorHandler);
  }

  private async initializeDatabases(): Promise<void> {
    try {
      // Initialize PostgreSQL (optional - will log error if not configured)
      try {
        await postgresService.initialize();
      } catch (error: any) {
        console.warn('⚠ PostgreSQL not configured or unavailable (optional)');
        console.warn('  Error:', error.message);
      }

      // Initialize MongoDB (optional - will log error if not configured)
      try {
        await mongoService.initialize();
      } catch (error: any) {
        console.warn('⚠ MongoDB not configured or unavailable (optional)');
        console.warn('  Error:', error.message);
      }
    } catch (error: any) {
      console.error('Database initialization error:', error.message);
      console.log('Continuing without database connections...');
    }
  }

  public async start(): Promise<void> {
    await this.initializeDatabases();

    this.app.listen(config.port, () => {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`🚀 Server running on port ${config.port}`);
      console.log(`📍 Environment: ${config.nodeEnv}`);
      console.log(`🔗 Health check: http://localhost:${config.port}/health`);
      console.log(`🤖 OpenAI API: http://localhost:${config.port}/api/openai`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    });
  }
}

const server = new Server();
server.start().catch(console.error);
