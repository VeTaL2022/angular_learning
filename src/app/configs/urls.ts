import {environment} from "../../environments/environment";

const {V3API} = environment;

const auth = `${V3API}/auth`;

export const urls = {
  cars: `${V3API}/cars`,
  auth: {
    login: auth,
    refresh: `${auth}/refresh`
  }
};
