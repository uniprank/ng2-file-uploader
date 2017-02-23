import { FileDropDirective } from './module/directives/fileDrop.directive';
import { FileSelectDirective } from './module/directives/fileSelect.directive';
import { ImagePreviewDirective } from './module/directives/imgPreview.directive';
import { ProgressBarDirective } from './module/directives/progressBar.directive';
export * from './module/directives/fileDrop.directive';
export * from './module/directives/fileSelect.directive';
export * from './module/directives/imgPreview.directive';
export * from './module/directives/progressBar.directive';
export * from './module/pipe/fileSizePipe.pipe';
export { hookType, UploaderHook, FileManager, FileFilter, FileUploader, Protocol, ProtocolXHR, Transfer, Utils } from './module/source';
export { FileUploaderModule } from './module/module';
export const UPLOAD_DIRECTIVES = [
    FileSelectDirective,
    FileDropDirective
];
export const UPLOAD_ALL = [
    FileSelectDirective,
    FileDropDirective,
    ImagePreviewDirective,
    ProgressBarDirective
];
//# sourceMappingURL=index.js.map