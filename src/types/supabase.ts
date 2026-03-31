export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  material: string;
  images: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
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
  customer_name: string;
  customer_email: string;
  total_price: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  note: string | null;
  created_at: string;
};
