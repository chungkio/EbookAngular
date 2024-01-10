import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject: Subject<string> = new Subject<string>();

  public notification$: Observable<string> = this.notificationSubject.asObservable();

  constructor() {}

  public showNotification(message: string): void {
    this.notificationSubject.next(message);
  }
}
