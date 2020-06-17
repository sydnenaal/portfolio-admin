import CryptoJS from "crypto-js";

export const encryptData = (item) => {
  const secretKey = 100 + Math.floor((1000 - 100) * Math.random());
  const encryptedData = CryptoJS.AES.encrypt(
    item.toString(),
    secretKey.toString()
  ).toString();

  return `${encryptedData}${secretKey}`;
};
