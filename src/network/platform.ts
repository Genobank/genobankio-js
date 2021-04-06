import { SignatureInformation } from "../config/types";
import { PermitteeSigner } from "../cryptography/permittee-signer";
import { Network } from "../model/network";
import { PermitteeRepresentation } from "../model/permittee-representation";
import axios from 'axios';
import { NotarizedCertificate } from "../model/notarized-certificate";

export class Platform {

  private network: Network;
  private signer: PermitteeSigner;

  constructor(network: Network) {
    this.network = network;
  }

  public async notarize(representation: PermitteeRepresentation, signatureData: SignatureInformation): Promise<NotarizedCertificate> {
    const res = await this.createCertificate(signatureData);
    if (res.errors) {
      throw new Error(res.errors);
    } else {
      return new NotarizedCertificate(
        representation,
        signatureData,
        {
          hash: res.data.genobankHash,
          signature: res.data.genobankSignature,
          timestamp: new Date(res.data.timestamp),
          txHash: res.data.txHash
        }
      );
    }
  }

  private async createCertificate(data: SignatureInformation) {
   return axios({
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
