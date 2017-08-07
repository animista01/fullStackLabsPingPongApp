import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { UtilProvider } from '../util/util';
import { ConfigAPI } from '../../utils/config-api';
import * as _ from 'lodash';

@Injectable()
export class ApiProvider {
  url: string = ConfigAPI.baseUrl;
  _user_token: string;
  options: any;

  constructor(public http: Http, public util: UtilProvider) {
    this.util.getToken().subscribe(val => {
      // console.log("Resp form obs in API constructor", val)
      this._user_token = val;
    });
  }
  get(endpoint: string, params?: any, appendAuthToken?: boolean) {
    this.options = appendAuthToken ? this.set_headers() : new RequestOptions();

    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();

      for (let k in params) {
        // console.log("k", k)
        // console.log("params k ", params[k])
        // console.log("k typeof", typeof params[k])
        if (typeof params[k] == 'object') {
          // console.log("AM An OBJECT")
          _.forEach(params[k], (o: any) => {
            let objKeyName = Object.keys(o).toString();
            // console.log("o", o)
            // console.log("o",objKeyName)
            p.append(objKeyName, o[objKeyName]);
          });
        } else {
          p.set(k, params[k]);
        }
      }
      this.options.search = !this.options.search && p || this.options.search;
    }
    return this.http.get(this.url + '/' + endpoint, this.options);
  }

  post(endpoint: string, body: any,  appendAuthToken?: boolean) {
    this.options = appendAuthToken ? this.set_headers() : new RequestOptions();
    return this.http.post(this.url + '/' + endpoint, body, this.options);
  }

  put(endpoint: string, body: any, appendAuthToken?: boolean) {
    this.options = appendAuthToken ? this.set_headers() : new RequestOptions();
    return this.http.put(this.url + '/' + endpoint, body,  this.options);
  }

  delete(endpoint: string, options?: RequestOptions) {
    return this.http.delete(this.url + '/' + endpoint, options);
  }

  private set_headers() {
    this.util.getToken().subscribe(val => this._user_token = val);

    const options : RequestOptions = new RequestOptions();
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this._user_token);
    options.headers = headers;
    return options;
  }
}
