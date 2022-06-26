export interface MenuEditPageProp {}

export interface MenuEditPageState {
  restaurantName: string;

  tabIndex: number;
  isPublished: boolean;
  isProfileValid: boolean;
  isLoading: boolean;
}

export interface MainLandingPageProps {}

export interface MainLandingPageState {}

export interface LoginPageProps {
  isPasswordVisibile: boolean;
  handleClickShowPassword(event: any): any;
}

export interface CreateAccountPageProps {
  isPasswordVisibile: boolean;
  handleClickShowPassword(event: any): any;
}

export interface VerifyEmailPageProps {}

export interface FillRestaurantInfoPageProps {}

export interface ResetPasswordPageProps {}

export interface LoadingPageProps {
  exitLoading: boolean;
  setExitLoading: any;
}
