export class Space {
  name        : String;
  icon        : String;
  devicesCount: number;
  constructor(name: string, icon: string, count: number) {
    this.name         = name;
    this.icon         = icon;
    this.devicesCount = count;
  }
}
