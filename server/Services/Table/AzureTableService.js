import AzureTables from '@azure/data-tables';

const connectionString = 'AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;DefaultEndpointsProtocol=http;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;QueueEndpoint=http://127.0.0.1:10001/devstoreaccount1;TableEndpoint=http://127.0.0.1:10002/devstoreaccount1;'


export const createTableIfNotExists = async (tableName) => {
    const serviceClient = AzureTables.TableServiceClient.fromConnectionString(connectionString, {allowInsecureConnection: true});
    const tablesIter = serviceClient.listTables();
    const tables = [];
    for await (const table of tablesIter) {
        tables.push(table);
    }
    if (!tables.some(table => table.name === tableName))
        await serviceClient.createTable(tableName);
}

export const deleteTable = async (tableName) => {
    const serviceClient = AzureTables.TableServiceClient.fromConnectionString(connectionString, {allowInsecureConnection: true});
    await serviceClient.deleteTable(tableName);
}