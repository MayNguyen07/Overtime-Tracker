import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
} from 'axios';

export interface IDataResponse {
  status?: boolean;
  message?: string;
  result?: object;
}

export interface IErrorResponse {
  status: number;
  message?: string;
  errors?: [];
}

class AxiosService<T> {
  private instance: any;

  constructor() {
    const instance = axios.create();
    instance.interceptors.response.use(this.handleSuccess, this.handleError);
    this.instance = instance;
  }

  public handleSuccess(
    response: AxiosResponse<IDataResponse>,
  ): AxiosResponse<IDataResponse> {
    return response;
  }

  public handleError(error: AxiosError): Promise<IErrorResponse> {
    const errorResponse = error.response as AxiosResponse<IErrorResponse>;
    const { data, status } = errorResponse;
    let Error: IErrorResponse = {
      status: 0,
      message: '',
      errors: [],
    };
    if (status) {
      Error = {
        status,
        message: data.message,
        errors: data.errors,
      };
    }
    return Promise.reject(Error);
  }

  public get(url: string, config?: AxiosRequestConfig) {
    return this.instance.get(url, config);
  }

  public post(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.post(url, data, config);
  }

  public postWithHeader(
    url: string,
    header?: AxiosRequestConfig,
    data?: any,
    config?: AxiosRequestConfig,
  ) {
    return this.instance.post(url, data, header, config);
  }

  public put(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.put(url, data, config);
  }

  public putWithHeader(
    url: string,
    header?: AxiosRequestConfig,
    data?: any,
    config?: AxiosRequestConfig,
  ) {
    return this.instance.put(url, data, header, config);
  }

  public delete(url: string, config?: AxiosRequestConfig) {
    return this.instance.delete(url, config);
  }

  public getWithHeader(
    url: string,
    header?: AxiosRequestConfig,
    config?: AxiosRequestConfig | undefined,
  ) {
    return this.instance.get(url, header, config);
  }
}

export default new AxiosService();
