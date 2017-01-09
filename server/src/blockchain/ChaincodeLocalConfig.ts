import { ChaincodeEnvironmentConfiguration, UserConfig, PeerConfig } from './ChaincodeEnvironmentConfiguration';

const clients = require('../../resources/testData.json').clients;

export class ChaincodeLocalConfig {
  public getConfiguration(): ChaincodeEnvironmentConfiguration {
    const users = <UserConfig[]>clients.map((client: any) => {
      return {
        enrollId: client.username,
        role: 'client',
        affiliation: 'institution_a',
        attributes: client.attributes
      };
    });
    users.push({
      enrollId:     'WebAppAdmin',
      enrollSecret: 'DJY27pEnl16d'
    });

    return {
      network:   {
        peers: <PeerConfig[]>[
          {
            discovery_host: 'localhost',
            discovery_port: 7051,
          }
        ],
        ca:    {
          ca: {
            url: 'localhost:7054'
          }
        },
        users: <UserConfig[]>users
      },
      chaincode: {
        keyValStorePath: '../keyValueStore',
        chaincodeIdPath: '../chaincodeId',
        path: '../../blockchain/src/build-chaincode' // The path has to end at 'build-chaincode', because otherwise the references from the running docker chaincode container is incorrect and won't start
      }
    };
  }
}