// Entrypoint.rs
use solana_program::{
    account_info::AccountInfo,
    entrypoint,
    entrypoint::ProgramResult,
    pubkey::Pubkey
};
use crate::processor;

// solana macro
entrypoint!(process_instruction);

// just a convenience function, will pass everything to processor
pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8]
) -> ProgramResult {
    processor::process_instruction(program_id, accounts, instruction_data)?;
    Ok(())
}
