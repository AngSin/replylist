import * as dotenv from "dotenv";
import { readFileSync, writeFileSync } from "fs";

dotenv.config();

const addresses = readFileSync(`addresses-${process.env.CLAIM_ID}.csv`)
  .toString()
  .split("\n");

writeFileSync(
  `./addresses-${process.env.CLAIM_ID}.JSON`,
  JSON.stringify(addresses, null, 2)
);
