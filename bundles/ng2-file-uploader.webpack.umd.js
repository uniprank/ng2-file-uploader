(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return webpackJsonp([0,1],{

/***/ "./index.ts":
/* unknown exports provided */
/* all exports used */
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./module */ "./module/index.ts"));


/***/ }),

/***/ "./module/directives/fileDrop.directive.ts":
/* unknown exports provided */
/* all exports used */
/*!*************************************************!*\
  !*** ./module/directives/fileDrop.directive.ts ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:max-line-length
// tslint:disable:no-unused-expression
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/index.js");
var fileManager_core_1 = __webpack_require__(/*! ../source/fileManager.core */ "./module/source/fileManager.core.ts");
var transfer_core_1 = __webpack_require__(/*! ../source/transfer.core */ "./module/source/transfer.core.ts");
//
// Directive to support dragging and dropping and element onto a div
//
var FileDropDirective = (function () {
    //
    // Constructor requires an element reference that instantiated this directive
    //
    function FileDropDirective(element, renderer) {
        this.element = element;
        this.renderer = renderer;
        this.fileHoverStart = new core_1.EventEmitter();
        this.fileHoverEnd = new core_1.EventEmitter();
        this.fileAccepted = new core_1.EventEmitter();
        this.fileRejected = new core_1.EventEmitter();
        this._InputFile = null;
    }
    //
    // Initialisation
    //
    FileDropDirective.prototype.ngOnInit = function () {
        this._files = [];
        this.renderer.setElementClass(this.element.nativeElement, 'drop-area', true);
    };
    FileDropDirective.prototype.ngOnDestroy = function () {
        if (this._files.length > 0) {
            for (var _i = 0, _a = this._files; _i < _a.length; _i++) {
                var _file = _a[_i];
                if (_file instanceof fileManager_core_1.FileManager) {
                    if (!_file.isUploaded()) {
                        _file.cancel();
                        this.uploader.removeFile(_file);
                    }
                }
            }
        }
    };
    //
    // Called when the element has content dragged over
    //
    FileDropDirective.prototype.onDragOver = function (event) {
        // If we're already in the on-drag, don't bother with this
        if (this._InputFile === null) {
            // Get the object being dragged and reference it as a copy action
            this._InputFile = this.getDataTransferObject(event);
            if (this._InputFile === null) {
                return;
            }
            this.renderer.setElementClass(this.element.nativeElement, 'drop-enter', true);
            var _dropValueText = 'Drop now';
            this.renderer.setElementAttribute(this.element.nativeElement, 'dropValueText', _dropValueText);
            // Let the client know
            this.fileHoverStart.emit();
        }
        // Don't propagate
        this.preventAndStopEventPropagation(event);
    };
    //
    // Called when the element has dragged content leave
    //
    FileDropDirective.prototype.onDragLeave = function (event) {
        // Only bother if we have a file
        if (this._InputFile !== null) {
            this.renderer.setElementClass(this.element.nativeElement, 'drop-enter', false);
            this.renderer.setElementAttribute(this.element.nativeElement, 'dropValueText', '');
            // Finished with the file
            this._InputFile = null;
            if (event.currentTarget === this.element[0]) {
                return;
            }
            // Let the client know
            this.fileHoverEnd.emit();
        }
        // Don't let it continue
        this.preventAndStopEventPropagation(event);
    };
    //
    // Called when the element has content dropped
    //
    FileDropDirective.prototype.onDrop = function (event) {
        // Only bother if we have a file
        if (this._InputFile !== null) {
            this.renderer.setElementClass(this.element.nativeElement, 'drop-enter', false);
            this.renderer.setElementAttribute(this.element.nativeElement, 'dropValueText', '');
            // Let the client know
            this.fileHoverEnd.emit();
            // Update our data
            this._InputFile = this.getDataTransferObject(event);
            if (this._InputFile.files.length === 0) {
                this._InputFile = null;
                return;
            }
            var filesData = this._InputFile.files;
            if (!this.hasFiles(this._InputFile.types)) {
                return;
            }
            this.readFile(filesData);
            this.fileAccepted.emit(this._files);
            // Finished with the file
            this._InputFile = null;
        }
        // Don't let it continue
        this.preventAndStopEventPropagation(event);
    };
    //
    // Stops the drag/drop events propagating
    //
    FileDropDirective.prototype.preventAndStopEventPropagation = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    FileDropDirective.prototype.readFile = function (_files) {
        var fmObject;
        for (var i = 0; i < _files.length; i++) {
            var file = _files[i];
            try {
                fmObject = new fileManager_core_1.FileManager(file, this.fileOptions, this.uploader);
            }
            catch (e) {
                if (e.status === 100) {
                    this.fileRejected.emit(e);
                }
                else {
                    this.fileRejected.emit(e);
                }
                throw new Error('Something goes wrong e: ' + e.message);
            }
            (fmObject.inQueue) && this._files.push(fmObject);
        }
    };
    //
    // Returns the file dragged into the directive
    //
    FileDropDirective.prototype.getDataTransferObject = function (event) {
        return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
    };
    FileDropDirective.prototype.hasFiles = function (types) {
        if (!types) {
            return false;
        }
        if (types.indexOf) {
            return types.indexOf('Files') !== -1;
        }
        if (types.contains) {
            return types.contains('Files');
        }
        return false;
    };
    return FileDropDirective;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FileDropDirective.prototype, "fileHoverStart", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FileDropDirective.prototype, "fileHoverEnd", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FileDropDirective.prototype, "fileAccepted", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FileDropDirective.prototype, "fileRejected", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], FileDropDirective.prototype, "fileOptions", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", transfer_core_1.Transfer)
], FileDropDirective.prototype, "uploader", void 0);
__decorate([
    core_1.HostListener('dragover', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], FileDropDirective.prototype, "onDragOver", null);
__decorate([
    core_1.HostListener('dragleave', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], FileDropDirective.prototype, "onDragLeave", null);
__decorate([
    core_1.HostListener('drop', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], FileDropDirective.prototype, "onDrop", null);
FileDropDirective = __decorate([
    core_1.Directive({
        // Selector required in component HTML
        // tslint:disable-next-line:directive-selector
        selector: '[ng2File2Drop]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer])
], FileDropDirective);
exports.FileDropDirective = FileDropDirective;


/***/ }),

/***/ "./module/directives/fileSelect.directive.ts":
/* unknown exports provided */
/* all exports used */
/*!***************************************************!*\
  !*** ./module/directives/fileSelect.directive.ts ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:max-line-length
// tslint:disable:no-unused-expression
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/index.js");
var fileManager_core_1 = __webpack_require__(/*! ../source/fileManager.core */ "./module/source/fileManager.core.ts");
var fileUploader_core_1 = __webpack_require__(/*! ../source/fileUploader.core */ "./module/source/fileUploader.core.ts");
//
// Directive to support select file from inputfield
//
var FileSelectDirective = (function () {
    //
    // Constructor requires an element reference that instantiated this directive
    //
    function FileSelectDirective() {
        this.role = 'input';
        this.type = 'file';
        this.fileHoverStart = new core_1.EventEmitter();
        this.fileHoverEnd = new core_1.EventEmitter();
        this.fileAccepted = new core_1.EventEmitter();
        this.fileRejected = new core_1.EventEmitter();
        this._InputFile = null;
    }
    //
    // Initialisation
    //
    FileSelectDirective.prototype.ngOnInit = function () {
        this._files = [];
    };
    FileSelectDirective.prototype.ngOnDestroy = function () {
        if (this._files.length > 0) {
            for (var _i = 0, _a = this._files; _i < _a.length; _i++) {
                var _file = _a[_i];
                if (_file instanceof fileManager_core_1.FileManager) {
                    if (!_file.isUploaded()) {
                        _file.cancel();
                        this.uploader.removeFile(_file);
                    }
                }
            }
        }
    };
    //
    // Called when the element was choosen
    //
    FileSelectDirective.prototype.onChange = function (event) {
        // Update our data
        this._InputFile = this.getEventTarget(event);
        if (this._InputFile.files.length === 0) {
            this._InputFile = null;
            return;
        }
        var filesData = this._InputFile.files;
        console.log('onChange', filesData);
        this.readFile(filesData);
        this.fileAccepted.emit(this._files);
        // Finished with the file
        this._InputFile = null;
        // Don't let it continue
        this.preventAndStopEventPropagation(event);
    };
    //
    // Stops the drag/drop events propagating
    //
    FileSelectDirective.prototype.preventAndStopEventPropagation = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    FileSelectDirective.prototype.readFile = function (_files) {
        var fmObject;
        for (var i = 0; i < _files.length; i++) {
            var file = _files[i];
            try {
                fmObject = new fileManager_core_1.FileManager(file, this.fileOptions, this.uploader);
            }
            catch (e) {
                if (e.status === 100) {
                    this.fileRejected.emit(e);
                }
                else {
                    this.fileRejected.emit(e);
                }
                throw new Error('Something goes wrong e: ' + e.message);
            }
            (fmObject.inQueue) && this._files.push(fmObject);
        }
    };
    //
    // Returns the file dragged into the directive
    //
    FileSelectDirective.prototype.getEventTarget = function (event) {
        return event.target;
    };
    return FileSelectDirective;
}());
__decorate([
    core_1.HostBinding('attr.role'),
    __metadata("design:type", Object)
], FileSelectDirective.prototype, "role", void 0);
__decorate([
    core_1.HostBinding('attr.type'),
    __metadata("design:type", Object)
], FileSelectDirective.prototype, "type", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FileSelectDirective.prototype, "fileHoverStart", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FileSelectDirective.prototype, "fileHoverEnd", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FileSelectDirective.prototype, "fileAccepted", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FileSelectDirective.prototype, "fileRejected", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], FileSelectDirective.prototype, "fileOptions", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", fileUploader_core_1.FileUploader)
], FileSelectDirective.prototype, "uploader", void 0);
__decorate([
    core_1.HostListener('change', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], FileSelectDirective.prototype, "onChange", null);
FileSelectDirective = __decorate([
    core_1.Directive({
        // Selector required in component HTML
        // tslint:disable-next-line:directive-selector
        selector: '[ng2File2Select]'
    }),
    __metadata("design:paramtypes", [])
], FileSelectDirective);
exports.FileSelectDirective = FileSelectDirective;


/***/ }),

/***/ "./module/directives/imgPreview.directive.ts":
/* unknown exports provided */
/* all exports used */
/*!***************************************************!*\
  !*** ./module/directives/imgPreview.directive.ts ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/index.js");
var FileReader = window.FileReader;
// tslint:disable-next-line:directive-selector
var ImagePreviewDirective = (function () {
    function ImagePreviewDirective(el) {
        this.el = el;
    }
    ImagePreviewDirective.prototype.ngOnChanges = function () {
        var reader = new FileReader();
        var el = this.el;
        // tslint:disable-next-line:max-line-length
        el.nativeElement.src = 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\' viewBox%3D\'0 0 200 150\'%2F%3E';
        reader.onloadend = function () {
            el.nativeElement.src = reader.result;
        };
        if (this.image) {
            return reader.readAsDataURL(this.image.element);
        }
    };
    return ImagePreviewDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ImagePreviewDirective.prototype, "image", void 0);
ImagePreviewDirective = __decorate([
    core_1.Directive({ selector: 'img[imgPreview]' }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], ImagePreviewDirective);
exports.ImagePreviewDirective = ImagePreviewDirective;


/***/ }),

/***/ "./module/directives/progressBar.directive.ts":
/* unknown exports provided */
/* all exports used */
/*!****************************************************!*\
  !*** ./module/directives/progressBar.directive.ts ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/index.js");
var fileSizePipe_pipe_1 = __webpack_require__(/*! ../pipe/fileSizePipe.pipe */ "./module/pipe/fileSizePipe.pipe.ts");
// tslint:disable:directive-selector
var ProgressBarDirective = (function () {
    function ProgressBarDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    ProgressBarDirective.prototype.ngOnChanges = function () {
        var el = this.el;
        el.nativeElement.value = this.progress.percent;
        if (this.progress.speed > 0) {
            var pipe = new fileSizePipe_pipe_1.FileSizePipe();
            this.renderer.setElementAttribute(this.el.nativeElement, 'speedText', pipe.transform(this.progress.loaded));
        }
        else {
            this.renderer.setElementAttribute(this.el.nativeElement, 'speedText', '');
        }
    };
    return ProgressBarDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ProgressBarDirective.prototype, "progress", void 0);
ProgressBarDirective = __decorate([
    core_1.Directive({
        selector: 'progress[progressBar]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer])
], ProgressBarDirective);
exports.ProgressBarDirective = ProgressBarDirective;


/***/ }),

/***/ "./module/index.ts":
/* unknown exports provided */
/* all exports used */
/*!*************************!*\
  !*** ./module/index.ts ***!
  \*************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var fileDrop_directive_1 = __webpack_require__(/*! ./directives/fileDrop.directive */ "./module/directives/fileDrop.directive.ts");
var fileSelect_directive_1 = __webpack_require__(/*! ./directives/fileSelect.directive */ "./module/directives/fileSelect.directive.ts");
var imgPreview_directive_1 = __webpack_require__(/*! ./directives/imgPreview.directive */ "./module/directives/imgPreview.directive.ts");
var progressBar_directive_1 = __webpack_require__(/*! ./directives/progressBar.directive */ "./module/directives/progressBar.directive.ts");
__export(__webpack_require__(/*! ./directives/fileDrop.directive */ "./module/directives/fileDrop.directive.ts"));
__export(__webpack_require__(/*! ./directives/fileSelect.directive */ "./module/directives/fileSelect.directive.ts"));
__export(__webpack_require__(/*! ./directives/imgPreview.directive */ "./module/directives/imgPreview.directive.ts"));
__export(__webpack_require__(/*! ./directives/progressBar.directive */ "./module/directives/progressBar.directive.ts"));
__export(__webpack_require__(/*! ./pipe/fileSizePipe.pipe */ "./module/pipe/fileSizePipe.pipe.ts"));
var source_1 = __webpack_require__(/*! ./source */ "./module/source/index.ts");
exports.hookType = source_1.hookType;
exports.UploaderHook = source_1.UploaderHook;
exports.FileManager = source_1.FileManager;
exports.FileFilter = source_1.FileFilter;
exports.FileUploader = source_1.FileUploader;
exports.Protocol = source_1.Protocol;
exports.ProtocolXHR = source_1.ProtocolXHR;
exports.Transfer = source_1.Transfer;
exports.Utils = source_1.Utils;
var module_1 = __webpack_require__(/*! ./module */ "./module/module.ts");
exports.FileUploaderModule = module_1.FileUploaderModule;
exports.UPLOAD_DIRECTIVES = [
    fileSelect_directive_1.FileSelectDirective,
    fileDrop_directive_1.FileDropDirective
];
exports.UPLOAD_ALL = [
    fileSelect_directive_1.FileSelectDirective,
    fileDrop_directive_1.FileDropDirective,
    imgPreview_directive_1.ImagePreviewDirective,
    progressBar_directive_1.ProgressBarDirective
];


/***/ }),

/***/ "./module/module.ts":
/* unknown exports provided */
/* all exports used */
/*!**************************!*\
  !*** ./module/module.ts ***!
  \**************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/index.js");
var fileSelect_directive_1 = __webpack_require__(/*! ./directives/fileSelect.directive */ "./module/directives/fileSelect.directive.ts");
var fileDrop_directive_1 = __webpack_require__(/*! ./directives/fileDrop.directive */ "./module/directives/fileDrop.directive.ts");
var imgPreview_directive_1 = __webpack_require__(/*! ./directives/imgPreview.directive */ "./module/directives/imgPreview.directive.ts");
var progressBar_directive_1 = __webpack_require__(/*! ./directives/progressBar.directive */ "./module/directives/progressBar.directive.ts");
var fileSizePipe_pipe_1 = __webpack_require__(/*! ./pipe/fileSizePipe.pipe */ "./module/pipe/fileSizePipe.pipe.ts");
var FileUploaderModule = (function () {
    function FileUploaderModule() {
    }
    return FileUploaderModule;
}());
FileUploaderModule = __decorate([
    core_1.NgModule({
        declarations: [
            fileSelect_directive_1.FileSelectDirective,
            fileDrop_directive_1.FileDropDirective,
            imgPreview_directive_1.ImagePreviewDirective,
            progressBar_directive_1.ProgressBarDirective,
            fileSizePipe_pipe_1.FileSizePipe
        ],
        exports: [
            fileSelect_directive_1.FileSelectDirective,
            fileDrop_directive_1.FileDropDirective,
            imgPreview_directive_1.ImagePreviewDirective,
            progressBar_directive_1.ProgressBarDirective,
            fileSizePipe_pipe_1.FileSizePipe
        ]
    })
], FileUploaderModule);
exports.FileUploaderModule = FileUploaderModule;


/***/ }),

/***/ "./module/pipe/fileSizePipe.pipe.ts":
/* unknown exports provided */
/* all exports used */
/*!******************************************!*\
  !*** ./module/pipe/fileSizePipe.pipe.ts ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/index.js");
/*
 * Convert bytes into largest possible unit.
 * Takes an precision argument that defaults to 2.
 * Usage:
 *   bytes | fileSize:precision
 * Example:
 *   {{ 1024 |  fileSize}}
 *   formats to: 1 KB
*/
var FileSizePipe = (function () {
    function FileSizePipe() {
        this.units = [
            'bytes',
            'KB',
            'MB',
            'GB',
            'TB',
            'PB'
        ];
    }
    FileSizePipe.prototype.transform = function (bytes, precision) {
        if (bytes === void 0) { bytes = 0; }
        if (precision === void 0) { precision = 2; }
        if (!isFinite(bytes)) {
            return '?';
        }
        var unit = 0;
        while (bytes >= 1024) {
            bytes /= 1024;
            unit++;
        }
        return bytes.toFixed(+precision) + ' ' + this.units[unit];
    };
    return FileSizePipe;
}());
FileSizePipe = __decorate([
    core_1.Pipe({ name: 'fileSize' })
], FileSizePipe);
exports.FileSizePipe = FileSizePipe;


/***/ }),

/***/ "./module/source/fileFilter.core.ts":
/* unknown exports provided */
/* all exports used */
/*!******************************************!*\
  !*** ./module/source/fileFilter.core.ts ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/index.js");
var filterType;
(function (filterType) {
    filterType[filterType["regex"] = 0] = "regex";
    filterType[filterType["callback"] = 1] = "callback";
})(filterType = exports.filterType || (exports.filterType = {}));
var FileFilter = (function () {
    function FileFilter(name, _data, _regCheck) {
        if (_regCheck === void 0) { _regCheck = 'name'; }
        this._name = '';
        this._regex = null;
        this._regCheck = null;
        this._callback = null;
        this._type = null;
        this._name = name;
        if (_data instanceof RegExp) {
            this._type = filterType.regex;
            this._regex = _data;
            this._regCheck = _regCheck;
            return;
        }
        else if (_data instanceof Function) {
            this._type = filterType.callback;
            this._callback = _data;
            return;
        }
        throw new Error('FilterData is not defined.');
    }
    Object.defineProperty(FileFilter.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileFilter.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    FileFilter.prototype.validate = function (_file) {
        var _valid = false;
        switch (this._type) {
            case filterType.regex:
                {
                    switch (this._regCheck) {
                        case 'name':
                            {
                                if (_file.object.name.match(this._regex)) {
                                    _valid = true;
                                }
                            }
                            break;
                        case 'type':
                            {
                                if (_file.object.type.match(this._regex)) {
                                    _valid = true;
                                }
                            }
                            break;
                        case 'size':
                            {
                                if (_file.object.size.match(this._regex)) {
                                    _valid = true;
                                }
                            }
                            break;
                        case 'date':
                            {
                                // Format for validation is `2017-01-01 10:10:10`
                                var _checkDate = new common_1.DatePipe('en-US').transform(_file.object.lastModifiedDate, 'yyyy-MM-dd hh:mm:ss');
                                if (_checkDate.match(this._regex)) {
                                    _valid = true;
                                }
                            }
                            break;
                        default: {
                            throw new Error('RegExp can only check on `name | type | size | date`.');
                        }
                    }
                }
                break;
            case filterType.callback:
                {
                    _valid = this._callback(_file);
                }
                break;
            default: {
                throw new Error('Filter type is not defined.');
            }
        }
        return _valid;
    };
    return FileFilter;
}());
exports.FileFilter = FileFilter;


/***/ }),

/***/ "./module/source/fileManager.core.ts":
/* unknown exports provided */
/* all exports used */
/*!*******************************************!*\
  !*** ./module/source/fileManager.core.ts ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Rx_1 = __webpack_require__(/*! rxjs/Rx */ "./node_modules/rxjs/Rx.js");
var utils_core_1 = __webpack_require__(/*! ./utils.core */ "./module/source/utils.core.ts");
var transfer_core_1 = __webpack_require__(/*! ./transfer.core */ "./module/source/transfer.core.ts");
// tslint:disable:no-unused-expression
var FileManagerOptionsDefault = {};
var speedObject = {
    total: 0,
    loaded: 0,
    percent: 0,
    speed: 0,
    speedToText: '0 bytes'
};
var FileObject = (function () {
    function FileObject(fileOrInput) {
        var _this = this;
        var isInput = utils_core_1.Utils.isElement(fileOrInput);
        var fakePathOrObject = isInput ? fileOrInput.value : fileOrInput;
        var isFakePath = utils_core_1.Utils.isString(fakePathOrObject) ? true : false;
        var method = function (v, x) { if (v) {
            _this._createFromFakePath(x);
        }
        else {
            _this._createFromObject(x);
        } };
        method(isFakePath, fakePathOrObject);
    }
    FileObject.prototype._createFromFakePath = function (path) {
        this.lastModifiedDate = null;
        this.size = null;
        this.type = 'like/' + path.slice(path.lastIndexOf('.') + 1).toLowerCase();
        this.name = path.slice(path.lastIndexOf('/') + path.lastIndexOf('\\') + 2);
    };
    FileObject.prototype._createFromObject = function (object) {
        this.lastModifiedDate = new Date(object.lastModifiedDate.getTime());
        this.size = object.size;
        this.type = object.type;
        this.name = object.name;
    };
    return FileObject;
}());
exports.FileObject = FileObject;
var FileManager = (function () {
    /**
     * Creates an instance of FileManager.
     *
     * @param {*} _file
     * @param {Transfer} [_uploader]
     * @param {FileManagerOptions} [_options]
     *
     * @memberOf FileManager
     */
    function FileManager(_file, _options, _uploader) {
        this._progress$ = new Rx_1.BehaviorSubject(0);
        this._speed$ = new Rx_1.BehaviorSubject(speedObject);
        this.options = Object.assign({}, FileManagerOptionsDefault, _options);
        this._speedDefault = {};
        this._id = utils_core_1.Utils.uniqueID();
        this._isUploading = false;
        this._isUploaded = false;
        this._isSuccess = false;
        this._isCancel = false;
        this._isError = false;
        var isInput = utils_core_1.Utils.isElement(_file);
        var file = isInput ? new FileObject(_file.files[0]) : new FileObject(_file);
        this._file = file;
        this._fileElement = isInput ? _file.files[0] : _file;
        this._fileActive = false;
        if (typeof _uploader !== 'undefined') {
            this.bindUploader(_uploader);
        }
    }
    Object.defineProperty(FileManager.prototype, "protocol", {
        set: function (_protocol) {
            this._protocol = _protocol;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileManager.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileManager.prototype, "progressPercent$", {
        get: function () {
            return utils_core_1.Utils.asObservable(this._progress$);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileManager.prototype, "progress$", {
        get: function () {
            return utils_core_1.Utils.asObservable(this._speed$);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileManager.prototype, "progress", {
        get: function () {
            return this._progress$.getValue();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileManager.prototype, "element", {
        get: function () {
            return this._fileElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileManager.prototype, "object", {
        get: function () {
            return this._file;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileManager.prototype, "name", {
        get: function () {
            return this._file.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileManager.prototype, "type", {
        get: function () {
            return this._file.type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileManager.prototype, "date", {
        get: function () {
            return this._file.lastModifiedDate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileManager.prototype, "size", {
        get: function () {
            return this._file.size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileManager.prototype, "inQueue", {
        get: function () {
            return this._fileActive;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileManager.prototype, "success", {
        get: function () {
            return this._isSuccess;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileManager.prototype, "error", {
        get: function () {
            return this._isError;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Bind uploader to FileManager
     *
     * @param {Transfer} _uploader
     *
     * @memberOf FileManager
     */
    FileManager.prototype.bindUploader = function (_uploader) {
        if (this._uploader instanceof transfer_core_1.Transfer) {
            this._uploader.removeFile(this);
        }
        this._uploader = _uploader;
        var check = this._uploader.addFile(this);
        this._setFileActive(check);
    };
    /**
     * Bind options to FileManager
     *
     * @param {FileManagerOptions} _options
     *
     * @memberOf FileManager
     */
    FileManager.prototype.bindOptions = function (_options) {
        this.options = Object.assign({}, this.options, _options);
    };
    /**
     * Return uploader if exists else throw error
     *
     * @returns {Transfer}
     *
     * @memberOf FileManager
     */
    FileManager.prototype.getUploader = function () {
        if (this._uploader instanceof transfer_core_1.Transfer) {
            return this._uploader;
        }
        throw new Error('Not uploader for this file defined.');
    };
    /**
     * Start uploading this file
     *
     *
     * @memberOf FileManager
     */
    FileManager.prototype.upload = function () {
        var _uploader;
        try {
            _uploader = this.getUploader();
        }
        catch (e) {
            throw new Error('Couldn`t upload because uploader was not defined. ERR_MSG: ' + e.message);
        }
        this._isUploading = true;
        try {
            _uploader.uploadItem(this);
        }
        catch (e) {
            // TODO write error handling
        }
    };
    /**
     * Cancel upload process from this file
     *
     *
     * @memberOf FileManager
     */
    FileManager.prototype.cancel = function () {
        if (this._isUploading) {
            var uploader = this.getUploader();
            uploader.cancelUploadItem(this);
        }
    };
    FileManager.prototype._cancel = function () {
        if (this._isUploading) {
            this._isCancel = true;
            this._isUploaded = false;
            this._isUploading = false;
        }
    };
    /**
     * Remove this FileManger from uploader queue
     *
     *
     * @memberOf FileManager
     */
    FileManager.prototype.remove = function () {
        var _uploader;
        try {
            _uploader = this.getUploader();
        }
        catch (e) {
            throw new Error('Couldn`t remove because uploader was not defined. ERR_MSG: ' + e.message);
        }
        (this._isUploading) && this.cancel();
        _uploader.removeFile(this);
        this._setFileActive(false);
    };
    FileManager.prototype.isUploaded = function () {
        return this._isUploaded;
    };
    FileManager.prototype.isUploading = function () {
        return this._isUploading;
    };
    FileManager.prototype.canUpload = function () {
        return (!this._isUploaded && !this._isUploading && !this._isSuccess && !this._isError);
    };
    FileManager.prototype.handleImageLoad = function () {
        this._imageLoad = true;
    };
    /**
     * Overwrite functions
     */
    /**
     * Callback
     * @private
     */
    FileManager.prototype.onBeforeUpload = function () { return; };
    FileManager.prototype.onProgressSpeed = function (speed) { speed = speed; };
    /**
     * Callback
     * @param {Number} progress
     * @private
     */
    FileManager.prototype.onProgress = function (progress) { progress = progress; };
    /**
     * Callback
     * @param {any} response
     * @param {Number} status
     * @param {Object} headers
     */
    FileManager.prototype.onSuccess = function (response, status, headers) { response = response; status = status; headers = headers; };
    FileManager.prototype.onError = function (response, status, headers) { response = response; status = status; headers = headers; };
    /**
     *  Internal functions
     */
    FileManager.prototype._onBeforeUpload = function () {
        this._isUploading = true;
        this._isUploaded = false;
        this._isSuccess = false;
        this._isCancel = false;
        this._isError = false;
        this._progress$.next(0);
        this.onBeforeUpload();
    };
    FileManager.prototype._onProgressFileSpeed = function (speed) {
        this._speed$.next(speed);
        this.onProgressSpeed(speed);
    };
    FileManager.prototype._onProgress = function (_progress) {
        this._progress$.next(_progress);
        this.onProgress(_progress);
    };
    FileManager.prototype._onSuccess = function (response, status, headers) {
        if (this._uploader.options.removeBySuccess) {
            this.remove();
        }
        this._isUploading = false;
        this._isUploaded = true;
        this._isSuccess = true;
        this._isError = false;
        this.onSuccess(response, status, headers);
    };
    FileManager.prototype._onError = function (response, status, headers) {
        this._isUploading = false;
        this._isUploaded = false;
        this._isSuccess = false;
        this._isError = true;
        this.onError(response, status, headers);
    };
    FileManager.prototype._setFileActive = function (check) {
        this._fileActive = check;
    };
    return FileManager;
}());
exports.FileManager = FileManager;


/***/ }),

/***/ "./module/source/fileUploader.core.ts":
/* unknown exports provided */
/* all exports used */
/*!********************************************!*\
  !*** ./module/source/fileUploader.core.ts ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var protocol_core_1 = __webpack_require__(/*! ./protocol.core */ "./module/source/protocol.core.ts");
var transfer_core_1 = __webpack_require__(/*! ./transfer.core */ "./module/source/transfer.core.ts");
var fileManager_core_1 = __webpack_require__(/*! ./fileManager.core */ "./module/source/fileManager.core.ts");
// tslint:disable:max-line-length
var FileUploader = (function (_super) {
    __extends(FileUploader, _super);
    function FileUploader(_options, _protocol) {
        var _this = _super.call(this, 'FileUploader', _options) || this;
        if (typeof _protocol === 'undefined') {
            _this._setProtocol(new protocol_core_1.ProtocolXHR());
            _this._getProtocol()._progress.subscribe(function (obj) {
                var _file = obj._file, _data = obj._data;
                if (_file instanceof fileManager_core_1.FileManager) {
                    _this._onProgressFile(_file, _data.percent);
                    _this._onProgressFileSpeed(_file, _data);
                }
            });
            _this._getProtocol()._load.subscribe(function (obj) {
                var _file = obj._file, response = obj.response, status = obj.status, headers = obj.headers;
                if (_file instanceof fileManager_core_1.FileManager) {
                    var uploader_1 = _file.getUploader();
                    var gist = _this._isSuccessCode(status);
                    var method = function (g, f, r, s, h) { if (g) {
                        uploader_1._onSuccessFile(f, r, s, h);
                    }
                    else {
                        uploader_1._onErrorFile(f, r, s, h);
                    } };
                    method(gist, _file, response, status, headers);
                    uploader_1._onCompleteFile(_file, response, status, headers);
                }
            });
            _this._getProtocol()._error.subscribe(function (obj) {
                var _file = obj._file, response = obj.response, status = obj.status, headers = obj.headers;
                if (_file instanceof fileManager_core_1.FileManager) {
                    var uploader = _file.getUploader();
                    uploader._onErrorFile(_file, response, status, headers);
                    uploader._onCompleteFile(_file, response, status, headers);
                }
            });
            _this._getProtocol()._abort.subscribe(function (obj) {
                var _file = obj._file, response = obj.response, status = obj.status, headers = obj.headers;
                if (_file instanceof fileManager_core_1.FileManager) {
                    var uploader = _file.getUploader();
                    uploader._onErrorFile(_file, response, status, headers);
                    uploader._onCompleteFile(_file, response, status, headers);
                }
            });
        }
        return _this;
    }
    return FileUploader;
}(transfer_core_1.Transfer));
exports.FileUploader = FileUploader;


/***/ }),

/***/ "./module/source/index.ts":
/* unknown exports provided */
/* all exports used */
/*!********************************!*\
  !*** ./module/source/index.ts ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./fileManager.core */ "./module/source/fileManager.core.ts"));
__export(__webpack_require__(/*! ./fileUploader.core */ "./module/source/fileUploader.core.ts"));
__export(__webpack_require__(/*! ./protocol.core */ "./module/source/protocol.core.ts"));
__export(__webpack_require__(/*! ./transfer.core */ "./module/source/transfer.core.ts"));
__export(__webpack_require__(/*! ./uploaderHook.core */ "./module/source/uploaderHook.core.ts"));
__export(__webpack_require__(/*! ./fileFilter.core */ "./module/source/fileFilter.core.ts"));
__export(__webpack_require__(/*! ./utils.core */ "./module/source/utils.core.ts"));


/***/ }),

/***/ "./module/source/protocol.core.ts":
/* unknown exports provided */
/* all exports used */
/*!****************************************!*\
  !*** ./module/source/protocol.core.ts ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/index.js");
var utils_core_1 = __webpack_require__(/*! ./utils.core */ "./module/source/utils.core.ts");
var fileSizePipe_pipe_1 = __webpack_require__(/*! ../pipe/fileSizePipe.pipe */ "./module/pipe/fileSizePipe.pipe.ts");
// tslint:disable:max-line-length
var FormData = window.FormData;
/**
 * Absractr proctol class if someone want to write his own protocol
 *
 * @export
 * @abstract
 * @class Protocol
 */
var Protocol = (function () {
    /**
     * Creates an instance of Protocol and for each protocol an own unique ID.
     *
     *
     * @memberOf Protocol
     */
    function Protocol() {
        this._id = utils_core_1.Utils.uniqueID();
        this._progress = new core_1.EventEmitter();
        this._load = new core_1.EventEmitter();
        this._error = new core_1.EventEmitter();
        this._abort = new core_1.EventEmitter();
        this._connections = [];
    }
    Object.defineProperty(Protocol.prototype, "connection", {
        set: function (obj) {
            var _file = obj._file, _connection = obj._connection;
            if (!this.isConnected(_file)) {
                this._connections.push({
                    id: _file.id,
                    connection: _connection
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Call uploader method _onCompleteFile.
     *
     * @param {FileManager} _file
     * @param {any} response
     * @param {any} status
     * @param {any} headers
     *
     * @memberOf Protocol
     */
    Protocol.prototype._onLoad = function (_file, response, status, headers) {
        var uploader = _file.getUploader();
        var gist = this._isSuccessCode(status);
        var method = function (g, f, r, s, h) { if (g) {
            uploader._onSuccessFile(f, r, s, h);
        }
        else {
            uploader._onErrorFile(f, r, s, h);
        } };
        method(gist, _file, response, status, headers);
        uploader._onCompleteFile(_file, response, status, headers);
    };
    /**
     * Call uploader methodes _onErrorFile and _onCompleteFile.
     *
     * @param {FileManager} _file
     * @param {any} response
     * @param {any} status
     * @param {any} headers
     *
     * @memberOf Protocol
     */
    Protocol.prototype._onError = function (_file, response, status, headers) {
        var uploader = _file.getUploader();
        uploader._onErrorFile(_file, response, status, headers);
        uploader._onCompleteFile(_file, response, status, headers);
    };
    /**
     * Call uploader methodes _onErrorFile and _onCompleteFile.
     *
     * @param {FileManager} _file
     * @param {any} response
     * @param {any} status
     * @param {any} headers
     *
     * @memberOf Protocol
     */
    Protocol.prototype._onAbort = function (_file, response, status, headers) {
        var uploader = _file.getUploader();
        uploader._onErrorFile(_file, response, status, headers);
        uploader._onCompleteFile(_file, response, status, headers);
    };
    /**
     * Validate response status code.
     *
     * @param {number} status
     * @returns {boolean}
     *
     * @memberOf Protocol
     */
    Protocol.prototype._isSuccessCode = function (status) {
        return (status >= 200 && status < 300) || status === 304;
    };
    Protocol.prototype.isConnected = function (_file) {
        for (var _i = 0, _a = this._connections; _i < _a.length; _i++) {
            var _request = _a[_i];
            if (_request.id === _file.id) {
                return _request;
            }
        }
        return false;
    };
    Protocol.prototype.removeConnection = function (_file) {
        var _request = null;
        for (var _key in this._connections) {
            if (this._connections.hasOwnProperty(_key)) {
                _request = this._connections[_key];
                if (_file.id === _request.id) {
                    this._connections.splice(+_key, 1);
                }
            }
        }
    };
    return Protocol;
}());
exports.Protocol = Protocol;
/**
 * Standard protocol for server communication (file uploading)
 *
 * @export
 * @class ProtocolXHR
 * @extends {Protocol}
 */
var ProtocolXHR = (function (_super) {
    __extends(ProtocolXHR, _super);
    function ProtocolXHR() {
        return _super.call(this) || this;
    }
    /**
     * Implementation of the abstract.protocol method `run`
     *
     * @param {FileManager} _file
     *
     * @memberOf ProtocolXHR
     */
    ProtocolXHR.prototype.run = function (_file) {
        var _this = this;
        var _xhr;
        var sendable;
        var uploader = _file.getUploader();
        var _formData = utils_core_1.Utils.extendValue(uploader.options.formData, _file.options.formData);
        var _withCredentials = utils_core_1.Utils.extendValue(uploader.options.withCredentials, _file.options.withCredentials);
        var _method = utils_core_1.Utils.extendValue(uploader.options.method, _file.options.method);
        var _url = utils_core_1.Utils.extendValue(uploader.options.url, _file.options.url);
        var _alias = utils_core_1.Utils.extendValue(uploader.options.alias, _file.options.alias);
        var _headers = utils_core_1.Utils.extendValue(uploader.options.headers, _file.options.headers);
        var time = new Date().getTime();
        var load = 0;
        var speed = 0;
        var sppedToText = null;
        var $filesize = new fileSizePipe_pipe_1.FileSizePipe();
        _xhr = new XMLHttpRequest();
        this.connection = {
            _file: _file,
            _connection: _xhr
        };
        sendable = new FormData();
        if (typeof _formData !== 'undefined') {
            // Only allow Multipart
            for (var _i = 0, _formData_1 = _formData; _i < _formData_1.length; _i++) {
                var obj = _formData_1[_i];
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        var value = obj[key];
                        sendable.append(key, value);
                    }
                }
            }
        }
        sendable.append(_alias, _file.element, _file.name);
        if (typeof (_file.size) !== 'number') {
            throw new TypeError('We need the file size.');
        }
        _xhr.upload.addEventListener('progress', function (event) {
            if (event.lengthComputable) {
                var _time = new Date().getTime() - time;
                load = event.loaded - load;
                speed = load / _time * 1000;
                speed = parseInt(speed, 10);
                sppedToText = $filesize.transform(speed);
                var _obj = {
                    total: event.total,
                    loaded: event.loaded,
                    percent: Math.round(event.loaded / event.total * 100),
                    speed: speed,
                    speedToText: sppedToText
                };
                _this._progress.emit({ _file: _file, _data: _obj });
            }
        });
        _xhr.addEventListener('load', function () {
            var headers = uploader._parseHeaders(_xhr.getAllResponseHeaders());
            var response = uploader._transformResponse(_xhr.response, headers);
            console.log('File upload done');
            var status = _xhr.status;
            _this._load.emit({ _file: _file, response: response, status: status, headers: headers });
        });
        _xhr.addEventListener('error', function () {
            var headers = uploader._parseHeaders(_xhr.getAllResponseHeaders());
            var response = uploader._transformResponse(_xhr.response, headers);
            console.log('File upload error');
            var status = _xhr.status;
            _this._error.emit({ _file: _file, response: response, status: status, headers: headers });
        });
        _xhr.addEventListener('abort', function () {
            var headers = uploader._parseHeaders(_xhr.getAllResponseHeaders());
            var response = uploader._transformResponse(_xhr.response, headers);
            console.log('File upload abort');
            var status = _xhr.status;
            _this._abort.emit({ _file: _file, response: response, status: status, headers: headers });
        });
        _xhr.open(_method, _url, true);
        _xhr.withCredentials = _withCredentials;
        for (var name_1 in _headers) {
            if (_headers.hasOwnProperty(name_1)) {
                var value = _headers[name_1];
                _xhr.setRequestHeader(name_1, value);
            }
        }
        _xhr.send(sendable);
    };
    ProtocolXHR.prototype.cancel = function (_file) {
        var _request = this.isConnected(_file);
        if (!!_request) {
            _request.connection.abort();
            this.removeConnection(_file);
        }
    };
    return ProtocolXHR;
}(Protocol));
exports.ProtocolXHR = ProtocolXHR;


/***/ }),

/***/ "./module/source/transfer.core.ts":
/* unknown exports provided */
/* all exports used */
/*!****************************************!*\
  !*** ./module/source/transfer.core.ts ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Rx_1 = __webpack_require__(/*! rxjs/Rx */ "./node_modules/rxjs/Rx.js");
var utils_core_1 = __webpack_require__(/*! ./utils.core */ "./module/source/utils.core.ts");
var fileManager_core_1 = __webpack_require__(/*! ./fileManager.core */ "./module/source/fileManager.core.ts");
var uploaderHook_core_1 = __webpack_require__(/*! ./uploaderHook.core */ "./module/source/uploaderHook.core.ts");
// tslint:disable:no-unused-expression
var TransferOptionsDefault = {
    url: '',
    alias: 'file',
    headers: {},
    filters: [],
    formData: [],
    autoUpload: false,
    method: 'POST',
    removeBySuccess: false,
    queueLimit: -1,
    enableCors: false,
    withCredentials: false,
    uniqueFiles: false
};
/**
 * An abstract class for the transport functionality
 *
 * @export
 * @abstract
 * @class Transfer
 */
var Transfer = (function () {
    /**
     * Creates an instance of Transfer.
     *
     * @param {string} type
     *
     * @memberOf Transfer
     */
    function Transfer(type, _options) {
        this.type = type;
        this._queue$ = new Rx_1.BehaviorSubject([]);
        var div = document.createElement('div');
        this._isHTML5 = !!(File && FormData && FileReader);
        this._isDragAndDrop = (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) ? true : false;
        this._id = utils_core_1.Utils.uniqueID();
        this._hooks = [];
        if (!this._isHTML5) {
            throw new Error("Your browser doesn't support HTML5. Our FileUploader can't work here.");
        }
        this.options = Object.assign({}, TransferOptionsDefault, _options);
    }
    Object.defineProperty(Transfer.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transfer.prototype, "queue$", {
        get: function () {
            return utils_core_1.Utils.asObservable(this._queue$);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transfer.prototype, "queueObs", {
        get: function () {
            return this._queue$.getValue();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Bind options to FileManager
     *
     * @param {FileManagerOptions} _options
     *
     * @memberOf FileManager
     */
    Transfer.prototype.bindOptions = function (_options) {
        this.options = Object.assign({}, this.options, _options);
    };
    /**
     * It gives HTML5 check back
     *
     * @returns {Boolean}
     *
     * @memberOf Transfer
     */
    Transfer.prototype.isHTML5 = function () {
        return this._isHTML5;
    };
    /**
     * It gives DragAndDrop check back
     *
     * @returns {Boolean}
     *
     * @memberOf Transfer
     */
    Transfer.prototype.isDragAndDrop = function () {
        return this._isDragAndDrop;
    };
    /**
     * To implement a hock
     *
     * @param {UploaderHook} hook
     *
     * @memberOf Transfer
     */
    Transfer.prototype.hook = function (_hook) {
        if (this.hookExists(_hook) === -1) {
            this._hooks.push(_hook);
            this._hooks.sort(function (a, b) {
                if (!(a.type) || !(b.type)) {
                    return 0;
                }
                if (a.type !== b.type) {
                    if (a.type < b.type) {
                        return -1;
                    }
                    if (a.type > b.type) {
                        return 1;
                    }
                    return 0;
                }
                else {
                    if (!(a.priority) || !(b.priority)) {
                        return 0;
                    }
                    if (a.priority > b.priority) {
                        return -1;
                    }
                    if (a.priority < b.priority) {
                        return 1;
                    }
                    return 0;
                }
            });
        }
    };
    /**
     *
     *
     * @param {UploaderHook} hook
     * @returns this
     *
     * @memberOf Transfer
     */
    Transfer.prototype.removeHook = function (_hook) {
        var key = this.hookExists(_hook);
        if (key >= 0) {
            this._hooks.splice(key, 1);
            return true;
        }
        return false;
    };
    Transfer.prototype.addFilesToQueue = function (_files, options) {
        var _retFiles = [];
        var _dummyFile;
        var _check = false;
        if (utils_core_1.Utils.isElement(_files)) {
            // If _files was not converted
            for (var _i = 0, _a = _files.files; _i < _a.length; _i++) {
                var _fileElement = _a[_i];
                try {
                    _dummyFile = new fileManager_core_1.FileManager(_fileElement, options, this);
                }
                catch (e) {
                    throw Error("Couldn't create a new FileManager object.");
                }
                _check = this.addFile(_dummyFile);
                (_check) && _retFiles.push(_dummyFile);
            }
        }
        else if (_files instanceof Object) {
            // If _files is an array of FileManger
            if ((typeof _files[0] !== 'undefined') && (_files[0] instanceof fileManager_core_1.FileManager)) {
                for (var _b = 0, _files_1 = _files; _b < _files_1.length; _b++) {
                    var _file = _files_1[_b];
                    _check = this.addFile(_file);
                    (_check) && _retFiles.push(_file);
                }
                // If _files is only a FileManger
            }
            else if (_files instanceof fileManager_core_1.FileManager) {
                _check = this.addFile(_files);
                (_check) && _retFiles.push(_files);
            }
            else {
                throw new Error("Couldn't put file/files to the queue. [" + _files + "]");
            }
        }
        else {
            throw new Error("Couldn't initialise FileUploader file/files are not defined. [" + _files + "]");
        }
        this._onAddFileAll();
        return _retFiles;
    };
    Transfer.prototype.addFile = function (_file) {
        try {
            this.validate(_file);
        }
        catch (e) {
            console.log(e.message);
            this._onAddFileError(_file);
            return false;
        }
        var queue = this._queue$.getValue();
        if (this.options.uniqueFiles) {
            if (this.notInQueue(_file) === -1) {
                this._runHook(uploaderHook_core_1.hookType.beforeAddingFile, _file);
                queue.push(_file);
                this._queue$.next(queue);
                this._onAddFile(_file);
                this._runHook(uploaderHook_core_1.hookType.afterAddingFile, _file);
                (this.options.autoUpload) && _file.upload();
                return true;
            }
        }
        else {
            this._runHook(uploaderHook_core_1.hookType.beforeAddingFile, _file);
            queue.push(_file);
            this._queue$.next(queue);
            this._onAddFile(_file);
            this._runHook(uploaderHook_core_1.hookType.afterAddingFile, _file);
            (this.options.autoUpload) && _file.upload();
            return true;
        }
        this._onAddFileError(_file);
        return false;
    };
    Transfer.prototype.removeFile = function (_file) {
        var key = this.notInQueue(_file);
        var queue = this._queue$.getValue();
        if (key >= 0) {
            queue.splice(key, 1);
            this._queue$.next(queue);
            return true;
        }
        return false;
    };
    Transfer.prototype.notInQueue = function (_file) {
        var queue = this._queue$.getValue();
        for (var key in queue) {
            if (queue.hasOwnProperty(key)) {
                var obj = queue[key];
                if ((obj.id === _file.id) ||
                    ((obj.name + obj.type + obj.size) ===
                        (_file.name + _file.type + _file.size))) {
                    return +key;
                }
            }
        }
        return -1;
    };
    Transfer.prototype.addFilter = function (_filter) {
        if (this.filterExists(_filter) !== -1) {
            this.options.filters.push(_filter);
        }
    };
    Transfer.prototype.validate = function (_file) {
        for (var _i = 0, _a = this.options.filters; _i < _a.length; _i++) {
            var _filter = _a[_i];
            if (!_filter.validate(_file)) {
                throw new Error("File [" + _file.name + "] doesn't fit with filter [" + _filter.name + "]");
            }
        }
        return true;
    };
    Transfer.prototype._setProtocol = function (_protocol) {
        this._protocol = _protocol;
    };
    Transfer.prototype._getProtocol = function () {
        return this._protocol;
    };
    /**
     * Validate response status code.
     *
     * @param {number} status
     * @returns {boolean}
     *
     * @memberOf Protocol
     */
    Transfer.prototype._isSuccessCode = function (status) {
        return (status >= 200 && status < 300) || status === 304;
    };
    /**
     * Upload functions
     */
    Transfer.prototype.upload = function () {
        this._onBeforeUploadAll();
        for (var _i = 0, _a = this.queueObs; _i < _a.length; _i++) {
            var _file = _a[_i];
            this.uploadItem(_file);
        }
    };
    Transfer.prototype.cancel = function () {
        for (var _i = 0, _a = this.queueObs; _i < _a.length; _i++) {
            var _file = _a[_i];
            this.cancelUploadItem(_file);
        }
    };
    Transfer.prototype.remove = function () {
        for (var _i = 0, _a = this.queueObs; _i < _a.length; _i++) {
            var _file = _a[_i];
            this.removeFile(_file);
        }
    };
    Transfer.prototype.uploadItem = function (item) {
        if (this.notInQueue(item) === -1) {
            this.addFile(item);
        }
        this._onBeforeUpload(item);
        this._getProtocol().run(item);
    };
    Transfer.prototype.cancelUploadItem = function (item) {
        if (this.notInQueue(item) === -1) {
            return;
        }
        (item.isUploading) && this._getProtocol().cancel(item);
        (item.isUploading) && item._cancel();
    };
    /**
     * Overwrite functions
     */
    Transfer.prototype.onAddFileAll = function (_uploader) { return; };
    Transfer.prototype.onAddFile = function (_file) { return; };
    Transfer.prototype.onAddFileError = function (_file) { return; };
    Transfer.prototype.onBeforeUploadAll = function (_uploader) { return; };
    Transfer.prototype.onBeforeUpload = function (_file) { return; };
    Transfer.prototype.onProgress = function (_uploader, _progress) { return; };
    Transfer.prototype.onProgressFile = function (_file, _progress) { return; };
    Transfer.prototype.onProgressFileSpeed = function (_file, _progress) { return; };
    Transfer.prototype.onSuccess = function (_file, _response, _status, _headers) { return; };
    Transfer.prototype.onError = function (_file, _response, _status, _headers) { return; };
    Transfer.prototype.onComplete = function (_file, _response, _status, _headers) { return; };
    Transfer.prototype.onCompleteAll = function (_uploader) { return; };
    ;
    /**
     * Internal functions
     */
    /**
     *
     *
     * @param {FileManager} _file
     * @param {number} _progress
     * @returns {void}
     *
     * @memberOf FileManager
     */
    Transfer.prototype._onAddFileAll = function () {
        this.onAddFileAll(this);
    };
    Transfer.prototype._onAddFile = function (_file) {
        this.onAddFile(_file);
    };
    Transfer.prototype._onAddFileError = function (_file) {
        this._runHook(uploaderHook_core_1.hookType.errorAddingFile, _file);
        this.onAddFileError(_file);
    };
    Transfer.prototype._onBeforeUploadAll = function () {
        this._runHook(uploaderHook_core_1.hookType.prepareUploadAll, this);
        this.onBeforeUploadAll(this);
    };
    Transfer.prototype._onBeforeUpload = function (_file) {
        this._runHook(uploaderHook_core_1.hookType.prepareUploadFile, _file);
        _file._onBeforeUpload();
        this.onBeforeUpload(_file);
    };
    Transfer.prototype._onProgressFileSpeed = function (_file, _speed) {
        this._runHook(uploaderHook_core_1.hookType.prepareUploadFile, _file, _speed);
        _file._onProgressFileSpeed(_speed);
        this.onProgressFileSpeed(_file, _speed);
    };
    Transfer.prototype._onProgressFile = function (_file, _progress) {
        _file._onProgress(_progress);
        this.onProgressFile(_file, _progress);
        this._onProgress();
    };
    Transfer.prototype._onProgress = function () {
        var queue = this._queue$.getValue();
        if (queue.length > 0) {
            var percent = 0;
            for (var _i = 0, queue_1 = queue; _i < queue_1.length; _i++) {
                var file = queue_1[_i];
                if (file.success || file.error) {
                    percent += 100;
                }
                else if (file.isUploading) {
                    percent += file.progress;
                }
            }
            percent = Math.floor(percent / queue.length);
            this._runHook(uploaderHook_core_1.hookType.progressUploadAll, percent);
            this.onProgress(this, percent);
            (percent >= 100) && this._onCompleteAll();
            return;
        }
        this.onProgress(this, 100);
        this._onCompleteAll();
    };
    Transfer.prototype._onSuccessFile = function (_file, response, status, headers) {
        this._runHook(uploaderHook_core_1.hookType.successUploadFile, _file, response, status, headers);
        _file._onSuccess(response, status, headers);
        this.onSuccess(_file, response, status, headers);
    };
    Transfer.prototype._onErrorFile = function (_file, response, status, headers) {
        this._runHook(uploaderHook_core_1.hookType.failedUploadFile, _file, response, status, headers);
        this.onError(_file, response, status, headers);
    };
    Transfer.prototype._onCompleteFile = function (_file, response, status, headers) {
        this._runHook(uploaderHook_core_1.hookType.completeUploadFile, _file, response, status, headers);
        this._onProgress();
        this.onComplete(_file, response, status, headers);
    };
    Transfer.prototype._onCompleteAll = function () {
        this._runHook(uploaderHook_core_1.hookType.completeUploadAll, this);
        this.onCompleteAll(this);
    };
    Transfer.prototype._headersGetter = function (parsedHeaders) {
        return function (name) {
            if (name) {
                return parsedHeaders[name.toLowerCase()] || null;
            }
            return parsedHeaders;
        };
    };
    Transfer.prototype._parseHeaders = function (headers) {
        var parsed = {}, key, val, i;
        if (!headers) {
            return parsed;
        }
        var incomeHeaders = headers.split('\n');
        for (var _i = 0, incomeHeaders_1 = incomeHeaders; _i < incomeHeaders_1.length; _i++) {
            var line = incomeHeaders_1[_i];
            i = line.indexOf(':');
            key = line.slice(0, i).trim().toLowerCase();
            val = line.slice(i + 1).trim();
            if (key) {
                parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
            }
        }
        return parsed;
    };
    Transfer.prototype._transformResponse = function (response, headers) {
        headers = {};
        return response;
    };
    Transfer.prototype._runHook = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        for (var key in this._hooks) {
            if (this._hooks.hasOwnProperty(key)) {
                var obj = this._hooks[key];
                if (obj.type === type) {
                    switch (type) {
                        case uploaderHook_core_1.hookType.beforeAddingFile:
                        case uploaderHook_core_1.hookType.prepareUploadAll:
                        case uploaderHook_core_1.hookType.prepareUploadFile:
                        case uploaderHook_core_1.hookType.afterAddingFile:
                        case uploaderHook_core_1.hookType.errorAddingFile:
                        case uploaderHook_core_1.hookType.completeUploadAll:
                        case uploaderHook_core_1.hookType.progressUploadAll:
                            {
                                obj.callback(args[0]);
                            }
                            break;
                        case uploaderHook_core_1.hookType.progressUploadFile:
                            {
                                obj.callback(args[0], args[1]);
                            }
                            break;
                        case uploaderHook_core_1.hookType.cancelUploadFile:
                        case uploaderHook_core_1.hookType.successUploadFile:
                        case uploaderHook_core_1.hookType.failedUploadFile:
                        case uploaderHook_core_1.hookType.completeUploadFile:
                            {
                                obj.callback(args[0], args[1], args[2], args[3]);
                            }
                            break;
                        default: {
                            throw new Error("hookType unknown or not defined");
                        }
                    }
                }
            }
        }
    };
    /**
     *
     *
     * @private
     * @param {UploaderHook} hook
     * @returns {Boolean}
     *
     * @memberOf Transfer
     */
    Transfer.prototype.hookExists = function (hook) {
        for (var key in this._hooks) {
            if (this._hooks.hasOwnProperty(key)) {
                var obj = this._hooks[key];
                if ((obj.type === hook.type) && ('' + obj.callback === '' + hook.callback)) {
                    return +key;
                }
            }
        }
        return -1;
    };
    Transfer.prototype.filterExists = function (_filter) {
        var filters = this.options.filters;
        for (var key in filters) {
            if (filters.hasOwnProperty(key)) {
                var obj = filters[key];
                if (obj.name === _filter.name) {
                    return +key;
                }
            }
        }
        return -1;
    };
    return Transfer;
}());
exports.Transfer = Transfer;


/***/ }),

/***/ "./module/source/uploaderHook.core.ts":
/* unknown exports provided */
/* all exports used */
/*!********************************************!*\
  !*** ./module/source/uploaderHook.core.ts ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var hookType;
(function (hookType) {
    hookType[hookType["beforeAddingFile"] = 0] = "beforeAddingFile";
    hookType[hookType["afterAddingFile"] = 1] = "afterAddingFile";
    hookType[hookType["errorAddingFile"] = 2] = "errorAddingFile";
    hookType[hookType["prepareUploadFile"] = 3] = "prepareUploadFile";
    hookType[hookType["progressUploadFile"] = 4] = "progressUploadFile";
    hookType[hookType["successUploadFile"] = 5] = "successUploadFile";
    hookType[hookType["completeUploadFile"] = 6] = "completeUploadFile";
    hookType[hookType["failedUploadFile"] = 7] = "failedUploadFile";
    hookType[hookType["cancelUploadFile"] = 8] = "cancelUploadFile";
    hookType[hookType["prepareUploadAll"] = 9] = "prepareUploadAll";
    hookType[hookType["progressUploadAll"] = 10] = "progressUploadAll";
    hookType[hookType["completeUploadAll"] = 11] = "completeUploadAll";
})(hookType = exports.hookType || (exports.hookType = {}));
var UploaderHook = (function () {
    function UploaderHook(_hookType, _callback, _priority) {
        if (_priority === void 0) { _priority = 0; }
        this._type = null;
        this._callback = null;
        this._priority = null;
        this._type = _hookType;
        this._callback = _callback;
        this._priority = +_priority;
    }
    Object.defineProperty(UploaderHook.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploaderHook.prototype, "priority", {
        get: function () {
            return this._priority;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploaderHook.prototype, "callback", {
        get: function () {
            return this._callback;
        },
        enumerable: true,
        configurable: true
    });
    return UploaderHook;
}());
exports.UploaderHook = UploaderHook;


/***/ }),

/***/ "./module/source/utils.core.ts":
/* unknown exports provided */
/* all exports used */
/*!*************************************!*\
  !*** ./module/source/utils.core.ts ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = __webpack_require__(/*! rxjs/Observable */ "./node_modules/rxjs/Observable.js");
var Utils = (function () {
    function Utils() {
    }
    /**
     * Creates a unique id for submit form.
     *
     * @static
     * @returns
     *
     * @memberOf utils
     */
    Utils.uniqueID = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            // tslint:disable-next-line:no-bitwise
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    /**
     * Validate input and returns true if input is an element
     *
     * @static
     * @param {*} _input
     * @returns {boolean} True if `value` is a DOM element (or wrapped jQuery element).
     *
     * @memberOf FileManager
     */
    Utils.isElement = function (_input) {
        return !!(_input &&
            (_input.nodeName ||
                (_input.prop && _input.attr && _input.find))); // We have an on and find methode part of jQuery API
    };
    /**
     * Validate input and returns true if input is a string
     *
     * @static
     * @param {*} _input
     * @returns {boolean}
     *
     * @memberOf Utils
     */
    Utils.isString = function (_input) {
        return !!(typeof _input === 'string');
    };
    Utils.extendValue = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _value = args[0];
        for (var i = 1; i < args.length; i++) {
            if (typeof args[i] !== 'undefined') {
                _value = args[i];
            }
        }
        return _value;
    };
    Utils.asObservable = function (subject) {
        return new Observable_1.Observable(function (fn) { return subject.subscribe(fn); });
    };
    return Utils;
}());
Utils._uniqueNumber = 1;
Utils.nextUID = function () { return (Utils._uniqueNumber++).toString(); };
exports.Utils = Utils;


/***/ })

},["./index.ts"]);
});
//# sourceMappingURL=ng2-file-uploader.webpack.umd.js.map