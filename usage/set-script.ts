import { setScript } from '../dist/index'

const seed = 'example seed phrase'

const params = {
  script: 'AQa3b8tH', //true
  //senderPublicKey: 'by default derived from seed',
  //timestamp: Date.now(),
  //fee: 100000,
  //chainId: 'A'
}

const signedSetScriptTx = setScript(params, seed)
console.log(signedSetScriptTx)