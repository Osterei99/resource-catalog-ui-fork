export class HttpError extends Error {
  constructor(message, status, payload) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.payload = payload;
  }
}
async function parseMaybeJson(res) {
  const text = await res.text();
  try { return text ? JSON.parse(text) : null; } catch { return text || null; }
}
export async function getJson(url, init = {}) {
  const res = await fetch(url, { method: 'GET', ...init });
  if (!res.ok) throw new HttpError(`GET ${url} failed`, res.status, await parseMaybeJson(res));
  return parseMaybeJson(res);
}
export async function postJson(url, body, init = {}) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type':'application/json', ...(init.headers||{}) },
    body: JSON.stringify(body ?? {}),
    ...init
  });
  if (!res.ok) throw new HttpError(`POST ${url} failed`, res.status, await parseMaybeJson(res));
  return parseMaybeJson(res);
}
