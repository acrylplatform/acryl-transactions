import { broadcast, sponsorship, transfer, waitForTx } from '../../src'
import { API_BASE, MASTER_SEED, TIMEOUT } from './config'
import { address } from '@acryl/ts-lib-crypto'

describe('Sponsorship', () => {
  let assetId = '28fk28C3dRZBj7z1YWknv391XgNMQNMsizimLYWTnaFh'

  it('Should set sponsorship', async () => {
    const sponTx = sponsorship({ assetId, minSponsoredAssetFee: 100 }, MASTER_SEED)
    await broadcast(sponTx, API_BASE)
    await waitForTx(sponTx.id, { timeout: TIMEOUT, apiBase: API_BASE })

    const ttx = transfer({ recipient: address(MASTER_SEED, 'K'), amount: 1000, feeAssetId: assetId }, MASTER_SEED)
    await broadcast(ttx, API_BASE)
  }, TIMEOUT)

  it('Should remove sponsorship', async () => {
    const sponTx = sponsorship({ assetId, minSponsoredAssetFee: 0 }, MASTER_SEED)
    await broadcast(sponTx, API_BASE)
    await waitForTx(sponTx.id, { timeout: TIMEOUT, apiBase: API_BASE })
    const ttx = transfer({ recipient: address(MASTER_SEED, 'K'), amount: 1000, feeAssetId: assetId }, MASTER_SEED)
    await expect(broadcast(ttx, API_BASE)).rejects
  }, TIMEOUT)
})
