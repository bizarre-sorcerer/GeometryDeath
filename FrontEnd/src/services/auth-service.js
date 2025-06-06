export class AuthService {
  authClient;

  handleAuth(username) {
    let jwt = getCookie("jwt");
    if (jwt == "" || jwt == null) {
      this.authClient.createGuestAccount(username);
    }
  }
}
