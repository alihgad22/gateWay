"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompareHash = exports.Hash = void 0;
const bcrypt = require("bcrypt");
const Hash = (plainText, saltRounds = Number(process.env.SALT_ROUND)) => {
    return bcrypt.hashSync(plainText, saltRounds);
};
exports.Hash = Hash;
const CompareHash = async (plainText, hash) => {
    return await bcrypt.compare(plainText, hash);
};
exports.CompareHash = CompareHash;
//# sourceMappingURL=Hash.helper.js.map