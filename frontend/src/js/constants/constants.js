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

export const LOGIN_STAGES = {
  EMAIL: {
    VALIDATION: yup.object({
      email: yup.string().required(),
    }),
    INITIAL_STATE: { email: undefined },
    INPUT: {
      type: "email",
      label: "E-mail (phone for mobile accounts)",
    },
    BUTTON_TEXT: "Continue",
    STEP: 1,
  },

  PASSWORD: {
    VALIDATION: yup.object({
      password: yup.string().required().min(6),
    }),
    INITIAL_STATE: { password: undefined },
    INPUT: {
      type: "password",
      label: "Password",
    },
    BUTTON_TEXT: "Sign-In",
    STEP: 2,
  },
};
