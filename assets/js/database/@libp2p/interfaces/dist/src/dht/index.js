/**
 * The types of events emitted during DHT queries
 */
export var EventTypes;
(function (EventTypes) {
    EventTypes[EventTypes["SENDING_QUERY"] = 0] = "SENDING_QUERY";
    EventTypes[EventTypes["PEER_RESPONSE"] = 1] = "PEER_RESPONSE";
    EventTypes[EventTypes["FINAL_PEER"] = 2] = "FINAL_PEER";
    EventTypes[EventTypes["QUERY_ERROR"] = 3] = "QUERY_ERROR";
    EventTypes[EventTypes["PROVIDER"] = 4] = "PROVIDER";
    EventTypes[EventTypes["VALUE"] = 5] = "VALUE";
    EventTypes[EventTypes["ADDING_PEER"] = 6] = "ADDING_PEER";
    EventTypes[EventTypes["DIALING_PEER"] = 7] = "DIALING_PEER";
})(EventTypes || (EventTypes = {}));
/**
 * The types of messages sent to peers during DHT queries
 */
export var MessageType;
(function (MessageType) {
    MessageType[MessageType["PUT_VALUE"] = 0] = "PUT_VALUE";
    MessageType[MessageType["GET_VALUE"] = 1] = "GET_VALUE";
    MessageType[MessageType["ADD_PROVIDER"] = 2] = "ADD_PROVIDER";
    MessageType[MessageType["GET_PROVIDERS"] = 3] = "GET_PROVIDERS";
    MessageType[MessageType["FIND_NODE"] = 4] = "FIND_NODE";
    MessageType[MessageType["PING"] = 5] = "PING";
})(MessageType || (MessageType = {}));
//# sourceMappingURL=index.js.map