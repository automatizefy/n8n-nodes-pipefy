import { INodeProperties } from 'n8n-workflow';

// Operações disponíveis para o recurso card
const cardOperationOptions = [
	{
		name: 'Consultar Card',
		value: 'get',
		description: 'Obter detalhes de um card específico',
		action: 'Consultar um card',
	},
	{
		name: 'Criar Card',
		value: 'create',
		description: 'Criar um novo card em um pipe',
		action: 'Criar um card',
	},
	{
		name: 'Atualizar Card',
		value: 'update',
		description: 'Atualizar dados de um card existente',
		action: 'Atualizar um card',
	},
	{
		name: 'Mover Card',
		value: 'move',
		description: 'Mover um card para outra fase',
		action: 'Mover um card',
	},
	{
		name: 'Excluir Card',
		value: 'delete',
		description: 'Excluir um card existente',
		action: 'Excluir um card',
	},
];

// Campos para consulta de card
const getCardFields: INodeProperties[] = [
	{
		displayName: 'ID do Card',
		name: 'cardId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID do card a ser consultado',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['get'],
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
				resource: ['card'],
				operation: ['get'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Incluir Campos',
				name: 'includeFields',
				type: 'boolean',
				default: true,
				description: 'Se deve incluir valores dos campos do card',
			},
			{
				displayName: 'Incluir Comentários',
				name: 'includeComments',
				type: 'boolean',
				default: false,
				description: 'Se deve incluir comentários do card',
			},
			{
				displayName: 'Incluir Anexos',
				name: 'includeAttachments',
				type: 'boolean',
				default: false,
				description: 'Se deve incluir anexos do card',
			},
		],
	},
];

// Campos para criação de card
const createCardFields: INodeProperties[] = [
	{
		displayName: 'ID do Pipe',
		name: 'pipeId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID do pipe onde o card será criado',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Título',
		name: 'title',
		type: 'string',
		required: true,
		default: '',
		description: 'Título do novo card',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Fase Inicial',
		name: 'phaseId',
		type: 'string',
		default: '',
		description: 'ID da fase onde o card será criado. Se não for informado, será criado na primeira fase do pipe.',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Campos Personalizados',
		name: 'customFields',
		placeholder: 'Adicionar Campo',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['create'],
			},
		},
		default: {},
		options: [
			{
				name: 'fields',
				displayName: 'Campos',
				values: [
					{
						displayName: 'ID do Campo',
						name: 'fieldId',
						type: 'string',
						default: '',
						description: 'ID do campo a ser preenchido',
					},
					{
						displayName: 'Valor',
						name: 'value',
						type: 'string',
						default: '',
						description: 'Valor a ser atribuído ao campo',
					},
				],
			},
		],
	},
	{
		displayName: 'Opções',
		name: 'options',
		type: 'collection',
		placeholder: 'Adicionar Opção',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['create'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Data de Vencimento',
				name: 'dueDate',
				type: 'dateTime',
				default: '',
				description: 'Data de vencimento do card (formato: YYYY-MM-DD)',
			},
			{
				displayName: 'IDs de Responsáveis',
				name: 'assigneeIds',
				type: 'string',
				default: '',
				description: 'IDs dos responsáveis pelo card (separados por vírgula)',
			},
		],
	},
];

// Campos para atualização de card
const updateCardFields: INodeProperties[] = [
	{
		displayName: 'ID do Card',
		name: 'cardId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID do card a ser atualizado',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['update'],
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
				resource: ['card'],
				operation: ['update'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Título',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Novo título do card',
			},
			{
				displayName: 'Data de Vencimento',
				name: 'dueDate',
				type: 'dateTime',
				default: '',
				description: 'Nova data de vencimento (formato: YYYY-MM-DD)',
			},
		],
	},
	{
		displayName: 'Campos Personalizados',
		name: 'customFields',
		placeholder: 'Adicionar Campo',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['update'],
			},
		},
		default: {},
		options: [
			{
				name: 'fields',
				displayName: 'Campos',
				values: [
					{
						displayName: 'ID do Campo',
						name: 'fieldId',
						type: 'string',
						default: '',
						description: 'ID do campo a ser atualizado',
					},
					{
						displayName: 'Valor',
						name: 'value',
						type: 'string',
						default: '',
						description: 'Novo valor a ser atribuído ao campo',
					},
				],
			},
		],
	},
];

// Campos para mover card
const moveCardFields: INodeProperties[] = [
	{
		displayName: 'ID do Card',
		name: 'cardId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID do card a ser movido',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['move'],
			},
		},
	},
	{
		displayName: 'ID da Fase de Destino',
		name: 'destinationPhaseId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID da fase para onde o card será movido',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['move'],
			},
		},
	},
];

// Campos para exclusão de card
const deleteCardFields: INodeProperties[] = [
	{
		displayName: 'ID do Card',
		name: 'cardId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID do card a ser excluído',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['delete'],
			},
		},
	},
];

// Adicionar operações de cards ao nó
export const cardOperations: INodeProperties[] = [
	// Substituir as opções de operação quando resource=card
	{
		...({} as INodeProperties),
		displayName: 'Operação',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['card'],
			},
		},
		options: cardOperationOptions,
		default: 'get',
	},
	// Adicionar todos os campos específicos para cada operação
	...getCardFields,
	...createCardFields,
	...updateCardFields,
	...moveCardFields,
	...deleteCardFields,
]; 