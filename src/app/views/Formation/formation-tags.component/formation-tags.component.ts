import {Component, input} from '@angular/core';
import {MatChip, MatChipSet} from '@angular/material/chips';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-formation-tags',
  imports: [
    MatChip,
    MatChipSet,
    NgClass
  ],
  templateUrl: './formation-tags.component.html',
  styleUrl: './formation-tags.component.css'
})
export class FormationTagsComponent {

  tags = input.required<string[]>();

  isAngular(tag: string) {
    return 'Angular' === tag;
  }

}
