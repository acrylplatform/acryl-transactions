import { cancelOrder, cancelSubmittedOrder, order, submitOrder } from '../../src'
import { MATCHER_PUBLIC_KEY, MATCHER_URL, MASTER_SEED, TIMEOUT } from './config'

describe('Matcher requests', () => {
  const assetId = '28fk28C3dRZBj7z1YWknv391XgNMQNMsizimLYWTnaFh'

  it('should submit and cancel order', async () => {
    const oParams = {
      orderType: 'buy' as 'buy',
      matcherPublicKey: MATCHER_PUBLIC_KEY,
      price: 10000000000000,
      amount: 1000,
      matcherFee: 700000,
      priceAsset: null,
      amountAsset: assetId,
      version: 1
    }

    const ord = order(oParams, MASTER_SEED)
    const submitResp = await submitOrder(ord, MATCHER_URL)
    expect(submitResp.status).toEqual('OrderAccepted')

    const co = cancelOrder({ orderId: ord.id }, MASTER_SEED)
    const cancelResp = await cancelSubmittedOrder(co, ord.assetPair.amountAsset, ord.assetPair.priceAsset, MATCHER_URL)
    expect(cancelResp.status).toEqual('OrderCanceled')
  }, TIMEOUT)

  it('order validation', async () => {
    const order1 = order({
      matcherPublicKey: MATCHER_PUBLIC_KEY,
      //matcherPublicKey: publicKey(seed),
      orderType: 'buy',
      matcherFee: 700000,
      amountAsset: assetId,
      priceAsset: null,
      amount: 1,
      price: 100000000,
      version: 1
    }, MASTER_SEED)

    const order2 = order({
      matcherPublicKey: MATCHER_PUBLIC_KEY,
      //matcherPublicKey: publicKey(seed),
      orderType: 'sell',
      matcherFee: 700000,
      amountAsset: assetId,
      priceAsset: null,
      amount: 1,
      price: 100000000,
      version: 1
    }, MASTER_SEED)
    await submitOrder(order1, MATCHER_URL)
    await submitOrder(order2, MATCHER_URL)

  }, TIMEOUT)
})