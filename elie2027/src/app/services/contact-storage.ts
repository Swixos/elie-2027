import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import DOMPurify from 'dompurify';

export interface ContactMessage {
  name: string;
  message: string;
  date: string;
}

const API_URL = '/api/messages';

@Injectable({ providedIn: 'root' })
export class ContactStorageService {
  constructor(private http: HttpClient) {}

  private sanitize(value: string): string {
    return DOMPurify.sanitize(value, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }).trim();
  }

  save(name: string, message: string): Observable<ContactMessage> {
    return this.http.post<ContactMessage>(API_URL + '/add', {
      name: this.sanitize(name),
      message: this.sanitize(message),
    });
  }

  getAll(): Observable<ContactMessage[]> {
    return this.http.get<ContactMessage[]>(API_URL).pipe(
      map(messages =>
        messages.map(msg => ({
          name: this.sanitize(msg.name),
          message: this.sanitize(msg.message),
          date: msg.date,
        }))
      ),
      catchError(() => of([])),
    );
  }
}
