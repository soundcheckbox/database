const globalFetch = globalThis.fetch;
const globalHeaders = globalThis.Headers;
const globalRequest = globalThis.Request;
const globalResponse = globalThis.Response;

export { globalHeaders as Headers, globalRequest as Request, globalResponse as Response, globalFetch as fetch };

export default {
    Headers: globalHeaders,
    Request: globalRequest,
    Response: globalResponse,
    fetch: globalFetch
};
