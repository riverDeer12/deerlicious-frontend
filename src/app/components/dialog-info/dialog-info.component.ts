import {Component} from '@angular/core';
import {EntityType} from "../../enums/entity-type";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {DialogInfoConfig} from "../../constants/dialog-info-config";

@Component({
    selector: 'app-dialog-info',
    imports: [],
    standalone: true,
    templateUrl: './dialog-info.component.html',
    styleUrl: './dialog-info.component.scss'
})
export class DialogInfoComponent {
    contentType!: EntityType;
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
}
