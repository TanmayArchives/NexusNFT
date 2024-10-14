import React, { useState, useContext } from 'react';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { motion } from 'framer-motion';
import NFTRegistration from './NFTRegistration';
import ContentCreation from './ContentCreation';
import AccessControl from './AccessControl';
import RewardSystem from './RewardSystem';
import Notification from './Notification';
import { AppStateContext } from '../context/AppStateContext';

const DashboardContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('nft-registration');
  const { notification, setNotification } = useContext(AppStateContext);

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const tabs = [
    { id: 'nft-registration', label: 'NFT Registration' },
    { id: 'content-creation', label: 'Content Creation' },
    { id: 'access-control', label: 'Access Control' },
    { id: 'reward-system', label: 'Reward System' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-5xl font-bold mb-12 text-center text-gray-800 dark:text-white">Post Claim Experience Dashboard</h1>
      <div className="flex mb-8 justify-center">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            className={`px-6 py-3 rounded-full text-lg font-semibold mr-4 ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
            onClick={() => setActiveTab(tab.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>
      <motion.div
        className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 mb-8"
        variants={tabVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        {activeTab === 'nft-registration' && <NFTRegistration />}
        {activeTab === 'content-creation' && <ContentCreation />}
        {activeTab === 'access-control' && <AccessControl />}
        {activeTab === 'reward-system' && <RewardSystem />}
      </motion.div>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

const Dashboard: React.FC = () => {
  const wallet = useAnchorWallet();

  if (!wallet) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-800 dark:to-indigo-800 text-white">
        <h1 className="text-5xl font-bold mb-12">Connect Your Wallet</h1>
        <WalletMultiButton className="bg-white text-purple-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-purple-400 dark:hover:bg-gray-700 font-bold py-3 px-8 rounded-full text-xl transition duration-300" />
      </div>
    );
  }

  return <DashboardContent />;
};

export default Dashboard;
