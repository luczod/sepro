import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

export const serverMSW = setupServer(...handlers);
// Start the interception.
serverMSW.listen();
