export class Recipe {
  constructor(
    public name: string,
    public description: string,
    public imagePath: string,
  ) {}

  public id?: string | bigint;
}
