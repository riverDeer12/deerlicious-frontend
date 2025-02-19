import {Component} from '@angular/core';
import {EntityType} from "../../enums/entity-type";
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {DialogInfoConfig} from "../../constants/dialog-info-config";
import {CommonModule} from "@angular/common";
import {Button} from "primeng/button";
import {DialogFormComponent} from "../dialog-form/dialog-form.component";
import {FormType} from "../../enums/form-type";

@Component({
    selector: 'app-dialog-info',
    imports: [
        CommonModule,
        Button
    ],
    standalone: true,
    templateUrl: './dialog-info.component.html',
    styleUrl: './dialog-info.component.scss'
})
export class DialogInfoComponent {
    contentType!: EntityType;
    data: any;


    // Check if a value is an object
    isObject(value: any): boolean {
        return typeof value === 'object' && value !== null;
    }

    // Get keys of an object
    getObjectKeys(obj: any): string[] {
        return Object.keys(obj);
    }

    constructor(private dialogRef: DynamicDialogRef,
                private dialogService: DialogService,
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
        this.dialogConfig.autoZIndex = DialogInfoConfig.autoZIndex;
        this.dialogConfig.dismissableMask = DialogInfoConfig.dismissableMask;
        this.dialogConfig.closeOnEscape = DialogInfoConfig.closeOnEscape;
        this.dialogConfig.transitionOptions = DialogInfoConfig.transitionOptions;
        this.dialogConfig.style = DialogInfoConfig.style;
    }

    /**
     * Set dialog content type.
     */
    initContentType(): void {
        this.contentType = this.dialogConfig.data.contentType;
        this.data = this.dialogConfig.data.data;
    }

    openUpdateDialog() {

        this.dialogRef.close();

        this.dialogService.open(DialogFormComponent, {
            header: 'Update data for: ' + this.data["id"],
            data: {
                contentType: this.contentType,
                formType: FormType.Update,
                data: this.data
            }
        });
    }
}
