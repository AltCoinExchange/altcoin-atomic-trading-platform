import {HttpRequester} from '../src/app/common/util';

import { suite, test, slow, timeout } from 'mocha-typescript';
@suite(timeout(40000)) class Common {
  @test async Util() {
    const test = await HttpRequester.Request({});
  }
}
