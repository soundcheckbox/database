export = Stats;
/**
 * @typedef {import('@vascosantos/moving-average').IMovingAverage} IMovingAverage
 * @typedef {[string, number, number]} Op
 */
declare class Stats extends EventEmitter {
    /**
     *
     * @param {string[]} initialCounters
     * @param {Object} options
     * @param {boolean} options.enabled
     * @param {number} options.computeThrottleTimeout
     * @param {number} options.computeThrottleMaxQueueSize
     * @param {import('.').AverageIntervals} options.movingAverageIntervals
     */
    constructor(initialCounters: string[], options: {
        enabled: boolean;
        computeThrottleTimeout: number;
        computeThrottleMaxQueueSize: number;
        movingAverageIntervals: import('.').AverageIntervals;
    });
    _options: {
        enabled: boolean;
        computeThrottleTimeout: number;
        computeThrottleMaxQueueSize: number;
        movingAverageIntervals: import('.').AverageIntervals;
    };
    /** @type {Op[]} */
    _queue: Op[];
    /** @type {Record<string, bigint>} */
    _stats: Record<string, bigint>;
    _frequencyLastTime: number;
    /** @type {Record<string, number>} */
    _frequencyAccumulators: Record<string, number>;
    /** @type {Record<string, Record<number, IMovingAverage>>} */
    _movingAverages: Record<string, Record<number, IMovingAverage>>;
    /**
     * @private
     */
    private _update;
    _enabled: boolean;
    enable(): void;
    disable(): void;
    _disabled: boolean | undefined;
    stop(): void;
    get snapshot(): Record<string, bigint>;
    get movingAverages(): Record<string, Record<number, MovingAverage.IMovingAverage>>;
    /**
     * @param {string} counter
     * @param {number} inc
     */
    push(counter: string, inc: number): void;
    /**
     * @private
     */
    private _resetComputeTimeout;
    _timeout: NodeJS.Timeout | null | undefined;
    /**
     * @private
     * @returns {number}
     */
    private _nextTimeout;
    /**
     * @private
     * @param {number} latestTime
     */
    private _updateFrequency;
    /**
     * @private
     * @param {string} key
     * @param {number} timeDiffMS
     * @param {number} latestTime
     * @returns {void}
     */
    private _updateFrequencyFor;
    /**
     * @private
     * @param {Op} op
     */
    private _applyOp;
}
declare namespace Stats {
    export { IMovingAverage, Op };
}
import { EventEmitter } from "events";
type Op = [string, number, number];
type IMovingAverage = import('@vascosantos/moving-average').IMovingAverage;
import MovingAverage = require("@vascosantos/moving-average");
//# sourceMappingURL=stat.d.ts.map