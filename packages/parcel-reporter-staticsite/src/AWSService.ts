import { createReadStream } from "fs";
import { lookup } from "mime-types";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

class AWSService {
  private region = "eu-central-1";
  private bucket = "test.valotas.com";
  private client = new S3Client({ region: this.region });

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
          Bucket: this.bucket,
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

  async uploadRedirection({ from, to }: { from: string; to: string }) {
    const start = Date.now();

    return this.client
      .send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: from,
          Body: "",
          WebsiteRedirectLocation: `/${to}`,
        })
      )
      .then((resp) => ({
        from,
        to,
        etag: resp.ETag,
        time: Date.now() - start,
      }));
  }

  getPublicUrl() {
    return `http://${this.bucket}.s3-website.${this.region}.amazonaws.com/`;
  }
}

export function createAWSService() {
  return new AWSService();
}
