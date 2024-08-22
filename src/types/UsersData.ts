export interface Order {
  id: string;
  date: Date;
  orderValue: number;
}

export interface UsersData {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  isLoggedIn: boolean;
  orders: Order[];
}

export interface RegisterUserPayload {
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface LogInUserPayload {
  email: string;
  password: string;
  username: string;
}

export interface UpdateUserPayload extends Partial<UsersData> {
  id: string;
}

export interface ChangePasswordPayload {
  id: string;
  currentPassword: string;
  newPassword: string;
}

export interface ForgotPasswordPayload {
  email: string;
  password: string;
}

export interface LogoutPayload {
  id: string;
}

export interface PlaceOrderPayload {
  userId: string;
  date: Date;
  orderValue: number;
}
