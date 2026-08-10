export interface OrderRecord {
  id: string;
  orderNumber: string;
  status: "pending" | "confirmed";
  format: "print" | "digital";
  total: string;
  createdAt: string;
  items: { title: string; price: string; quantity: number }[];
  shipping: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    municipality: string;
    ward: string;
    province: string;
    postal: string;
  };
  payment: { txnId: string; payerName: string; payerPhone: string };
  screenshotUrl?: string | null;
}

export const PORTFOLIO_API =
  process.env.NEXT_PUBLIC_PORTFOLIO_API ?? "http://localhost:3000";