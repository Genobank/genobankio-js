import { Network } from "../model/network"

export type LaboratoryProcedure = {
  code: string;
  internationalName: string,
  results: LaboratoryProcedureResult[]
}

export type LaboratoryProcedureResult = {
  code: string;
  internationalName: string,
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
