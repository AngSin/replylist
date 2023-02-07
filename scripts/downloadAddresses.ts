import * as dotenv from "dotenv";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import * as fs from "fs"; // ES Modules import

dotenv.config();

const client = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY as string,
    secretAccessKey: process.env.SECRET_ACCESS_KEY as string,
  },
});
const command = new GetObjectCommand({
  Bucket: "quiz-wallets",
  Key: `${process.env.CLAIM_ID}.csv`,
});

const downloadAddresses = async () => {
  console.log(`downloading file ${process.env.CLAIM_ID}.csv ...`);
  const response = await client.send(command);
  console.log(
    "\x1b[36m%s\x1b[0m",
    `successfully downloaded and wrote file into addresses-${process.env.CLAIM_ID}.csv`
  );
  const addresses = ((await response.Body?.transformToString()) || "")
    .replaceAll("\n\n", "\n")
    .replaceAll("undefined\n", "");
  fs.writeFileSync(`./addresses-${process.env.CLAIM_ID}.csv`, addresses);
};

downloadAddresses();
