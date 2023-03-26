const Redis = require('ioredis');

class RedisService {
  constructor() {
    // Create three Redis clients for subscriber, publisher, and storage.
    this.subscriber = new Redis()
    this.publisher = new Redis()
    this.storage = new Redis()
  }


  getStorageClient() {
    return this.storage;
  }

  getSubscriber () {
    return this.subscriber;
  }

  getPublisher () {
    return this.publisher;
  }
  
  async subscribeToChannel(channel, callback) {
    await this.subscriber.subscribe(channel);
    this.subscriber.on('message', (subscribedChannel, message) => {
        if (subscribedChannel === channel) {
            callback(message);
        }
    });
  } 
}

module.exports = new RedisService();
