import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-rating',
  templateUrl: './recipe-rating.component.html',
  styleUrls: ['./recipe-rating.component.css']
})
export class RecipeRatingComponent implements OnInit {
  @Input() rating: number;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
  }

  onClick(rating: number): void {
    this.rating = rating;
    this.ratingClick.emit({
      rating: rating
    });
  }
}
