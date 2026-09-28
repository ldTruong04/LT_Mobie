export type HomeStackParamList = {
  Home: undefined;
  BookDetail: { bookId: number };
};

export type CartStackParamList = {
  Cart: undefined;
  Checkout: { total: number };
};

export type RootTabParamList = {
  HomeTab: undefined;
  CategoriesTab: undefined;
  CartTab: undefined;
  AccountTab: undefined;
};