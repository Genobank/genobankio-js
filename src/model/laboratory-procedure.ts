import { LaboratoryProcedure, LaboratoryProcedureResult, LaboratoryProcedureStatus } from '../config/types';
import * as data from '../config/laboratoryProcedureTaxonomy.json';

export class LaboratoryProcedureTaxonomy {

  public procedures: LaboratoryProcedure[] = [];

  constructor() {
    for (const [key, value] of Object.entries(data.laboratoryProcedureTaxonomy)) {
      const results = [] as LaboratoryProcedureResult[];
      for (const [rKey, rValue] of Object.entries(data.laboratoryProcedureTaxonomy[key].resultsTaxonomy)) {

        const descriptionLocalizations = [];
        
        for (const [dKey, dValue] of Object.entries((rValue as any).descriptionLocalizations)) {
          descriptionLocalizations.push({
            language: dKey,
            translation: dValue
          })
        }
        const procedureResult = {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          internationalName: (rValue as any).internationalName,
          descriptionLocalizations,
          code: rKey
        } as LaboratoryProcedureResult;
  
        results.push(procedureResult);
      }

      const descriptionLocalizations = [];
      for (const [dKey, dValue] of Object.entries((value as any).descriptionLocalizations)) {
        descriptionLocalizations.push({
          language: dKey,
          translation: dValue
        })
      }

      let status = LaboratoryProcedureStatus.ACTIVE;
      if ((value as any).status && (value as any).status === 'deprecated') {
        status = LaboratoryProcedureStatus.DEPRECATED;
      }

      const procedure = {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        internationalName: (value as any).internationalName,
        descriptionLocalizations,
        code: key,
        results,
        status
      } as LaboratoryProcedure;

      this.procedures.push(procedure);    
    }
  }

  public getProcedureDescription(procedure: LaboratoryProcedure, language?: string): string {
    if (!language) {
      language = 'en';
    }

    const translation = procedure.descriptionLocalizations.find((l) => l.language === language);
    if (translation) {
      return translation.translation;
    }

    throw new Error('Unsupported language');
  }

  public getProcedureResultDescription(procedureResult: LaboratoryProcedureResult, language?: string): string {
    if (!language) {
      language = 'en';
    }

    const translation = procedureResult.descriptionLocalizations.find((l) => l.language === language);
    if (translation) {
      return translation.translation;
    }

    throw new Error('Unsupported language');
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