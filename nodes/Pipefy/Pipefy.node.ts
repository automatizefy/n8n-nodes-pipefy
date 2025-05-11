import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeApiError,
	NodeConnectionType,
} from 'n8n-workflow';
import { pipefy } from './PipefyApi';
import { pipefyNodeProperties } from './properties';

export class Pipefy implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Pipefy',
		name: 'pipefy',
		icon: 'file:pipefy.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Integração com a API do Pipefy',
		defaults: {
			name: 'Pipefy',
		},
		inputs: [{ type: NodeConnectionType.Main }],
		outputs: [{ type: NodeConnectionType.Main }],
		credentials: [
			{
				name: 'pipefyApi',
				required: true,
			},
		],
		properties: pipefyNodeProperties,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		try {
			const resource = this.getNodeParameter('resource', 0) as string;
			const operation = this.getNodeParameter('operation', 0) as string;

			return await pipefy.execute(this, resource, operation);
		} catch (error) {
			if (error.name === 'GraphQLError' || error.constructor?.name === 'GraphQLError') {
				console.error('GraphQL Error:', error);
				throw new NodeApiError(this.getNode(), { error: error.message, statusCode: 400 });
			}
			throw error;
		}
	}
} 