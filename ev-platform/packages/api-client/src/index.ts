import type { ApiResponse } from "@ev-platform/types";

export interface ApiClientOptions {
  baseUrl?: string;
  getToken?: () => string | undefined | Promise<string | undefined>;
}

export class ApiClient {
  private readonly baseUrl: string;
  private readonly getToken?: ApiClientOptions["getToken"];

  constructor(options: ApiClientOptions = {}) {
    this.baseUrl = options.baseUrl ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
    this.getToken = options.getToken;
  }

  async request<T>(path: string, init: RequestInit = {}): Promise<ApiResponse<T>> {
    const token = await this.getToken?.();
    const response = await fetch(`${this.baseUrl}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...init.headers
      }
    });
    const payload = (await response.json().catch(() => ({}))) as ApiResponse<T>;
    if (!response.ok && payload.success !== false) {
      return {
        success: false,
        error: {
          code: `HTTP_${response.status}`,
          message: response.statusText || "Request failed"
        }
      };
    }
    return payload;
  }
}

export const apiClient = new ApiClient();
