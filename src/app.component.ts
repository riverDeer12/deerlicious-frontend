import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {Toast} from "primeng/toast";
import {MessageService} from "primeng/api";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, Toast],
    providers: [
        MessageService
    ],
    template: `
        <p-toast position="top-center" />
        <router-outlet></router-outlet>`
})
export class AppComponent {
}
