import { Repository as IRepository } from './repository.js';
import { HttpClientBrowser as IHttpClient } from './http/browser.js';
export { ViewBinder } from './view-binder.js';
IRepository.HTTP_CLIENT = new IHttpClient();
export var Repository = IRepository;
export var HttpClient = IHttpClient;
//# sourceMappingURL=dwap.js.map