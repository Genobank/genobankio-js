import { Spec } from '@hayspec/spec';
import { NetworkType } from '../config/enums';
import { PermitteeSigner } from '../cryptography/permittee-signer';
import { LaboratoryProcedureTaxonomy } from '../model/laboratory-procedure';
import { Network } from '../model/network';
import { PermitteeRepresentation } from '../model/permittee-representation';
import { Platform } from '../network/platform';

const spec = new Spec<{
}>();

spec.test('Creates test certificate', async (ctx) => {
  const network = new Network(NetworkType.TEST);

  const taxonomy = new LaboratoryProcedureTaxonomy();
  const procedure = taxonomy.getProcedureByCode('10');
  const procedureResult = taxonomy.getProcedureResultByCode(procedure, 'N');

  const permittee = new PermitteeRepresentation({
    network,
    patientName: 'test',
    patientPassport: 'MX',
    permitteeSerial: 41,
    procedureTime: new Date(),
    procedure,
    procedureResult,
    procedureSerial: ''
  });

  const signer = new PermitteeSigner('wrong outside clever wagon father insane boy junk punch duck drift cupboard', 41);

  const platform = new Platform(network);

  const signature = await signer.sign(permittee);
  const res = await platform.notarize(permittee, signature);
  console.log(res);
});

export default spec;
