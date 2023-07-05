import S3 from 'aws-sdk/clients/s3';

export default abstract class AwsSdk {
    private static s3 = new S3({
        endpoint: process.env.BUCKET_ENDPOINT,
        credentials: {
            accessKeyId: process.env.BUCKET_KEYID!,
            secretAccessKey: process.env.BUCKET_KEY!
        }
    })
    private static bucket = 'b-bucket'

    static async upload(Key: string, Body: Buffer, ContentType: string) {
        const file = await this.s3.upload({ Bucket: this.bucket, Key, Body, ContentType }).promise()
        return { url: file.Location }
    }

    static async findAll() {
        const files = await this.s3.listObjects({ Bucket: this.bucket }).promise()
        const filesUrls = files.Contents!.map((element => {
            return { url: `${process.env.BUCKET_URL}${element.Key}`, path: element.Key }
        }))
        return filesUrls
    }

    static async findOne(Key: string) {
        const file = await this.s3.getObject({ Bucket: this.bucket, Key }).promise()
        return file
    }

    static async delete(Key: string) {
        await this.s3.deleteObject({ Bucket: this.bucket, Key }).promise()
    }
}