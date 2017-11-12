import {participate} from '../src/participate';

describe('participate', function () {
  this.timeout(5000);
  describe('#participate()', function () {
    it('should participate atomic swap', async () => {
      participate("moPkgMW7QkDpH8iR5nuDuNB6K7UWFWTtXq", "0.001", "d9f9ba12aced3f9516c69844cd6ce8b9aebdd5df");
    });
  });
});
