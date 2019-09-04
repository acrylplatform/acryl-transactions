import { lease } from '../dist/index'

const seed = 'example seed phrase'

const params = {
  amount: 100,
  recipient: '3EKhM51MGZrq8FTnvKoTg95srTiC2Votx1B',
  //senderPublicKey: 'by default derived from seed',
  //timestamp: Date.now(),
  //fee: 100000,
}

const signedLeaseTx = lease(params, seed)
console.log(signedLeaseTx)