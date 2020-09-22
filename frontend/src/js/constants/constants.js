import * as yup from "yup";

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
  INITIAL_STATE: { email: undefined },
  INPUT: {
    type: "email",
    label: "E-mail (phone for mobile accounts)",
  },
  BUTTON_TEXT: "Continue",
  STEPID: 1,
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
    INITIAL_STATE: { password: undefined },
    INPUT: {
      type: "password",
      label: "Password",
    },
    BUTTON_TEXT: "Sign-In",
    STEPID: 2,
  },
};

export const PASSWORD_ASSISTANCE_STAGES = {
  EMAIL: {
    VALIDATION: EMAIL_VERIFICATION_STAGE.VALIDATION,
    INITIAL_STATE: { email: undefined },
    HEADER: "Password assistance",
    STEPID: 1,
  },
  OPT: {
    VALIDATION: yup.object({
      otp: yup.string().required("Required field"),
    }),
    INITIAL_STATE: { otp: undefined },
    HEADER: "Authentication Required.",
    STEPID: 2,
  },
  NEW_PASSWORD: {
    HEADER: "Create new password",
    VALIDATION: CONFIRM_PASSWORD_VALIDATION,
    INITIAL_STATE: { password: undefined, confirm_password: undefined },
    TIPS: [
      "Use at least 8 characters, a combination of numbers and letters is best",
      "Do not use the same password you have used with us previously.",
      "Do not use dictionary words, your name, e-mail address, mobile phone number or other personal information that can be easily obtained.",
      "Do not use the same password for multiple online accounts.",
    ],
    STEPID: 3,
  },
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
