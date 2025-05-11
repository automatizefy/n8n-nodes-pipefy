import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeApiError,
	NodeConnectionType,
} from 'n8n-workflow';
import { pipefy } from './PipefyAPI';
import { pipefyNodeProperties } from './properties';

export class Pipefy implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Pipefy',
		name: 'pipefy',
		icon: 'file:pipefy.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Interagir com a API do Pipefy',
		defaults: {
			name: 'Pipefy',
		},
		inputs: [{ type: NodeConnectionType.Main }],
		outputs: [{ type: NodeConnectionType.Main }],
		credentials: [
			{
				name: 'pipefy',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.pipefy.com/graphql',
			url: '',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		// Estrutura de propriedades do nó:
		// • Resources: Recursos disponíveis (Pipes, Cards, Organizations, etc)
		// • Operations: Operações de cada recurso (Ex: Criar card, Consultar pipe, etc)
		// • Fields: Campos específicos de cada operação
		properties: pipefyNodeProperties,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		// Executa a função de API correspondente ao resource e operation
		try {
			const result = await pipefy.execute(this, resource, operation);
			return [this.helpers.returnJsonArray(result)];
		} catch (error) {
			if (error.response) {
				const errorData = error.response.data;
				throw new NodeApiError(this.getNode(), errorData, {
					message: errorData.errors ? errorData.errors[0].message : 'Erro na API do Pipefy',
					description: 'Verifique os parâmetros e credenciais',
					httpCode: error.response.status,
				});
			}
			throw error;
		}
	}
} 