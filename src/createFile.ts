import fs from 'fs';

// s3のアップロードは下記のcliで一括でできる.
// cf. https://qiita.com/pokari_dz/items/9f6bc8df8ee4ae65040f
// aws s3 cp ./temp s3://test-bucket-temp3 --recursive
for (let i = 0; i < 10000; i++) {
  fs.writeFileSync(`./temp/${i}.txt`, i);
}

// TODO: sdkでどうやるかも確認したい
