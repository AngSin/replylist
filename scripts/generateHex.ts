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
console.log(`Whitelist HEX: ${tree.getHexRoot()}`);

const leaf = sha3.keccak256(process.env.WALLET_ADDRESS!!);
const treeProof = tree.getHexProof(leaf);

console.log(
  `Address ${process.env.WALLET_ADDRESS} is ${
    tree.verify(treeProof, leaf, tree.getRoot().toString("hex")) ? "" : "not"
  }whitelisted`
);
