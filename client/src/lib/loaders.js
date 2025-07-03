import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest("/posts/" + params.id);
  return res.data;
};

export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const res = await apiRequest("/posts?" + query);
  return defer({
    postResponse: res.data,
  });
};

export const profilePageLoader = async () => {
  const res = await apiRequest("/users/profilePosts");
  console.log(res);

  return defer({
    postResponse: res.data,
  });
};
