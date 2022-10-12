export class ResetPassword {
  newpassword: string;
  token: string;
  confirmpassword: string;

  constructor(newpassword: string, token: string, confirmpassword: string) {
    this.newpassword = newpassword;
    this.token = token;
    this.confirmpassword = confirmpassword;
  }

}
