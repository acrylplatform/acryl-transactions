import { randomBytes } from '@acryl/ts-lib-crypto'

/**
 * Before running test ensure MASTER_SEED has at leas 10 ACRYL!!
 */
export const MASTER_SEED = 'test acc 2'
export const API_BASE = 'https://nodestestnet.acrylplatform.com'
export const CHAIN_ID = 'K'

export const MATCHER_PUBLIC_KEY = '5yUDiFtdroLGDTbUX7tGeBZCfebDU6TkruH88vNsbi1E'
export const MATCHER_URL = 'https://nodestestnet.acrylplatform.com/'

export const TIMEOUT = 200000

export const randomHexString = (l: number) => [...randomBytes(l)].map(n => n.toString(16)).join('')
