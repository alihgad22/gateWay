
import { registerEnumType } from '@nestjs/graphql';
import Stripe from 'stripe';
export enum ProductsTypeEnum {
    POS = 'POS',
    KIOSK = 'KIOSK',
    TABLET = 'TABLET'
}
export enum productsType {
    "cashier device" = "prod_SIzCGDfhu25vAS",
    "Cash drawer" = "prod_SIzIlxrgnulDuu",
    "Printer" = "prod_SIzGdXV3w7eBdi",
    "iPad" = "prod_SIzFplT3mK3nu9",
    "KDS" = "prod_SIzEHkZq4Xehzz",
}
export enum ProductsTypeEnum {
    CASHIER_DEVICE = "cashier device",
    CASH_DRAWER = "Cash drawer",
    PRINTER = "Printer",
    IPAD = "iPad",
    KDS = "KDS"
}
registerEnumType(ProductsTypeEnum, {

    name: 'ProductsTypeEnum',
    description: 'The type of product',
});
export enum PlanType {
    FREE = 'FREE',
    BASIC = 'BASIC',
    STANDARD = 'STANDARD',
    PREMIUM = 'PREMIUM',
}
export enum PlanDuration {
    month = 'month',
    quarter = 'quarter',
    year = 'year',
}
export const planIntervalsMap: Record<PlanDuration, Stripe.Price.Recurring.Interval> = {
    [PlanDuration.month]: 'month',
    [PlanDuration.quarter]: 'month',
    [PlanDuration.year]: 'year',
};
export const planIntervalCountMap: Record<PlanDuration, number> = {
    [PlanDuration.month]: 1,
    [PlanDuration.quarter]: 3,
    [PlanDuration.year]: 1,
};
registerEnumType(PlanType, {
    name: 'PlanType',
    description: 'The type of plan',
})
registerEnumType(PlanDuration, {
    name: 'PlanDuration',
    description: 'The duration of the plan',
})
export const devicePriceMap: Record<ProductsTypeEnum, number> = {
    [ProductsTypeEnum.CASHIER_DEVICE]: 10000, // $100.00
    [ProductsTypeEnum.CASH_DRAWER]: 5000,
    [ProductsTypeEnum.PRINTER]: 8000,
    [ProductsTypeEnum.IPAD]: 30000,
    [ProductsTypeEnum.KDS]: 7000,
    [ProductsTypeEnum.POS]: 0,
    [ProductsTypeEnum.KIOSK]: 0,
    [ProductsTypeEnum.TABLET]: 0
};

export const planPriceMap: Record<PlanType, number> = {
    [PlanType.BASIC]: 2000,
    [PlanType.STANDARD]: 4000,
    [PlanType.PREMIUM]: 6000,
    [PlanType.FREE]: 0,
};
export interface ProductPurchase {
    productName: string;
    productDescription: string;
    unitAmount: number;
    quantity: number;
}