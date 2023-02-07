import * as dotenv from "dotenv";
import * as sha3 from "js-sha3";
import { readFileSync } from "fs";
import MerkleTree from "merkletreejs";

dotenv.config();

const addresses = readFileSync(`./addresses-${process.env.CLAIM_ID}.csv`)
  .toString()
  .split("\n");

const leaves = addresses.map((address: string) => sha3.keccak256(address));

const tree = new MerkleTree(leaves, sha3.keccak256, { sortPairs: true });
console.log("Whitelist HEX:");
console.log(tree.getHexRoot());
