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

export const FORM_VALIDATION = {
  REGISTER: yup.object({
    full_name: yup.string().required().min(8),
    email: yup.string().required(),
    password: yup.string().required().min(6),
    confirm_password: yup.string().required().min(6),
  }),
  LOGIN: yup.object({
    email: yup.string().required(),
    password: yup.string().required().min(6),
  }),
};

const EMAIL_VERIFICATION_STAGE = {
  VALIDATION: yup.object({
    email: yup.string().required(),
  }),
  INITIAL_STATE: { email: undefined },
  INPUT: {
    type: "email",
    label: "E-mail (phone for mobile accounts)",
  },
  BUTTON_TEXT: "Continue",
  STEPID: 1,
};

const PASSWORD_VALIDATION = yup.object({
  password: yup.string().required().min(6),
});

const CONFIRM_PASSWORD_VALIDATION = yup.object({
  password: yup.string().required().min(6),
  confirm_password: yup.string().required().min(6),
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
      otp: yup.string().required(),
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
