import {getBalance} from '../src/common/get-balance';

describe('getBalance', function () {
    this.timeout(5000);
    describe('#getBalance()', function () {
        it('should get balance from account', async () => {
            var t = await getBalance("mt6ejXYWbbGZQSHYGkLkUTS3jDaJddmaK9");
            console.log(t);
        });
    });
});
