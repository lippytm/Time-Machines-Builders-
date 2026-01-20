// Time Machines Builders - Go SDK Adapter Notes
//
// This repository is primarily Node.js/TypeScript, but this file provides
// guidance for implementing equivalent adapters in Go.
//
// To use these integrations in Go, install the following packages:

module github.com/lippytm/time-machines-builders

go 1.21

require (
	// AI Dependencies
	github.com/sashabaranov/go-openai v1.17.0 // OpenAI SDK
	// Note: Hugging Face doesn't have official Go SDK, use HTTP client
	// Note: LangChain Go port: github.com/tmc/langchaingo
	
	// Vector Stores (use HTTP clients or community packages)
	// Pinecone: Use HTTP client with REST API
	// Weaviate: github.com/weaviate/weaviate-go-client v4.13.0
	// Chroma: Use HTTP client with REST API
	
	// Web3 Dependencies
	github.com/ethereum/go-ethereum v1.13.0 // EVM chains (Geth)
	github.com/gagliardetto/solana-go v1.8.0 // Solana
	// Anchor: Typically used in Rust, for Go use Solana Go SDK directly
	
	// Messaging Dependencies
	github.com/slack-go/slack v0.12.0 // Slack API
	github.com/bwmarrin/discordgo v0.27.0 // Discord API
	
	// Data Dependencies
	github.com/lib/pq v1.10.0 // PostgreSQL
	github.com/go-redis/redis/v8 v8.11.0 // Redis
	github.com/aws/aws-sdk-go-v2 v1.21.0 // AWS S3
	github.com/aws/aws-sdk-go-v2/service/s3 v1.40.0
	github.com/ipfs/go-ipfs-api v0.7.0 // IPFS
)

// Example Go adapter structure:
//
// sdk/
//   config.go              // Configuration loader
//   factory.go             // Factory pattern for creating adapters
//   adapter.go             // Base adapter interface
//   ai/
//     openai_adapter.go    // OpenAI client wrapper
//     huggingface_adapter.go
//   web3/
//     evm_adapter.go       // go-ethereum wrapper
//     solana_adapter.go    // Solana Go SDK wrapper
//   messaging/
//     slack_adapter.go     // Slack Go SDK wrapper
//     discord_adapter.go   // DiscordGo wrapper
//   data/
//     postgres_adapter.go  // lib/pq wrapper
//     redis_adapter.go     // go-redis wrapper
//     s3_adapter.go        // AWS SDK v2 wrapper
//     ipfs_adapter.go      // go-ipfs-api wrapper
//
// Usage example:
//   package main
//   
//   import (
//       "github.com/lippytm/time-machines-builders/sdk"
//   )
//   
//   func main() {
//       config := sdk.LoadConfig()
//       factory := sdk.NewFactory(config)
//       
//       openai := factory.CreateAIAdapter("openai")
//       evm := factory.CreateWeb3Adapter("evm")
//   }
