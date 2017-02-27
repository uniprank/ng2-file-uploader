import { FileDropDirective } from './directives/fileDrop.directive';
import { FileSelectDirective } from './directives/fileSelect.directive';
import { ImagePreviewDirective } from './directives/imgPreview.directive';
import { ProgressBarDirective } from './directives/progressBar.directive';

export * from './directives/fileDrop.directive';
export * from './directives/fileSelect.directive';
export * from './directives/imgPreview.directive';
export * from './directives/progressBar.directive';
export * from './pipe/fileSizePipe.pipe';

export {
    hookType, UploaderHook,
    FileManager,
    FileFilter, FileUploader,
    Protocol, ProtocolXHR,
    Transfer,
    Utils
} from './source';

export {
    FileManagerOptions, TransferOptions
} from './interface'

export { FileUploaderModule } from './module';

export const UPLOAD_DIRECTIVES: any[] = [
  FileSelectDirective,
  FileDropDirective
];

export const UPLOAD_ALL: any[] = [
  FileSelectDirective,
  FileDropDirective,
  ImagePreviewDirective,
  ProgressBarDirective
];
