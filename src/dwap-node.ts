import { Repository as IRepository } from './repository.js';
import { HttpClientNode as IHttpClient } from './http/node.js';
export { ViewBinder } from './view-binder.js';

IRepository.HTTP_CLIENT = new IHttpClient();

export const Repository = IRepository;
export const HttpClient = IHttpClient;
