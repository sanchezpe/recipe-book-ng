export class User {
  constructor(
    public email: string,
    private _token: string,
    private _tokenExpirationDate: Date,
  ) {}

  get token(): string | null {
    if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
      return null;
    }
    return this._token;
  }

  get tokenExpirationDate(): Date {
    return this._tokenExpirationDate;
  }
}
