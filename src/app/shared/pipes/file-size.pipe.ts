import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize',
  standalone: true  // ← Doit être présent
})
export class FileSizePipe implements PipeTransform {
  transform(bytes: number | undefined | null): string {
    if (!bytes || bytes === 0) return '0 o';
    const units = ['o', 'Ko', 'Mo', 'Go', 'To'];
    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${units[i]}`;
  }
}