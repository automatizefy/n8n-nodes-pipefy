import { INodeProperties } from 'n8n-workflow';

// Operações disponíveis para o recurso pipe
const pipeOperationOptions = [
	{
		name: 'Consultar Pipe',
		value: 'get',
		description: 'Obter detalhes de um pipe específico',
		action: 'Consultar um pipe',
	},
	{
		name: 'Criar Pipe',
		value: 'create',
		description: 'Criar um novo pipe',
		action: 'Criar um pipe',
	},
	{
		name: 'Atualizar Pipe',
		value: 'update',
		description: 'Atualizar um pipe existente',
		action: 'Atualizar um pipe',
	},
	{
		name: 'Excluir Pipe',
		value: 'delete',
		description: 'Excluir um pipe existente',
		action: 'Excluir um pipe',
	},
];

// Campos para operação de consulta
const getPipeFields: INodeProperties[] = [
	{
		displayName: 'ID do Pipe',
		name: 'pipeId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID do pipe a ser consultado',
		displayOptions: {
			show: {
				resource: ['pipe'],
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
				resource: ['pipe'],
				operation: ['get'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Incluir Fases',
				name: 'includePhases',
				type: 'boolean',
				default: true,
				description: 'Se deve incluir fases do pipe no resultado',
			},
			{
				displayName: 'Incluir Cards',
				name: 'includeCards',
				type: 'boolean',
				default: false,
				description: 'Se deve incluir cards do pipe no resultado',
			},
			{
				displayName: 'Incluir Campos',
				name: 'includeFields',
				type: 'boolean',
				default: false,
				description: 'Se deve incluir definições de campos no resultado',
			},
		],
	},
];

// Campos para operação de criação
const createPipeFields: INodeProperties[] = [
	{
		displayName: 'ID da Organização',
		name: 'organizationId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID da organização onde o pipe será criado',
		displayOptions: {
			show: {
				resource: ['pipe'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Nome do Pipe',
		name: 'pipeName',
		type: 'string',
		required: true,
		default: '',
		description: 'Nome do novo pipe',
		displayOptions: {
			show: {
				resource: ['pipe'],
				operation: ['create'],
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
				resource: ['pipe'],
				operation: ['create'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Descrição',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Descrição do pipe',
			},
			{
				displayName: 'Público',
				name: 'isPublic',
				type: 'boolean',
				default: false,
				description: 'Se o pipe será público ou privado',
			},
		],
	},
];

// Campos para operação de atualização
const updatePipeFields: INodeProperties[] = [
	{
		displayName: 'ID do Pipe',
		name: 'pipeId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID do pipe a ser atualizado',
		displayOptions: {
			show: {
				resource: ['pipe'],
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
				resource: ['pipe'],
				operation: ['update'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Nome',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Novo nome do pipe',
			},
			{
				displayName: 'Descrição',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Nova descrição do pipe',
			},
			{
				displayName: 'Público',
				name: 'isPublic',
				type: 'boolean',
				default: false,
				description: 'Se o pipe será público ou privado',
			},
		],
	},
];

// Campos para operação de exclusão
const deletePipeFields: INodeProperties[] = [
	{
		displayName: 'ID do Pipe',
		name: 'pipeId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID do pipe a ser excluído',
		displayOptions: {
			show: {
				resource: ['pipe'],
				operation: ['delete'],
			},
		},
	},
];

// Adicionar operações de pipes ao nó
export const pipeOperations: INodeProperties[] = [
	// Substituir as opções de operação quando resource=pipe
	{
		...({} as INodeProperties),
		displayName: 'Operação',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['pipe'],
			},
		},
		options: pipeOperationOptions,
		default: 'get',
	},
	// Adicionar todos os campos específicos para cada operação
	...getPipeFields,
	...createPipeFields,
	...updatePipeFields,
	...deletePipeFields,
]; 