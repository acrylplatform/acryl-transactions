/**
 * @module index
 */
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export { massTransfer } from './transactions/mass-transfer'
export { reissue } from './transactions/reissue'
export { burn } from './transactions/burn'
export { exchange } from './transactions/exchange'
export { lease } from './transactions/lease'
export { cancelLease } from './transactions/cancel-lease'
export { data } from './transactions/data'
export { issue } from './transactions/issue'
export { transfer } from './transactions/transfer'
export { alias } from './transactions/alias'
export { setScript } from './transactions/set-script'
export { setAssetScript } from './transactions/set-asset-script'
export { sponsorship } from './transactions/sponsorship'
export { order } from './requests/order'
export { cancelOrder } from './requests/cancel-order'
export { customData } from './requests/custom-data'
export { auth } from './requests/auth'
export { invokeScript } from './transactions/invoke-script'
export { signTx, verify, serialize, submitOrder, cancelSubmittedOrder, verifyAuthData, verifyCustomData } from './general'
export { waitForTx, broadcast } from './nodeInteraction'


// Export interfaces
export {
  ITransaction,
  TTx,
  TTxParams,
  IAliasTransaction,
  IAliasParams,
  IIssueTransaction,
  IIssueParams,
  IReissueTransaction,
  IReissueParams,
  IBurnTransaction,
  IBurnParams,
  IExchangeTransaction,
  ILeaseTransaction,
  ILeaseParams,
  ICancelLeaseTransaction,
  ICancelLeaseParams,
  ITransferTransaction,
  ITransferParams,
  IMassTransferTransaction,
  IMassTransferParams,
  IMassTransferItem,
  ISetAssetScriptTransaction,
  ISetScriptParams,
  ISponsorshipTransaction,
  ISponsorshipParams,
  IDataTransaction,
  IDataParams,
  IDataEntry,
  ISetScriptTransaction,
  ISetAssetScriptParams,
  IInvokeScriptTransaction,
  IInvokeScriptParams,
  IOrder,
  IOrderV1,
  IOrderV2,
  IOrderV3,
  TOrder,
  IOrderParams,
  ICancelOrder,
  ICancelOrderParams,
  WithId,
  WithSender,
  WithProofs,
  WithTxType,
  WithChainId,
} from './transactions'

export { INodeRequestOptions, IStateChangeResponse } from './nodeInteraction'

export {
  TSeedTypes, TOption
} from './types'

// internal libraries access
import * as crypto from '@acryl/ts-lib-crypto'
import * as marshall from '@acryl/marshall'

const libs = {
  crypto,
  marshall,
}

import * as seedUtils from './seedUtils'
import * as nodeInteraction from './nodeInteraction'
import * as validators from './validators'

export {
  libs,
  seedUtils,
  nodeInteraction,
  validators
}

