import {Component} from '@angular/core';
import {Dialog} from "primeng/dialog";
import {Button} from "primeng/button";
import {InputText} from "primeng/inputtext";

@Component({
    selector: 'app-dialog-form',
    imports: [
        Dialog,
        Button,
        InputText
    ],
    standalone: true,
    templateUrl: './dialog-form.component.html',
    styleUrl: './dialog-form.component.scss'
})
export class DialogFormComponent {

}
