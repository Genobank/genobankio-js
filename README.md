[![Node.js CI](https://github.com/Genobank/genobankio-js/actions/workflows/main.yml/badge.svg)](https://github.com/Genobank/genobankio-js/actions/workflows/main.yml)

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

## Specification

The specification for Certificates is published at https://docs.genobank.io/certificates/.

## Development

If you want to contribute here are the main commands.

Main branch is used for development.

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

## Release process

All steps below must be done or detailed issues created on the same day.

1. Create a [release tag and GitHub release](https://github.com/Genobank/genobankio-js/releases)
2. Update all supported front-end clients
  1. Somos
  2. https://github.com/Genobank/portunus.io
  3. https://github.com/Genobank/laboratory-asombroso
  4. https://github.com/Genobank/mds-certificados
3. Update [documentation for GitHub certificates](https://docs.genobank.io/certificates/)
  1. Update version number there and anything else that needs updating
4. Update all other certificates implementations (since this JS repo is the reference implementation) and make releases with the same version number
  1. https://github.com/Genobank/genobankio-dot-net
  2. https://github.com/Genobank/genobankioj
  3. https://github.com/Genobank/genobankio-php

We are using GitHub to host our releases. This is done in a way that a GitHub branch that corresponds with release version is created where the version code is hosted.

### Instructions

When main branch is ready for a new release:

1. Create a new branch from main branch with desired version name.
2. On this branch generate webpack with `npm run webpack` and commit it.
3. On this branch build CLI with: `npm run pkg`.
4. On Github create a new Release and attach files locates in `/compiled` folder (this was generated in step 3) as well as `./js/genobank.min.js` file.
5. Use `https://cdn.jsdelivr.net/gh/Genobank/genobankio-js@1.0.0/js/genobank.min.js` link for serving files. Replace `1.0.0` in the link with the new version.
6. If you need SRI link you can use https://www.srihash.org/ to generate it.
