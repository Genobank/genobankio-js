# Blockchain Lab Results Certification

This project demonstrates how to notarize one lab result certification on the blockchain with GenoBank.io. This is written in TypeScript. It can be uses as TypeScript/JavaScript library or can be build as CLI for any platform.

## Usage

Ready to use version of the CLI already ships in the repository under `./compiled` folder. You can download the whore repository by clicking the green code button and selecting download zip. You can then unzip this folder and depending on the platform you wish to run CLI on you start the CLI by moving in terminal to the `/compiled` folder and running the cli by typing: `./main-osName` and command. Example for macos: `./main-macos certificates --help`.

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

### Example

Usage example for compiled macos cli. 

```
./main-macos certificates 'wrong outside clever wagon father insane boy junk punch duck drift cupboard' 41 'Bob' '1234' '1' 'N' '' 1614069145429
```

## Development

If you want to contribute here are the main commands.

### Prerequisites

1. Supported operating systems are macOS, Linux and Windows
2. Install node js from: https://nodejs.dev/. Only use stable versions.

### Downloading

Get the latest source code from GitHub

``` 
cd ~
mkdir -p Developer
cd Developer
git clone https://github.com/Genobank/genobankio-js.git
cd genobankio-js
```

### Install dependencies 

`npm install`

### Build

`npm run tsc`

If you want to build for browser run:

`npm run webpack` which will result in `./js/genobank.min.js` file.

### Test

`npm test`

### Run

`npm run cli`

### Compile CLI for all platforms

`npm run pkg`

Compiled CLIs will become available in `/compiled` folder.

Note: Only works with node version 10 to 14.
