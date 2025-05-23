import { IExecuteFunctions } from 'n8n-workflow';

// Funções para executar as operações do Pipefy via API GraphQL
// Este arquivo centraliza a exportação das funções de cada recurso

// Operações de pipe
import { getPipe } from './pipe/getPipe';
import { createPipe } from './pipe/createPipe';
import { updatePipe } from './pipe/updatePipe';
import { deletePipe } from './pipe/deletePipe';

// Operações de card
import { getCard } from './card/getCard';
import { createCard } from './card/createCard';
import { updateCard } from './card/updateCard';
import { moveCard } from './card/moveCard';
import { deleteCard } from './card/deleteCard';

// Operações de webhook
import { listWebhooks } from './webhook/listWebhooks';
import { createWebhook } from './webhook/createWebhook';
import { updateWebhook } from './webhook/updateWebhook';
import { deleteWebhook } from './webhook/deleteWebhook';

// Operações de organization
import { getOrganization } from './organization/getOrganization';
import { listOrganizations } from './organization/listOrganizations';

// Dicionário que mapeia recursos e operações para funções
type ResourceOperationFunctions = {
	[resource: string]: {
		[operation: string]: (ef: IExecuteFunctions) => Promise<any>;
	};
};

// Configuração das funções disponíveis por recurso e operação
export const resourceOperationFunctions: ResourceOperationFunctions = {
	pipe: {
		consultar: getPipe,
		criar: createPipe,
		atualizar: updatePipe,
		excluir: deletePipe,
	},
	card: {
		consultar: getCard,
		criar: createCard,
		atualizar: updateCard,
		mover: moveCard,
		excluir: deleteCard,
	},
	webhook: {
		listar: listWebhooks,
		criar: createWebhook,
		atualizar: updateWebhook,
		excluir: deleteWebhook,
	},
	organization: {
		consultar: getOrganization,
		listar: listOrganizations,
	},
}; 