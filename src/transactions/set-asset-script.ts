/**
 * @module index
 */
import {
  TRANSACTION_TYPE,
  ISetAssetScriptTransaction,
  ISetAssetScriptParams,
  WithId,
  WithSender
} from '../transactions'
import { signBytes, blake2b, base58Encode, } from '@acryl/ts-lib-crypto'
import { addProof, getSenderPublicKey, base64Prefix, convertToPairs, networkByte, fee } from '../generic'
import { TSeedTypes } from '../types'
import { binary } from '@acryl/marshall'
import { validate } from '../validators'


/* @echo DOCS */
export function setAssetScript(params: ISetAssetScriptParams, seed: TSeedTypes): ISetAssetScriptTransaction & WithId
export function setAssetScript(paramsOrTx: ISetAssetScriptParams & WithSender | ISetAssetScriptTransaction, seed?: TSeedTypes): ISetAssetScriptTransaction & WithId
export function setAssetScript(paramsOrTx: any, seed?: TSeedTypes): ISetAssetScriptTransaction & WithId {
  const type = TRANSACTION_TYPE.SET_ASSET_SCRIPT
  const version = paramsOrTx.version || 1
  const seedsAndIndexes = convertToPairs(seed)
  const senderPublicKey = getSenderPublicKey(seedsAndIndexes, paramsOrTx)
  if (paramsOrTx.script == null) throw new Error('Asset script cannot be empty')

  const tx: ISetAssetScriptTransaction & WithId = {
    type,
    version,
    senderPublicKey,
    assetId: paramsOrTx.assetId,
    chainId: networkByte(paramsOrTx.chainId, 65),
    fee: fee(paramsOrTx, 100000000),
    timestamp: paramsOrTx.timestamp || Date.now(),
    proofs: paramsOrTx.proofs || [],
    id: '',
    script: base64Prefix(paramsOrTx.script),
  }
  
  validate.setAssetScript(tx)
  
  const bytes = binary.serializeTx(tx)

  seedsAndIndexes.forEach(([s, i]) => addProof(tx, signBytes(s, bytes), i))
  tx.id = base58Encode(blake2b(bytes))

  return tx
}
