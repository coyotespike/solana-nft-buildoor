import * as borsh from "@project-serum/borsh";

export class Stake {
  // because currently the Solana program doesn't really define StakeInstruction
  borshInstructionSchema = borsh.struct([borsh.u8("variant")]);

  static borshAccountSchema = borsh.struct([
    borsh.bool("initialized"),
    borsh.str("name"),
    borsh.str("message"),
  ]);

  serialize(instruction: number): Buffer {
    const buffer = Buffer.alloc(1000);
    this.borshInstructionSchema.encode(
      { ...this, variant: instruction },
      buffer
    );
    return buffer.slice(0, this.borshInstructionSchema.getSpan(buffer));
  }

  static deserialize(buffer?: Buffer): StudentIntro | null {
    throw new Error("Not implemented");
  }
}
