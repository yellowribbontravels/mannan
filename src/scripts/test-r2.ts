import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, "../../.env") });

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_S3_API!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

async function run() {
  console.log("Endpoint:", process.env.R2_S3_API);
  console.log("Bucket:", process.env.R2_BUCKET_NAME);
  try {
    const res = await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: "test-file.txt",
        Body: Buffer.from("hello world"),
        ContentType: "text/plain",
      })
    );
    console.log("Success:", res);
  } catch (e) {
    console.error("Error:", e);
  }
}
run();
