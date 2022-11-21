import * as Web3 from "@solana/web3.js";
import * as fs from "fs";
import dotenv from "dotenv";
import { initializeKeypair, airdropSolIfNeeded } from ".initializeKeypair";
import { Stake } from "./stakeModel";

dotenv.config();

// Program Id: Cv3eAzV3xJLL8RKVd33btPU5WEUVXDVp1DnHRLyLJUAV
const PROGRAM_ID = new Web3.PublicKey(
  "Cv3eAzV3xJLL8RKVd33btPU5WEUVXDVp1DnHRLyLJUAV"
);

async function setUpStake(
  connection: Web3.Connection,
  payer: Web3.Keypair,
  amount: number
) {
  const transaction = new Web3.Transaction();

  const stake = new Stake();

  const buffer = Stake.serialize(0);

  const [pda] = await web3.PublicKey.findProgramAddress(
    [payer.toBuffer()],
    new web3.PublicKey(PROGRAM_ID)
  );
  const instruction = new web3.TransactionInstruction({
    keys: [
      {
        pubkey: publicKey,
        isSigner: true,
        isWritable: false,
      },
      {
        pubkey: pda,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: web3.SystemProgram.programId,
        isSigner: false,
        isWritable: false,
      },
    ],
    data: buffer,
    programId: new web3.PublicKey(PROGRAM_ID),
  });
  transaction.add(instruction);

  try {
    let txid = await sendTransaction(transaction, connection);
    const url = `Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`;
    console.log(url);
  } catch (e) {
    console.log(JSON.stringify(e));
  }
}

async function main() {
  const connection = new Web3.Connection(Web3.clusterApiUrl("devnet"));
  const wallet = await initializeKeypair();

  await airdropSolIfNeeded(wallet, connection);
}

main()
  .then(() => {
    console.log("Finished successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
