import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export async function uploadToS3(file: Buffer, fileName: string): Promise<string> {
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: `products/${fileName}`,
        Body: file,
        ACL: "public-read",
        ContentType: 'image/jpeg',
    });

    await s3Client.send(command);

    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/products/${fileName}`;
}

export async function deleteFromS3(fileUrl: string) {
    const key = fileUrl.split('.com/')[1];
    const command = new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: key,
    });

    await s3Client.send(command);
}