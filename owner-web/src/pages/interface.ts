export interface MenuEditPageProp {
  isLoggedin: boolean;
}

export interface MenuEditPageState {
  tabIndex: number;
  isPublished: boolean;
}

export interface MainLandingPageProps {
  isLoggedin: boolean;
}

export interface MainLandingPageState {}

export interface LoginPageProps {
  isLoggedin: boolean;
  isPasswordVisibile: boolean;

  handleClickShowPassword(event: any): any;
}

export interface LoginPageState {}

export interface CreateAccountPageProps {
  isLoggedin: boolean;
  isPasswordVisibile: boolean;

  handleClickShowPassword(event: any): any;
}

export interface CreateAccountPageState {}
