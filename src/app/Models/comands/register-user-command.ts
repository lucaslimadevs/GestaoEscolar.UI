export class RegisterUserCommand {
  public nome: string = '';
  public email: string = '';
  public password: string = '';
  public confirmPassword: string = '';
  public dataNascimento: Date | undefined;
  public tipo: number | undefined;
}
