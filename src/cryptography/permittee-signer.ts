import { Wallet } from "ethers";
import { SignatureInformation } from "../config/types";
import { PermitteeRepresentation } from "../model/permittee-representation";

export class PermitteeSigner {

  private wallet = null;
  private permitteeSerial: number;

  constructor(twelveWordPassphrase: string, permitteeSerial: number) {
    this.wallet = Wallet.fromMnemonic(twelveWordPassphrase);
    this.permitteeSerial = permitteeSerial;
  }

  public async sign(representation: PermitteeRepresentation) {
    const serialized = representation.getFullSerialization();
    const claim = representation.getClaim();
    const signature = await this.wallet.signMessage(serialized);
    return {
      signature,
      permitteeSerial: this.permitteeSerial,
      claim
    } as SignatureInformation;
  }

  public getAddress() {
    return this.wallet.address;
  }
}