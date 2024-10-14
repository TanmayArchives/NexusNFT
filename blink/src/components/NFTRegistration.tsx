import React, { useState, useContext } from 'react';
import { PublicKey } from '@solana/web3.js';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { registerNFT } from '../utils/programInteractions';
import { AppStateContext } from '../context/AppStateContext';
import LoadingSpinner from './LoadingSpinner';

const NFTRegistration: React.FC = () => {
  const [nftMint, setNftMint] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const wallet = useAnchorWallet();
  const { setNotification } = useContext(AppStateContext);

  const handleRegister = async () => {
    if (!wallet) return;
    setIsLoading(true);
    try {
      await registerNFT(wallet, new PublicKey(nftMint));
      setNotification({ message: 'NFT registered successfully', type: 'success' });
      setNftMint('');
    } catch (error) {
      console.error('Error registering NFT:', error);
      setNotification({ message: 'Failed to register NFT', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">NFT Registration</h2>
      <input
        type="text"
        placeholder="NFT Mint Address"
        value={nftMint}
        onChange={(e) => setNftMint(e.target.value)}
        className="w-full px-3 py-2 mb-4 border rounded-md"
        disabled={isLoading}
      />
      <button
        onClick={handleRegister}
        className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 disabled:bg-gray-400"
        disabled={isLoading}
      >
        {isLoading ? <LoadingSpinner /> : 'Register NFT'}
      </button>
    </div>
  );
};

export default NFTRegistration;
