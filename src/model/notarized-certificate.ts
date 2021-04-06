import { PlatformData, SignatureInformation } from "../config/types";
import { Network } from "./network";
import { PermitteeRepresentation } from "./permittee-representation";

export class NotarizedCertificate {

  public network: Network;
  public permitteeRepresentation: PermitteeRepresentation;
  public permitteeSignature: SignatureInformation;
  public platformData: PlatformData;

  constructor(
    permitteeRepresentation: PermitteeRepresentation,
    permitteeSignature: SignatureInformation,
    platformData: PlatformData,
  ) {
    this.permitteeRepresentation = permitteeRepresentation;
    this.network = permitteeRepresentation.network;
    this.permitteeSignature = permitteeSignature;
    this.platformData = platformData;
  }

  public getTightSerialization() {
    return [
      this.permitteeRepresentation.getTightSerialization(),
      this.permitteeSignature.signature,
      this.platformData.timestamp.getTime(),
      this.platformData.signature,
      this.platformData.txHash
    ].join('|');
  }

  public getFullSerialization() {
    return [
      this.permitteeRepresentation.getFullSerialization(),
      this.permitteeSignature.signature,
      this.platformData.timestamp.toISOString(),
      this.platformData.signature,
      this.platformData.txHash
    ].join('|');
  }

  public toUrl() {
    return `${this.network.certificateUrlBase}${this.getTightSerialization()}`;
  }
}