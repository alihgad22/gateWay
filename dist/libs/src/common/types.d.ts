import Stripe from 'stripe';
export declare enum ProductsTypeEnum {
    POS = "POS",
    KIOSK = "KIOSK",
    TABLET = "TABLET"
}
export declare enum productsType {
    "cashier device" = "prod_SIzCGDfhu25vAS",
    "Cash drawer" = "prod_SIzIlxrgnulDuu",
    "Printer" = "prod_SIzGdXV3w7eBdi",
    "iPad" = "prod_SIzFplT3mK3nu9",
    "KDS" = "prod_SIzEHkZq4Xehzz"
}
export declare enum ProductsTypeEnum {
    CASHIER_DEVICE = "cashier device",
    CASH_DRAWER = "Cash drawer",
    PRINTER = "Printer",
    IPAD = "iPad",
    KDS = "KDS"
}
export declare enum PlanType {
    FREE = "FREE",
    BASIC = "BASIC",
    STANDARD = "STANDARD",
    PREMIUM = "PREMIUM"
}
export declare enum PlanDuration {
    month = "month",
    quarter = "quarter",
    year = "year"
}
export declare const planIntervalsMap: Record<PlanDuration, Stripe.Price.Recurring.Interval>;
export declare const planIntervalCountMap: Record<PlanDuration, number>;
export declare const devicePriceMap: Record<ProductsTypeEnum, number>;
export declare const planPriceMap: Record<PlanType, number>;
export interface ProductPurchase {
    productName: string;
    productDescription: string;
    unitAmount: number;
    quantity: number;
}
