import React, { useState, useContext } from 'react';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { createContent } from '../utils/programInteractions';
import { AppStateContext } from '../context/AppStateContext';
import LoadingSpinner from './LoadingSpinner';

const ContentCreation: React.FC = () => {
  const [contentUri, setContentUri] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const wallet = useAnchorWallet();
  const { setNotification } = useContext(AppStateContext);

  const handleCreateContent = async () => {
    if (!wallet) {
      setNotification({ message: 'Please connect your wallet', type: 'error' });
      return;
    }
    setIsLoading(true);
    try {
      const contentId = await createContent(wallet, contentUri);
      console.log('Content created with ID:', contentId.toString());
      setNotification({ message: 'Content created successfully', type: 'success' });
      setContentUri('');
    } catch (error) {
      console.error('Error creating content:', error);
      setNotification({ message: 'Failed to create content', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Content Creation</h2>
      <input
        type="text"
        placeholder="Content URI"
        value={contentUri}
        onChange={(e) => setContentUri(e.target.value)}
        className="w-full px-3 py-2 mb-4 border rounded-md"
        disabled={isLoading}
      />
      <button
        onClick={handleCreateContent}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        disabled={isLoading}
      >
        {isLoading ? <LoadingSpinner /> : 'Create Content'}
      </button>
    </div>
  );
};

export default ContentCreation;
