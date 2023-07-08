import CryptoJS from "crypto-js";
import moment from "moment/moment";
import "moment/locale/tr";
moment.locale();

export const dateFormatter = (e?: string) => moment(e).format("LLL");

export const dateDifferenceFormatter = (end: string | moment.Moment, now?: string | moment.Moment) => {
  end = moment(end);
  now = moment(now);
  let dif = moment.duration(now.diff(end));
  return `${dif.days()} Gün ${dif.hours()} Saat ${dif.minutes()} Dakika ${dif.seconds()} Saniye`;
};

export const currencyFormatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  // These options are needed to round to whole numbers if that's what you want.
  // minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  // maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export const testPositiveNumber = (e: string) => {
  return (
    e
      // .replace(/^$/g, "1")
      .replace(/[^0-9]/g, "")
      // .replace(/(0.*?)0.*/g, "$1")
      .replace(/0.*?([0-9])/g, "$1")
      .replace(/([1-9][0-9])([0-9])/g, "$1")
  );
};

export const testMail = (value: string) => {
  return /(^$|^\S+@\S+\.\S+$)/g.test(value);
};

export const testIntNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
  return (e.target.value = e.target.value.replace(/[^0-9]/g, ""));
};

export const testPhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
  return e;
  // return /^[0-9]{0,10}$/.test(e.target.value);
};

export const testIntNegativeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
  return (e.target.value = e.target.value.replace(/[^0-9]/g, "").replace(/((-.*?)-.*)/g, "$1"));
};

export const testFloatNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
  e.target.value = e.target.value
    .replace(",", ".")
    .replace(/[^0-9.]/g, "")
    .replace(/(\..*?)\..*/g, "$1");
  return e;
};

export const encryptValue = (value: any) => {
  const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(value), import.meta.env.VITE_AUTH_SECRET_KEY).toString();
  return encryptedValue;
};

export const decryptValue = (value: any) => {
  try {
    const decryptedValue = CryptoJS.AES.decrypt(value, import.meta.env.VITE_AUTH_SECRET_KEY).toString(CryptoJS.enc.Utf8);
    return decryptedValue;
  } catch (error) {
    return;
  }
};
