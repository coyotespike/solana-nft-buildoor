// Instruction.rs
use solana_program::{ program_error::ProgramError };

// represents each discrete instruction that can be sent to the program
// however there is nothing inside each type
// therefore our client should send nothing but the variant
pub enum StakeInstruction {
    InitializeStakeAccount,
    Stake,
    Redeem,
    Unstake
}

// and now we can implement the unpack function to deserialize the instruction data
impl StakeInstruction {
    pub fn unpack(input: &[u8]) -> Result<Self, ProgramError> {
        let (&variant, _rest) = input.split_first().ok_or(ProgramError::InvalidInstructionData)?;
        Ok(match variant {
            0 => Self::InitializeStakeAccount,
            1 => Self::Stake,
            2 => Self::Redeem,
            3 => Self::Unstake,
            _ => return Err(ProgramError::InvalidInstructionData)
        })
    }
}
