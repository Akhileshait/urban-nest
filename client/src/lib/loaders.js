import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest("/posts/" + params.id);
  return res.data;
};

export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const res = apiRequest("/posts?" + query);
  return defer({
    postResponse: res,
  });
};

export const profilePageLoader = async () => {
  const postRes = apiRequest("/users/profilePosts");
  const chatRes = apiRequest("/chats");
  return defer({
    postResponse: postRes,
    chatResponse: chatRes,
  });
};
