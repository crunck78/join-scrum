import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'progressLinearGradient',
  standalone: true,
})
export class ProgressLinearGradientPipe implements PipeTransform {

  transform(value: number, maxValue: number): string {
    const ratio = value / maxValue;
    const ratioRound = Math.floor(ratio * 100);
    // const redRatio = 112;
    // const greenRatio = 230 - Math.floor(ratio * 230);
    return `linear-gradient(to right, #29ABE2 0%, #29ABE2 ${ratioRound}%, #F4F4F4 ${ratioRound}%, #F4F4F4 100%)`;
  }

}
