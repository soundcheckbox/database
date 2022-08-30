import require$$1 from '../../events/dist/index.js';

var utils = {};

// Set utils
const difference$1 = (set1, set2) => new Set([...set1].filter(x => !set2.has(x)));

// Poll utils
const sleep = (time) => new Promise(resolve => setTimeout(resolve, time));

const runWithDelay = async (func, topic, interval) => {
  const peers = await func(topic);
  await sleep(interval);
  return peers
};

utils.runWithDelay = runWithDelay;
utils.difference = difference$1;

const { difference} = utils;
const EventEmitter = require$$1;

const DEFAULT_OPTIONS = {
  start: true,
  pollInterval: 1000,
};

class IpfsPubsubPeerMonitor extends EventEmitter {
  constructor (ipfsPubsub, topic, options) {
    super();
    this._pubsub = ipfsPubsub;
    this._topic = topic;
    this._options = Object.assign({}, DEFAULT_OPTIONS, options);
    this._peers = [];
    this._interval = null;

    if (this._options.start)
      this.start();
  }

  get started () { return this._interval !== null }
  set started (val) { throw new Error("'started' is read-only") }

  start () {
    if (this._interval)
      this.stop();

    this._interval = setInterval(
      this._pollPeers.bind(this),
      this._options.pollInterval
    );
    this._pollPeers();
  }

  stop () {
    clearInterval(this._interval);
    this._interval = null;
    this.removeAllListeners('error');
    this.removeAllListeners('join');
    this.removeAllListeners('leave');
  }

  async getPeers () {
    this._peers = await this._pubsub.peers(this._topic);
    return this._peers.slice()
  }

  hasPeer (peer) {
    return this._peers.includes(peer)
  }

  async _pollPeers () {
    try {
      const peers = await this._pubsub.peers(this._topic);
      IpfsPubsubPeerMonitor._emitJoinsAndLeaves(new Set(this._peers), new Set(peers), this);
      this._peers = peers;
    } catch (err) {
      clearInterval(this._interval);
      this.emit('error', err);
    }
  }

  static _emitJoinsAndLeaves (oldValues, newValues, events) {
    const emitJoin = addedPeer => events.emit('join', addedPeer);
    const emitLeave = removedPeer => events.emit('leave', removedPeer);
    difference(newValues, oldValues).forEach(emitJoin);
    difference(oldValues, newValues).forEach(emitLeave);
  }
}

var ipfsPubsubPeerMonitor = IpfsPubsubPeerMonitor;

export { ipfsPubsubPeerMonitor as default };
