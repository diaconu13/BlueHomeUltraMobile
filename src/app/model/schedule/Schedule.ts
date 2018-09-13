import { Signal } from "../device/signal";

export class Schedule {
    _id               : string;
    start             : string;
    end               : string;
    isStartSunset     : boolean;
    isStartSunrise    : boolean;
    isEndSunset       : boolean;
    isEndSunrise      : boolean;
    duration          : string;
    stateStart        : string;
    stateEnd          : string;
    weekDays          : number[];
    selectedSignal    : Signal;
    startSelectedState: string;
    endSelectedState  : string;
    setToDelete       : boolean;

    // tslint:disable-next-line:no-empty
    constructor() {
    }
  }
