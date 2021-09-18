export abstract class HttpClient {
    public abstract get<T>(url: string): Promise<T>
}
