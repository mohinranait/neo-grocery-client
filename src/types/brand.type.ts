export type TBrandType = {
    _id?: string;
    name: string;
    slug: string;
    brandBanner?: string;
    brandThumbnail?: string;
    status: "Active" | "Inactive";
    createdAt?: Date;
    updatedAt?: Date;
}