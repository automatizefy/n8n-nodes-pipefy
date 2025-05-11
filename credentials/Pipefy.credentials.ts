import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class Pipefy implements ICredentialType {
	name = 'pipefy';
	displayName = 'Pipefy API';
	documentationUrl = 'https://developers.pipefy.com/reference/graphql-api';
	properties: INodeProperties[] = [
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			default: '',
			typeOptions: {
				password: true,
			},
			description: 'Token de acesso à API do Pipefy. Pode ser gerado em Perfil > API',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiToken}}',
			},
		},
	};
} 