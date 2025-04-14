import { ReactNode } from "react";

// types.ts
export interface ITelegramUser {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
  photo_url: string;
}

export interface IApiUser {
  firstName: string;
  lastName: string;
  username: string;
  languageCode: string;
  photoUrl: string;
}

export interface IContentSafeAreaInset {
  bottom: number;
  left: number;
  right: number;
  top: number;
}

export interface ICategoryItemsProps {
  id: number;
  title: string;
  description: string;
  rate: string;
  flowed: string;
  imgUrl: string;
}

export interface ICategory {
  id: number;
  icon: string;
  color: string;
  title: string;
}

export interface ICategoryWithQuery {
  id: number;
  titleFa: string;
  icon: string;
  color: string;
  titleEn: string;
  aiSubCategories: ISubCategoryWithApplication[];
}

export interface ISubCategory {
  id: number;
  title: string;
}

export interface ISubCategoryWithApplication {
  id: number;
  title: string;
  aiApplications: IApplication[];
}

export interface IApplication {
  id: number;
  name: string;
  description: string;
  rate: string;
  followerCount: string;
  imageUrl: string;
}

export interface IRegion {
  id: number;
  name: string;
  currency: string;
}

export interface IBalance {
  amount: number;
  currency: string;
  firstName: string;
  lastName: string;
}

export interface IReceiptPayment {
  amount: number;
  type: "TEXT" | "IMAGE";
  text?: string;
}

export interface IMeasures {
  id: number;
  name: string;
  icon: React.ReactNode;
}

export interface IMeasuresValue {
  id: number;
  name: string;
  value: number;
}

export interface IAffiliateUrl {
  url: string;
}

export interface IAffiliateCode {
  code: string;
}

export interface IInvitedFriend {
  amount: number;
  currency: string;
  date: Date;
  dateString: string;
  image: string;
  name: string;
}

export interface ITransaction {
  amount: number;
  currency: string;
  type: string;
  typeTitle: string;
  icons: string;
  description: string;
  status: string;
  transactionDate: Date;
  dateString: string;
}

export interface IPayments {
  amount: number;
  document: string;
  issueDate: Date;
  paymentType: string;
  receiptType: string;
  status: string;
  dateString: string;
}


export interface IResponseCategoryItems {
  id: number;
  title: string | undefined;
  itemList: ICategoryItemsProps[];
}

export interface ILink {
  url: string;
  quality: string;
  extension: string;
  size: 8599363;
  formattedSize: string;
  videoAvailable: boolean;
  audioAvailable: boolean;
  chunked: boolean;
  cached: boolean;
}

export type Message = {
  type: "bold" | "header" | "text" | "code" | "list" | "list-item";
  content: string;
  isRtl: boolean;
  language?: string; // فقط برای کد استفاده می‌شود

};

export interface IMessage {
  user: string;
  message: Message[];
}

export enum UserTask {
  userTaskInvitedUserTask = "userTaskInvitedUserTask",
  externalLinkUser = "externalLinkUser",
  telegramChanel = "telegramChanel",
}

export enum Currency {
  IRT = 0, // Iranian Rial
  IRTT = 1,
  USD = 2, // United States Dollar
  EUR = 3, // Euro
  GBP = 4, // British Pound Sterling
  JPY = 5, // Japanese Yen
  AUD = 6, // Australian Dollar
  CAD = 7, // Canadian Dollar
  CHF = 8, // Swiss Franc
  CNY = 9, // Chinese Yuan
  INR = 10, // Indian Rupee
  RUB = 11, // Russian Ruble
  BRL = 12, // Brazilian Real
  ZAR = 13, // South African Rand
  MXN = 14, // Mexican Peso
  SGD = 15, // Singapore Dollar
  HKD = 16, // Hong Kong Dollar
  NZD = 17, // New Zealand Dollar
  KRW = 18, // South Korean Won
  SEK = 19, // Swedish Krona
  NOK = 20, // Norwegian Krone
  DKK = 21, // Danish Krone
  TRY = 22, // Turkish Lira
  AED = 23, // United Arab Emirates Dirham
  SAR = 24, // Saudi Riyal
  THB = 25, // Thai Baht
  MYR = 26, // Malaysian Ringgit
  IDR = 27, // Indonesian Rupiah
  PHP = 28, // Philippine Peso
  VND = 29, // Vietnamese Dong
  PLN = 30, // Polish Zloty
  CZK = 31, // Czech Koruna
  HUF = 32, // Hungarian Forint
  ILS = 33, // Israeli New Shekel
  ARS = 34, // Argentine Peso
  COP = 35, // Colombian Peso
  CLP = 36, // Chilean Peso
  EGP = 37, // Egyptian Pound
  NGN = 38, // Nigerian Naira
  PKR = 39, // Pakistani Rupee
  BDT = 40, // Bangladeshi Taka
  LKR = 41, // Sri Lankan Rupee
  KWD = 42, // Kuwaiti Dinar
  QAR = 43, // Qatari Riyal
  OMR = 44, // Omani Rial
  BHD = 45, // Bahraini Dinar
  JOD = 46, // Jordanian Dinar
}

export interface ITasks {
  id: number,
  title: string,
  icon: ReactNode,
  list: []
}

export interface ILinkItems {
  url: string;
  title: string;
  thumbnail: string;
  duration: null;
  source: string;
  media: ILink[];
}

export interface IWebApp {
  initData: string;
  initDataUnsafe: {
    query_id: string;
    user: ITelegramUser;
    auth_date: string;
    hash: string;
  };
  version: string;
  platform: string;
  colorScheme: string;
  themeParams: {
    link_color: string;
    button_color: string;
    button_text_color: string;
    secondary_bg_color: string;
    hint_color: string;
    bg_color: string;
    text_color: string;
  };
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  isClosingConfirmationEnabled: boolean;
  headerColor: string;
  backgroundColor: string;
  isFullscreen: boolean;
  contentSafeAreaInset: IContentSafeAreaInset;
  isOrientationLocked: boolean;
  BackButton: {
    isVisible: boolean;
  };
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isProgressVisible: boolean;
    isActive: boolean;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  HapticFeedback: any;
}
