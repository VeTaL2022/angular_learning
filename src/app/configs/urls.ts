import {environment} from "../../environments/environment";

let {JsonPlaceHolderAPI} = environment;

export const urls = {
  users: `${JsonPlaceHolderAPI}/users`,
  posts: `${JsonPlaceHolderAPI}/posts`,
  comments: `${JsonPlaceHolderAPI}/comments`
};
