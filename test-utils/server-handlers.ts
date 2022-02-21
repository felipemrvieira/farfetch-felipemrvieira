import { rest } from "msw";

import { mockedLaunchs } from "../__mocks__/mocks";

const API_URL = "https://api.spacexdata.com/v3/launches";

const handlers = [
  rest.get(API_URL, (_req, res, ctx) => {
    return res(ctx.json(mockedLaunchs));
  }),
];

export { handlers };
