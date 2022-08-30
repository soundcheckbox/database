var utils = {};

utils.deepEqual = (a, b) => {
  const propsA = Object.getOwnPropertyNames(a);
  const propsB = Object.getOwnPropertyNames(b);

  if(propsA.length !== propsB.length)
    return false

  for(let i = 0; i < propsA.length; i ++) {
    const prop = propsA[i];
    if(a[prop] !== b[prop])
      return false
  }

  return true
};

class OperationTuple3 {
  constructor (value, added, removed) {
    this.value = value;
    this.added = new Set(added);
    this.removed = new Set(removed);
  }

  static create (value, added, removed) {
    return new OperationTuple3(value, added, removed)
  }

  static from (json) {
    return OperationTuple3.create(json.value, json.added, json.removed)
  }
}

utils.OperationTuple3 = OperationTuple3;

const { deepEqual } = utils;
const sum = (acc, val) => acc + val;

/**
 * G-Counter
 *
 * Operation-based Increment-Only Counter CRDT
 *
 * Sources: 
 * "A comprehensive study of Convergent and Commutative Replicated Data Types"
 * http://hal.upmc.fr/inria-00555588/document, "3.1.1 Op-based counter and 3.1.2  State-based increment-only Counter (G-Counter)"
 */

class GCounter$1 {
  constructor (id, counter) {
    this.id = id;
    this._counters = counter ? counter : {};
    this._counters[this.id] = this._counters[this.id] ? this._counters[this.id] : 0;
  }

  get value () {
    return Object.values(this._counters).reduce(sum, 0)
  }

  increment (amount) {
    if (amount && amount < 1) 
      return

    if (amount === undefined || amount === null)
      amount = 1;

    this._counters[this.id] = this._counters[this.id] + amount;
  }

  merge (other) {
    // Go through each counter in the other counter
    Object.entries(other._counters).forEach(([id, value]) => {
      // Take the maximum of the counter value we have or the counter value they have
      this._counters[id] = Math.max(this._counters[id] || 0, value);
    });
  }

  toJSON () {
    return { 
      id: this.id, 
      counters: this._counters 
    }
  }

  isEqual (other) {
    return GCounter$1.isEqual(this, other)
  }

  static from (json) {
    return new GCounter$1(json.id, json.counters)
  }

  static isEqual (a, b) {
    if(a.id !== b.id)
      return false

    return deepEqual(a._counters, b._counters)
  }
}

var GCounter_1 = GCounter$1;

const GCounter = GCounter_1;

class PNCounter {
  constructor (id, pCounter, nCounter) {	
    this.id = id;
    this.p = pCounter ? pCounter : new GCounter(id);
    this.n = nCounter ? nCounter : new GCounter(id);
  }

  get value() {
    return this.p.value - this.n.value
  }

  increment (amount) {
    this.p.increment(amount);
  }

  decrement (amount) {
    this.n.increment(amount);
  }

  merge (other) {
    this.p.merge(other.p);
    this.n.merge(other.n);
  }
  
  toJSON () {
    return {
      id: this.id,
      p: this.p,
      n: this.n
    }
  }

  isEqual (other) {
   return PNCounter.isEqual(this, other)
  } 

  static from (json) {
    return new PNCounter(json.id, json.p, json.n)
  }

  static isEqual (a, b) {
    return GCounter.isEqual(a.p, b.p) && GCounter.isEqual(a.n, b.n)
  }
}

var PNCounter_1 = PNCounter;

export { PNCounter_1 as default };
