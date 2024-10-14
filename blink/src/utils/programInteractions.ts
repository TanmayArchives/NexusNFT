import { AnchorWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey } from '@solana/web3.js';
import { Program, AnchorProvider, web3, BN, Idl } from '@project-serum/anchor';
import idl from '../../public/idl.json';

// Add this type definition
type PostClaimExperienceProgram = Program<Idl>;

const programID = new PublicKey("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

const getProvider = (wallet: AnchorWallet) => {
  const network = "https://api.devnet.solana.com"; // Change this line
  const connection = new Connection(network, "processed");
  const provider = new AnchorProvider(connection, wallet, { preflightCommitment: "processed" });
  return provider;
};

export const registerNFT = async (wallet: AnchorWallet, nftMint: PublicKey) => {
  const provider = getProvider(wallet);
  const program = new Program(idl as Idl, programID, provider) as PostClaimExperienceProgram;
  await program.methods.registerNft(nftMint)
    .accounts({
      nftRegistry: web3.Keypair.generate().publicKey,
      owner: provider.wallet.publicKey,
      systemProgram: web3.SystemProgram.programId,
    })
    .rpc();
};

export const createContent = async (wallet: AnchorWallet, contentUri: string): Promise<PublicKey> => {
  const provider = getProvider(wallet);
  const program = new Program(idl as Idl, programID, provider) as PostClaimExperienceProgram;
  const contentKeypair = web3.Keypair.generate();
  await program.methods.createContent(contentUri)
    .accounts({
      content: contentKeypair.publicKey,
      creator: provider.wallet.publicKey,
      systemProgram: web3.SystemProgram.programId,
    })
    .signers([contentKeypair])
    .rpc();
  return contentKeypair.publicKey;
};

export const grantAccess = async (wallet: AnchorWallet, nftMint: PublicKey, contentId: PublicKey) => {
  const provider = getProvider(wallet);
  const program = new Program(idl as Idl, programID, provider) as PostClaimExperienceProgram;
  await program.methods.grantAccess(nftMint)
    .accounts({
      accessControl: web3.Keypair.generate().publicKey,
      content: contentId,
      creator: provider.wallet.publicKey,
      systemProgram: web3.SystemProgram.programId,
    })
    .rpc();
};

export const createReward = async (wallet: AnchorWallet, amount: number) => {
  const provider = getProvider(wallet);
  const program = new Program(idl as Idl, programID, provider) as PostClaimExperienceProgram;
  const rewardKeypair = web3.Keypair.generate();
  await program.methods.createReward(new BN(amount))
    .accounts({
      reward: rewardKeypair.publicKey,
      creator: provider.wallet.publicKey,
      systemProgram: web3.SystemProgram.programId,
    })
    .signers([rewardKeypair])
    .rpc();
  return rewardKeypair.publicKey;
};

export const claimReward = async (wallet: AnchorWallet, rewardPublicKey: PublicKey) => {
  const provider = getProvider(wallet);
  const program = new Program(idl as Idl, programID, provider) as PostClaimExperienceProgram;
  await program.methods.claimReward()
    .accounts({
      reward: rewardPublicKey,
      claimer: provider.wallet.publicKey,
    })
    .rpc();
};
