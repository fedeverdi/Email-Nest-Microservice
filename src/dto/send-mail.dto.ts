import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SendMailDto {
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  text: string;

  @IsString()
  @IsOptional()
  html: string;
}
