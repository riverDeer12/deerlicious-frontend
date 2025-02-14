import {Injectable} from '@angular/core';
import {RedirectType} from "../enums/redirect-type";
import {Router} from "@angular/router";
import {DialogHelperService} from "./dialog-helper.service";

@Injectable({
    providedIn: 'root'
})
export class HelperService {

    constructor(private router: Router,
                private dialogHelperService: DialogHelperService) {
    }

    /**
     * Redirect user after form
     * submit based on redirect type.
     *
     * @param redirectType type of redirection.
     * @param returnUrl url for redirecting user.
     * @param dialogId id of dialog that needs to be closed.
     */
    redirectUserAfterSubmit(redirectType: RedirectType, returnUrl?: string, dialogId?: string): void {
        if (redirectType == RedirectType.NoRedirect) {
            return;
        }

        if (redirectType == RedirectType.Page) {
            this.router.navigateByUrl(returnUrl as string).then();
            return;
        }

        this.dialogHelperService.closeDialog(dialogId as string);
    }
}
