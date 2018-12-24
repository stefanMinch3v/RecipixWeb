import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { sharedComponents } from '.';

@NgModule({
    declarations: [...sharedComponents],
    imports: [CommonModule, RouterModule, FormsModule, BrowserModule],
    exports: [...sharedComponents]
})
export class SharedModule { }