// export const myPackage = (taco = ''): string => `${taco} from my package`;

/**
 * The Cartes.io class. Uses fetch() to fluently get data from the API.
 *
 * @class cartes
 * @typedef {cartes}
 */
export class cartes {
  /**
   * Description placeholder
   *
   * @type {string}
   */
  #api_url = 'https://cartes.io/api/';

  /**
   * Description placeholder
   *
   * @type {(string | null)}
   */
  #map_uuid: string | null;

  /**
   * Description placeholder
   *
   * @type {(string | null)}
   */
  #api_key: string | null;

  /**
   * Description placeholder
   *
   * @type {(string | null)}
   */
  #token: string | null;

  /**
   * Description placeholder
   *
   * @type {{ "Content-Type": string; Accept: string; }}
   */
  #headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  /**
   * Description placeholder
   *
   * @type {Record<string, any>}
   */
  #params: Record<string, string>;

  /**
   * Description placeholder
   *
   * @type {string}
   */
  #request_url = this.#api_url;

  /**
   * Creates an instance of cartes.
   *
   * @constructor
   * @param {string} [map_uuid=null as string | null]
   * @param {string} [api_key=null as string | null]
   * @param {string} [token=null as string | null]
   */
  constructor(
    map_uuid = null as string | null,
    api_key = null as string | null,
    token = null as string | null
  ) {
    this.#map_uuid = map_uuid;
    this.#api_key = api_key;
    this.#token = token;

    this.#params = {};

    if (this.#token) {
      this.#params.map_token = this.#token;
    }

    if (this.#api_key) {
      this.#params.api_key = this.#api_key;
    }

    if (map_uuid) {
      this.#request_url = this.#api_url + 'maps/' + map_uuid;
    }
  }

  /**
   * Get the headers to be used in the request
   *
   *
   * @private
   * @returns {Headers}
   */
  private getHeaders(): Headers {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    if (this.#api_key) {
      headers.append('Authorization', 'Bearer ' + this.#api_key);
    }
    const csrfToken = this.getCsrfTokenFromCookie();
    if (csrfToken && csrfToken !== '') {
      headers.append('X-XSRF-TOKEN', csrfToken);
    }
    return headers;
  }

  /**
   * Set the base URL
   *
   * @public
   * @param {string} url
   * @returns {this}
   */
  public setBaseUrl(url: string): this {
    this.#api_url = url;
    return this;
  }

  /**
   * Set an API key
   *
   * @public
   * @param {string} key
   * @returns {this}
   */
  public setApiKey(key: string): this {
    this.#api_key = key;
    return this;
  }

  /**
   * Attach the params to the url
   *
   * @private
   */
  private attachParamsToUrl() {
    // Attach any params to this.#request_url
    if (this.#params) {
      let params = '';
      for (const key in this.#params) {
        if (this.#params[key]) {
          params += '&' + key + '=' + this.#params[key].toString();
        }
      }
      this.#request_url += '?' + params.substring(1);
    }
  }

  /**
   * Get the CSRF token from the cookie
   *
   * @private
   */
  private getCsrfTokenFromCookie(): string {
    const xsrfToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('XSRF-TOKEN'))
      ?.split('=')[1];
    return decodeURIComponent(xsrfToken ?? '').trim();
  }

  /**
   * Handle the request
   *
   * @private
   * @param {string} [method="GET"]
   * @param {*} [body=null as any]
   * @returns {Promise<any>}
   */
  private handleRequest(method = 'GET', body = null as any): Promise<any> {
    this.attachParamsToUrl();

    const data = {
      method: method.toUpperCase(),
      headers: this.getHeaders(),
      credentials: 'include',
    } as RequestInit;

    // If the method is not GET, we need to add the body
    if (data.method !== 'GET') {
      data.body = JSON.stringify(body);
    }

    return fetch(this.#request_url, data)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return this.handleError(response);
      })
      .then((data: Record<string, any>) => {
        return data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * Handle errors from the request
   *
   * @private
   * @param {Response} response
   * @returns {*}
   */
  private handleError(response: Response) {
    switch (response.status) {
      case 400:
        return response.json().then((data: Record<string, string>) => {
          throw new Error(data.message ?? 'Bad request.');
        });
      case 401:
        throw new Error('You are not logged in.');
      case 403:
        throw new Error('You are not authorized to do this action.');
      case 404:
        throw new Error('Map not found.');
      case 429:
        throw new Error(
          'You have reached the maximum number of requests per minute. Please wait a minute before trying again.'
        );
      case 500:
        throw new Error('Internal server error.');
      default:
        throw new Error('Unknown error.');
    }
  }

  /**
   * Add a parameter to the request
   *
   * @public
   * @param {string} key
   * @param {*} value
   * @returns {this}
   */
  public addParam(key: string, value: string): this {
    this.#params[key] = value;
    return this;
  }

  /**
   * Set the request to maps
   *
   * @public
   * @param {(string | number)} [uuid=null as string | number | null]
   * @param {string} [token=null as string | null]
   * @returns {this}
   */
  public maps(
    uuid = null as string | null,
    token = null as string | null
  ): this {
    if (uuid) {
      this.#request_url = this.#api_url + 'maps/' + uuid;
    } else {
      this.#request_url = this.#api_url + 'maps';
    }

    if (token) {
      this.#params.map_token = token;
    }

    return this;
  }

  /**
   * Set the request to categories
   *
   * @public
   * @param {(string | number)} [id=null as string | number | null]
   * @returns {this}
   */
  public categories(id = null as string | number | null): this {
    if (id) {
      this.#request_url = this.#api_url + 'categories/' + id.toString();
    } else {
      this.#request_url = this.#api_url + 'categories';
    }

    return this;
  }

  /**
   * Set the request to markers
   *
   * @public
   * @param {(string | number)} [id=null as string | number | null]
   * @param {string} [token=null as string | null]
   * @returns {this}
   */
  public markers(
    id = null as string | number | null,
    token = null as string | null
  ): this {
    if (id) {
      // Append to the url
      this.#request_url += '/markers/' + id.toString();
    } else {
      this.#request_url += '/markers';
    }

    if (token) {
      this.#params.token = token;
    }

    return this;
  }

  /**
   * Set the request to me
   *
   * @public
   * @returns {this}
   */
  public me(): this {
    this.#request_url = this.#api_url + 'user';
    return this;
  }

  /**
   * Set the request to get related
   *
   * @public
   * @returns {this}
   */
  public related(): this {
    this.#request_url += '/related';
    return this;
  }

  /**
   * Call GET on the request
   *
   * @public
   * @returns {Promise<any>}
   */
  public get(): Promise<any> {
    return this.handleRequest('GET');
  }

  /**
   * Call POST on the request
   *
   * @public
   * @param {*} data
   * @returns {Promise<any>}
   */
  public create(data: any): Promise<any> {
    return this.handleRequest('POST', data);
  }

  /**
   * Call PUT on the request
   *
   * @public
   * @param {*} data
   * @returns {Promise<any>}
   */
  public update(data: any): Promise<any> {
    return this.handleRequest('PUT', data);
  }

  /**
   * Call DELETE on the request
   *
   * @public
   * @returns {Promise<any>}
   */
  public delete(): Promise<any> {
    return this.handleRequest('DELETE');
  }
}
