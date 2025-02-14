import {Component} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {FormType} from "../../enums/form-type";
import {CategoryFormComponent} from "../../features/categories/components/category-form/category-form.component";
import {EntityType} from "../../enums/entity-type";
import {CommonModule} from "@angular/common";
import {DialogFormConfig} from "../../constants/dialog-form-config";
import {RecipeFormComponent} from "../../features/recipes/components/recipe-form/recipe-form.component";
import {
    AdministratorFormComponent
} from "../../features/administrators/components/administrator-form/administrator-form.component";
import {UserFormComponent} from "../../features/users/components/user-form/user-form.component";

@Component({
    selector: 'app-dialog-form',
    imports: [
        CommonModule,
        DialogModule,
        ButtonModule,
        InputTextModule,
        CategoryFormComponent,
        RecipeFormComponent,
        AdministratorFormComponent,
        UserFormComponent
    ],
    standalone: true,
    templateUrl: './dialog-form.component.html',
    styleUrl: './dialog-form.component.scss'
})
export class DialogFormComponent {
    contentType!: EntityType;
    formType!: FormType;
    data: any;

    public get entityType(): typeof EntityType {
        return EntityType;
    }

    constructor(private dialogRef: DynamicDialogRef,
                private dialogConfig: DynamicDialogConfig) {
        this.initSettings();
        this.initContentType();
    }

    ngOnInit(): void {
        //intended
    }

    /**
     * Set dialog settings.
     */
    initSettings(): void {
        this.dialogConfig.autoZIndex = DialogFormConfig.autoZIndex;
        this.dialogConfig.dismissableMask = DialogFormConfig.dismissableMask;
        this.dialogConfig.closeOnEscape = DialogFormConfig.closeOnEscape;
        this.dialogConfig.transitionOptions = DialogFormConfig.transitionOptions;
        this.dialogConfig.style = DialogFormConfig.style;
    }

    /**
     * Set dialog content type.
     */
    initContentType(): void {
        this.contentType = this.dialogConfig.data.contentType;
        this.formType = this.dialogConfig.data.formType;
        this.data = this.dialogConfig.data.data;
    }
}
