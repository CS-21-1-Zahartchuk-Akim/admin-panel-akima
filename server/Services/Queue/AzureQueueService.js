import AzureStorageQueue from '@azure/storage-queue';

const connectionString = 'AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;DefaultEndpointsProtocol=http;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;QueueEndpoint=http://127.0.0.1:10001/devstoreaccount1;TableEndpoint=http://127.0.0.1:10002/devstoreaccount1;'

export const send = async (entityData) => {
    console.log(entityData);
    const queueServiceClient = AzureStorageQueue.QueueServiceClient.fromConnectionString(connectionString);
    const queueName = 'convert-messages';
    const queueClient = queueServiceClient.getQueueClient(queueName);
    const sendMessageResponse = await queueClient.sendMessage(JSON.stringify(entityData));
    console.log(
        `Sent message successfully, service assigned message Id: ${sendMessageResponse.messageId}, service assigned request Id: ${sendMessageResponse.requestId}`
      );
}