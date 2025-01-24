import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Readable } from 'stream';
@Injectable()
export class S3Storage {
    private s3Client: S3Client;

    constructor() {
        this.s3Client = new S3Client({
            endpoint: 'http://host.docker.internal:4566',
            region: 'us-east-1',
            forcePathStyle: true,
            credentials: {
                accessKeyId: '000000000001',
                secretAccessKey: '000000000001',
            },
        });
    }

    async uploadFile(buffer: Buffer, filename: string): Promise<{ bucket: string, key: string }> {
        filename = `${Date.now()}_${filename}`
        const command = new PutObjectCommand({
            Bucket: 'files-transaction',
            Key: filename,
            Body: buffer,
        });

        try {
            await this.s3Client.send(command);
            return {
                bucket: 'files-transaction',
                key: filename
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    async generatePresignedUrl(bucketName: string, objectKey: string, expiresIn: number): Promise<string> {
        const command = new GetObjectCommand({ Bucket: bucketName, Key: objectKey });
        const url = await getSignedUrl(this.s3Client, command, { expiresIn });
        return url;
    }

    async readFileInChunks(bucketName: string, objectKey: string, callbackData, callbackError, callbackEnd, callbackInit): Promise<void> {
        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: objectKey,
        });

        const data = await this.s3Client.send(command);
        const fileStream = data.Body as Readable;

        callbackInit();

        fileStream.on('data', (chunk) => {
            callbackData(chunk);
        });

        fileStream.on('end', (chunk) => {
            callbackEnd(chunk);
        });


        fileStream.on('error', (err) => {
            callbackError(err);
        });
    }
}
