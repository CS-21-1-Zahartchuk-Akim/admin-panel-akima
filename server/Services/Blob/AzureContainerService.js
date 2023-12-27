import AzureStorageBlob from '@azure/storage-blob';

const connectionString = 'AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;DefaultEndpointsProtocol=http;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;QueueEndpoint=http://127.0.0.1:10001/devstoreaccount1;TableEndpoint=http://127.0.0.1:10002/devstoreaccount1;'

export const createContainerIfNotExists = async (containerName, accessLevel="container") => {
    const blobClient = AzureStorageBlob.BlobServiceClient.fromConnectionString(connectionString);

    const containerClient = blobClient.getContainerClient(containerName);

    await containerClient.createIfNotExists({access: accessLevel});
}

export const deleteContainer = async (name) => {
    const blobClient = AzureStorageBlob.BlobServiceClient.fromConnectionString(connectionString);

    const containerName = name;
    const containerClient = blobClient.getContainerClient(containerName);
    const createContainerResponse = await containerClient.delete();
}