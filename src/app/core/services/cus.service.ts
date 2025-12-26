import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CusService {

  generate(): string {
    const now = new Date();
    const timePart = `${this.pad(now.getHours())}${this.pad(now.getMinutes())}${this.pad(now.getSeconds())}`;
    const randomPart = Math.floor(1000 + Math.random() * 9000);

    return `CUS-${timePart}-${randomPart}`;
  }

  private pad(value: number): string {
    return value.toString().padStart(2, '0');
  }
}
