import { transfer } from '../dist/index'

const seed = 'example seed phrase'

//Transfering 1 Acryl
const params = {
  amount: 100000000,
  recipient: '3EKhM51MGZrq8FTnvKoTg95srTiC2Votx1B',
  //feeAssetId: undefined
  //assetId: undefined
  //attachment: undefined
  //senderPublicKey: 'by default derived from seed',
  //timestamp: Date.now(),
  //fee: 100000,
}

const signedTransferTx = transfer(params, seed)
console.log(signedTransferTx)