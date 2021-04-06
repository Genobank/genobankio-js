# Blockchain Lab Results Certification

This project demonstrates how to notarize one lab result certification on the blockchain with GenoBank.io. This is written in TypeScript. It can be uses as TypeScript/JavaScript library or can be build as CLI for any platform.

## Development

If you want to contribute here are the main commands.

### Build

`npm run tsc`

### Test

`npm test`

### Compile CLI for all platforms

`npm run pkg`

Compiled CLIs will become available in `/build` folder.

## Usage

If you compile/package the CLI using command in development section you will find compiled CLI version. Depending on the platform you wish to run CLI on you start the CLI by moving in terminal to the `/build` folder and running the cli by typing: `./main-osName` and command. Example for macos: `./main-macos certificates --help`.

Cli has only one command which is `certificates`. By default it uses `test` environment.

Running the cli with option: `certificates --help` will display its usage like so:

```
Usage: main certificates [options] <twelveWordPhase> <permitteeSerial> <patientName> <patientPassport> <procedureCode> <procedureResultCode> <procedureSerial> <timestamp>

This notarizes a laboratory result using the GenoBank.io platform. Running on the production network is billable per your laboratory agreement.

Options:
  -t, --test        Run in test environment.
  -p, --production  Run in production environment.
  -h, --help        display help for command

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

```
