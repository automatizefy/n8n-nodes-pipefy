import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
} from 'n8n-workflow';

export class Pipefy implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Pipefy',
		name: 'pipefy',
		icon: 'file:pipefy.svg',
		group: ['transform', 'action'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Pipefy API',
		defaults: {
			name: 'Pipefy',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'pipefyApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		requestDefaults: {
			baseURL: 'https://api.pipefy.com/graphql',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Card',
						value: 'card',
					},
					{
						name: 'Organization',
						value: 'organization',
					},
					{
						name: 'Pipe',
						value: 'pipe',
					},
					{
						name: 'Phase',
						value: 'phase',
					},
					{
						name: 'Table',
						value: 'table',
					},
					{
						name: 'Table Record',
						value: 'tableRecord',
					},
					{
						name: 'User',
						value: 'user',
					},
					{
						name: 'Webhook',
						value: 'webhook',
					},
				],
				default: 'card',
			},
			// Organization Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['organization'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new organization',
						action: 'Create an organization',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get organization details',
						action: 'Get an organization',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update an organization',
						action: 'Update an organization',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete an organization',
						action: 'Delete an organization',
					},
				],
				default: 'get',
			},
			// User Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['user'],
					},
				},
				options: [
					{
						name: 'Get Me',
						value: 'getMe',
						description: 'Get current user information',
						action: 'Get current user information',
					},
					{
						name: 'Invite',
						value: 'invite',
						description: 'Invite users to organization',
						action: 'Invite users to organization',
					},
					{
						name: 'Remove',
						value: 'remove',
						description: 'Remove user from organization',
						action: 'Remove user from organization',
					},
					{
						name: 'Set Role',
						value: 'setRole',
						description: 'Set user role in organization',
						action: 'Set user role in organization',
					},
				],
				default: 'getMe',
			},
			// Card Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['card'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new card',
						action: 'Create a card',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a card by ID',
						action: 'Get a card',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a card',
						action: 'Update a card',
					},
					{
						name: 'Move',
						value: 'move',
						description: 'Move card to another phase',
						action: 'Move a card',
					},
					{
						name: 'Add Comment',
						value: 'addComment',
						description: 'Add a comment to a card',
						action: 'Add a comment to a card',
					},
					{
						name: 'Upload Attachment',
						value: 'uploadAttachment',
						description: 'Upload an attachment to a card',
						action: 'Upload an attachment to a card',
					},
				],
				default: 'create',
			},
			// Pipe Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['pipe'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new pipe',
						action: 'Create a pipe',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a pipe',
						action: 'Delete a pipe',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a pipe by ID',
						action: 'Get a pipe',
					},
					{
						name: 'List',
						value: 'list',
						description: 'List all pipes',
						action: 'List pipes',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a pipe',
						action: 'Update a pipe',
					},
				],
				default: 'list',
			},
			// Phase Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['phase'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new phase',
						action: 'Create a phase',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a phase',
						action: 'Delete a phase',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a phase by ID',
						action: 'Get a phase',
					},
					{
						name: 'List',
						value: 'list',
						description: 'List all phases in a pipe',
						action: 'List phases',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a phase',
						action: 'Update a phase',
					},
				],
				default: 'list',
			},
			// Webhook Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['webhook'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a webhook',
						action: 'Create a webhook',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a webhook',
						action: 'Delete a webhook',
					},
				],
				default: 'create',
			},
			// Card Fields
			{
				displayName: 'Card ID',
				name: 'cardId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['card'],
						operation: ['get', 'update'],
					},
				},
				default: '',
				description: 'The ID of the card',
			},
			{
				displayName: 'Pipe ID',
				name: 'pipeId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['card'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'The ID of the pipe where the card will be created',
			},
			{
				displayName: 'Phase ID',
				name: 'phaseId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['card'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'The ID of the phase where the card will be created',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['card'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'The title of the card',
			},
			{
				displayName: 'Fields',
				name: 'fields',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						resource: ['card'],
						operation: ['create', 'update'],
					},
				},
				default: {},
				options: [
					{
						name: 'field',
						displayName: 'Field',
						values: [
							{
								displayName: 'Field ID',
								name: 'field_id',
								type: 'string',
								default: '',
								required: true,
								description: 'The ID of the field',
							},
							{
								displayName: 'Field Type',
								name: 'type',
								type: 'options',
								options: [
									{
										name: 'Assignee',
										value: 'assignee',
									},
									{
										name: 'Attachment',
										value: 'attachment',
									},
									{
										name: 'Checklist',
										value: 'checklist',
									},
									{
										name: 'Cnpj',
										value: 'cnpj',
									},
									{
										name: 'Connection',
										value: 'connection',
									},
									{
										name: 'Currency',
										value: 'currency',
									},
									{
										name: 'Date',
										value: 'date',
									},
									{
										name: 'DateTime',
										value: 'datetime',
									},
									{
										name: 'Due Date',
										value: 'due_date',
									},
									{
										name: 'Email',
										value: 'email',
									},
									{
										name: 'ID',
										value: 'id',
									},
									{
										name: 'Label',
										value: 'label',
									},
									{
										name: 'Long Text',
										value: 'long_text',
									},
									{
										name: 'Number',
										value: 'number',
									},
									{
										name: 'Phone',
										value: 'phone',
									},
									{
										name: 'Radio',
										value: 'radio',
									},
									{
										name: 'Select',
										value: 'select',
									},
									{
										name: 'Short Text',
										value: 'short_text',
									},
									{
										name: 'Statement',
										value: 'statement',
									},
									{
										name: 'Time',
										value: 'time',
									},
								],
								default: 'short_text',
								description: 'The type of the field',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'The value of the field',
							},
							{
								displayName: 'Array Values',
								name: 'array_value',
								type: 'string',
								default: '',
								displayOptions: {
									show: {
										type: ['checklist', 'label'],
									},
								},
								description: 'Comma-separated values for checklist or label fields',
							},
							{
								displayName: 'Attachments',
								name: 'attachments',
								type: 'fixedCollection',
								typeOptions: {
									multipleValues: true,
								},
								displayOptions: {
									show: {
										type: ['attachment'],
									},
								},
								default: {},
								options: [
									{
										name: 'attachment',
										displayName: 'Attachment',
										values: [
											{
												displayName: 'URL',
												name: 'url',
												type: 'string',
												default: '',
												required: true,
												description: 'The URL of the attachment',
											},
											{
												displayName: 'Filename',
												name: 'filename',
												type: 'string',
												default: '',
												required: true,
												description: 'The name of the file',
											},
										],
									},
								],
							},
						],
					},
				],
				description: 'The fields to set on the card',
			},
			// Pipe Fields
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['pipe'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'The name of the pipe',
			},
			{
				displayName: 'Pipe ID',
				name: 'pipeId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['pipe'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				description: 'The ID of the pipe',
			},
			{
				displayName: 'Organization ID',
				name: 'organizationId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['pipe'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'The ID of the organization where the pipe will be created',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				required: false,
				displayOptions: {
					show: {
						resource: ['pipe'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'The description of the pipe',
			},
			// Phase Fields
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['phase'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'The name of the phase',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				required: false,
				displayOptions: {
					show: {
						resource: ['phase'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'The description of the phase',
			},
			{
				displayName: 'Pipe ID',
				name: 'pipeId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['phase'],
						operation: ['create', 'list'],
					},
				},
				default: '',
				description: 'The ID of the pipe',
			},
			{
				displayName: 'Phase ID',
				name: 'phaseId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['phase'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				description: 'The ID of the phase',
			},
			{
				displayName: 'Can Receive Card',
				name: 'canReceiveCard',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['phase'],
						operation: ['create', 'update'],
					},
				},
				default: true,
				description: 'Whether cards can be moved to this phase',
			},
			{
				displayName: 'Can Create Card',
				name: 'canCreateCard',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['phase'],
						operation: ['create', 'update'],
					},
				},
				default: true,
				description: 'Whether cards can be created in this phase',
			},
			{
				displayName: 'Done',
				name: 'done',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['phase'],
						operation: ['create', 'update'],
					},
				},
				default: false,
				description: 'Whether this is a done phase',
			},
			{
				displayName: 'Fields',
				name: 'fields',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						resource: ['phase'],
						operation: ['create', 'update'],
					},
				},
				default: {},
				options: [
					{
						name: 'field',
						displayName: 'Field',
						values: [
							{
								displayName: 'Label',
								name: 'label',
								type: 'string',
								default: '',
								required: true,
								description: 'The label of the field',
							},
							{
								displayName: 'Type',
								name: 'type',
								type: 'options',
								options: [
									{
										name: 'Assignee',
										value: 'assignee',
									},
									{
										name: 'Attachment',
										value: 'attachment',
									},
									{
										name: 'Checklist',
										value: 'checklist',
									},
									{
										name: 'Cnpj',
										value: 'cnpj',
									},
									{
										name: 'Connection',
										value: 'connection',
									},
									{
										name: 'Currency',
										value: 'currency',
									},
									{
										name: 'Date',
										value: 'date',
									},
									{
										name: 'DateTime',
										value: 'datetime',
									},
									{
										name: 'Due Date',
										value: 'due_date',
									},
									{
										name: 'Email',
										value: 'email',
									},
									{
										name: 'ID',
										value: 'id',
									},
									{
										name: 'Label',
										value: 'label',
									},
									{
										name: 'Long Text',
										value: 'long_text',
									},
									{
										name: 'Number',
										value: 'number',
									},
									{
										name: 'Phone',
										value: 'phone',
									},
									{
										name: 'Radio',
										value: 'radio',
									},
									{
										name: 'Select',
										value: 'select',
									},
									{
										name: 'Short Text',
										value: 'short_text',
									},
									{
										name: 'Statement',
										value: 'statement',
									},
									{
										name: 'Time',
										value: 'time',
									},
								],
								default: 'short_text',
								description: 'The type of the field',
							},
							{
								displayName: 'Required',
								name: 'required',
								type: 'boolean',
								default: false,
								description: 'Whether the field is required',
							},
							{
								displayName: 'Help Text',
								name: 'help',
								type: 'string',
								default: '',
								description: 'Help text for the field',
							},
							{
								displayName: 'Description',
								name: 'description',
								type: 'string',
								default: '',
								description: 'Description of the field',
							},
							{
								displayName: 'Options',
								name: 'options',
								type: 'fixedCollection',
								typeOptions: {
									multipleValues: true,
								},
								displayOptions: {
									show: {
										type: ['select', 'radio'],
									},
								},
								default: {},
								options: [
									{
										name: 'option',
										displayName: 'Option',
										values: [
											{
												displayName: 'Name',
												name: 'name',
												type: 'string',
												default: '',
												description: 'The name of the option',
											},
										],
									},
								],
								description: 'The options for select and radio fields',
							},
						],
					},
				],
				description: 'The fields for the phase',
			},
			// Webhook Fields
			{
				displayName: 'Pipe ID',
				name: 'pipeId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['webhook'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'The ID of the pipe to create webhook for',
			},
			{
				displayName: 'Webhook URL',
				name: 'webhookUrl',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['webhook'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'The URL to send webhook events to',
			},
			{
				displayName: 'Webhook ID',
				name: 'webhookId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['webhook'],
						operation: ['delete'],
					},
				},
				default: '',
				description: 'The ID of the webhook to delete',
			},
			// Organization Fields
			{
				displayName: 'Organization ID',
				name: 'organizationId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['organization'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				description: 'The ID of the organization',
			},
			{
				displayName: 'Organization Name',
				name: 'organizationName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['organization'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'The name of the organization',
			},
			{
				displayName: 'Industry',
				name: 'industry',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['organization'],
						operation: ['create'],
					},
				},
				options: [
					{ name: 'Construction', value: 'construction' },
					{ name: 'Consulting', value: 'consulting' },
					{ name: 'Education', value: 'education' },
					{ name: 'Energy', value: 'energy' },
					{ name: 'Financial Services', value: 'financial_services' },
					{ name: 'Health', value: 'health' },
					{ name: 'Legal Services', value: 'legal_services' },
					{ name: 'Manufacturing', value: 'manufacturing' },
					{ name: 'Marketing', value: 'marketing' },
					{ name: 'Non-Profit Organization', value: 'non_profit_organization' },
					{ name: 'Public Sector', value: 'public_sector' },
					{ name: 'Retail', value: 'retail' },
					{ name: 'Tourism', value: 'tourism' },
					{ name: 'Technology', value: 'technology' },
					{ name: 'Telecommunications', value: 'telecommunications' },
					{ name: 'Transportation', value: 'transportation' },
					{ name: 'Others', value: 'others' },
				],
				default: 'others',
				description: 'The industry of the organization',
			},
			// User Fields
			{
				displayName: 'Organization ID',
				name: 'organizationId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['invite', 'remove', 'setRole'],
					},
				},
				default: '',
				description: 'The ID of the organization',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['invite', 'remove'],
					},
				},
				default: '',
				description: 'The email of the user',
			},
			{
				displayName: 'Role',
				name: 'role',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['invite', 'setRole'],
					},
				},
				options: [
					{ name: 'Admin', value: 'admin' },
					{ name: 'Member', value: 'member' },
					{ name: 'Guest', value: 'guest' },
				],
				default: 'member',
				description: 'The role to assign to the user',
			},
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['setRole'],
					},
				},
				default: '',
				description: 'The ID of the user',
			},
			// Additional Card Fields
			{
				displayName: 'Target Phase ID',
				name: 'targetPhaseId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['card'],
						operation: ['move'],
					},
				},
				default: '',
				description: 'The ID of the phase to move the card to',
			},
			{
				displayName: 'Comment',
				name: 'comment',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['card'],
						operation: ['addComment'],
					},
				},
				default: '',
				description: 'The comment text to add to the card',
			},
			{
				displayName: 'File',
				name: 'file',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['card'],
						operation: ['uploadAttachment'],
					},
				},
				default: '',
				description: 'The file to upload as an attachment',
			},
			// Table Fields
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['table'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new table',
						action: 'Create a table',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get table details',
						action: 'Get a table',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a table',
						action: 'Update a table',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a table',
						action: 'Delete a table',
					},
				],
				default: 'get',
			},
			{
				displayName: 'Table ID',
				name: 'tableId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['table'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				description: 'The ID of the table',
			},
			{
				displayName: 'Organization ID',
				name: 'organizationId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['table'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'The ID of the organization where the table will be created',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['table'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'The name of the table',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				required: false,
				displayOptions: {
					show: {
						resource: ['table'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'The description of the table',
			},
			{
				displayName: 'Fields',
				name: 'fields',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						resource: ['table'],
						operation: ['create'],
					},
				},
				default: {},
				options: [
					{
						name: 'field',
						displayName: 'Field',
						values: [
							{
								displayName: 'Label',
								name: 'label',
								type: 'string',
								default: '',
								required: true,
								description: 'The label of the field',
							},
							{
								displayName: 'Type',
								name: 'type',
								type: 'options',
								options: [
									{
										name: 'Assignee',
										value: 'assignee',
									},
									{
										name: 'Attachment',
										value: 'attachment',
									},
									{
										name: 'Checklist',
										value: 'checklist',
									},
									{
										name: 'Cnpj',
										value: 'cnpj',
									},
									{
										name: 'Connection',
										value: 'connection',
									},
									{
										name: 'Currency',
										value: 'currency',
									},
									{
										name: 'Date',
										value: 'date',
									},
									{
										name: 'DateTime',
										value: 'datetime',
									},
									{
										name: 'Due Date',
										value: 'due_date',
									},
									{
										name: 'Email',
										value: 'email',
									},
									{
										name: 'ID',
										value: 'id',
									},
									{
										name: 'Label',
										value: 'label',
									},
									{
										name: 'Long Text',
										value: 'long_text',
									},
									{
										name: 'Number',
										value: 'number',
									},
									{
										name: 'Phone',
										value: 'phone',
									},
									{
										name: 'Radio',
										value: 'radio',
									},
									{
										name: 'Select',
										value: 'select',
									},
									{
										name: 'Short Text',
										value: 'short_text',
									},
									{
										name: 'Statement',
										value: 'statement',
									},
									{
										name: 'Time',
										value: 'time',
									},
								],
								default: 'short_text',
								description: 'The type of the field',
							},
							{
								displayName: 'Required',
								name: 'required',
								type: 'boolean',
								default: false,
								description: 'Whether the field is required',
							},
							{
								displayName: 'Help Text',
								name: 'help',
								type: 'string',
								default: '',
								description: 'Help text for the field',
							},
							{
								displayName: 'Description',
								name: 'description',
								type: 'string',
								default: '',
								description: 'Description of the field',
							},
						],
					},
				],
				description: 'The fields to create in the table',
			},
			// Table Record Fields
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['tableRecord'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new table record',
						action: 'Create a table record',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get table record details',
						action: 'Get a table record',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a table record',
						action: 'Update a table record',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a table record',
						action: 'Delete a table record',
					},
				],
				default: 'get',
			},
			{
				displayName: 'Table ID',
				name: 'tableId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['tableRecord'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'The ID of the table',
			},
			{
				displayName: 'Record ID',
				name: 'recordId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['tableRecord'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				description: 'The ID of the record',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['tableRecord'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'The title of the record',
			},
			{
				displayName: 'Fields',
				name: 'fields',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						resource: ['tableRecord'],
						operation: ['create', 'update'],
					},
				},
				default: {},
				options: [
					{
						name: 'field',
						displayName: 'Field',
						values: [
							{
								displayName: 'Field ID',
								name: 'field_id',
								type: 'string',
								default: '',
								required: true,
								description: 'The ID of the field',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'The value of the field',
							},
							{
								displayName: 'Array Values',
								name: 'array_value',
								type: 'string',
								default: '',
								description: 'Comma-separated values for array fields',
							},
						],
					},
				],
				description: 'The fields to set on the record',
			},
			{
				displayName: 'Start Form Fields',
				name: 'startFormFields',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						resource: ['pipe'],
						operation: ['create', 'update'],
					},
				},
				default: {},
				options: [
					{
						name: 'field',
						displayName: 'Field',
						values: [
							{
								displayName: 'Label',
								name: 'label',
								type: 'string',
								default: '',
								required: true,
								description: 'The label of the field',
							},
							{
								displayName: 'Type',
								name: 'type',
								type: 'options',
								options: [
									{
										name: 'Assignee',
										value: 'assignee',
									},
									{
										name: 'Attachment',
										value: 'attachment',
									},
									{
										name: 'Checklist',
										value: 'checklist',
									},
									{
										name: 'Cnpj',
										value: 'cnpj',
									},
									{
										name: 'Connection',
										value: 'connection',
									},
									{
										name: 'Currency',
										value: 'currency',
									},
									{
										name: 'Date',
										value: 'date',
									},
									{
										name: 'DateTime',
										value: 'datetime',
									},
									{
										name: 'Due Date',
										value: 'due_date',
									},
									{
										name: 'Email',
										value: 'email',
									},
									{
										name: 'ID',
										value: 'id',
									},
									{
										name: 'Label',
										value: 'label',
									},
									{
										name: 'Long Text',
										value: 'long_text',
									},
									{
										name: 'Number',
										value: 'number',
									},
									{
										name: 'Phone',
										value: 'phone',
									},
									{
										name: 'Radio',
										value: 'radio',
									},
									{
										name: 'Select',
										value: 'select',
									},
									{
										name: 'Short Text',
										value: 'short_text',
									},
									{
										name: 'Statement',
										value: 'statement',
									},
									{
										name: 'Time',
										value: 'time',
									},
								],
								default: 'short_text',
								description: 'The type of the field',
							},
							{
								displayName: 'Required',
								name: 'required',
								type: 'boolean',
								default: false,
								description: 'Whether the field is required',
							},
							{
								displayName: 'Help Text',
								name: 'help',
								type: 'string',
								default: '',
								description: 'Help text for the field',
							},
							{
								displayName: 'Description',
								name: 'description',
								type: 'string',
								default: '',
								description: 'Description of the field',
							},
						],
					},
				],
				description: 'The start form fields for the pipe',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'organization') {
					if (operation === 'create') {
						const name = this.getNodeParameter('organizationName', i) as string;
						const industry = this.getNodeParameter('industry', i) as string;

						const query = `
							mutation {
								createOrganization(input: {
									name: "${name}",
									industry: "${industry}"
								}) {
									organization {
										id
										name
										created_at
									}
								}
							}
						`;

						const response = await this.helpers.request({
							method: 'POST',
							body: { query },
						});

						returnData.push({ json: response.data.createOrganization.organization });
					}
					else if (operation === 'get') {
						const organizationId = this.getNodeParameter('organizationId', i) as string;

						const query = `
							query {
								organization(id: ${organizationId}) {
									id
									name
									industry
									members {
										user {
											id
											name
											email
										}
										role_name
									}
									created_at
									updated_at
								}
							}
						`;

						const response = await this.helpers.request({
							method: 'POST',
							body: { query },
						});

						returnData.push({ json: response.data.organization });
					}
					else if (operation === 'update') {
						const organizationId = this.getNodeParameter('organizationId', i) as string;
						const name = this.getNodeParameter('organizationName', i) as string;

						const query = `
							mutation {
								updateOrganization(input: {
									id: ${organizationId},
									name: "${name}"
								}) {
									organization {
										id
										name
										updated_at
									}
								}
							}
						`;

						const response = await this.helpers.request({
							method: 'POST',
							body: { query },
						});

						returnData.push({ json: response.data.updateOrganization.organization });
					}
					else if (operation === 'delete') {
						const organizationId = this.getNodeParameter('organizationId', i) as string;

						const query = `
							mutation {
								deleteOrganization(input: {
									id: ${organizationId}
								}) {
									success
								}
							}
						`;

						const response = await this.helpers.request({
							method: 'POST',
							body: { query },
						});

						returnData.push({ json: response.data.deleteOrganization });
					}
				}
				else if (resource === 'user') {
					if (operation === 'getMe') {
						const query = `
							query {
								me {
									id
									name
									email
									username
									created_at
									updated_at
								}
							}
						`;

						const response = await this.helpers.request({
							method: 'POST',
							body: { query },
						});

						returnData.push({ json: response.data.me });
					}
					else if (operation === 'invite') {
						const organizationId = this.getNodeParameter('organizationId', i) as string;
						const email = this.getNodeParameter('email', i) as string;
						const role = this.getNodeParameter('role', i) as string;

						const query = `
							mutation {
								inviteMembers(input: {
									organization_id: ${organizationId},
									emails: [{
										email: "${email}",
										role_name: "${role}"
									}]
								}) {
									success
								}
							}
						`;

						const response = await this.helpers.request({
							method: 'POST',
							body: { query },
						});

						returnData.push({ json: response.data.inviteMembers });
					}
					else if (operation === 'remove') {
						const organizationId = this.getNodeParameter('organizationId', i) as string;
						const email = this.getNodeParameter('email', i) as string;

						const query = `
							mutation {
								removeUserFromOrg(input: {
									organization_id: ${organizationId},
									email: "${email}"
								}) {
									success
								}
							}
						`;

						const response = await this.helpers.request({
							method: 'POST',
							body: { query },
						});

						returnData.push({ json: response.data.removeUserFromOrg });
					}
					else if (operation === 'setRole') {
						const organizationId = this.getNodeParameter('organizationId', i) as string;
						const userId = this.getNodeParameter('userId', i) as string;
						const role = this.getNodeParameter('role', i) as string;

						const query = `
							mutation {
								setRole(input: {
									member: {
										user_id: "${userId}",
										role_name: "${role}"
									},
									organization_id: ${organizationId}
								}) {
									success
								}
							}
						`;

						const response = await this.helpers.request({
							method: 'POST',
							body: { query },
						});

						returnData.push({ json: response.data.setRole });
					}
				}
				else if (resource === 'card') {
					if (operation === 'create') {
						const pipeId = this.getNodeParameter('pipeId', i) as string;
						const phaseId = this.getNodeParameter('phaseId', i) as string;
						const title = this.getNodeParameter('title', i) as string;
						const fields = this.getNodeParameter('fields', i) as {
							field: Array<{
								field_id: string;
								type: string;
								value: string;
								array_value: string;
								attachments?: {
									attachment: Array<{
										url: string;
										filename: string;
									}>;
								};
							}>;
						};

						const fieldsAttributes = fields.field?.map((field) => {
							const fieldData: any = {
								field_id: field.field_id,
							};

							if (field.type === 'checklist' || field.type === 'label') {
								fieldData.array_value = field.array_value.split(',').map(value => value.trim());
							} else if (field.type === 'attachment' && field.attachments?.attachment) {
								fieldData.attachments = field.attachments.attachment;
							} else {
								fieldData.value = field.value;
							}

							return fieldData;
						});

						const query = `
							mutation {
								createCard(input: {
									pipe_id: ${pipeId},
									phase_id: ${phaseId},
									title: "${title}"
									${fieldsAttributes ? `, fields_attributes: ${JSON.stringify(fieldsAttributes)}` : ''}
								}) {
									card {
										id
										title
										current_phase {
											name
										}
										fields {
											name
											value
											array_value
											field {
												id
												type
											}
										}
										created_at
										updated_at
									}
								}
							}
						`;

						const response = await this.helpers.request({
							method: 'POST',
							body: { query },
						});

						returnData.push({ json: response.data.createCard.card });
					}
					else if (operation === 'get') {
						const cardId = this.getNodeParameter('cardId', i) as string;

						const query = `
							query {
								card(id: ${cardId}) {
									id
									title
									current_phase {
										name
									}
									created_at
									updated_at
								}
							}
						`;

						const response = await this.helpers.request({
							method: 'POST',
							body: { query },
						});

						returnData.push({ json: response.data.card });
					}
					else if (operation === 'update') {
						const cardId = this.getNodeParameter('cardId', i) as string;
						const title = this.getNodeParameter('title', i) as string;
						const fields = this.getNodeParameter('fields', i) as {
							field: Array<{
								field_id: string;
								type: string;
								value: string;
								array_value: string;
								attachments?: {
									attachment: Array<{
										url: string;
										filename: string;
									}>;
								};
							}>;
						};

						const fieldsAttributes = fields.field?.map((field) => {
							const fieldData: any = {
								field_id: field.field_id,
							};

							if (field.type === 'checklist' || field.type === 'label') {
								fieldData.array_value = field.array_value.split(',').map(value => value.trim());
							} else if (field.type === 'attachment' && field.attachments?.attachment) {
								fieldData.attachments = field.attachments.attachment;
							} else {
								fieldData.value = field.value;
							}

							return fieldData;
						});

						const query = `
							mutation {
								updateCard(input: {
									id: ${cardId},
									title: "${title}"
									${fieldsAttributes ? `, fields_attributes: ${JSON.stringify(fieldsAttributes)}` : ''}
								}) {
									card {
										id
										title
										current_phase {
											name
										}
										fields {
											name
											value
											array_value
											field {
												id
												type
											}
										}
										updated_at
									}
								}
							}
						`;

						const response = await this.helpers.request({
							method: 'POST',
							body: { query },
						});

						returnData.push({ json: response.data.updateCard.card });
					}
					else if (operation === 'move') {
						const cardId = this.getNodeParameter('cardId', i) as string;
						const targetPhaseId = this.getNodeParameter('targetPhaseId', i) as string;

						const query = `
							mutation {
								moveCardToPhase(input: {
									card_id: ${cardId},
									destination_phase_id: ${targetPhaseId}
								}) {
									card {
										id
										title
										current_phase {
											name
										}
										updated_at
									}
								}
							}
						`;

						const response = await this.helpers.request({
							method: 'POST',
							body: { query },
						});

						returnData.push({ json: response.data.moveCardToPhase.card });
					}
					else if (operation === 'addComment') {
						const cardId = this.getNodeParameter('cardId', i) as string;
						const comment = this.getNodeParameter('comment', i) as string;

						const query = `
							mutation {
								createComment(input: {
									card_id: ${cardId},
									text: "${comment}"
								}) {
									comment {
										id
										text
										created_at
									}
								}
							}
						`;

						const response = await this.helpers.request({
							method: 'POST',
							body: { query },
						});

						returnData.push({ json: response.data.createComment.comment });
					}
					else if (operation === 'uploadAttachment') {
						const cardId = this.getNodeParameter('cardId', i) as string;
						const file = this.getNodeParameter('file', i) as string;

						// Implementation for file upload will require multipart form data
						// This is a placeholder for the actual implementation
						const query = `
							mutation {
								createAttachment(input: {
									card_id: ${cardId},
									file: "${file}"
								}) {
									attachment {
										id
										filename
										url
										created_at
									}
								}
							}
						`;

						const response = await this.helpers.request({
							method: 'POST',
							body: { query },
						});

						returnData.push({ json: response.data.createAttachment.attachment });
					}
				}
				else if (resource === 'pipe') {
					if (operation === 'get') {
						const pipeId = this.getNodeParameter('pipeId', i) as string;

						const query = `
							query {
								pipe(id: ${pipeId}) {
									id
									name
									description
									phases {
										id
										name
										cards_count
										done
										description
									}
									members {
										user {
											id
											name
											email
										}
										role_name
									}
									labels {
										id
										name
										color
									}
									start_form_fields {
										id
										label
										type
										required
									}
									created_at
									updated_at
								}
							}
						`;

						const response = await this.helpers.request({
							method: 'POST',
							body: { query },
						});

						returnData.push({ json: response.data.pipe });
					}
					else if (operation === 'list') {
						const query = `
							query {
								pipes {
									edges {
										node {
											id
											name
											description
											phases {
												id
												name
												cards_count
												done
											}
											created_at
											updated_at
										}
									}
								}
							}
						`;

						const response = await this.helpers.request({
							method: 'POST',
							body: { query },
						});

						returnData.push({ json: response.data.pipes.edges.map((edge: any) => edge.node) });
					}
					else if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const organizationId = this.getNodeParameter('organizationId', i) as string;

						const query = `
							mutation {
								createPipe(input: {
									name: "${name}",
									organization_id: ${organizationId}
								}) {
									pipe {
										id
										name
										created_at
									}
								}
							}
						`;

						const response = await this.helpers.request({
							method: 'POST',
							body: { query },
						});

						returnData.push({ json: response.data.createPipe.pipe });
					}
					else if (operation === 'update') {
						const pipeId = this.getNodeParameter('pipeId', i) as string;
						const name = this.getNodeParameter('name', i) as string;
						const description = this.getNodeParameter('description', i) as string;

						const query = `
							mutation {
								updatePipe(input: {
									id: ${pipeId},
									name: "${name}",
									description: "${description}"
								}) {
									pipe {
										id
										name
										description
										updated_at
									}
								}
							}
						`;

						const response = await this.helpers.request({
							method: 'POST',
							body: { query },
						});

						returnData.push({ json: response.data.updatePipe.pipe });
					}
					else if (operation === 'delete') {
						const pipeId = this.getNodeParameter('pipeId', i) as string;

						const query = `
							mutation {
								deletePipe(input: {
									id: ${pipeId}
								}) {
									success
								}
							}
						`;

						const response = await this.helpers.request({
							method: 'POST',
							body: { query },
						});

						returnData.push({ json: response.data.deletePipe });
					}
				}
				else if (resource === 'phase') {
					if (operation === 'get') {
						const phaseId = this.getNodeParameter('phaseId', i) as string;

						const query = `
							query {
								phase(id: ${phaseId}) {
									id
									name
									description
									cards_count
									done
									fields {
										id
										label
										type
										required
									}
									cards(first: 100) {
										edges {
											node {
												id
												title
												created_at
											}
										}
									}
									created_at
									updated_at
								}
							}
						`;

						const response = await this.helpers.request({
							method: 'POST',
							body: { query },
						});

						returnData.push({ json: response.data.phase });
					}
					else if (operation === 'list') {
						const pipeId = this.getNodeParameter('pipeId', i) as string;

						const query = `
							query {
								pipe(id: ${pipeId}) {
									phases {
										id
										name
										description
										cards_count
										done
										fields {
											id
											label
											type
										}
										created_at
										updated_at
									}
								}
							}
						`;

						const response = await this.helpers.request({
							method: 'POST',
							body: { query },
						});

						returnData.push({ json: response.data.pipe.phases });
					}
					else if (operation === 'create') {
						const pipeId = this.getNodeParameter('pipeId', i) as string;
						const name = this.getNodeParameter('name', i) as string;
						const description = this.getNodeParameter('description', i) as string;

						const query = `
							mutation {
								createPhase(input: {
									pipe_id: ${pipeId},
									name: "${name}",
									description: "${description}"
								}) {
									phase {
										id
										name
										description
										created_at
									}
								}
							}
						`;

						const response = await this.helpers.request({
							method: 'POST',
							body: { query },
						});

						returnData.push({ json: response.data.createPhase.phase });
					}
					else if (operation === 'update') {
						const phaseId = this.getNodeParameter('phaseId', i) as string;
						const name = this.getNodeParameter('name', i) as string;
						const description = this.getNodeParameter('description', i) as string;

						const query = `
							mutation {
								updatePhase(input: {
									id: ${phaseId},
									name: "${name}",
									description: "${description}"
								}) {
									phase {
										id
										name
										description
										updated_at
									}
								}
							}
						`;

						const response = await this.helpers.request({
							method: 'POST',
							body: { query },
						});

						returnData.push({ json: response.data.updatePhase.phase });
					}
					else if (operation === 'delete') {
						const phaseId = this.getNodeParameter('phaseId', i) as string;

						const query = `
							mutation {
								deletePhase(input: {
									id: ${phaseId}
								}) {
									success
								}
							}
						`;

						const response = await this.helpers.request({
							method: 'POST',
							body: { query },
						});

						returnData.push({ json: response.data.deletePhase });
					}
				}
				else if (resource === 'webhook') {
					if (operation === 'create') {
						const pipeId = this.getNodeParameter('pipeId', i) as string;
						const webhookUrl = this.getNodeParameter('webhookUrl', i) as string;

						const query = `
							mutation {
								createWebhook(input: {
									pipe_id: ${pipeId},
									url: "${webhookUrl}",
									actions: ["card.create", "card.move", "card.done"]
								}) {
									webhook {
										id
										url
										actions
									}
								}
							}
						`;

						const response = await this.helpers.request({
							method: 'POST',
							body: { query },
						});

						returnData.push({ json: response.data.createWebhook.webhook });
					}
					else if (operation === 'delete') {
						const webhookId = this.getNodeParameter('webhookId', i) as string;

						const query = `
							mutation {
								deleteWebhook(input: {
									id: ${webhookId}
								}) {
									success
								}
							}
						`;

						const response = await this.helpers.request({
							method: 'POST',
							body: { query },
						});

						returnData.push({ json: response.data.deleteWebhook });
					}
				}
				else if (resource === 'table') {
					if (operation === 'create') {
						const organizationId = this.getNodeParameter('organizationId', i) as string;
						const name = this.getNodeParameter('name', i) as string;
						const description = this.getNodeParameter('description', i) as string;
						const fields = this.getNodeParameter('fields', i) as {
							field: Array<{
								label: string;
								type: string;
								required: boolean;
								help: string;
								description: string;
							}>;
						};

						const query = `
							mutation {
								createTable(input: {
									organization_id: ${organizationId},
									name: "${name}",
									description: "${description}",
									fields: ${JSON.stringify(fields.field)}
								}) {
									table {
										id
										name
										description
										fields {
											label
											type
											required
											help
											description
										}
									}
								}
							}
						`;

						const response = await this.helpers.request({
							method: 'POST',
							body: { query },
						});

						returnData.push({ json: response.data.createTable.table });
					}
					else if (operation === 'get') {
						const tableId = this.getNodeParameter('tableId', i) as string;

						const query = `
							query {
								table(id: ${tableId}) {
									id
									name
									description
									fields {
										label
										type
										required
										help
										description
									}
								}
							}
						`;

						const response = await this.helpers.request({
							method: 'POST',
							body: { query },
						});

						returnData.push({ json: response.data.table });
					}
					else if (operation === 'update') {
						const tableId = this.getNodeParameter('tableId', i) as string;
						const name = this.getNodeParameter('name', i) as string;
						const description = this.getNodeParameter('description', i) as string;
						const fields = this.getNodeParameter('fields', i) as {
							field: Array<{
								label: string;
								type: string;
								required: boolean;
								help: string;
								description: string;
							}>;
						};

						const query = `
							mutation {
								updateTable(input: {
									id: ${tableId},
									name: "${name}",
									description: "${description}",
									fields: ${JSON.stringify(fields.field)}
								}) {
									table {
										id
										name
										description
										fields {
											label
											type
											required
											help
											description
										}
									}
								}
							}
						`;

						const response = await this.helpers.request({
							method: 'POST',
							body: { query },
						});

						returnData.push({ json: response.data.updateTable.table });
					}
					else if (operation === 'delete') {
						const tableId = this.getNodeParameter('tableId', i) as string;

						const query = `
							mutation {
								deleteTable(input: {
									id: ${tableId}
								}) {
									success
								}
							}
						`;

						const response = await this.helpers.request({
							method: 'POST',
							body: { query },
						});

						returnData.push({ json: response.data.deleteTable });
					}
				}
				else if (resource === 'tableRecord') {
					if (operation === 'create') {
						const tableId = this.getNodeParameter('tableId', i) as string;
						const title = this.getNodeParameter('title', i) as string;
						const fields = this.getNodeParameter('fields', i) as {
							field: Array<{
								field_id: string;
								value: string;
								array_value: string;
							}>;
						};

						const fieldsAttributes = fields.field?.map((field) => {
							const fieldData: any = {
								field_id: field.field_id,
							};

							if (field.array_value) {
								fieldData.array_value = field.array_value.split(',').map(value => value.trim());
							} else {
								fieldData.value = field.value;
							}

							return fieldData;
						});

						const query = `
							mutation {
								createTableRecord(input: {
									table_id: ${tableId},
									title: "${title}",
									fields_attributes: ${JSON.stringify(fieldsAttributes)}
								}) {
									table_record {
										id
										title
										fields {
											name
											value
											array_value
										}
										created_at
									}
								}
							}
						`;

						const response = await this.helpers.request({
							method: 'POST',
							body: { query },
						});

						returnData.push({ json: response.data.createTableRecord.table_record });
					}
					else if (operation === 'get') {
						const recordId = this.getNodeParameter('recordId', i) as string;

						const query = `
							query {
								tableRecord(id: ${recordId}) {
									id
									title
									fields {
										name
										value
										array_value
									}
									created_at
									updated_at
								}
							}
						`;

						const response = await this.helpers.request({
							method: 'POST',
							body: { query },
						});

						returnData.push({ json: response.data.tableRecord });
					}
					else if (operation === 'update') {
						const recordId = this.getNodeParameter('recordId', i) as string;
						const title = this.getNodeParameter('title', i) as string;
						const fields = this.getNodeParameter('fields', i) as {
							field: Array<{
								field_id: string;
								value: string;
								array_value: string;
							}>;
						};

						const fieldsAttributes = fields.field?.map((field) => {
							const fieldData: any = {
								field_id: field.field_id,
							};

							if (field.array_value) {
								fieldData.array_value = field.array_value.split(',').map(value => value.trim());
							} else {
								fieldData.value = field.value;
							}

							return fieldData;
						});

						const query = `
							mutation {
								updateTableRecord(input: {
									id: ${recordId},
									title: "${title}",
									fields_attributes: ${JSON.stringify(fieldsAttributes)}
								}) {
									table_record {
										id
										title
										fields {
											name
											value
											array_value
										}
										updated_at
									}
								}
							}
						`;

						const response = await this.helpers.request({
							method: 'POST',
							body: { query },
						});

						returnData.push({ json: response.data.updateTableRecord.table_record });
					}
					else if (operation === 'delete') {
						const recordId = this.getNodeParameter('recordId', i) as string;

						const query = `
							mutation {
								deleteTableRecord(input: {
									id: ${recordId}
								}) {
									success
								}
							}
						`;

						const response = await this.helpers.request({
							method: 'POST',
							body: { query },
						});

						returnData.push({ json: response.data.deleteTableRecord });
					}
				}
			} catch (error) {
				if (this.continueOnFail()) {
					const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
					returnData.push({ json: { error: errorMessage } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const req = this.getRequestObject();
		const res = this.getResponseObject();
		const webhookData = this.getWorkflowStaticData('node');

		// Verify webhook signature if needed
		// const signature = req.headers['x-pipefy-signature'];
		// if (!this.verifyWebhook(signature)) {
		// 	res.status(401).send('Unauthorized');
		// 	return {};
		// }

		webhookData.lastHeaders = req.headers;
		webhookData.lastBody = req.body;

		return {
			workflowData: [
				this.helpers.returnJsonArray(req.body),
			],
		};
	}
} 