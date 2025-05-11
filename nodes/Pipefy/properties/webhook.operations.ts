import { INodeProperties } from 'n8n-workflow';

// Operações disponíveis para o recurso webhook
const webhookOperationOptions = [
	{
		name: 'Listar Webhooks',
		value: 'listar',
		description: 'Listar webhooks de uma organização',
		action: 'Listar webhooks',
	},
	{
		name: 'Criar Webhook',
		value: 'criar',
		description: 'Criar um novo webhook',
		action: 'Criar um webhook',
	},
	{
		name: 'Atualizar Webhook',
		value: 'atualizar',
		description: 'Atualizar um webhook existente',
		action: 'Atualizar um webhook',
	},
	{
		name: 'Excluir Webhook',
		value: 'excluir',
		description: 'Excluir um webhook existente',
		action: 'Excluir um webhook',
	},
];

// Campos para listar webhooks
const listWebhooksFields: INodeProperties[] = [
	{
		displayName: 'ID da Organização',
		name: 'organizationId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID da organização para listar webhooks',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['listar'],
			},
		},
	},
	{
		displayName: 'Opções',
		name: 'options',
		type: 'collection',
		placeholder: 'Adicionar Opção',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['listar'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Limite',
				name: 'limit',
				type: 'number',
				default: 50,
				description: 'Número máximo de webhooks a retornar',
			},
		],
	},
];

// Campos para criar webhook
const createWebhookFields: INodeProperties[] = [
	{
		displayName: 'ID da Organização',
		name: 'organizationId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID da organização onde o webhook será criado',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['criar'],
			},
		},
	},
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		required: true,
		default: '',
		description: 'URL para onde os eventos serão enviados (deve ser HTTPS)',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['criar'],
			},
		},
	},
	{
		displayName: 'Eventos',
		name: 'actions',
		type: 'multiOptions',
		required: true,
		default: [],
		description: 'Eventos que devem acionar o webhook',
		options: [
			{
				name: 'Card - Criação',
				value: 'card.create',
			},
			{
				name: 'Card - Movimentação',
				value: 'card.move',
			},
			{
				name: 'Card - Conclusão',
				value: 'card.done',
			},
			{
				name: 'Card - Expiração',
				value: 'card.expired',
			},
			{
				name: 'Card - Atraso',
				value: 'card.overdue',
			},
			{
				name: 'Card - Atualização de Campo',
				value: 'card.field_update',
			},
		],
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['criar'],
			},
		},
	},
	{
		displayName: 'Opções',
		name: 'options',
		type: 'collection',
		placeholder: 'Adicionar Opção',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['criar'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Nome',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Nome descritivo para o webhook',
			},
			{
				displayName: 'Headers Personalizados',
				name: 'headers',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				placeholder: 'Adicionar Header',
				options: [
					{
						name: 'parameters',
						displayName: 'Headers',
						values: [
							{
								displayName: 'Nome',
								name: 'name',
								type: 'string',
								default: '',
								description: 'Nome do header',
							},
							{
								displayName: 'Valor',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Valor do header',
							},
						],
					},
				],
				description: 'Headers personalizados para as requisições do webhook',
			},
		],
	},
];

// Campos para atualizar webhook
const updateWebhookFields: INodeProperties[] = [
	{
		displayName: 'ID do Webhook',
		name: 'webhookId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID do webhook a ser atualizado',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['atualizar'],
			},
		},
	},
	{
		displayName: 'Opções de Atualização',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Adicionar Campo',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['atualizar'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				default: '',
				description: 'Nova URL para onde os eventos serão enviados',
			},
			{
				displayName: 'Nome',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Novo nome para o webhook',
			},
			{
				displayName: 'Eventos',
				name: 'actions',
				type: 'multiOptions',
				default: [],
				description: 'Novos eventos que devem acionar o webhook',
				options: [
					{
						name: 'Card - Criação',
						value: 'card.create',
					},
					{
						name: 'Card - Movimentação',
						value: 'card.move',
					},
					{
						name: 'Card - Conclusão',
						value: 'card.done',
					},
					{
						name: 'Card - Expiração',
						value: 'card.expired',
					},
					{
						name: 'Card - Atraso',
						value: 'card.overdue',
					},
					{
						name: 'Card - Atualização de Campo',
						value: 'card.field_update',
					},
				],
			},
		],
	},
];

// Campos para excluir webhook
const deleteWebhookFields: INodeProperties[] = [
	{
		displayName: 'ID do Webhook',
		name: 'webhookId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID do webhook a ser excluído',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['excluir'],
			},
		},
	},
];

// Adicionar operações de webhooks ao nó
export const webhookOperations: INodeProperties[] = [
	// Substituir as opções de operação quando resource=webhook
	{
		...({} as INodeProperties),
		displayName: 'Operação',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['webhook'],
			},
		},
		options: webhookOperationOptions,
		default: 'listar',
	},
	// Adicionar todos os campos específicos para cada operação
	...listWebhooksFields,
	...createWebhookFields,
	...updateWebhookFields,
	...deleteWebhookFields,
]; 