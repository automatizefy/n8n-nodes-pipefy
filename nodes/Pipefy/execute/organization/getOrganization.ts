import { IExecuteFunctions } from 'n8n-workflow';
import { pipefy } from '../../PipefyApi';

/**
 * Obtém detalhes de uma organização no Pipefy
 */
export async function getOrganization(this: IExecuteFunctions) {
    const organizationId = this.getNodeParameter('organizationId', 0) as string;
    const options = this.getNodeParameter('options', 0, {}) as {
        includePipes?: boolean,
        includeMembers?: boolean,
        includeTables?: boolean,
    };
    
    // Construir campos da consulta com base nas opções
    let pipesQuery = '';
    let membersQuery = '';
    let tablesQuery = '';
    
    if (options.includePipes) {
        pipesQuery = `
            pipes(first: 20) {
                edges {
                    node {
                        id
                        name
                        description
                        created_at
                        updated_at
                    }
                }
            }
        `;
    }
    
    if (options.includeMembers) {
        membersQuery = `
            members(first: 20) {
                edges {
                    node {
                        user {
                            id
                            name
                            email
                            username
                        }
                        role
                    }
                }
            }
        `;
    }
    
    if (options.includeTables) {
        tablesQuery = `
            tables(first: 20) {
                edges {
                    node {
                        id
                        name
                        description
                    }
                }
            }
        `;
    }
    
    const query = `
        query GetOrganization($id: ID!) {
            organization(id: $id) {
                id
                name
                created_at
                updated_at
                ${pipesQuery}
                ${membersQuery}
                ${tablesQuery}
            }
        }
    `;
    
    const variables = {
        id: organizationId,
    };
    
    const response = await pipefy.graphqlRequest(this, query, variables);
    
    return response.organization;
}