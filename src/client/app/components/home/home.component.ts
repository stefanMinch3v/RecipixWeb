import { Component } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    readonly randomImgUrl: string = 'https://www.cscassets.com/recipes/wide_cknew/wide_26291.jpg';
    readonly randomImgUrlSecond: string = 'https://w-dog.net/wallpapers/1/9/538888190084297.jpg';
    readonly randomImgUrlThird: string = 'http://www.sabordelivery.com.br/uploads/337599-food-wallpapers.jpg';
    image: string = this.randomImgUrl;

    constructor() {
        setInterval(() => this.changeBackground(), 5000);
    }

    changeBackground() {
        if (this.image === this.randomImgUrl) {
            this.image = this.randomImgUrlSecond;
        }
        else if (this.image === this.randomImgUrlSecond){
            this.image = this.randomImgUrlThird;
        }
        else {
            this.image = this.randomImgUrl;
        }
    }
}