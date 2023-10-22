import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'atoz',
  standalone: true,
})
export class AtoZPipe implements PipeTransform {

  transform(element: HTMLElement, letter: string): boolean {
    return !(!!element.querySelector(`#contact-${letter}`));
  }
}
