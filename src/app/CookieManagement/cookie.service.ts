import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  constructor() {}

  setCookie(name: string, value: string): void {
    document.cookie = `${name}=${value};path=/`;
  }

  getCookie(name: string): string | null {
    const cookies = document.cookie.split('; ');

    for (const cookie of cookies) {
      if (cookie.startsWith(`${name}=`)) {
        return cookie.substring(name.length + 1);
      }
    }

    return null;
  }
}
