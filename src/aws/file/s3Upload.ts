import AWS from 'aws-sdk';

const s3 = new AWS.S3();
for (let i = 0; i < 10; i++) {
  const params: AWS.S3.PutObjectRequest = {
    Bucket: 'test-bucket-temp3',
    Key: `${i}.txt`,
    Body: `${i}`,
  };
  s3.putObject(params).promise();
}
