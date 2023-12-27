import AzureTables from '@azure/data-tables';

const connectionString = 'AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;DefaultEndpointsProtocol=http;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;QueueEndpoint=http://127.0.0.1:10001/devstoreaccount1;TableEndpoint=http://127.0.0.1:10002/devstoreaccount1;'

export const create = async (tableName, partitionKey, rowKey, data) => {
    const tableClient = AzureTables.TableClient.fromConnectionString(connectionString, tableName, {allowInsecureConnection: true});
    await tableClient.createEntity({
        partitionKey,
        rowKey,
        ...data
    });
}

export const getAll = (tableName) => {
    const tableClient = AzureTables.TableClient.fromConnectionString(connectionString, tableName, {allowInsecureConnection: true});
    return tableClient.listEntities();
}

export const getOne = async (tableName, partitionKey, rowKey) => {
    const tableClient = AzureTables.TableClient.fromConnectionString(connectionString, tableName, {allowInsecureConnection: true});
    return await tableClient.getEntity(partitionKey, rowKey);
}

export const update = async (tableName, partitionKey, rowKey, newData, mergeMode=true) => {
    const tableClient = AzureTables.TableClient.fromConnectionString(connectionString, tableName, {allowInsecureConnection: true});
    const entity = {
        partitionKey,
        rowKey,
        ...newData
    };
    await tableClient.updateEntity(entity, mergeMode ? "Merge" : "Replace");
}

export const deleteEntity = async (tableName, partitionKey, rowKey) => {
    const tableClient = AzureTables.TableClient.fromConnectionString(connectionString, tableName, {allowInsecureConnection: true});
    await tableClient.deleteEntity(partitionKey, rowKey);
}