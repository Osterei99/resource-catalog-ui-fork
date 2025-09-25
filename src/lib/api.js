import { getJson, postJson } from './http';
import { unwrapList } from './unwrap';
import { RESOURCES_API, TOPICS_API, LEARNING_API } from './config';

// Resources
export const fetchResources = async () => {
  const list = unwrapList(await getJson(`${RESOURCES_API}/resources`));
  return list.map(r => r.id ? r : ({ ...r, id: r._id })); // normalize
};
export const fetchResource = async (id) =>
  getJson(`${RESOURCES_API}/resources/${id}`);

export const postRating = (resourceId, ratingValue, userId='anonymous') =>
  postJson(`${RESOURCES_API}/resources/${resourceId}/ratings`, { ratingValue, userId });

export const postFeedback = (resourceId, feedbackText, userId='anonymous') =>
  postJson(`${RESOURCES_API}/resources/${resourceId}/feedback`, { feedbackText, userId });

// (We’ll use these later)
export const fetchTopics = () => getJson(`${TOPICS_API}/topics`).then(unwrapList);
export const fetchSkills = () => getJson(`${TOPICS_API}/skills`).then(unwrapList);
export const lpGenerate = (payload) => postJson(`${LEARNING_API}/generate`, payload);
export const lpGet = (pathId) => getJson(`${LEARNING_API}/paths/${pathId}`);
export const lpList = (userId) => getJson(userId ? `${LEARNING_API}/paths?userId=${encodeURIComponent(userId)}` : `${LEARNING_API}/paths`);
export const lpHealth = () => getJson(`${LEARNING_API}/healthz`);
