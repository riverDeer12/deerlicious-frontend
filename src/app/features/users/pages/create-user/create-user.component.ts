import {Component} from '@angular/core';
import {UserFormComponent} from "../../components/user-form/user-form.component";
import {FormType} from "../../../../enums/form-type";

@Component({
    selector: 'app-create-user',
    imports: [
        UserFormComponent
    ],
    standalone: true,
    templateUrl: './create-user.component.html',
    styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {
    formType!: FormType.Create;
}
