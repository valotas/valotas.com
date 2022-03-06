import { createReadStream } from "fs";
import { lookup } from "mime-types";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const bucketName = "test.valotas.com";
const region = "eu-central-1";

class AWSService {
  private client = new S3Client({ region });

  async upload({ distDir, filePath }: { distDir: string; filePath: string }) {
    const start = Date.now();
    const fileStream = createReadStream(filePath);
    const contentType = lookup(filePath);
    let name = filePath.replace(distDir + "/", "");
    name = name.replace(distDir, "");

    if (!contentType) {
      throw new Error(`Could not determine content type for ${name}`);
    }

    return this.client
      .send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: name,
          Body: fileStream,
          ContentType: contentType,
        })
      )
      .then((resp) => ({
        etag: resp.ETag,
        contentType,
        name,
        time: Date.now() - start,
      }));
  }

  getPublicUrl() {
    return `http://${bucketName}.s3-website.${region}.amazonaws.com/`;
  }
}

export function createAWSService() {
  return new AWSService();
}
