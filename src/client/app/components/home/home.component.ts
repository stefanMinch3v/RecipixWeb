import { Component } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    readonly randomImgUrl: string = 'https://www.cscassets.com/recipes/wide_cknew/wide_26291.jpg';
    readonly randomImgUrlSecond: string = 'https://www.organicauthority.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cg_faces:center%2Cq_auto:good%2Cw_620/MTU5MzMwNTAyNDQ0Nzg3Mjk2/how-to-make-the-best-vegan-hasselback-potatoes.jpg';
    image: string = this.randomImgUrl;

    constructor() {
        setInterval(() => this.changeBackground(), 5000);
    }

    changeBackground() {
        if (this.image === this.randomImgUrl) {
            this.image = this.randomImgUrlSecond;
        }
        else {
            this.image = this.randomImgUrl;
        }
    }
}