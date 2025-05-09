import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class Pipefy implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Pipefy',
		name: 'pipefy',
		icon: 'file:pipefy.svg',
		group: ['transform'],
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
						name: 'Pipe',
						value: 'pipe',
					},
					{
						name: 'Phase',
						value: 'phase',
					},
				],
				default: 'card',
			},
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
				],
				default: 'create',
			},
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
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'card') {
					if (operation === 'create') {
						const pipeId = this.getNodeParameter('pipeId', i) as string;
						const phaseId = this.getNodeParameter('phaseId', i) as string;
						const title = this.getNodeParameter('title', i) as string;

						const query = `
							mutation {
								createCard(input: {
									pipe_id: ${pipeId},
									phase_id: ${phaseId},
									title: "${title}"
								}) {
									card {
										id
										title
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
} 