export interface MenuEditPageProp {}

export interface MenuEditPageState {
  tabIndex: number;
  isPublished: boolean;
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
