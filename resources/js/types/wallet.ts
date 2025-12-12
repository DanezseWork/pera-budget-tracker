// resources/js/types/wallet.ts
export interface WalletModel {
  id: number;
  user_id: number;
  name: string;
  type: string | null;
  starting_balance: number;
  current_balance: number;
  color: string | null;
  icon?: string | null;
  description?: string | null;
}
