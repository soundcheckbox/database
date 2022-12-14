export = RequestQueue;
/**
 * Queue of requests to be processed by the engine.
 * The requests from each peer are added to the peer's queue, sorted by
 * priority.
 * Tasks are popped in priority order from the best peer - see popTasks()
 * for more details.
 */
declare class RequestQueue {
    /**
     * @param {TaskMerger} [taskMerger]
     */
    constructor(taskMerger?: import("./types").TaskMerger | undefined);
    _taskMerger: import("./types").TaskMerger;
    /** @type {SortedMap<string, PeerTasks>} */
    _byPeer: SortedMap<string, PeerTasks>;
    /**
     * Push tasks onto the queue for the given peer
     *
     * @param {PeerId} peerId
     * @param {Task[]} tasks
     * @returns {void}
     */
    pushTasks(peerId: PeerId, tasks: Task[]): void;
    /**
     * Choose the peer with the least active work (or if all have the same active
     * work, the most pending tasks) and pop off the highest priority tasks until
     * the total size is at least targetMinBytes.
     * This puts the popped tasks into the "active" state, meaning they are
     * actively being processed (and cannot be modified).
     *
     * @param {number} targetMinBytes - the minimum total size of tasks to pop
     * @returns {PopTaskResult}
     */
    popTasks(targetMinBytes: number): PopTaskResult;
    /**
     * @private
     * @returns {PeerTasks|undefined}
     */
    private _head;
    /**
     * Remove the task with the given topic for the given peer.
     *
     * @param {string} topic
     * @param {PeerId} peerId
     * @returns {void}
     */
    remove(topic: string, peerId: PeerId): void;
    /**
     * Called when the tasks for the given peer complete.
     *
     * @param {PeerId} peerId
     * @param {Task[]} tasks
     * @returns {void}
     */
    tasksDone(peerId: PeerId, tasks: Task[]): void;
}
declare namespace RequestQueue {
    export { PopTaskResult, PendingTask, PeerId, Task, TaskMerger };
}
import SortedMap = require("../utils/sorted-map");
/**
 * Queue of tasks for a particular peer, sorted by priority.
 */
declare class PeerTasks {
    /**
     * Compare PeerTasks
     *
     * @template Key
     * @param {[Key, PeerTasks]} a
     * @param {[Key, PeerTasks]} b
     * @returns {number}
     */
    static compare<Key>(a: [Key, PeerTasks], b: [Key, PeerTasks]): number;
    /**
     * @param {PeerId} peerId
     * @param {TaskMerger} taskMerger
     */
    constructor(peerId: PeerId, taskMerger: TaskMerger);
    peerId: import("peer-id");
    _taskMerger: import("./types").TaskMerger;
    _activeTotalSize: number;
    _pending: PendingTasks;
    _active: Set<any>;
    /**
     * Push tasks onto the queue.
     *
     * @param {Task[]} tasks
     * @returns {void}
     */
    pushTasks(tasks: Task[]): void;
    /**
     * @private
     * @param {Task} task
     * @returns {void}
     */
    private _pushTask;
    /**
     * Indicates whether the new task adds any more information over tasks that are
     * already in the active task queue
     *
     * @private
     * @param {Task} task
     * @returns {boolean}
     */
    private _taskHasMoreInfoThanActiveTasks;
    /**
     * Pop tasks off the queue such that the total size is at least targetMinBytes
     *
     * @param {number} targetMinBytes
     * @returns {PopTaskResult}
     */
    popTasks(targetMinBytes: number): PopTaskResult;
    /**
     * Called when a task completes.
     * Note: must be the same reference as returned from popTasks.
     *
     * @param {Task} task
     * @returns {void}
     */
    taskDone(task: Task): void;
    /**
     * Remove pending tasks with the given topic
     *
     * @param {string} topic
     * @returns {void}
     */
    remove(topic: string): void;
    /**
     * No work to be done, this PeerTasks object can be freed.
     *
     * @returns {boolean}
     */
    isIdle(): boolean;
}
type PeerId = import('peer-id');
type Task = import('./types').Task;
type PopTaskResult = {
    peerId?: import("peer-id") | undefined;
    tasks: Task[];
    pendingSize: number;
};
type PendingTask = {
    created: number;
    task: Task;
};
type TaskMerger = import('./types').TaskMerger;
/**
 * Queue of pending tasks for a particular peer, sorted by priority.
 */
declare class PendingTasks {
    /** @type {SortedMap<string, PendingTask>} */
    _tasks: SortedMap<string, PendingTask>;
    get length(): number;
    /**
     * Sum of the size of all pending tasks
     *
     * @type {number}
     **/
    get totalSize(): number;
    /**
     * @param {string} topic
     * @returns {Task|void}
     */
    get(topic: string): Task | void;
    /**
     * @param {Task} task
     */
    add(task: Task): void;
    /**
     * @param {string} topic
     * @returns {void}
     */
    delete(topic: string): void;
    tasks(): import("./types").Task[];
    /**
     * Update the priority of the task with the given topic, and update the order
     *
     * @param {string} topic
     * @param {number} priority
     * @returns {void}
     **/
    updatePriority(topic: string, priority: number): void;
    /**
     * Sort by priority desc then FIFO
     *
     * @param {[string, PendingTask]} a
     * @param {[string, PendingTask]} b
     * @returns {number}
     * @private
     */
    private _compare;
}
//# sourceMappingURL=req-queue.d.ts.map