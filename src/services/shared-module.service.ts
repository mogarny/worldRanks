import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Store } from '../model';

@Injectable({
  providedIn: 'root',
})
export class SharedModuleService {
  private stateSubject = new BehaviorSubject<Store>({ loading: true });

  state$ = this.stateSubject.asObservable();

  update(newState: Store) {
    this.stateSubject.next({ ...this.stateSubject.value, ...newState });
  }

  public get currentState() {
    return this.stateSubject.getValue();
  }

  constructor() {}
}
