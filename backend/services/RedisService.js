const Redis = require('ioredis');

class RedisService {
  constructor() {
    // Create three Redis clients for subscriber, publisher, and storage.
    this.subscriber = new Redis('redis://redis:6379')
    this.publisher = new Redis('redis://redis:6379')
    this.storage = new Redis('redis://redis:6379')
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
