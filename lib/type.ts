// types.ts
export interface ITelegramUser {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
  photo_url:string
}

export interface IApiUser {
  firstName: string;
  lastName: string;
  username: string;
  languageCode: string;
  photoUrl:string
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
  titleFa: string;
  parent_id: number;
  icon: string;
  color: string;
  titleEn: string;
}

export interface ICategoryItems {
  id: number;
  category_Id: number;
  itemList: ICategoryItemsProps[];
}

export interface IResponseCategoryItems {
  id: number;
  title: string | undefined;
  itemList: ICategoryItemsProps[];
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
