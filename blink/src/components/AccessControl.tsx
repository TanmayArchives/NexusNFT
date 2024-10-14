import React, { useState, useContext } from 'react';
import { PublicKey } from '@solana/web3.js';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { grantAccess } from '../utils/programInteractions';
import { AppStateContext } from '../context/AppStateContext';
import LoadingSpinner from './LoadingSpinner';
import { getContentIds } from '../utils/contentStorage';

const AccessControl: React.FC = () => {
  const [nftMint, setNftMint] = useState('');
  const [contentId, setContentId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const wallet = useAnchorWallet();
  const { setNotification } = useContext(AppStateContext);
  const contentIds = getContentIds();

  const handleGrantAccess = async () => {
    if (!wallet) {
      setNotification({ message: 'Please connect your wallet', type: 'error' });
      return;
    }
    setIsLoading(true);
    try {
      const nftMintPubkey = new PublicKey(nftMint);
      const contentPubkey = new PublicKey(contentId);
      await grantAccess(wallet, nftMintPubkey, contentPubkey);
      setNotification({ message: 'Access granted successfully', type: 'success' });
      setNftMint('');
      setContentId('');
    } catch (error) {
      console.error('Error granting access:', error);
      setNotification({ message: 'Failed to grant access: Invalid public key', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Access Control</h2>
      <input
        type="text"
        placeholder="NFT Mint Address"
        value={nftMint}
        onChange={(e) => setNftMint(e.target.value)}
        className="w-full px-3 py-2 mb-4 border rounded-md"
        disabled={isLoading}
      />
      <select
        value={contentId}
        onChange={(e) => setContentId(e.target.value)}
        className="w-full px-3 py-2 mb-4 border rounded-md"
        disabled={isLoading}
      >
        <option value="">Select Content ID</option>
        {contentIds.map((id) => (
          <option key={id} value={id}>
            {id}
          </option>
        ))}
      </select>
      <button
        onClick={handleGrantAccess}
        className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 disabled:bg-gray-400"
        disabled={isLoading}
      >
        {isLoading ? <LoadingSpinner /> : 'Grant Access'}
      </button>
    </div>
  );
};

export default AccessControl;
