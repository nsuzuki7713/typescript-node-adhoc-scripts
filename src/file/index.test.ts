import fs from 'fs'

describe('file関係の動作確認', () => {
  it('特定のディレクトリのファイルをimportしているかを確認する', () => {
    const regex = new RegExp("usecase");
    const body = fs.readFileSync('./src/file/test.txt', 'utf-8')
    
    expect(regex.test(body)).toBe(true)
  })
})