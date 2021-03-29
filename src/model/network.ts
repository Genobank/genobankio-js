import { NetworkType } from "../config/enums";

export class Network {

  public namespacePrefix: string;
  public certificateUrlBase: string;
  public apiUrlBase: string;
  public genoBankIoAddress: string;

  constructor (type: NetworkType) {
    if (type == NetworkType.TEST) { 
      this.namespacePrefix = 'io.genobank.test';
      this.certificateUrlBase = 'https://genobank.io/test/certificates/verify-certificate-v1#';
      this.apiUrlBase = 'https://api-test.genobank.io';
      this.genoBankIoAddress = '0x795faFFc58648e435E3bD3196C4F75F8EFc4b306';
    } else if (type == NetworkType.PRODUCTION) {
      this.namespacePrefix = 'io.genobank';
      this.certificateUrlBase = 'https://genobank.io/certificates/verify-certificate-v1#';
      this.apiUrlBase = 'https://api.genobank.io/';
      this.genoBankIoAddress = '0x633F5500A87C3DbB9c15f4D41eD5A33DacaF4184';
    } else {
      throw new Error('Unsupported network type.')
    }
  }
}