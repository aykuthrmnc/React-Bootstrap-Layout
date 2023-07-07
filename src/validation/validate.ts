/* eslint-disable no-template-curly-in-string */
import * as Yup from "yup";

Yup.setLocale({
  mixed: {
    required: "Bu alan zorunludur!",
    notType: (_ref) => {
      switch (_ref.type) {
        case "number":
          return "Girilen değer sayı olmalıdır.";
        case "string":
          return "Girilen  yazı türünde hatalıdır.";
        default:
          return "Girilen değer hatalıdır.";
      }
    },
  },
  string: {
    email: "Geçerli bir e-posta adresi girin!",
    length: "Bu alan ${length} karakter olmalıdır!",
  },
  array: {
    min: "En az bir seçenek içermelidir!",
  },
  number: {
    // @ts-ignore
    typeError: "Bu alan sayı olmalıdır.",
    positive: "Sayı pozitif olmalıdır.",
  },
});

export default Yup;
