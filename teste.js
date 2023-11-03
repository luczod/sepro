import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
const handlers = [
  http.get("/api/database/allService", ({ request, params, cookies }) => {
    return HttpResponse.json([
      {
        service_id: 877,
        name: "teste display hidden",
        cpf: "72812311231",
        date_send: "2023-10-18T03:00:00.000Z",
        charged: 123,
        received: 123,
        date_received: null,
        onlyyear: 2023,
      },
      {
        service_id: 878,
        name: "teste display hidden",
        cpf: "72812311231",
        date_send: "2023-10-18T03:00:00.000Z",
        charged: 122,
        received: 122,
        date_received: null,
        onlyyear: 2022,
      },
      {
        service_id: 736,
        name: "RODRIGO BATISTA DE ALCANTARA",
        cpf: "72887451120",
        date_send: "2023-05-17T03:00:00.000Z",
        charged: 100,
        received: 51,
        date_received: "2023-09-29T03:00:00.000Z",
        onlyyear: 2023,
      },
    ]);
  }),
];

export const serverMSW = setupServer(...handlers);
// Start the interception.
serverMSW.listen();
