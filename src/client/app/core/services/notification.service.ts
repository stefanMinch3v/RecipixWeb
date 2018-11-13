import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    constructor(private toastr: ToastrService) { }

    successMessage = (msg) => 
        this.toastr.success(msg, 'Success');

    errorMessage = (msg) => 
        this.toastr.error(msg, 'Error');

    warningMessage = (msg) => 
        this.toastr.warning(msg, 'Warning');
        
    infoMessage = (msg) => 
        this.toastr.info(msg, 'Info');
}