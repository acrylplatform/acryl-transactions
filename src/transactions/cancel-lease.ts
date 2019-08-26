/**
 * @module index
 */
import { TRANSACTION_TYPE, ICancelLeaseTransaction, ICancelLeaseParams, WithId, WithSender } from '../transactions'
import { binary } from '@acryl/marshall'
import { signBytes, blake2b, base58Encode } from '@acryl/ts-lib-crypto'
import { addProof, getSenderPublicKey, convertToPairs, networkByte, fee } from '../generic'
import { TSeedTypes } from '../types'
import { validate } from '../validators'


/* @echo DOCS */
export function cancelLease(params: ICancelLeaseParams, seed: TSeedTypes): ICancelLeaseTransaction & WithId
export function cancelLease(paramsOrTx: ICancelLeaseParams & WithSender | ICancelLeaseTransaction, seed?: TSeedTypes): ICancelLeaseTransaction & WithId
export function cancelLease(paramsOrTx: any, seed?: TSeedTypes): ICancelLeaseTransaction & WithId {
  const type = TRANSACTION_TYPE.CANCEL_LEASE
  const version = paramsOrTx.version || 2
  const seedsAndIndexes = convertToPairs(seed)
  const senderPublicKey = getSenderPublicKey(seedsAndIndexes, paramsOrTx)

  const tx: ICancelLeaseTransaction & WithId = {
    type,
    version,
    senderPublicKey,
    leaseId: paramsOrTx.leaseId,
    fee: fee(paramsOrTx, 100000),
    timestamp: paramsOrTx.timestamp || Date.now(),
    chainId: networkByte(paramsOrTx.chainId, 65),
    proofs: paramsOrTx.proofs || [],
    id: '',
  }
  
  validate.cancelLease(tx)
  
  const bytes = binary.serializeTx(tx)
  
  seedsAndIndexes.forEach(([s, i]) => addProof(tx, signBytes(s, bytes), i))
  tx.id = base58Encode(blake2b(bytes))

  return tx
}
