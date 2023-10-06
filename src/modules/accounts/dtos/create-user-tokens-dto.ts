export interface CreateUserTokensDto {
  refresh_token: string;
  user_id: string;
  expires_date: Date;
}
