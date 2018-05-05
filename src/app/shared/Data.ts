interface UserResponse {
  birthdate: string;
  email: string;
  first_name: string;
  has_picture: boolean;
  last_name: string;
  phone_number: string;
}


interface Data {
  userRes: UserResponse;
  error: boolean;
}
