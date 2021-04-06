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

function errorColor(str) {
  // Add ANSI escape codes to display text in red.
  return `\x1b[31m${str}\x1b[0m`;
}

program
  .configureOutput({
    // Visibly override write routines as example!
    writeOut: (str) => process.stdout.write(`${str}`),
    writeErr: (str) => process.stdout.write(`${str}`),
    // Highlight errors in color.
    outputError: (str, write) => write(errorColor(str))
  });

program
  .command('certificates')
  .arguments('<twelveWordPhase> <permitteeSerial> <patientName> <patientPassport> <procedureCode> <procedureResultCode> <procedureSerial> <timestamp>')
  .description('This notarizes a laboratory result using the GenoBank.io platform. Running on the production network is billable per your laboratory agreement.')
  .option('-t, --test', 'Run in test environment.')
  .option('-p, --production', 'Run in production environment.')
  .addHelpText('before', `
Blockchain Lab Results Certification
Javascript Certification Example, version 0.0.1
(c) GenoBank.io
  `)
  .addHelpText('after', `
Input:
  twelveWordPhase a space-separated string of your twelve word phrase
  permitteeSerial your GenoBank.io permittee identifier
  patientName must match [A-Za-z0-9 .-]+
  patientPassport must match [A-Z0-9 -]+
  procedureCode must be a procedure key in the Laboratory Procedure Taxonomy
  procedureResultCode must be a result key in the Laboratory Procedure Taxonomy
  procedureSerial must match [A-Z0-9 -]*
  timestamp procedure/sample collection time as number of milliseconds since UNIX epoch

Output:
  A complete URL for the certificate is printed to standard output. 
  Please note: you should keep a copy of this output because you paid for it and nobody else has a copy or can recreate it for you.

References:
  Laboratory Procedure Taxonomy (test): https://genobank.io/certificates/laboratoryProcedureTaxonomy.json
  Laboratory Procedure Taxonomy (production): https://genobank.io/test/certificates/laboratoryProcedureTaxonomy.json
    `)

    
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
