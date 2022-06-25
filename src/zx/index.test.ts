import { $ } from 'zx'

// jestが動かないのかもしれない
describe('zx', () => {
    it('動作確認', async () =>{
        const result = await $`git branch`
        console.log(result.stdout)
    } )
})