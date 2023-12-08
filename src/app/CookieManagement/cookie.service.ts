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
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${name}=`));

    return cookieValue ? cookieValue.split('=')[1] : null;
  }

  getAllCookies(): { [name: string]: string } {
    const allCookies: { [name: string]: string } = {};
    document.cookie.split('; ').forEach((cookie) => {
      const [name, value] = cookie.split('=');
      allCookies[name] = value;
    });
    return allCookies;
  }
}
