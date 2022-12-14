import type { PeerId } from '../peer-id/index.js';
import type { Connection } from '../connection/index.js';
import type { Registrar } from '../registrar/index.js';
export interface onConnectHandler {
    (peerId: PeerId, conn: Connection): void;
}
export interface onDisconnectHandler {
    (peerId: PeerId, conn?: Connection): void;
}
export interface TopologyInit {
    /**
     * minimum needed connections
     */
    min?: number;
    /**
     * maximum needed connections
     */
    max?: number;
    onConnect?: onConnectHandler;
    onDisconnect?: onDisconnectHandler;
}
export interface Topology {
    min: number;
    max: number;
    peers: Set<string>;
    onConnect: (peerId: PeerId, conn: Connection) => void;
    onDisconnect: (peerId: PeerId) => void;
    setRegistrar: (registrar: Registrar) => Promise<void>;
}
export declare const symbol: unique symbol;
export declare function isTopology(other: any): other is Topology;
//# sourceMappingURL=index.d.ts.map