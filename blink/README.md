# NexusNFT: Post-Claim Experience Platform

NexusNFT is a decentralized application (dApp) built on the Solana blockchain that enhances the post-claim experience for NFT holders. It allows content creators to register NFTs, create exclusive content, manage access control, and implement a reward system for their community.

## Features

- **NFT Registration**: Register NFTs to be used within the platform.
- **Content Creation**: Create and manage exclusive content for NFT holders.
- **Access Control**: Grant access to specific content based on NFT ownership.
- **Reward System**: Create and distribute rewards to engaged community members.

## Technology Stack

- **Frontend**: Next.js, React, TypeScript
- **Blockchain**: Solana
- **Smart Contract**: Rust (Anchor framework)
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Wallet Integration**: Solana Wallet Adapter

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Yarn package manager
- Solana CLI tools
- Anchor framework

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/nexusnft.git
   cd nexusnft
   ```

2. Install dependencies:
   ```
   yarn install
   ```

3. Set up your Solana wallet and ensure it's funded with SOL for deployment and testing.

4. Build and deploy the Solana program:
   ```
   anchor build
   anchor deploy
   ```

5. Update the `programID` in `src/utils/programInteractions.ts` with the deployed program ID.

6. Start the development server:
   ```
   yarn dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Connect your Solana wallet using the "Connect Wallet" button.
2. Use the NFT Registration component to register your NFTs.
3. Create exclusive content using the Content Creation component.
4. Manage access to your content with the Access Control component.
5. Set up and distribute rewards using the Reward System component.
