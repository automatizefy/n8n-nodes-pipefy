import { INodeProperties } from 'n8n-workflow';
import { pipeOperations } from './pipe.operations';
import { cardOperations } from './card.operations';
import { webhookOperations } from './webhook.operations';
import { organizationOperations } from './organization.operations';

// Recursos disponíveis
const resources: INodeProperties = {
	displayName: 'Recurso',
	name: 'resource',
	type: 'options',
	noDataExpression: true,
	default: 'pipe',
	options: [
		{
			name: 'Pipe',
			value: 'pipe',
		},
		{
			name: 'Card',
			value: 'card',
		},
		{
			name: 'Webhook',
			value: 'webhook',
		},
		{
			name: 'Organization',
			value: 'organization',
		},
	],
};

// Operações para cada recurso
const operations: INodeProperties = {
	displayName: 'Operação',
	name: 'operation',
	type: 'options',
	displayOptions: {
		show: {
			resource: [
				'pipe',
				'card',
				'webhook',
				'organization',
			],
		},
	},
	default: '',
	options: [
		{
			// Estas opções serão sobrescritas dinamicamente
			name: 'Selecione depois de escolher um recurso',
			value: '',
		},
	],
};

// Montagem dinâmica das propriedades do nó
export const pipefyNodeProperties: INodeProperties[] = [
	// Recurso (pipe, card, webhook, etc.)
	resources,
	// Operação (buscar, criar, atualizar, etc.)
	operations,
	// Propriedades específicas das operações de pipe
	...pipeOperations,
	// Propriedades específicas das operações de card
	...cardOperations,
	// Propriedades específicas das operações de webhook
	...webhookOperations,
	// Propriedades específicas das operações de organization
	...organizationOperations,
]; 