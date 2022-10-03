import { getCacheRecord, setCacheRecord } from "./dataSource";
import { getRequest } from "./network";

export const getUserDetail = async (userName) => {
  const cachedRepo = getCacheRecord(userName) || {};
  if (cachedRepo && cachedRepo.details) {
    return cachedRepo.details;
  }

  const url = `https://api.github.com/users/${userName}`;
  const response = await getRequest(url);
  if (response) {
    cachedRepo.details = response;
    setCacheRecord(userName, cachedRepo);
  }

  return response || {};
};

export const getUserRepos = async (userName) => {
  const cachedRepo = getCacheRecord(userName);
  if (cachedRepo && cachedRepo.repos) {
    return cachedRepo.repos;
  }
  const url = `https://api.github.com/users/${userName}/repos`;
  const response = await getRequest(url);
  if (response) {
    cachedRepo.repos = response;
    setCacheRecord(userName, cachedRepo);
  }

  return response || [];
};

export const getUserFollowers = async (userName) => {
  const cachedRepo = getCacheRecord(userName);
  if (cachedRepo && cachedRepo.followers) {
    return cachedRepo.followers;
  }
  const url = `https://api.github.com/users/${userName}/followers`;
  const response = await getRequest(url);
  if (response) {
    cachedRepo.followers = response;
    setCacheRecord(userName, cachedRepo);
  }

  return response || [];
};
