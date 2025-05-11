import { INodeProperties } from 'n8n-workflow';

// Operações disponíveis para o recurso organization
const organizationOperationOptions = [
	{
		name: 'Consultar Organização',
		value: 'consultar',
		description: 'Obter detalhes de uma organização específica',
		action: 'Consultar uma organização',
	},
	{
		name: 'Listar Organizações',
		value: 'listar',
		description: 'Listar as organizações a que o usuário tem acesso',
		action: 'Listar organizações',
	},
];

// Campos para consulta de organização
const getOrganizationFields: INodeProperties[] = [
	{
		displayName: 'ID da Organização',
		name: 'organizationId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID da organização a ser consultada',
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['consultar'],
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
				resource: ['organization'],
				operation: ['consultar'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Incluir Pipes',
				name: 'includePipes',
				type: 'boolean',
				default: false,
				description: 'Se deve incluir os pipes da organização no resultado',
			},
			{
				displayName: 'Incluir Membros',
				name: 'includeMembers',
				type: 'boolean',
				default: false,
				description: 'Se deve incluir os membros da organização no resultado',
			},
			{
				displayName: 'Incluir Tabelas',
				name: 'includeTables',
				type: 'boolean',
				default: false,
				description: 'Se deve incluir as tabelas da organização no resultado',
			},
		],
	},
];

// Campos para listar organizações
const listOrganizationsFields: INodeProperties[] = [
	{
		displayName: 'Opções',
		name: 'options',
		type: 'collection',
		placeholder: 'Adicionar Opção',
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['listar'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Limite',
				name: 'limit',
				type: 'number',
				default: 10,
				description: 'Número máximo de organizações a retornar',
			},
		],
	},
];

// Adicionar operações de organizações ao nó
export const organizationOperations: INodeProperties[] = [
	// Substituir as opções de operação quando resource=organization
	{
		...({} as INodeProperties),
		displayName: 'Operação',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['organization'],
			},
		},
		options: organizationOperationOptions,
		default: 'listar',
	},
	// Adicionar todos os campos específicos para cada operação
	...getOrganizationFields,
	...listOrganizationsFields,
]; 