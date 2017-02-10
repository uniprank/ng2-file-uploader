# Angular 2 File Upload [![Build Status](https://travis-ci.org/uniprank/ng2-file-uploader.svg?branch=master)](https://travis-ci.org/uniprank/ng2-file-uploader)

---

## About

**Angular 2 File Upload** is a module for the [@Angular-2](https://angular.io/) framework. Supports drag-n-drop upload, upload progress, validation filters and a file upload queue. It supports native HTML5 uploads. Works with any server side platform which supports standard HTML form uploads.

When files are selected or dropped into the component/directive, one or more filters are applied. Files which pass all filters are added to the queue. When file is added to the queue, for him is created instance of `{FileManager}` and uploader options are used for this object. After, items in the queue (queue$) are ready for uploading.

## Package managers
### NPM
```
npm install @uniprank/ng2-file-uploader
```
You could find this module in npm like [_angular2 file uploader_](https://www.npmjs.com/search?q=uniprank%20ng2-file-uploader).

### Module Dependency

Add `import { FileUploaderModule } from '@uniprank/ng2-file-uploader';` to your module header:

```
@NgModule({
    declarations: [ ],
    imports: [
       FileUploaderModule
    ],
    exports: [ ]
})
export class ExampleModule {
}
```

## Demos
1. [Simple example](http://uniprank.github.io/ng2-file-uploader/example/simple)
2. [Advanced example](http://uniprank.github.io/ng2-file-uploader/example/advanced)
3. [FileDrop Component example](http://uniprank.github.io/ng2-file-uploader/example/filedropexample)

## More Info

1. [Introduction](https://github.com/uniprank/ng2-file-uploader/wiki/Introduction)
2. [Module API](https://github.com/uniprank/ng2-file-uploader/wiki/Module-API)
3. [FAQ](https://github.com/uniprank/ng2-file-uploaderwiki/FAQ)

## Browser compatibility
You could check out features of target browsers using http://caniuse.com/. For example, the [File API](http://caniuse.com/#feat=fileapi) feature.

| Feature/Browser  | IE 8-9 |  IE10+ | Firefox 28+ | Chrome 38+ | Safari 6+ | 
|----------|:---:|:---:|:---:|:---:|:---:|
| `<input type="file"/>` | + | + | + | + | + |
| `<input type="file" multiple/>` | - | + | + | + | + |
| Drag-n-drop | - | + | + | + | + |
| XHR transport (multipart,binary) | - | + | + | + | + |
| AJAX headers | - | + | + | + | + |