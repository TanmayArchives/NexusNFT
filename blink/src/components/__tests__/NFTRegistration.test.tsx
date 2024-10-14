import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import NFTRegistration from '../NFTRegistration';
import { registerNFT } from '../../utils/programInteractions';
import { AppStateContext } from '../../context/AppStateContext';

jest.mock('../../utils/programInteractions');
jest.mock('@solana/wallet-adapter-react', () => ({
  useAnchorWallet: () => ({ publicKey: 'mock-public-key' }),
}));

const mockSetNotification = jest.fn();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AppStateContext.Provider value={{ notification: null, setNotification: mockSetNotification }}>
    {children}
  </AppStateContext.Provider>
);

describe('NFTRegistration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<NFTRegistration />, { wrapper });
    expect(screen.getByText('NFT Registration')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('NFT Mint Address')).toBeInTheDocument();
    expect(screen.getByText('Register NFT')).toBeInTheDocument();
  });

  it('calls registerNFT when the button is clicked with valid input', async () => {
    (registerNFT as jest.Mock).mockResolvedValue({ success: true });
    
    render(<NFTRegistration />, { wrapper });
    const input = screen.getByPlaceholderText('NFT Mint Address');
    const button = screen.getByText('Register NFT');

    fireEvent.change(input, { target: { value: 'valid-nft-mint' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(registerNFT).toHaveBeenCalledWith(expect.anything(), 'valid-nft-mint');
      expect(mockSetNotification).toHaveBeenCalledWith({
        message: 'NFT registered successfully!',
        type: 'success'
      });
    });
  });

  it('shows error notification when registration fails', async () => {
    (registerNFT as jest.Mock).mockRejectedValue(new Error('Registration failed'));
    
    render(<NFTRegistration />, { wrapper });
    const input = screen.getByPlaceholderText('NFT Mint Address');
    const button = screen.getByText('Register NFT');

    fireEvent.change(input, { target: { value: 'invalid-nft-mint' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(registerNFT).toHaveBeenCalledWith(expect.anything(), 'invalid-nft-mint');
      expect(mockSetNotification).toHaveBeenCalledWith({
        message: 'Failed to register NFT: Registration failed',
        type: 'error'
      });
    });
  });
});
