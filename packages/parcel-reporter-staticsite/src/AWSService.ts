import { createReadStream } from "fs";
import { lookup } from "mime-types";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from "@aws-sdk/client-cloudfront";
import { getBranch } from "./utils";

class AWSService {
  private region = "eu-central-1";
  private distributionId = "E19IC7WNEIM0I2";
  private bucket: string;
  private s3 = new S3Client({ region: this.region });
  private cloudFront = new CloudFrontClient({ region: this.region });

  constructor(bucket = "test.valotas.com") {
    this.bucket = bucket;
  }

  upload({ distDir, filePath }: { distDir: string; filePath: string }) {
    const start = Date.now();
    const fileStream = createReadStream(filePath);
    const contentType = lookup(filePath);
    let name = filePath.replace(distDir + "/", "");
    name = name.replace(distDir, "");

    if (!contentType) {
      throw new Error(`Could not determine content type for ${name}`);
    }

    return this.s3
      .send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: name,
          Body: fileStream,
          ContentType: contentType,
        }),
      )
      .then((resp) => ({
        etag: resp.ETag,
        contentType,
        name,
        time: Date.now() - start,
      }));
  }

  uploadRedirection({ from, to }: { from: string; to: string }) {
    const start = Date.now();

    return this.s3
      .send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: from,
          Body: "",
          WebsiteRedirectLocation: `/${to}`,
        }),
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

  invalidateDistribution() {
    if (this.bucket !== "valotas.com") {
      return Promise.resolve({ invalidation: undefined, time: 0 });
    }

    const start = Date.now();

    return this.cloudFront
      .send(
        new CreateInvalidationCommand({
          DistributionId: this.distributionId,
          InvalidationBatch: {
            CallerReference: `${AWSService.name}-${Date.now()}`,
            Paths: {
              Quantity: 1,
              Items: ["/*"],
            },
          },
        }),
      )
      .then(({ Invalidation }) => ({
        distributionId: this.distributionId,
        invalidation: Invalidation,
        time: Date.now() - start,
      }));
  }
}

export async function createAWSService() {
  const branch = await getBranch();

  return new AWSService(
    branch === "master" ? "valotas.com" : "test.valotas.com",
  );
}
