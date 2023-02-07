import * as dotenv from "dotenv";
import { readFileSync, writeFileSync } from "fs";

dotenv.config();

const addresses = readFileSync(`addresses-${process.env.CLAIM_ID}.csv`)
  .toString()
  .split("\n")
  .filter((address) => !!address);

writeFileSync(
  `./addresses-${process.env.CLAIM_ID}.json`,
  JSON.stringify(addresses, null, 2)
);

console.log(
  "\x1b[36m%s\x1b[0m",
  `Successfully created JSON file: ./addresses-${process.env.CLAIM_ID}.json`
);
