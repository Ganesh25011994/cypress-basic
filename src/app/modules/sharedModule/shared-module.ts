
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorMessagesComponent } from '../../components/validation-error-messages/validation-error-messages.component';
import { HeaderComponent } from '../../components/header/header.component';
import { UjjiLogoComponent } from '../../components/ujji-logo/ujji-logo.component';
// import { NgxLoadingModule } from "ngx-loading";
@NgModule({
    declarations: [
        
    ],
    imports: [
        // CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ValidationErrorMessagesComponent,
        HeaderComponent,
        UjjiLogoComponent,
        // NgxLoadingModule.forRoot({}),
    ],
    exports: [
        ValidationErrorMessagesComponent,
        HeaderComponent,
        UjjiLogoComponent
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})

export class SharedModule { }
