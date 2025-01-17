export type TProductType = 'Single Product'| "Variable Product"| "Group Product"| "Affiliate"
export type TProductTypeLists = "General"| "Inventory"| "Shipping"| "Link Product"| "Attributes"



type Delivery = {
  deliveryCharge: number;
  deliveryStatus: "Free" | "Pay";
}

type FeatureImage = {
  images: string[];
  videoUrl?: string;
}

type Price = {
  sellPrice: number;
  productPrice: number;
}

type OfferDate= {
  start_date?: Date;
  end_date?: Date;
  offerPrice: number;
}

type ExtraFeature= {
  label: string;
  value: string;
}

export type TProduct = {
  _id?:string;
  author: string;
  brand?: string[];
  category?: string[];
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