import {Component, input, model} from '@angular/core';
import {MatSlider, MatSliderThumb} from '@angular/material/slider';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-distance-slider',
  imports: [
    MatSlider,
    FormsModule,
    MatSliderThumb
  ],
  templateUrl: './distance-slider.component.html',
  styleUrl: './distance-slider.component.css'
})
export class DistanceSliderComponent {

  min = input(0);
  max = input(100);
  step = input(1);

  value = model.required<number>();
}
