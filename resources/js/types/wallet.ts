import type { WalletIconKey } from "@/constants/wallet-icons";

export interface WalletModel {
  id: number;
  user_id: number;
  name: string;
  type: string | null;
  starting_balance: number;
  current_balance: number;
  color: string | null;
  icon: WalletIconKey | null;
  description?: string | null;
}
