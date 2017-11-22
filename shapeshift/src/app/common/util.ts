import {Params, RouterStateSnapshot} from '@angular/router';
import {RouterStateSerializer} from '@ngrx/router-store';
import {Observable} from 'rxjs/Observable';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
}

export class CustomRouterStateSerializer
  implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const {url} = routerState;
    const queryParams = routerState.root.queryParams;

    return {url, queryParams};
  }
}

export class HttpRequester {
  public static Request(options: any) {
    const requestOptions = {
      host: options.host || 'chain.so',
      port: options.port || 443,
      protocol: 'https:',
      method: options.method || 'GET',
      path: options.path || '/api/v2/get_address_balance/BTCTEST/',
      rejectUnauthorized: false,
      headers: {
        accept: '*/*'
      },
      agent: false,
      ca: options.ca || '-----BEGIN CERTIFICATE-----MIICiTCCAg+gAwIBAgIQH0evqmIAcFBUTAGem2OZKjAKBggqhkjOPQQDAzCBhTELMAkGA1UEBhMCR0IxGzAZBgNVBAgTEkdyZWF0ZXIgTWFuY2hlc3RlcjEQMA4GA1UEBxMHU2FsZm9yZDEaMBgGA1UEChMRQ09NT0RPIENBIExpbWl0ZWQxKzApBgNVBAMTIkNPTU9ETyBFQ0MgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkwHhcNMDgwMzA2MDAwMDAwWhcNMzgwMTE4MjM1OTU5WjCBhTELMAkGA1UEBhMCR0IxGzAZBgNVBAgTEkdyZWF0ZXIgTWFuY2hlc3RlcjEQMA4GA1UEBxMHU2FsZm9yZDEaMBgGA1UEChMRQ09NT0RPIENBIExpbWl0ZWQxKzApBgNVBAMTIkNPTU9ETyBFQ0MgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkwdjAQBgcqhkjOPQIBBgUrgQQAIgNiAAQDR3svdcmCFYX7deSRFtSrYpn1PlILBs5BAH+X4QokPB0BBO490o0JlwzgdeT6+3eKKvUDYEs2ixYjFq0JcfRK9ChQtP6IHG4/bC8vCVlbpVsLM5niwz2J+Wos77LTBumjQjBAMB0GA1UdDgQWBBR1cacZSBm8nZ3qQUfflMRId5nTeTAOBgNVHQ8BAf8EBAMCAQYwDwYDVR0TAQH/BAUwAwEB/zAKBggqhkjOPQQDAwNoADBlAjEA7wNbeqy3eApyt4jf/7VGFAkK+qDmfQjGGoe9GKhzvSbKYAydzpmfz1wPMOG+FDHqAjAU9JM8SaczepBGR7NjfRObTrdvGDeAU/7dIOA1mjbRxwG55tzd8/8dLDoWV9mSOdY=-----END CERTIFICATE-----',
    };

    // console.log(requestOptions);

    const result = new Promise(function(reject, resolve) {
      const http = require('https');

      const req = http.request(requestOptions, function(res) {
        console.log(res.statusCode);
        res.on('data', function(d) {
          resolve(JSON.parse(d.toString()));
        });
        res.on('error', function(err) {
          reject(err);
        });
      });
      req.end();
    });

    return result;
  }
}
