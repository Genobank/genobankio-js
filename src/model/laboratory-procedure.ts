import { LaboratoryProcedure, LaboratoryProcedureResult } from '../config/types';
import * as data from '../config/laboratoryProcedureTaxonomy.json';

export class LaboratoryProcedureTaxonomy {

  public procedures: LaboratoryProcedure[] = [];

  constructor() {
    for (const [key, value] of Object.entries(data.laboratoryProcedureTaxonomy)) {
      const results = [] as LaboratoryProcedureResult[];
      for (const [rKey, rValue] of Object.entries(data.laboratoryProcedureTaxonomy[key].resultsTaxonomy)) {
        const procedureResult = {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          internationalName: (rValue as any).internationalName,
          code: rKey
        } as LaboratoryProcedureResult;
  
        results.push(procedureResult);
      }
      const procedure = {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        internationalName: (value as any).internationalName,
        code: key,
        results
      } as LaboratoryProcedure;

      this.procedures.push(procedure);    
    }
  }

  public getProcedureByCode(code: string): LaboratoryProcedure {
    const procedure = this.procedures.find((p) => p.code == code);
    if (!procedure) {
      throw new Error('Unsupported procedure code.');
    }
    return procedure; 
  }

  public getProcedureResultByCode(procedure: string | LaboratoryProcedure, code: string): LaboratoryProcedureResult {
    if (procedure instanceof String) {
      procedure = this.procedures.find((p) => p.code == procedure);
    }

    if (!procedure) {
      throw new Error('Unsupported procedure.');
    }
    
    const procedureResult = (procedure as LaboratoryProcedure).results.find((p) => p.code == code);
    if (!procedureResult) {
      throw new Error('Unsupported procedure result code.');
    }
    
    return procedureResult;
  }

}