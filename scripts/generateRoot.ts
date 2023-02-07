import * as dotenv from "dotenv";
import { readFileSync } from "fs";
// @ts-ignore-next-line
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";

dotenv.config();

const addresses = JSON.parse(
  readFileSync(`./addresses-${process.env.CLAIM_ID}.json`, "utf8")
);

console.log(`${addresses.length} addresses were whitelisted`);

const leaves = addresses.map((address: string) => [address]);

const tree = StandardMerkleTree.of(leaves, ["address"]);
console.log("\x1b[36m%s\x1b[0m", `Whitelist HEX: ${tree.root}`);

const leaf = [process.env.WALLET_ADDRESS!!];
const proof = tree.getProof(leaf);

console.log(
  "\x1b[35m",
  `Address ${process.env.WALLET_ADDRESS} with proof: ${proof} is ${
    tree.verify(leaf, proof) ? "" : "not"
  }whitelisted`
);
