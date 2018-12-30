import { Component } from '@angular/core';
 
@Component({
    selector: 'app-recaptcha',
    template: `<re-captcha (resolved)="resolved($event)" siteKey="appKey"></re-captcha>`,
}) 
export class ReCaptchaComponent {
    private appKey: string = "Some_Random_Key_50501010";
    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response ${captchaResponse}:`);
    }
}