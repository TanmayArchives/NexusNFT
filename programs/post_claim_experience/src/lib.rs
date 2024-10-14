use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod post_claim_experience {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }

    pub fn register_nft(ctx: Context<RegisterNFT>, nft_mint: Pubkey) -> Result<()> {
        let nft_registry = &mut ctx.accounts.nft_registry;
        nft_registry.owner = ctx.accounts.owner.key();
        nft_registry.nft_mint = nft_mint;
        Ok(())
    }

    pub fn create_content(ctx: Context<CreateContent>, content_uri: String) -> Result<()> {
        let content = &mut ctx.accounts.content;
        content.creator = ctx.accounts.creator.key();
        content.content_uri = content_uri;
        content.is_active = true;
        Ok(())
    }

    pub fn grant_access(ctx: Context<GrantAccess>, nft_mint: Pubkey) -> Result<()> {
        let access_control = &mut ctx.accounts.access_control;
        access_control.nft_mint = nft_mint;
        access_control.content = ctx.accounts.content.key();
        access_control.is_granted = true;
        Ok(())
    }

    pub fn create_reward(ctx: Context<CreateReward>, amount: u64) -> Result<()> {
        let reward = &mut ctx.accounts.reward;
        reward.creator = ctx.accounts.creator.key();
        reward.amount = amount;
        reward.is_claimed = false;
        Ok(())
    }

    pub fn claim_reward(ctx: Context<ClaimReward>) -> Result<()> {
        let reward = &mut ctx.accounts.reward;
        require!(!reward.is_claimed, ErrorCode::RewardAlreadyClaimed);

        // Transfer tokens from reward account to claimer
        // (Implement token transfer logic here)

        reward.is_claimed = true;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
pub struct RegisterNFT<'info> {
    #[account(init, payer = owner, space = 8 + 32 + 32)]
    pub nft_registry: Account<'info, NFTRegistry>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateContent<'info> {
    #[account(init, payer = creator, space = 8 + 32 + 200 + 1)]
    pub content: Account<'info, Content>,
    #[account(mut)]
    pub creator: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct GrantAccess<'info> {
    #[account(init, payer = creator, space = 8 + 32 + 32 + 1)]
    pub access_control: Account<'info, AccessControl>,
    #[account(mut)]
    pub content: Account<'info, Content>,
    #[account(mut)]
    pub creator: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateReward<'info> {
    #[account(init, payer = creator, space = 8 + 32 + 8 + 1)]
    pub reward: Account<'info, Reward>,
    #[account(mut)]
    pub creator: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ClaimReward<'info> {
    #[account(mut)]
    pub reward: Account<'info, Reward>,
    #[account(mut)]
    pub claimer: Signer<'info>,
}

#[account]
pub struct NFTRegistry {
    pub owner: Pubkey,
    pub nft_mint: Pubkey,
}

#[account]
pub struct Content {
    pub creator: Pubkey,
    pub content_uri: String,
    pub is_active: bool,
}

#[account]
pub struct AccessControl {
    pub nft_mint: Pubkey,
    pub content: Pubkey,
    pub is_granted: bool,
}

#[account]
pub struct Reward {
    pub creator: Pubkey,
    pub amount: u64,
    pub is_claimed: bool,
}

#[error_code]
pub enum ErrorCode {
    #[msg("This reward has already been claimed")]
    RewardAlreadyClaimed,
}
