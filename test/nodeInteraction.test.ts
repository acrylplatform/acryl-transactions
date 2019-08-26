import * as utilityF from '../src/nodeInteraction'
import { data } from '../src'
import { broadcast } from '../src/nodeInteraction'

const apiBase = 'https://nodestestnet.acrylplatform.com/'

describe('Node interaction utility functions', () => {

  it('should send tx to node', async () => {
    const dataParams = {
      data: [
        {
          key: 'oneTwo',
          value: false,
        },
        {
          key: 'twoThree',
          value: 2,
        },
        {
          key: 'three',
          value: Uint8Array.from([1, 2, 3, 4, 5, 6]),
        },
      ],
      timestamp: 100000,
    }
    const result = data(dataParams, 'seed')

    await expect(broadcast(result, apiBase)).rejects.toMatchObject({ "error": 303})
  })

  it('Should get current height', async () => {
    return expect(utilityF.currentHeight(apiBase)).resolves.toBeGreaterThan(0)
  })

  it('Should wait 1 Block', async () => {
    await utilityF.waitNBlocks(1, { apiBase })
  }, 120000)

  it('Should fail to wait 2 blocks by timeout', async () => {
    await expect(utilityF.waitNBlocks(2, { apiBase, timeout: 5000 })).rejects.toEqual(new Error('Tx wait stopped: timeout'))
  }, 120000)


  it('Should get balance', async () => {
    await expect(utilityF.balance('3JGVZkdiFoYdSDtcNESA1SvPiakQ6KdFAyP', apiBase)).resolves.not.toBeNaN()
    await expect(utilityF.balance('bad address', apiBase)).rejects.toMatchObject({error:102})
  }, 120000)

  it('Should get balanceDetails', async () => {
    await expect(utilityF.balanceDetails('3JGVZkdiFoYdSDtcNESA1SvPiakQ6KdFAyP', apiBase)).resolves.not.toBeFalsy()
  }, 120000)

  it('Should get asset balance', async () => {
    await expect(utilityF.assetBalance('2m119A9Zekkf2DLJbV1w7JDfEfoza4mkTPfKXTdp5Q5a', '3JMHPnwEuH4zaEvV4dJ4pAvE7bQGXSsum6T', apiBase)).resolves.not.toBeFalsy()
  }, 120000)

  it('Should return correct error on invalid address for asset balance', async () => {
    const resp = utilityF.assetBalance('invalidAddress', 'bad address', apiBase)
    await expect(resp).rejects.toMatchObject({error:102})
  }, 120000)

  it('Should get accountData ', async () => {
    await expect(utilityF.accountData('3JGVZkdiFoYdSDtcNESA1SvPiakQ6KdFAyP', apiBase)).resolves.not.toBeFalsy()
  }, 120000)

  it('Should get accountData by key ', async () => {
    const data = await utilityF.accountDataByKey( 'string_value','3JZKWEV9jjkrWXSU8yafKRC2Fe67Jj2mJbd', apiBase)
    expect(data).not.toBeFalsy()
  }, 120000)

  it('Should get accountData by key and return null on no data', async () => {
    const data = await utilityF.accountDataByKey('test23', '3JGVZkdiFoYdSDtcNESA1SvPiakQ6KdFAyP', apiBase)
    expect(data).toBeNull()
  }, 120000)

  it('Should give correct error on invalid address', async () => {
    const data = utilityF.accountDataByKey('test23', 'invalidAddress', apiBase)
    await expect(data).rejects.toMatchObject({error:102})
  }, 120000)

  it('Should get account script info', async () => {
    const data = await utilityF.scriptInfo( '3JGVZkdiFoYdSDtcNESA1SvPiakQ6KdFAyP', apiBase)
    expect(data).toMatchObject({extraFee:0})
  }, 120000)

  // it('Should get invokeTx state changes', async () => {
  //   const data = await utilityF.stateChanges( '5fMWP85dQ5oiRh8DiYBX4sr14CTw3usKyJEeyfpda3dd', apiBase)
  //   expect(Array.isArray(data.data)).toBe(true)
  // }, 120000)
})