export = SortedMap;
/**
 * @template Key, Value
 * SortedMap is a Map whose iterator order can be defined by the user
 * @extends {Map<Key, Value>}
 */
declare class SortedMap<Key, Value> extends Map<Key, Value> {
    /**
     * @param {Array<[Key, Value]>} [entries]
     * @param {(a:[Key, Value], b:[Key, Value]) => number} [cmp] - compares [k1, v1] to [k2, v2]
     */
    constructor(entries?: [Key, Value][] | undefined, cmp?: ((a: [Key, Value], b: [Key, Value]) => number) | undefined);
    _cmp: (a: [Key, Value], b: [Key, Value]) => number;
    /** @type {Key[]} */
    _keys: Key[];
    /**
     * Call update to update the position of the key when it should change.
     * For example if the compare function sorts by the priority field, and the
     * priority changes, call update.
     * Call indexOf() to get the index _before_ the change happens.
     *
     * @param {number} i - the index of entry whose position should be updated.
     */
    update(i: number): void;
    /**
     * @param {Key} k
     */
    indexOf(k: Key): number;
    /**
     * @private
     * @param {Key} k
     * @returns {number}
     */
    private _find;
    /**
     * @private
     * @param {[Key, Value]} a
     * @param {[Key, Value]} b
     * @returns {0|1|-1}
     */
    private _defaultSort;
    /**
     * @private
     * @param {Key} a
     * @param {Key} b
     */
    private _kCmp;
}
//# sourceMappingURL=sorted-map.d.ts.map