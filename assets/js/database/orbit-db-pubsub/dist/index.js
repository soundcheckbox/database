import require$$0 from '../../p-series/dist/index.js';
import require$$1 from '../../ipfs-pubsub-peer-monitor/dist/index.js';
import require$$2 from '../../logplease/dist/index.js';
import buffer from '../../safe-buffer/dist/index.js';
let Buffer = buffer.Buffer
function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var orbitDbPubsub = {exports: {}};

const pSeries = require$$0;
const PeerMonitor = require$$1;

const Logger = require$$2;
const logger = Logger.create("pubsub", { color: Logger.Colors.Yellow });
Logger.setLogLevel('ERROR');

const maxTopicsOpen = 256;
let topicsOpenCount = 0;

class IPFSPubsub {
  constructor(ipfs, id) {
    this._ipfs = ipfs;
    this._id = id;
    this._subscriptions = {};

    if (this._ipfs.pubsub === null)
      logger.error("The provided version of ipfs doesn't have pubsub support. Messages will not be exchanged.");

    this._handleMessage = this._handleMessage.bind(this);

    // Bump up the number of listeners we can have open,
    // ie. number of databases replicating
    if (this._ipfs.setMaxListeners)
      this._ipfs.setMaxListeners(maxTopicsOpen);
  }

  async subscribe(topic, onMessageCallback, onNewPeerCallback, options = {}) {
    if(!this._subscriptions[topic] && this._ipfs.pubsub) {
      await this._ipfs.pubsub.subscribe(topic, this._handleMessage, options);

      const topicMonitor = new PeerMonitor(this._ipfs.pubsub, topic);

      topicMonitor.on('join', (peer) => {
        console.log(`Peer joined ${topic}:`);
        console.log(peer);
        if (this._subscriptions[topic]) {
          onNewPeerCallback(topic, peer);
        } else {
          console.warn('Peer joined a room we don\'t have a subscription for');
          console.warn(topic, peer);
        }
      });

      topicMonitor.on('leave', (peer) => console.log(`Peer ${peer} left ${topic}`));
      topicMonitor.on('error', (e) => logger.error(e));

      this._subscriptions[topic] = {
        topicMonitor: topicMonitor,
        onMessage: onMessageCallback,
        onNewPeer: onNewPeerCallback
      };

      topicsOpenCount ++;
      console.log("Topics open:", topicsOpenCount);
    }
  }

  async unsubscribe(hash) {
    if(this._subscriptions[hash]) {
      await this._ipfs.pubsub.unsubscribe(hash, this._handleMessage);
      this._subscriptions[hash].topicMonitor.stop();
      delete this._subscriptions[hash];
      console.log(`Unsubscribed from '${hash}'`);
      topicsOpenCount --;
      console.log("Topics open:", topicsOpenCount);
    }
  }

  publish(topic, message, options = {}) {
    if (this._subscriptions[topic] && this._ipfs.pubsub) {
      let payload;
      //Buffer should be already serialized. Everything else will get serialized as json if not buffer, string.
      if(Buffer.isBuffer(message) | typeof message === "string") {
        payload = message;
      } else {
        payload = JSON.stringify(message);
      }
      this._ipfs.pubsub.publish(topic, Buffer.from(payload), options);
    }
  }

  async disconnect() {
    const topics = Object.keys(this._subscriptions);
    await pSeries(topics.map((t) => this.unsubscribe.bind(this, t)));
    this._subscriptions = {};
  }

  async _handleMessage(message) {
    // Don't process our own messages
    if (message.from === this._id)
      return

    // Get the message content and a subscription
    let content, subscription, topicId;

    // Get the topic
    topicId = message.topicIDs[0];
    try {
      content = JSON.parse(Buffer.from(message.data).toString());
    } catch {
      content = message.data; //Leave content alone. Meant for higher level code using custom serialization.
    }
    subscription = this._subscriptions[topicId];

    if(subscription && subscription.onMessage && content) {
      await subscription.onMessage(topicId, content, message.from);
    }
  }
}

var ipfsPubsub = IPFSPubsub;

(function (module) {
	module.exports = ipfsPubsub;
} (orbitDbPubsub));

var index = /*@__PURE__*/getDefaultExportFromCjs(orbitDbPubsub.exports);

export { index as default };
