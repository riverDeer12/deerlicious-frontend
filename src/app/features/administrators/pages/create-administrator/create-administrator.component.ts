import {Component} from '@angular/core';
import {FormType} from "../../../../enums/form-type";
import {AdministratorFormComponent} from "../../components/administrator-form/administrator-form.component";

@Component({
    selector: 'app-create-administrator',
    imports: [
        AdministratorFormComponent
    ],
    standalone: true,
    templateUrl: './create-administrator.component.html',
    styleUrl: './create-administrator.component.scss'
})
export class CreateAdministratorComponent {
    formType = FormType.Create;
}
