import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private name$ = new BehaviorSubject<string>("");

  constructor() { }

  public getNameFromStore() {
    return this.name$.asObservable();
  }

  public setNameForStore(name: string) {
    this.name$.next(name);
  }
}
