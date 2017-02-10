import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileDropComponent } from './fileDrop.component';
import { FileUploaderModule } from '@uniprank/ng2-file-uploader';

@NgModule({
    declarations: [
        FileDropComponent
    ],
    imports: [ FileUploaderModule, CommonModule ],
    exports: [
        FileDropComponent
    ]
})
export class FileDropModule {
}
