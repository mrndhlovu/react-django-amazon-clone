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
    { header: "Your Orders", redirect: "user-profile?flowId=orders" },
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

const TEXT_VALIDATION = yup.string().required("Required field").min(2);

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

export const ADDRESS_SCHEMA = {
  INITIAL_STATE: {
    addressLine1: "",
    addressLine2: "",
    city: "",
    county: "",
    postcode: "",
    phone_number: "",
  },
  VALIDATION: yup.object({
    postcode: TEXT_VALIDATION,
    addressLine1: TEXT_VALIDATION,
    addressLine2: yup.string(),
    city: TEXT_VALIDATION,
    county: TEXT_VALIDATION,
    phone_number: PHONE_VALIDATION,
  }),
};

export const PAYMENT_CARD_VALIDATION = yup.object({
  card_name: TEXT_VALIDATION,
  card_number: TEXT_VALIDATION,
});

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
  TOP_LINK: {
    link1:
      "https://ndhlovuprofile.s3-eu-west-1.amazonaws.com/amzon-clone/thumbnails/boxes-tn.jpeg",
    link2:
      "https://ndhlovuprofile.s3-eu-west-1.amazonaws.com/amzon-clone/thumbnails/book-tn.jpg",
    link3:
      "https://ndhlovuprofile.s3-eu-west-1.amazonaws.com/amzon-clone/thumbnails/speaker-tn.jpeg",
    link4:
      "https://ndhlovuprofile.s3-eu-west-1.amazonaws.com/amzon-clone/thumbnails/laptop-tn.jpeg",
  },
  CAROUSEL: [
    "https://ndhlovuprofile.s3-eu-west-1.amazonaws.com/amzon-clone/AONT_S1_GWBleedingHero_FT_COVIDUPDATE_XSite_1500X600_PV_en-GB._CB406302419_.jpg",
    "https://ndhlovuprofile.s3-eu-west-1.amazonaws.com/amzon-clone/BlueField_Price_Perception_Gateway-Hero_1500x600._CB406665980_.jpg",
    "https://ndhlovuprofile.s3-eu-west-1.amazonaws.com/amzon-clone/N2IxYThmYzAt-MjVlNmIyZTUt-w1500._CB407941419_.jpg",
    "https://ndhlovuprofile.s3-eu-west-1.amazonaws.com/amzon-clone/UK-EN_070620_EvergreenQ3_ACQ_GW_Hero_D_1500x600_CV9._CB405136406_.jpg",
    "https://ndhlovuprofile.s3-eu-west-1.amazonaws.com/amzon-clone/new_ft_hero_van._CB430308860_.jpg",
  ],
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

export const PRODUCT_FILTER_OPTIONS = {
  PRICE: [
    { low: "Under", high: 15 },
    { low: 15, high: 50 },
    { low: 50, high: 100 },
    { low: 100, high: 200 },
    { low: 200, high: 500 },
  ],
  STARS: [4, 3, 2, 1],
};

export const CHECKOUT_STAGES = {
  ADDRESS: { header: "Select a delivery address", key: "address" },
  CONFIRM: { header: "Confirm address and order", key: "confirm" },
  PAY: { header: "Complete your order.", key: "complete" },
};

export const COUNTRIES = [
  {
    name: "Afghanistan",
    code: "AF",
  },
  {
    name: "Åland Islands",
    code: "AX",
  },
  {
    name: "Albania",
    code: "AL",
  },
  {
    name: "Algeria",
    code: "DZ",
  },
  {
    name: "American Samoa",
    code: "AS",
  },
  {
    name: "AndorrA",
    code: "AD",
  },
  {
    name: "Angola",
    code: "AO",
  },
  {
    name: "Anguilla",
    code: "AI",
  },
  {
    name: "Antarctica",
    code: "AQ",
  },
  {
    name: "Antigua and Barbuda",
    code: "AG",
  },
  {
    name: "Argentina",
    code: "AR",
  },
  {
    name: "Armenia",
    code: "AM",
  },
  {
    name: "Aruba",
    code: "AW",
  },
  {
    name: "Australia",
    code: "AU",
  },
  {
    name: "Austria",
    code: "AT",
  },
  {
    name: "Azerbaijan",
    code: "AZ",
  },
  {
    name: "Bahamas",
    code: "BS",
  },
  {
    name: "Bahrain",
    code: "BH",
  },
  {
    name: "Bangladesh",
    code: "BD",
  },
  {
    name: "Barbados",
    code: "BB",
  },
  {
    name: "Belarus",
    code: "BY",
  },
  {
    name: "Belgium",
    code: "BE",
  },
  {
    name: "Belize",
    code: "BZ",
  },
  {
    name: "Benin",
    code: "BJ",
  },
  {
    name: "Bermuda",
    code: "BM",
  },
  {
    name: "Bhutan",
    code: "BT",
  },
  {
    name: "Bolivia",
    code: "BO",
  },
  {
    name: "Bosnia and Herzegovina",
    code: "BA",
  },
  {
    name: "Botswana",
    code: "BW",
  },
  {
    name: "Bouvet Island",
    code: "BV",
  },
  {
    name: "Brazil",
    code: "BR",
  },
  {
    name: "British Indian Ocean Territory",
    code: "IO",
  },
  {
    name: "Brunei Darussalam",
    code: "BN",
  },
  {
    name: "Bulgaria",
    code: "BG",
  },
  {
    name: "Burkina Faso",
    code: "BF",
  },
  {
    name: "Burundi",
    code: "BI",
  },
  {
    name: "Cambodia",
    code: "KH",
  },
  {
    name: "Cameroon",
    code: "CM",
  },
  {
    name: "Canada",
    code: "CA",
  },
  {
    name: "Cape Verde",
    code: "CV",
  },
  {
    name: "Cayman Islands",
    code: "KY",
  },
  {
    name: "Central African Republic",
    code: "CF",
  },
  {
    name: "Chad",
    code: "TD",
  },
  {
    name: "Chile",
    code: "CL",
  },
  {
    name: "China",
    code: "CN",
  },
  {
    name: "Christmas Island",
    code: "CX",
  },
  {
    name: "Cocos (Keeling) Islands",
    code: "CC",
  },
  {
    name: "Colombia",
    code: "CO",
  },
  {
    name: "Comoros",
    code: "KM",
  },
  {
    name: "Congo",
    code: "CG",
  },
  {
    name: "Congo, The Democratic Republic of the",
    code: "CD",
  },
  {
    name: "Cook Islands",
    code: "CK",
  },
  {
    name: "Costa Rica",
    code: "CR",
  },
  {
    name: 'Cote D"Ivoire',
    code: "CI",
  },
  {
    name: "Croatia",
    code: "HR",
  },
  {
    name: "Cuba",
    code: "CU",
  },
  {
    name: "Cyprus",
    code: "CY",
  },
  {
    name: "Czech Republic",
    code: "CZ",
  },
  {
    name: "Denmark",
    code: "DK",
  },
  {
    name: "Djibouti",
    code: "DJ",
  },
  {
    name: "Dominica",
    code: "DM",
  },
  {
    name: "Dominican Republic",
    code: "DO",
  },
  {
    name: "Ecuador",
    code: "EC",
  },
  {
    name: "Egypt",
    code: "EG",
  },
  {
    name: "El Salvador",
    code: "SV",
  },
  {
    name: "Equatorial Guinea",
    code: "GQ",
  },
  {
    name: "Eritrea",
    code: "ER",
  },
  {
    name: "Estonia",
    code: "EE",
  },
  {
    name: "Ethiopia",
    code: "ET",
  },
  {
    name: "Falkland Islands (Malvinas)",
    code: "FK",
  },
  {
    name: "Faroe Islands",
    code: "FO",
  },
  {
    name: "Fiji",
    code: "FJ",
  },
  {
    name: "Finland",
    code: "FI",
  },
  {
    name: "France",
    code: "FR",
  },
  {
    name: "French Guiana",
    code: "GF",
  },
  {
    name: "French Polynesia",
    code: "PF",
  },
  {
    name: "French Southern Territories",
    code: "TF",
  },
  {
    name: "Gabon",
    code: "GA",
  },
  {
    name: "Gambia",
    code: "GM",
  },
  {
    name: "Georgia",
    code: "GE",
  },
  {
    name: "Germany",
    code: "DE",
  },
  {
    name: "Ghana",
    code: "GH",
  },
  {
    name: "Gibraltar",
    code: "GI",
  },
  {
    name: "Greece",
    code: "GR",
  },
  {
    name: "Greenland",
    code: "GL",
  },
  {
    name: "Grenada",
    code: "GD",
  },
  {
    name: "Guadeloupe",
    code: "GP",
  },
  {
    name: "Guam",
    code: "GU",
  },
  {
    name: "Guatemala",
    code: "GT",
  },
  {
    name: "Guernsey",
    code: "GG",
  },
  {
    name: "Guinea",
    code: "GN",
  },
  {
    name: "Guinea-Bissau",
    code: "GW",
  },
  {
    name: "Guyana",
    code: "GY",
  },
  {
    name: "Haiti",
    code: "HT",
  },
  {
    name: "Heard Island and Mcdonald Islands",
    code: "HM",
  },
  {
    name: "Holy See (Vatican City State)",
    code: "VA",
  },
  {
    name: "Honduras",
    code: "HN",
  },
  {
    name: "Hong Kong",
    code: "HK",
  },
  {
    name: "Hungary",
    code: "HU",
  },
  {
    name: "Iceland",
    code: "IS",
  },
  {
    name: "India",
    code: "IN",
  },
  {
    name: "Indonesia",
    code: "ID",
  },
  {
    name: "Iran, Islamic Republic Of",
    code: "IR",
  },
  {
    name: "Iraq",
    code: "IQ",
  },
  {
    name: "Ireland",
    code: "IE",
  },
  {
    name: "Isle of Man",
    code: "IM",
  },
  {
    name: "Israel",
    code: "IL",
  },
  {
    name: "Italy",
    code: "IT",
  },
  {
    name: "Jamaica",
    code: "JM",
  },
  {
    name: "Japan",
    code: "JP",
  },
  {
    name: "Jersey",
    code: "JE",
  },
  {
    name: "Jordan",
    code: "JO",
  },
  {
    name: "Kazakhstan",
    code: "KZ",
  },
  {
    name: "Kenya",
    code: "KE",
  },
  {
    name: "Kiribati",
    code: "KI",
  },
  {
    name: 'Korea, Democratic People"S Republic of',
    code: "KP",
  },
  {
    name: "Korea, Republic of",
    code: "KR",
  },
  {
    name: "Kuwait",
    code: "KW",
  },
  {
    name: "Kyrgyzstan",
    code: "KG",
  },
  {
    name: 'Lao People"S Democratic Republic',
    code: "LA",
  },
  {
    name: "Latvia",
    code: "LV",
  },
  {
    name: "Lebanon",
    code: "LB",
  },
  {
    name: "Lesotho",
    code: "LS",
  },
  {
    name: "Liberia",
    code: "LR",
  },
  {
    name: "Libyan Arab Jamahiriya",
    code: "LY",
  },
  {
    name: "Liechtenstein",
    code: "LI",
  },
  {
    name: "Lithuania",
    code: "LT",
  },
  {
    name: "Luxembourg",
    code: "LU",
  },
  {
    name: "Macao",
    code: "MO",
  },
  {
    name: "Macedonia, The Former Yugoslav Republic of",
    code: "MK",
  },
  {
    name: "Madagascar",
    code: "MG",
  },
  {
    name: "Malawi",
    code: "MW",
  },
  {
    name: "Malaysia",
    code: "MY",
  },
  {
    name: "Maldives",
    code: "MV",
  },
  {
    name: "Mali",
    code: "ML",
  },
  {
    name: "Malta",
    code: "MT",
  },
  {
    name: "Marshall Islands",
    code: "MH",
  },
  {
    name: "Martinique",
    code: "MQ",
  },
  {
    name: "Mauritania",
    code: "MR",
  },
  {
    name: "Mauritius",
    code: "MU",
  },
  {
    name: "Mayotte",
    code: "YT",
  },
  {
    name: "Mexico",
    code: "MX",
  },
  {
    name: "Micronesia, Federated States of",
    code: "FM",
  },
  {
    name: "Moldova, Republic of",
    code: "MD",
  },
  {
    name: "Monaco",
    code: "MC",
  },
  {
    name: "Mongolia",
    code: "MN",
  },
  {
    name: "Montserrat",
    code: "MS",
  },
  {
    name: "Morocco",
    code: "MA",
  },
  {
    name: "Mozambique",
    code: "MZ",
  },
  {
    name: "Myanmar",
    code: "MM",
  },
  {
    name: "Namibia",
    code: "NA",
  },
  {
    name: "Nauru",
    code: "NR",
  },
  {
    name: "Nepal",
    code: "NP",
  },
  {
    name: "Netherlands",
    code: "NL",
  },
  {
    name: "Netherlands Antilles",
    code: "AN",
  },
  {
    name: "New Caledonia",
    code: "NC",
  },
  {
    name: "New Zealand",
    code: "NZ",
  },
  {
    name: "Nicaragua",
    code: "NI",
  },
  {
    name: "Niger",
    code: "NE",
  },
  {
    name: "Nigeria",
    code: "NG",
  },
  {
    name: "Niue",
    code: "NU",
  },
  {
    name: "Norfolk Island",
    code: "NF",
  },
  {
    name: "Northern Mariana Islands",
    code: "MP",
  },
  {
    name: "Norway",
    code: "NO",
  },
  {
    name: "Oman",
    code: "OM",
  },
  {
    name: "Pakistan",
    code: "PK",
  },
  {
    name: "Palau",
    code: "PW",
  },
  {
    name: "Palestinian Territory, Occupied",
    code: "PS",
  },
  {
    name: "Panama",
    code: "PA",
  },
  {
    name: "Papua New Guinea",
    code: "PG",
  },
  {
    name: "Paraguay",
    code: "PY",
  },
  {
    name: "Peru",
    code: "PE",
  },
  {
    name: "Philippines",
    code: "PH",
  },
  {
    name: "Pitcairn",
    code: "PN",
  },
  {
    name: "Poland",
    code: "PL",
  },
  {
    name: "Portugal",
    code: "PT",
  },
  {
    name: "Puerto Rico",
    code: "PR",
  },
  {
    name: "Qatar",
    code: "QA",
  },
  {
    name: "Reunion",
    code: "RE",
  },
  {
    name: "Romania",
    code: "RO",
  },
  {
    name: "Russian Federation",
    code: "RU",
  },
  {
    name: "RWANDA",
    code: "RW",
  },
  {
    name: "Saint Helena",
    code: "SH",
  },
  {
    name: "Saint Kitts and Nevis",
    code: "KN",
  },
  {
    name: "Saint Lucia",
    code: "LC",
  },
  {
    name: "Saint Pierre and Miquelon",
    code: "PM",
  },
  {
    name: "Saint Vincent and the Grenadines",
    code: "VC",
  },
  {
    name: "Samoa",
    code: "WS",
  },
  {
    name: "San Marino",
    code: "SM",
  },
  {
    name: "Sao Tome and Principe",
    code: "ST",
  },
  {
    name: "Saudi Arabia",
    code: "SA",
  },
  {
    name: "Senegal",
    code: "SN",
  },
  {
    name: "Serbia and Montenegro",
    code: "CS",
  },
  {
    name: "Seychelles",
    code: "SC",
  },
  {
    name: "Sierra Leone",
    code: "SL",
  },
  {
    name: "Singapore",
    code: "SG",
  },
  {
    name: "Slovakia",
    code: "SK",
  },
  {
    name: "Slovenia",
    code: "SI",
  },
  {
    name: "Solomon Islands",
    code: "SB",
  },
  {
    name: "Somalia",
    code: "SO",
  },
  {
    name: "South Africa",
    code: "ZA",
  },
  {
    name: "South Georgia and the South Sandwich Islands",
    code: "GS",
  },
  {
    name: "Spain",
    code: "ES",
  },
  {
    name: "Sri Lanka",
    code: "LK",
  },
  {
    name: "Sudan",
    code: "SD",
  },
  {
    name: "Suriname",
    code: "SR",
  },
  {
    name: "Svalbard and Jan Mayen",
    code: "SJ",
  },
  {
    name: "Swaziland",
    code: "SZ",
  },
  {
    name: "Sweden",
    code: "SE",
  },
  {
    name: "Switzerland",
    code: "CH",
  },
  {
    name: "Syrian Arab Republic",
    code: "SY",
  },
  {
    name: "Taiwan, Province of China",
    code: "TW",
  },
  {
    name: "Tajikistan",
    code: "TJ",
  },
  {
    name: "Tanzania, United Republic of",
    code: "TZ",
  },
  {
    name: "Thailand",
    code: "TH",
  },
  {
    name: "Timor-Leste",
    code: "TL",
  },
  {
    name: "Togo",
    code: "TG",
  },
  {
    name: "Tokelau",
    code: "TK",
  },
  {
    name: "Tonga",
    code: "TO",
  },
  {
    name: "Trinidad and Tobago",
    code: "TT",
  },
  {
    name: "Tunisia",
    code: "TN",
  },
  {
    name: "Turkey",
    code: "TR",
  },
  {
    name: "Turkmenistan",
    code: "TM",
  },
  {
    name: "Turks and Caicos Islands",
    code: "TC",
  },
  {
    name: "Tuvalu",
    code: "TV",
  },
  {
    name: "Uganda",
    code: "UG",
  },
  {
    name: "Ukraine",
    code: "UA",
  },
  {
    name: "United Arab Emirates",
    code: "AE",
  },
  {
    name: "United Kingdom",
    code: "GB",
  },
  {
    name: "United States",
    code: "US",
  },
  {
    name: "United States Minor Outlying Islands",
    code: "UM",
  },
  {
    name: "Uruguay",
    code: "UY",
  },
  {
    name: "Uzbekistan",
    code: "UZ",
  },
  {
    name: "Vanuatu",
    code: "VU",
  },
  {
    name: "Venezuela",
    code: "VE",
  },
  {
    name: "Viet Nam",
    code: "VN",
  },
  {
    name: "Virgin Islands, British",
    code: "VG",
  },
  {
    name: "Virgin Islands, U.S.",
    code: "VI",
  },
  {
    name: "Wallis and Futuna",
    code: "WF",
  },
  {
    name: "Western Sahara",
    code: "EH",
  },
  {
    name: "Yemen",
    code: "YE",
  },
  {
    name: "Zambia",
    code: "ZM",
  },
  {
    name: "Zimbabwe",
    code: "ZW",
  },
];

export const CHECKOUT_MESSAGE =
  "Tick the 'Use as default' to skip this step on your next purchase.";

export const PRODUCT_CATEGORIES = [
  { key: "mis", value: "Miscellaneous" },
  { key: "books", value: "Books" },
  { key: "digital", value: "Digital" },
  { key: "beauty", value: "Beauty" },
  { key: "app", value: "Appliances" },
  { key: "games", value: "Video Games" },
  { key: "cons", value: "Console" },
  { key: "software", value: "Software" },
  { key: "pc-tech", value: "Computers & Tech" },
  { key: "tvs", value: "TVs" },
  { key: "gym", value: "Gym" },
];
