
export interface User {
  id: string;
  userId: string;
  passwordForUser?: string;
  createdAt: string;
  userSystemTime: number;
  blockchainSelected: string[];
  userSystemActive: Boolean;
  bnbBalance: number;
  btcBalance: number;
  solBalance: number;
  ethBalance: number;
  tonBalance: number;
  trxBalance: number;
  ltcBalance: number;
  userTotalBalance: number;
}


export interface AccountHeaderProps {
  passwordForUser?: string;
  userId: string;
  userTotalBalance: number;
  userSystemActive: Boolean;
}


export interface AccountFooterProps {
  blockchainSelected: string[];
  bnbBalance: number;
  btcBalance: number;
  solBalance: number;
  ethBalance: number;
  tonBalance: number;
  trxBalance: number;
  ltcBalance: number;
}
