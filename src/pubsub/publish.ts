import { PubSub } from '@google-cloud/pubsub';

const pubSubClient = new PubSub({ projectId: 'firebase-tutorial-suzuki', keyFilename: './src/cloudLogging/key.json' });
const topicName = 'topic-test';

async function publishMessageWithCustomAttributes() {
  for (let i = 0; i < 10; i++) {
    const dataBuffer = Buffer.from(JSON.stringify({ data: `message${i}` }));

    const customAttributes = {
      origin: 'nodejs-sample',
      username: 'gcp',
    };

    const messageId = await pubSubClient.topic(topicName).publish(dataBuffer, customAttributes);
    console.log(`Message ${messageId} published.`);
  }
}

publishMessageWithCustomAttributes().catch(console.error);
