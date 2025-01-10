export type TUserType = {
    name: {
        firstName: string;
        lastName: string;
    };
    email: string;
    verify: {
        email: boolean;
        phone: boolean;
    };
    phone?: string;
    password: string;
    profile?: string; 
    role: "Admin" | "User" | "Manager";
    status: "Active" | "Pending" | "Banned";
    age?: number;
    gender: "Male" | "Female" | "Other";
}