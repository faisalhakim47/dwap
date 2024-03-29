import { Repository as IRepository } from './repository.js';
import { HttpClientBrowser as IHttpClient } from './http/browser.js';
export { ViewBinder } from './view-binder.js';

IRepository.HTTP_CLIENT = new IHttpClient();

export const Repository = IRepository;
export const HttpClient = IHttpClient;
