/**
 * OpenTelemetry Telemetry Module
 *
 * This module provides optional telemetry instrumentation using OpenTelemetry.
 * It is disabled by default and can be enabled via environment variables.
 *
 * Environment variables:
 * - TELEMETRY_ENABLED: Set to 'true' to enable telemetry
 * - TELEMETRY_SERVICE_NAME: Service name for traces (default: 'time-machines-backend')
 * - OTEL_EXPORTER_OTLP_ENDPOINT: OTLP endpoint URL (optional)
 */

import { config } from '../config';

let telemetryInitialized = false;

/**
 * Initialize OpenTelemetry instrumentation
 * This is a no-op if telemetry is disabled or dependencies are not installed
 */
export async function initTelemetry() {
  if (!config.telemetry?.enabled) {
    console.log('Telemetry is disabled');
    return;
  }

  if (telemetryInitialized) {
    console.log('Telemetry already initialized');
    return;
  }

  try {
    // Try to load OpenTelemetry dependencies (they are optional)
    const { NodeSDK } = await import('@opentelemetry/sdk-node');
    const { getNodeAutoInstrumentations } =
      await import('@opentelemetry/auto-instrumentations-node');
    const { OTLPTraceExporter } = await import('@opentelemetry/exporter-trace-otlp-http');
    const { Resource } = await import('@opentelemetry/resources');
    const { SemanticResourceAttributes } = await import('@opentelemetry/semantic-conventions');

    const sdk = new NodeSDK({
      resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: config.telemetry.serviceName,
      }),
      traceExporter: config.telemetry.otlpEndpoint
        ? new OTLPTraceExporter({
            url: config.telemetry.otlpEndpoint,
          })
        : undefined,
      instrumentations: [getNodeAutoInstrumentations()],
    });

    sdk.start();
    telemetryInitialized = true;
    console.log(`Telemetry initialized for service: ${config.telemetry.serviceName}`);

    // Graceful shutdown
    process.on('SIGTERM', () => {
      sdk
        .shutdown()
        .then(() => console.log('Telemetry terminated'))
        .catch((error) => console.error('Error terminating telemetry', error))
        .finally(() => process.exit(0));
    });
  } catch (error) {
    console.warn('Failed to initialize telemetry (dependencies may not be installed):', error);
  }
}

/**
 * Get a tracer instance
 * Returns a no-op tracer if telemetry is disabled
 */
export async function getTracer(name: string = 'default') {
  if (!config.telemetry?.enabled) {
    return createNoOpTracer();
  }

  try {
    const { trace } = await import('@opentelemetry/api');
    return trace.getTracer(name);
  } catch (error) {
    console.warn('OpenTelemetry API not available, using no-op tracer');
    return createNoOpTracer();
  }
}

/**
 * Create a span for tracing
 * Returns a no-op span if telemetry is disabled
 */
export async function createSpan(name: string, fn: () => Promise<any>) {
  const tracer = await getTracer();

  if (typeof tracer.startActiveSpan === 'function') {
    return tracer.startActiveSpan(name, async (span: any) => {
      try {
        const result = await fn();
        span.setStatus({ code: 1 }); // OK
        return result;
      } catch (error) {
        span.setStatus({ code: 2, message: String(error) }); // ERROR
        throw error;
      } finally {
        span.end();
      }
    });
  } else {
    // No-op fallback
    return fn();
  }
}

/**
 * Create a no-op tracer for when telemetry is disabled
 */
function createNoOpTracer() {
  return {
    startActiveSpan: (_name: string, fn: any) => {
      if (typeof fn === 'function') {
        return fn({ setStatus: () => {}, end: () => {} });
      }
      return { setStatus: () => {}, end: () => {} };
    },
    startSpan: () => ({ setStatus: () => {}, end: () => {} }),
  };
}

/**
 * Logger with telemetry context
 * Falls back to console if telemetry is disabled
 */
export const logger = {
  info: (message: string, ...args: any[]) => {
    console.log(`[INFO] ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[ERROR] ${message}`, ...args);
  },
  warn: (message: string, ...args: any[]) => {
    console.warn(`[WARN] ${message}`, ...args);
  },
  debug: (message: string, ...args: any[]) => {
    if (config.nodeEnv === 'development') {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  },
};
