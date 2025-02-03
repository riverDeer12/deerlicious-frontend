import {Component} from '@angular/core';
import {CategoryFormComponent} from "../../components/category-form/category-form.component";
import {FormType} from "../../../../enums/form-type";

@Component({
    selector: 'app-create-category',
    imports: [
        CategoryFormComponent
    ],
    standalone: true,
    templateUrl: './create-category.component.html',
    styleUrl: './create-category.component.scss'
})
export class CreateCategoryComponent {
    formType = FormType.Create;
}
