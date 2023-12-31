import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AccountProvider } from 'src/module/user/entities/user.entity';

export class SignUpDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  avatar: string;

  @IsString()
  @IsOptional()
  provider: AccountProvider = AccountProvider.CREDENTIALS;
}
