import { HttpClient } from './http.js';

export class HttpClientBrowser implements HttpClient {
    public async get<T>(url: string) {
        const response = await fetch(url);
        return (await response.json()) as T;
    }
}
