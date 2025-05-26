"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.planPriceMap = exports.devicePriceMap = exports.planIntervalCountMap = exports.planIntervalsMap = exports.PlanDuration = exports.PlanType = exports.productsType = exports.ProductsTypeEnum = void 0;
const graphql_1 = require("@nestjs/graphql");
var ProductsTypeEnum;
(function (ProductsTypeEnum) {
    ProductsTypeEnum["POS"] = "POS";
    ProductsTypeEnum["KIOSK"] = "KIOSK";
    ProductsTypeEnum["TABLET"] = "TABLET";
})(ProductsTypeEnum || (exports.ProductsTypeEnum = ProductsTypeEnum = {}));
var productsType;
(function (productsType) {
    productsType["cashier device"] = "prod_SIzCGDfhu25vAS";
    productsType["Cash drawer"] = "prod_SIzIlxrgnulDuu";
    productsType["Printer"] = "prod_SIzGdXV3w7eBdi";
    productsType["iPad"] = "prod_SIzFplT3mK3nu9";
    productsType["KDS"] = "prod_SIzEHkZq4Xehzz";
})(productsType || (exports.productsType = productsType = {}));
(function (ProductsTypeEnum) {
    ProductsTypeEnum["CASHIER_DEVICE"] = "cashier device";
    ProductsTypeEnum["CASH_DRAWER"] = "Cash drawer";
    ProductsTypeEnum["PRINTER"] = "Printer";
    ProductsTypeEnum["IPAD"] = "iPad";
    ProductsTypeEnum["KDS"] = "KDS";
})(ProductsTypeEnum || (exports.ProductsTypeEnum = ProductsTypeEnum = {}));
(0, graphql_1.registerEnumType)(ProductsTypeEnum, {
    name: 'ProductsTypeEnum',
    description: 'The type of product',
});
var PlanType;
(function (PlanType) {
    PlanType["FREE"] = "FREE";
    PlanType["BASIC"] = "BASIC";
    PlanType["STANDARD"] = "STANDARD";
    PlanType["PREMIUM"] = "PREMIUM";
})(PlanType || (exports.PlanType = PlanType = {}));
var PlanDuration;
(function (PlanDuration) {
    PlanDuration["month"] = "month";
    PlanDuration["quarter"] = "quarter";
    PlanDuration["year"] = "year";
})(PlanDuration || (exports.PlanDuration = PlanDuration = {}));
exports.planIntervalsMap = {
    [PlanDuration.month]: 'month',
    [PlanDuration.quarter]: 'month',
    [PlanDuration.year]: 'year',
};
exports.planIntervalCountMap = {
    [PlanDuration.month]: 1,
    [PlanDuration.quarter]: 3,
    [PlanDuration.year]: 1,
};
(0, graphql_1.registerEnumType)(PlanType, {
    name: 'PlanType',
    description: 'The type of plan',
});
(0, graphql_1.registerEnumType)(PlanDuration, {
    name: 'PlanDuration',
    description: 'The duration of the plan',
});
exports.devicePriceMap = {
    [ProductsTypeEnum.CASHIER_DEVICE]: 10000,
    [ProductsTypeEnum.CASH_DRAWER]: 5000,
    [ProductsTypeEnum.PRINTER]: 8000,
    [ProductsTypeEnum.IPAD]: 30000,
    [ProductsTypeEnum.KDS]: 7000,
    [ProductsTypeEnum.POS]: 0,
    [ProductsTypeEnum.KIOSK]: 0,
    [ProductsTypeEnum.TABLET]: 0
};
exports.planPriceMap = {
    [PlanType.BASIC]: 2000,
    [PlanType.STANDARD]: 4000,
    [PlanType.PREMIUM]: 6000,
    [PlanType.FREE]: 0,
};
//# sourceMappingURL=types.js.map