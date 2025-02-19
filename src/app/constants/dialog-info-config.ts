import {DynamicDialogConfig} from "primeng/dynamicdialog";

export const DialogInfoConfig: DynamicDialogConfig = {
    autoZIndex: true,
    dismissableMask: true,
    closeOnEscape: true,
    modal: true,
    transitionOptions: '200ms',
    style: {
        'width': '100%',
        'max-width': '90vh'
    }
}
