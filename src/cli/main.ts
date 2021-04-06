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

function redColor(str) {
  // Add ANSI escape codes to display text in red.
  return `\x1b[31m${str}\x1b[0m`;
}

function yellowColor(str) {
  // Add ANSI escape codes to display text in red.
  return `\x1b[33m${str}\x1b[0m`;
}

program
  .configureOutput({
    // Highlight errors in color.
    outputError: (str, write) => write(redColor(str))
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
  twelveWordPhase       a space-separated string of your twelve word phrase
  permitteeSerial       your GenoBank.io permittee identifier
  patientName           must match [A-Za-z0-9 .-]+
  patientPassport       must match [A-Z0-9 -]+
  procedureCode         must be a procedure key in the Laboratory Procedure Taxonomy
  procedureResultCode   must be a result key in the Laboratory Procedure Taxonomy
  procedureSerial       must match [A-Z0-9 -]*
  timestamp             procedure/sample collection time as number of milliseconds since UNIX epoch

Output:
  A complete URL for the certificate is printed to standard output. 
  Please note: you should keep a copy of this output because you paid for it and nobody else has a copy or can recreate it for you.

References:
  Laboratory Procedure Taxonomy (test): https://genobank.io/certificates/laboratoryProcedureTaxonomy.json
  Laboratory Procedure Taxonomy (production): https://genobank.io/test/certificates/laboratoryProcedureTaxonomy.json
    `)

    
  .action(async (twelveWordPhase, permitteeSerial, patientName, patientPassport, procedureCode, procedureResultCode, procedureSerial, timestamp, options) => {

    try {
      console.log("Blockchain Lab Results Certification");
      console.log("Javascript Certification Example, version 0.0.1");
      console.log("(c) GenoBank.io\n");

      let networkType = NetworkType.TEST;
      if (options.production) {
        networkType = NetworkType.PRODUCTION;
        console.log(`Network: ${redColor('PRODUCTION NETWORK (BILLABLE)')}`)
      } else {
        console.log(`Network: ${yellowColor('TEST NETWORK')}`)
      }

      const network = new Network(networkType);

      const signer = new PermitteeSigner(twelveWordPhase, parseInt(permitteeSerial));
      console.log(`Address: ${yellowColor(signer.getAddress())}`);

      const taxonomy = new LaboratoryProcedureTaxonomy();
      const procedure = taxonomy.getProcedureByCode(procedureCode);
      const procedureResult = taxonomy.getProcedureResultByCode(procedure, procedureResultCode);
    
      const permittee = new PermitteeRepresentation({
        network,
        patientName,
        patientPassport,
        permitteeSerial,
        procedureTime: new Date(parseInt(timestamp)),
        procedure,
        procedureResult,
        procedureSerial
      });

      console.log(`Patient: ${yellowColor(permittee.patientName)}`);
      console.log(`Passport: ${yellowColor(permittee.patientPassport)}`);
      console.log(`Procedure: ${yellowColor(permittee.procedure.code)}`);
      console.log(`Result: ${yellowColor(permittee.procedureResult.code)}`);
      console.log(`Serial: ${yellowColor(permittee.procedureSerial)}`);
      console.log(`Time: ${yellowColor(permittee.procedureTime.getTime())}`);
    
      const platform = new Platform(network);
    
      const signature = await signer.sign(permittee);
      console.log(`Signature: ${yellowColor(signature.signature)}`);
      console.log('Notarizing on blockchain...');
    
      const res = await platform.notarize(permittee, signature);
      console.log(res);
    } catch (e) {
      console.log(redColor(e));
    }
  });

program.parse(process.argv);
