export class Command {
  id        : string;
  signalName: string;
  value     : number|string;
  constructor(signalName: string, value: number|string, id: string = undefined) {
    this.signalName = signalName;
    this.value      = value;
    this.id         = id;
  }
}
