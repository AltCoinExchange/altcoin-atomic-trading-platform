import {participate} from '../src/participate';

const addr = "mnopGXXKQdt6mXnwHeRcdWNsaksoqKcvwZ"
const pubKey = "0263a131db9f54c8bc19c5602cca56c0e156b17430b45a09081ec8405297060908"
// const privateKey = "cQ63rjfvri2EHn6WvR5F9KGbgaGNRMvb7y9ra8ZuTyQVeteLZ66a"
const privateKey = "cQ63rjfvri2EHn6WvR5F9KGbgaGNRMvb7y9ra8ZuTyQVeteLZ66a"

const secret = "7354c5eafa13ac614c70d31ac70465a77b52292df8ec2e579e7d710323221171"


describe('participate', function () {
  this.timeout(5000);
  describe('#participate()', function () {
    it('should participate atomic swap', async () => {
      participate("mnopGXXKQdt6mXnwHeRcdWNsaksoqKcvwZ", 0.001, secret, privateKey);
    });
  });
});
