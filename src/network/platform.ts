import { SignatureInformation } from "../config/types";
import { PermitteeSigner } from "../cryptography/permittee-signer";
import { Network } from "../model/network";
import { PermitteeRepresentation } from "../model/permittee-representation";
import axios from 'axios';

export class Platform {

  private network: Network;
  private signer: PermitteeSigner;

  constructor(network: Network) {
    this.network = network;
  }

  public async notarize(representation: PermitteeRepresentation, signatureData: SignatureInformation) {
    return await this.createCertificate(signatureData);
  }

  private async createCertificate(data: SignatureInformation) {
    console.log(`${this.network.apiUrlBase}/certificates`);
    return await axios({
      url: `${this.network.apiUrlBase}/certificates`,
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      data,
    }).then((res) => {
      return res.data;
    }).catch((e) => {
      console.log(JSON.stringify(e));
      return { errors: [{message: e }]};
    });
  }
 
}
