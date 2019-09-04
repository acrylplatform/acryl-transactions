import { massTransfer } from '../dist/index'

const seed = 'example seed phrase'

const params = {
  transfers: [
    {
      amount: 100,
      recipient: '3EKhM51MGZrq8FTnvKoTg95srTiC2Votx1B',
    },
    {
      amount: 200,
      recipient: '3EKhM51MGZrq8FTnvKoTg95srTiC2Votx1B',
    },
  ],
  //senderPublicKey: 'by default derived from seed',
  //timestamp: Date.now(),
  //fee: 100000 + transfers.length * 50000,
}

const signedMassTransferTx = massTransfer(params, seed)
console.log(signedMassTransferTx)