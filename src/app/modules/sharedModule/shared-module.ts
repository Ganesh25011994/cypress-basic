
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorMessagesComponent } from '../../components/validation-error-messages/validation-error-messages.component';
// import { NgxLoadingModule } from "ngx-loading";

@NgModule({
    declarations: [
        
    ],
    imports: [
        // CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ValidationErrorMessagesComponent,
        // NgxLoadingModule.forRoot({}),
    ],
    exports: [
        ValidationErrorMessagesComponent
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})

export class SharedModule { }
