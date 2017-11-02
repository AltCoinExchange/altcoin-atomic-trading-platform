import {initiate} from '../src/initiate';

describe('Initiate', function () {
  this.timeout(5000);
  describe('#initiate()', function () {
    it('should initiate atomic swap', async () => {
      initiate("n31og5QGuS28dmHpDH6PQD5wmVQ2K2spAG", "0.001");
    });
  });
});