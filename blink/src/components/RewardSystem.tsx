import React, { useState, useContext } from 'react';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { createReward, claimReward } from '../utils/programInteractions';
import { AppStateContext } from '../context/AppStateContext';
import LoadingSpinner from './LoadingSpinner';
import { PublicKey } from '@solana/web3.js';

const RewardSystem: React.FC = () => {
  const [rewardAmount, setRewardAmount] = useState('');
  const [rewardId, setRewardId] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const wallet = useAnchorWallet();
  const { setNotification } = useContext(AppStateContext);

  const handleCreateReward = async () => {
    if (!wallet) {
      setNotification({ message: 'Please connect your wallet', type: 'error' });
      return;
    }
    setIsCreating(true);
    try {
      const amount = parseInt(rewardAmount, 10);
      if (isNaN(amount)) {
        throw new Error('Invalid reward amount');
      }
      const rewardPublicKey = await createReward(wallet, amount);
      setNotification({ message: 'Reward created successfully', type: 'success' });
      setRewardAmount('');
      setRewardId(rewardPublicKey.toString());
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error creating reward:', error);
        setNotification({ message: `Failed to create reward: ${error.message}`, type: 'error' });
      } else {
        console.error('Error creating reward:', error);
        setNotification({ message: 'Failed to create reward', type: 'error' });
      }
    } finally {
      setIsCreating(false);
    }
  };

  const handleClaimReward = async () => {
    if (!wallet) {
      setNotification({ message: 'Please connect your wallet', type: 'error' });
      return;
    }
    setIsClaiming(true);
    try {
      await claimReward(wallet, new PublicKey(rewardId));
      setNotification({ message: 'Reward claimed successfully', type: 'success' });
      setRewardId('');
    } catch (error) {
      console.error('Error claiming reward:', error);
      setNotification({ message: 'Failed to claim reward', type: 'error' });
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Reward System</h2>
      <div className="mb-4">
        <input
          type="number"
          placeholder="Reward Amount"
          value={rewardAmount}
          onChange={(e) => setRewardAmount(e.target.value)}
          className="w-full px-3 py-2 mb-2 border rounded-md"
          disabled={isCreating}
        />
        <button
          onClick={handleCreateReward}
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 disabled:bg-gray-400"
          disabled={isCreating}
        >
          {isCreating ? <LoadingSpinner /> : 'Create Reward'}
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Reward ID"
          value={rewardId}
          onChange={(e) => setRewardId(e.target.value)}
          className="w-full px-3 py-2 mb-2 border rounded-md"
          disabled={isClaiming}
        />
        <button
          onClick={handleClaimReward}
          className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 disabled:bg-gray-400"
          disabled={isClaiming}
        >
          {isClaiming ? <LoadingSpinner /> : 'Claim Reward'}
        </button>
      </div>
    </div>
  );
};

export default RewardSystem;
