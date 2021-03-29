import { Command } from 'commander';
import { NetworkType } from '../config/enums';
import { PermitteeSigner } from '../cryptography/permittee-signer';
import { LaboratoryProcedureTaxonomy } from '../model/laboratory-procedure';
import { Network } from '../model/network';
import { PermitteeRepresentation } from '../model/permittee-representation';
import { Platform } from '../network/platform';

const program = new Command();
program
  .version('0.0.1')
  .description('Genobankio-js CLI');

program
  .command('certificates')
  .arguments('<twelveWordPhase> <permitteeSerial> <patientName> <patientPassport> <procedureCode> <procedureResultCode> <procedureSerial> <timestamp>')
  .description('Starts local API for accessing Authtrail.')
  .option("-t, --test', 'Run in test environment.")
  .option("-p, --production', 'Run in production environment.")
  .action(async (twelveWordPhase, permitteeSerial, patientName, patientPassport, procedureCode, procedureResultCode, procedureSerial, timestamp, options) => {
    let networkType = NetworkType.TEST;
    if (options.production) {
      networkType = NetworkType.PRODUCTION;
    }
   
     const network = new Network(networkType);

    const taxonomy = new LaboratoryProcedureTaxonomy();
    const procedure = taxonomy.getProcedureByCode(procedureCode);
    const procedureResult = taxonomy.getProcedureResultByCode(procedure, procedureResultCode);
  
    const permittee = new PermitteeRepresentation({
      network,
      patientName,
      patientPassport,
      permitteeSerial,
      procedureTime: new Date(timestamp),
      procedure,
      procedureResult,
      procedureSerial
    });
  
    const signer = new PermitteeSigner(twelveWordPhase, parseInt(permitteeSerial));
  
    const platform = new Platform(network);
  
    const signature = await signer.sign(permittee);
    const res = await platform.notarize(permittee, signature);
    console.log(res);
  });

program.parse(process.argv);
