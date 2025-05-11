import { IExecuteFunctions } from 'n8n-workflow';
import { pipefy } from '../../PipefyApi';

/**
 * Lista organizações do usuário no Pipefy
 */
export async function listOrganizations(this: IExecuteFunctions) {
    const options = this.getNodeParameter('options', 0, {}) as {
        first?: number,
    };
    
    const first = options.first || 20;
    
    const variables = {
        first,
    };
    
    const query = `
        query ListOrganizations($first: Int!) {
            organizations(first: $first) {
                edges {
                    node {
                        id
                        name
                        created_at
                        updated_at
                    }
                }
            }
        }
    `;
    
    const response = await pipefy.graphqlRequest(this, query, variables);
    
    return response.organizations.edges.map((edge: { node: any }) => edge.node);
}