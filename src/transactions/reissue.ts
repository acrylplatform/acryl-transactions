/**
 * @module index
 */
import { TRANSACTION_TYPE, IReissueTransaction, IReissueParams, WithId, WithSender } from '../transactions'
import { signBytes, blake2b, base58Encode } from '@acryl/ts-lib-crypto'
import { addProof, convertToPairs, fee, getSenderPublicKey, networkByte } from '../generic'
import { TSeedTypes } from '../types'
import { binary } from '@acryl/marshall'
import { validate } from '../validators'


/* @echo DOCS */
export function reissue(paramsOrTx: IReissueParams, seed: TSeedTypes): IReissueTransaction & WithId
export function reissue(paramsOrTx: IReissueParams & WithSender | IReissueTransaction, seed?: TSeedTypes): IReissueTransaction & WithId
export function reissue(paramsOrTx: any, seed?: TSeedTypes): IReissueTransaction & WithId{
  const type = TRANSACTION_TYPE.REISSUE
  const version = paramsOrTx.version || 2
  const seedsAndIndexes = convertToPairs(seed)
  const senderPublicKey = getSenderPublicKey(seedsAndIndexes, paramsOrTx)

  const tx: IReissueTransaction & WithId = {
    type,
    version,
    senderPublicKey,
    assetId: paramsOrTx.assetId,
    quantity: paramsOrTx.quantity,
    reissuable: paramsOrTx.reissuable,
    chainId: networkByte(paramsOrTx.chainId, 65),
    fee: fee(paramsOrTx,100000000),
    timestamp: paramsOrTx.timestamp || Date.now(),
    proofs: paramsOrTx.proofs || [],
    id: '',
  }
  
  validate.reissue(tx)
  
  const bytes = binary.serializeTx(tx)

  seedsAndIndexes.forEach(([s,i]) => addProof(tx, signBytes(s, bytes),i))
  tx.id = base58Encode(blake2b(bytes))

  return tx
}
