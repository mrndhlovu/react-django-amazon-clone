import * as yup from "yup";

import HeroImage from "../../assets/images/hero/AONT_S1_GWBleedingHero_FT_COVIDUPDATE_XSite_1500X600_PV_en-GB._CB406302419_.jpg";
import ToplinkImage from "../../assets/images/products/orders._AC_SR120,80_.jpeg";
import ProductImage from "../../assets/images/products/41ZF+ARVoSL._AC_SL260_.jpg";
import ProductImage1 from "../../assets/images/products/XCM_CUTTLE_1254139_1313820_UK_3293516_186x116_en_GB._SY116_CB407687161_.jpg";
import ProductImage2 from "../../assets/images/products/51DhDfarGbL._AC_SY200_.jpg";
import BookImage from "../../assets/images/products/41zLj7a+gIL._AC_SY200_.jpg";

export const _SEARCH_CATEGORIES = [
  "Books",
  "Beauty",
  "Computers",
  "Electronics",
];

export const _ACCOUNT_OPTIONS = {
  ACCOUNT: [
    { header: "Your Account", redirect: "user-profile" },
    { header: "Your Orders", redirect: "orders" },
    { header: "Your Lists", redirect: "lists" },
  ],
  AUTH: [{ header: "Sign out", redirect: "lists" }],
  LISTS: [
    { header: "Your Shopping List", redirect: "shopping-lists" },
    { header: "Create a list", redirect: "create-list" },
  ],
};

const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

export const DEVICES = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
};

const PASSWORD_VALIDATION = yup.string().required("Required field").min(6);
const NEW_PASSWORD_VALIDATION = yup
  .string()
  .required("New email is a required field")
  .min(6);
const CONFIRM_PASSWORD_FIELD = yup
  .string()
  .required("Confirm email is a required field")
  .min(6);

const EMAIL_VALIDATION = yup
  .string()
  .email("Invalid email")
  .required("Required field");

const PHONE_VALIDATION = yup.string().required("Required field").min(8);

const NAME_VALIDATION = yup
  .string()
  .min(2, "Too Short!")
  .max(70, "Too Long!")
  .required("Required field");

export const PHONE_FORM_VALIDATION = yup.object({
  phone: PHONE_VALIDATION,
});

export const NAME_FORM_VALIDATION = yup.object({
  name: NAME_VALIDATION,
});

export const EMAIL_FORM_VALIDATION = yup.object({
  email: EMAIL_VALIDATION,
});

export const FORM_VALIDATION = {
  REGISTER: yup.object({
    full_name: NAME_VALIDATION,
    email: EMAIL_VALIDATION,
    password: PASSWORD_VALIDATION,
    confirm_password: PASSWORD_VALIDATION,
  }),
  LOGIN: yup.object({
    email: EMAIL_VALIDATION,
    password: PASSWORD_VALIDATION,
  }),
};

const EMAIL_VERIFICATION_STAGE = {
  VALIDATION: yup.object({
    email: EMAIL_VALIDATION,
  }),
  INITIAL_STATE: { email: "" },
  INPUT: {
    type: "email",
    label: "E-mail (phone for mobile accounts)",
  },
  BUTTON_TEXT: "Continue",
  STEPID: "EMAIL",
};

const CONFIRM_PASSWORD_VALIDATION = yup.object({
  password: PASSWORD_VALIDATION,
  confirm_password: PASSWORD_VALIDATION,
});

export const CHANGE_PASSWORD_VALIDATION = yup.object({
  password: PASSWORD_VALIDATION,
  new_password: NEW_PASSWORD_VALIDATION,
  confirm_password: CONFIRM_PASSWORD_FIELD,
});

export const LOGIN_STAGES = {
  EMAIL: EMAIL_VERIFICATION_STAGE,
  PASSWORD: {
    VALIDATION: PASSWORD_VALIDATION,
    INITIAL_STATE: { password: "" },
    INPUT: {
      type: "password",
      label: "Password",
    },
    BUTTON_TEXT: "Sign-In",
    STEPID: "PASSWORD",
  },
};

export const PASSWORD_ASSISTANCE_STAGES = {
  EMAIL: {
    VALIDATION: EMAIL_VERIFICATION_STAGE.VALIDATION,
    INITIAL_STATE: { email: "" },
    HEADER: "Password assistance",
    STEPID: 1,
  },
  OPT: {
    VALIDATION: yup.object({
      otp: yup.string().required("Required field"),
    }),
    INITIAL_STATE: { otp: "" },
    HEADER: "Authentication Required.",
    STEPID: 2,
  },
  NEW_PASSWORD: {
    HEADER: "Create new password",
    VALIDATION: CONFIRM_PASSWORD_VALIDATION,
    INITIAL_STATE: { password: "", confirm_password: "" },
    TIPS: [
      "Use at least 8 characters, a combination of numbers and letters is best",
      "Do not use the same password you have used with us previously.",
      "Do not use dictionary words, your name, e-mail address, mobile phone number or other personal information that can be easily obtained.",
      "Do not use the same password for multiple online accounts.",
    ],
    STEPID: 3,
  },
};

export const IMAGES = {
  CAROUSEL: [
    HeroImage,
    // "https://ndhlovuprofile.s3-eu-west-1.amazonaws.com/amzon-clone/AONT_S1_GWBleedingHero_FT_COVIDUPDATE_XSite_1500X600_PV_en-GB._CB406302419_.jpg",
    // "https://ndhlovuprofile.s3-eu-west-1.amazonaws.com/amzon-clone/BlueField_Price_Perception_Gateway-Hero_1500x600._CB406665980_.jpg",
    // "https://ndhlovuprofile.s3-eu-west-1.amazonaws.com/amzon-clone/N2IxYThmYzAt-MjVlNmIyZTUt-w1500._CB407941419_.jpg",
    // "https://ndhlovuprofile.s3-eu-west-1.amazonaws.com/amzon-clone/UK-EN_070620_EvergreenQ3_ACQ_GW_Hero_D_1500x600_CV9._CB405136406_.jpg",
    // "https://ndhlovuprofile.s3-eu-west-1.amazonaws.com/amzon-clone/new_ft_hero_van._CB430308860_.jpg",
  ],
  PRODUCTS: [
    ToplinkImage,
    ProductImage,
    ProductImage1,
    ProductImage2,
    // "https://ndhlovuprofile.s3-eu-west-1.amazonaws.com/amzon-clone/products/XCM_CUTTLE_1230943_1217242_UK_3156565_379x304_en_GB._SY304_CB428790125_.jpg",
    // "https://ndhlovuprofile.s3-eu-west-1.amazonaws.com/amzon-clone/products/41gBAria4JL._AC_US218_.jpg",
    // "https://ndhlovuprofile.s3-eu-west-1.amazonaws.com/amzon-clone/products/51DhDfarGbL._AC_SY200_.jpg",
    // "https://ndhlovuprofile.s3-eu-west-1.amazonaws.com/amzon-clone/products/51xx9NCutcL._AC_SL1000_.jpg",
  ],
  BOOKS: [BookImage, BookImage, BookImage, BookImage, BookImage, BookImage],
};

export const MANAGE_ACCOUNT_SECTIONS = {
  ACCOUNT: {
    HEADER: "Your Account",
  },

  ORDERS: {
    HEADER: "Your Orders",
  },
  LOGIN_SECURITY: {
    HEADER: "Login & Security",
  },
  ADDRESS: {
    HEADER: "Your Address",
  },
  PAYMENTS: {
    HEADER: "Your Payments",
  },
};
