import { LaboratoryProcedure, LaboratoryProcedureResult, PermitteeRepresentationsInput } from "../config/types";
import { Network } from "./network";
import { utils } from 'ethers';

export class PermitteeRepresentation {
  
  private versionCode = 'V1';
  private namespaceSuffix = '.certificates.v1.permittee-certification';

  public network: Network;
  public patientName: string;
  public patientPassport: string;
  public procedure: LaboratoryProcedure;
  public procedureResult: LaboratoryProcedureResult;
  public procedureSerial: string;
  public procedureTime: Date;
  public permitteeSerial: number;

  constructor(data: PermitteeRepresentationsInput) {
    this.network = data.network;

    const vPatientName = this.validatePatientName(data.patientName)
    if (!vPatientName.success) {
      throw new Error(vPatientName.error);
    }
    this.patientName = data.patientName;

    const vPatientPassport = this.validatePatientPassport(data.patientPassport)
    if (!vPatientPassport.success) {
      throw new Error(vPatientPassport.error);
    }
    this.patientPassport = data.patientPassport;

    const vSerial = this.validateProcedureSerialNumber(data.procedureSerial)
    if (!vSerial.success) {
      throw new Error(vSerial.error);
    }
    this.procedureSerial = data.procedureSerial;
    this.procedureTime = data.procedureTime;
    this.permitteeSerial = data.permitteeSerial;
    this.procedure = data.procedure;
    this.procedureResult = data.procedureResult;
  }

  public validatePatientPassport(patientPassport: string) {
    const regex = /^[A-Z0-9 -]+$/g; // A–Z, 0–9, space, -
    const patientPassportRes = regex.exec(patientPassport);
  
    let data = {
      success: true,
      error: null
    }
  
    if (patientPassport == '') {
      data.success = false;
      data. error = 'Input field is empty.';
    } else if (!patientPassportRes || patientPassportRes.length != 1) {
      data.success = false;
      data.error = 'Input field containes characters that are not allowed.';
    }
  
    return data;
  }
  public validatePatientName(patientName: string) {
    const regex = /^[A-Za-z0-9 -.]+$/g; // A–Z, a–z, 0–9, space, -, .
    const patientNameRes = regex.exec(patientName);
  
    let data = {
      success: true,
      error: null
    }
  
    if (patientName == '') {
      data.success = false;
      data.error = 'Input field is empty.';
    } else if (!patientNameRes || patientNameRes.length != 1) {
      data.success = false;
      data.error = 'Input field containes characters that are not allowed.';
    }
  
    return data;
  }
  
  public validateProcedureSerialNumber(procedureSerial: string) {
    const regex = /^[A-Z0-9 -]*$/g; // A–Z, 0–9, space, -
    const procedureSerialRes = regex.exec(procedureSerial);
  
    let data = {
      success: true,
      error: null
    }
  
    if (!procedureSerialRes || procedureSerialRes.length != 1) {
      data.success = false;
      data.error = 'Input field containes characters that are not allowed.';
    }
    
    return data;
  }

  public getTightSerialization() {
    return [
      this.patientName,
      this.patientPassport,
      this.procedure.code,
      this.procedureResult.code,
      this.procedureSerial,
      this.procedureTime.getTime(),
      this.permitteeSerial,
    ].join('|');
  }

  public getFullSerialization() {
    return [
      `${this.network.namespacePrefix}${this.namespaceSuffix}`,
      this.patientName,
      this.patientPassport,
      this.procedure.internationalName,
      this.procedureResult.internationalName,
      this.procedureSerial,
      this.procedureTime.toISOString(),
      this.permitteeSerial,
    ].join('|');
  }

  public getClaim() {
    return utils.hashMessage(this.getFullSerialization());
  }

}