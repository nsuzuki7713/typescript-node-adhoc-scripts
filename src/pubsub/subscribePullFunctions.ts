import { PubSub } from '@google-cloud/pubsub';

const pubSubClient = new PubSub({ projectId: 'firebase-tutorial-suzuki', keyFilename: './src/cloudLogging/key.json' });
const subscriptionName = 'subscription-pull-test';
const timeout = 300;

function listenForMessages() {
  const subscription = pubSubClient.subscription(subscriptionName);

  let messageCount = 0;
  const messageHandler = (message: any) => {
    console.log(`Received message :`, message.id);
    console.log(`Data: `, message.data.toString());
    console.log(`Attributes:`, message.attributes);
    messageCount += 1;

    message.ack();
  };

  subscription.on('message', messageHandler);

  setTimeout(() => {
    subscription.removeListener('message', messageHandler);
    console.log(`${messageCount} message(s) received.`);
  }, timeout * 1000);
}

listenForMessages();
