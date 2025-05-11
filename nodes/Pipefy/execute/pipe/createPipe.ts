import { IExecuteFunctions } from 'n8n-workflow';
import { pipefy } from '../../PipefyApi';

/**
 * Cria um novo pipe no Pipefy
 */
export async function createPipe(this: IExecuteFunctions) {
    const organizationId = this.getNodeParameter('organizationId', 0) as string;
    const name = this.getNodeParameter('name', 0) as string;
    const description = this.getNodeParameter('description', 0, '') as string;
    const icon = this.getNodeParameter('icon', 0, '') as string;
    
    const variables = {
        organizationId,
        name,
        description,
        icon: icon || undefined,
    };
    
    const query = `
        mutation CreatePipe($organizationId: ID!, $name: String!, $description: String, $icon: String) {
            createPipe(input: {
                organizationId: $organizationId,
                name: $name,
                description: $description,
                icon: $icon
            }) {
                pipe {
                    id
                    name
                    description
                    icon
                    created_at
                    updated_at
                }
            }
        }
    `;
    
    const response = await pipefy.graphqlRequest(this, query, variables);
    
    return response.createPipe.pipe;
} 