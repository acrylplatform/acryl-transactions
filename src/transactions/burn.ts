/**
 * @module index
 */
import { TRANSACTION_TYPE, IBurnTransaction, IBurnParams, WithId, WithSender } from '../transactions'
import { binary } from '@acryl/marshall'
import { signBytes, blake2b, base58Encode } from '@acryl/ts-lib-crypto'
import { addProof, getSenderPublicKey, convertToPairs, networkByte, fee } from '../generic'
import { TSeedTypes } from '../types'
import { validate } from '../validators'


/* @echo DOCS */
export function burn(params: IBurnParams, seed: TSeedTypes): IBurnTransaction & WithId
export function burn(paramsOrTx: IBurnParams & WithSender | IBurnTransaction, seed?: TSeedTypes): IBurnTransaction & WithId
export function burn(paramsOrTx: any, seed?: TSeedTypes): IBurnTransaction & WithId {
  const type = TRANSACTION_TYPE.BURN
  const version = paramsOrTx.version || 2
  const seedsAndIndexes = convertToPairs(seed)
  const senderPublicKey = getSenderPublicKey(seedsAndIndexes, paramsOrTx)

  const tx: IBurnTransaction & WithId = {
    type,
    version,
    senderPublicKey,
    assetId: paramsOrTx.assetId,
    quantity: paramsOrTx.quantity,
    chainId: networkByte(paramsOrTx.chainId, 65),
    fee: fee(paramsOrTx, 100000),
    timestamp: paramsOrTx.timestamp || Date.now(),
    proofs: paramsOrTx.proofs || [],
    id: '',
  }
  
  validate.burn(tx)
  
  const bytes = binary.serializeTx(tx)

  seedsAndIndexes.forEach(([s, i]) => addProof(tx, signBytes(s, bytes), i))
  tx.id = base58Encode(blake2b(bytes))

  return tx
}
