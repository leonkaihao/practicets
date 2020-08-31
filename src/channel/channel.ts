import { Subject } from "rxjs";
import { first } from "rxjs/operators";

export class Deferred<T> {
  promise: Promise<T>;
  resolve!: (value?: T | PromiseLike<T>) => void;
  reject!: (reason?: any) => void;

  constructor() {
    this.promise = new Promise<T>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

export enum CHANNEL_STATUS {
  INIT = 0,
  CLOSED = 1,
}

// tslint:disable-next-line: max-classes-per-file
export class Channel<T> {
  private status = CHANNEL_STATUS.INIT;
  private closeEvent$: Subject<any> = new Subject();
  public constructor(
    public readonly capacity = 0,
    private readonly values: T[] = [],
    private readonly sends: { value: T; signal: Deferred<void> }[] = [],
    private readonly recvs: Deferred<T>[] = []
  ) {}

  public async send(value: T): Promise<void> {
    if (this.status === CHANNEL_STATUS.CLOSED) {
      throw Error(`channel is closed`);
    }
    // notify a waiting receiver if it exists
    if (this.recvs.length > 0) {
      this.recvs.shift()?.resolve(value);

      return;
    }

    // no waiting receiver, put data in values if it has vacancy.
    if (this.values.length < this.capacity) {
      this.values.push(value);

      return;
    }

    // capacity is full, wait for notifying from receiver
    const signal = new Deferred<void>();
    this.sends.push({ value, signal });
    await signal.promise;
  }

  public async recv(): Promise<T> {
    if (this.status === CHANNEL_STATUS.CLOSED) {
      throw Error(`channel is closed`);
    }
    // find items in values first
    if (this.values.length > 0) {
      const val = this.values.shift();
      if (val !== undefined) {
        return val;
      }
    }

    // if values is empty, find a waiting sender
    if (this.sends.length > 0) {
      const send = this.sends.shift();
      send?.signal.resolve();
      const val = send?.value;
      if (val !== undefined) {
        return val;
      }
    }

    // no waiting sender, wait for notifying from sender
    const signal = new Deferred<T>();
    this.recvs.push(signal);

    return signal.promise;
  }

  public async close(): Promise<void> {
    this.status = CHANNEL_STATUS.CLOSED;
    this.closeEvent$.next();
  }

  // tslint:disable-next-line: ban-types
  public onClose(close: Function): void {
    const subscription = this.closeEvent$.pipe(first()).subscribe((info) => {
      close(info);
      subscription.unsubscribe();
    });
  }

  private clear(): void {
    let sendItem = this.sends.shift();
    while (sendItem) {
      sendItem.signal.reject(Error("sender closed"));
      sendItem = this.sends.shift();
    }

    let recvItem = this.recvs.shift();
    while (recvItem) {
      recvItem.reject(Error("receiver closed"));
      recvItem = this.recvs.shift();
    }
  }
}
