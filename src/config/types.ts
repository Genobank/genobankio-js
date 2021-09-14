import { Network } from "../model/network"

export type LaboratoryProcedure = {
  code: string;
  internationalName: string,
  results: LaboratoryProcedureResult[],
  descriptionLocalizations: Localization[]
}

export type LaboratoryProcedureResult = {
  code: string,
  internationalName: string,
  descriptionLocalizations: Localization[]
}

export type Localization = {
  language: string,
  translation: string,
}

export type PermitteeRepresentationsInput = {
  network: Network,
  patientName: string,
  patientPassport: string,
  procedure: LaboratoryProcedure,
  procedureResult: LaboratoryProcedureResult,
  procedureSerial: string,
  procedureTime: Date,
  permitteeSerial: number
}

export type SignatureInformation = {
  signature: string,
  claim: string,
  permitteeSerial: number,
}

export type PlatformData = {
  hash: string,
  signature: string,
  txHash: string,
  timestamp: Date
}

export type ValidateResult = {
  success: boolean,
  error: string
}