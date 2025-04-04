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
