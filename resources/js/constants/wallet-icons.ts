import {
  Wallet,
  PiggyBank,
  DollarSign,
  CreditCard,
  Landmark,
  Briefcase,
  TrendingUp,
  Banknote,
  Coins,
  Receipt,
  Shield,
  Smartphone,
  Building2,
  ShoppingBag,
  Gift,
  Heart,
} from "lucide-react";

export const WALLET_ICONS = {
  wallet: Wallet,
  savings: PiggyBank,
  cash: DollarSign,
  card: CreditCard,
  bank: Landmark,
  business: Briefcase,
  investment: TrendingUp,
  income: Banknote,
  coins: Coins,
  expenses: Receipt,
  insurance: Shield,
  mobile: Smartphone,
  property: Building2,
  shopping: ShoppingBag,
  gift: Gift,
  charity: Heart,
} as const;

export type WalletIconKey = keyof typeof WALLET_ICONS;
