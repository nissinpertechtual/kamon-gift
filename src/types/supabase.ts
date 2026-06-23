export type Product = {
  id: string;
  name: string;       // 内部管理名（英語可）
  name_ja: string;    // 表示用日本語名
  description_ja: string | null;
  price: number | null;  // null = お見積もり（カスタム注文のみ）
  material: string;
  scene: string | null;  // 'oshi' | 'bridal' | 'inbound' | 'corporate' | null
  images: string[];
  is_active: boolean;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

// 下代（卸価格）。公開DBに置くと匿名キーで読めるため products とは別テーブルに分離し
// RLSで遮断する（service-role 経由でのみ読み書き）。
export type ProductWholesale = {
  product_id: string;
  wholesale_price: number | null;
  updated_at: string;
};

// バイヤー（卸）からの見積もり依頼リード
export type BuyerLead = {
  id: string;
  product_id: string | null;
  product_name: string | null;
  company: string;
  contact_name: string;
  email: string;
  phone: string | null;
  expected_quantity: number | null;
  message: string | null;
  created_at: string;
};

export type Column = {
  id: string;
  title: string;
  body: string;
  image_url: string | null;
  published_at: string | null;
  created_at: string;
};

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'new' | 'in_progress' | 'done';
  product_id: string | null;
  created_at: string;
};

export type Order = {
  id: string;
  inquiry_id: string | null;
  product_id: string | null;
  stripe_session_id: string | null;
  customer_name: string | null;
  customer_email: string | null;
  amount: number;
  status: 'pending' | 'paid' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  note: string | null;
  created_at: string;
};
