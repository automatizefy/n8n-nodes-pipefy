# n8n-nodes-pipefy

This is an n8n community node for Pipefy. It allows you to interact with the Pipefy API through n8n workflows.

## Installation

Follow these steps to install the node in your n8n instance:

1. Go to your n8n root directory
2. Run the following command:

```bash
npm install n8n-nodes-pipefy
```

## Features

- Create cards in Pipefy
- Get card information
- Update cards
- More features coming soon!

## Authentication

To use this node, you'll need a Pipefy API token. You can get one by:

1. Logging into your Pipefy account
2. Going to Settings > API Tokens
3. Creating a new API token

## Usage

1. Add the Pipefy node to your workflow
2. Configure the credentials with your API token
3. Select the operation you want to perform
4. Fill in the required fields
5. Execute the workflow

## Available Operations

### Card Operations
- Create Card
- Get Card
- Update Card

## Development

To build the node:

```bash
npm run build
```

To watch for changes:

```bash
npm run dev
```

## License

[MIT](LICENSE.md) 