export type TProductType = 'Single Product'| "Variable Product"| "Group Product"| "Affiliate"
export type TProductTypeLists = "General"| "Inventory"| "Shipping"| "Link Product"| "Attributes"



interface Delivery {
  deliveryCharge: number;
  deliveryStatus: "Free" | "Pay";
}

interface FeatureImage {
  images: string[];
  videoUrl?: string;
}

type Price = {
  sellPrice: number;
  productPrice: number;
}

interface OfferDate {
  start_date?: Date;
  end_date?: Date;
  offerPrice: number;
}

interface ExtraFeature {
  label: string;
  value: string;
}

export type TProduct = {
  author: string;
  brand?: string;
  category?: string;
  details?: string;
  rating?: number;
  reviews?: number;
  isStock: number;
  isFeature: "Active" | "Inactive";
  delivery: Delivery;
  minStock: number;
  featureImage: FeatureImage;
  imageGallary?: string[];
  name: string;
  product_type: "Physical" | "Digital";
  price: Price;
  offerDate?: OfferDate;
  publish_date: Date;
  sellQuantity: number;
  slug: string;
  skuCode?: string;
  short_details?: string;
  status: "Active" | "Inactive";
  productFeatures?: {
    extraFeatures?: ExtraFeature[];
  };

  // Extra type
  variant:TProductType;
  manageStock: boolean;
  weight: string ;
}