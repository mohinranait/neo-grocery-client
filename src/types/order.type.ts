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

  export type TPaymentStatus =  "Pending" | "Paid" | "Failed" | "Refunded";
  export type TOrderStatus = "Pending"| "Processing"| "Shipped"| "Delivered"| "Cancelled" 
  

  export type TFormType = {
    paymentStatus: TPaymentStatus;
    status: TOrderStatus;
  };


  export type TOrder = {
    _id: string;
    shippingAddress: TShippingAddress;
    items: TOrderItem[];
    totalAmount: number;
    status: TOrderStatus;
    paymentStatus:  TPaymentStatus;
    paymentMethod: "COD"| "Card"| "Bank Transfer"
    uid: string;
    email: string;
    phone: string;
    createdAt: string; 
    updatedAt: string; 
  };
  

  