type TShippingAddress = {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
  };
  
  type TOrderItem = {
    product: string;
    price: number;
    quantity: number;
    sku: string;
    _id: string;
    attributes?: Record<string, string>;
    name?: string; 
    image?: string; 
  };
  
  export type TOrder = {
    _id: string;
    shippingAddress: TShippingAddress;
    items: TOrderItem[];
    totalAmount: number;
    status: "Pending"| "Processing"| "Shipped"| "Delivered"| "Cancelled" 
    paymentStatus: "Pending" | "Paid" | "Failed" | "Refunded"; 
    paymentMethod: "COD"| "Card"| "Bank Transfer"
    uid: string;
    email: string;
    phone: string;
    createdAt: string; 
    updatedAt: string; 
  };
  

  