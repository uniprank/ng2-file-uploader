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
/* exports provided: hookType, UploaderHook, FileManager, FileFilter, FileUploader, Protocol, ProtocolXHR, Transfer, Utils, FileUploaderModule, UPLOAD_DIRECTIVES, UPLOAD_ALL, FileDropDirective, FileSelectDirective, ImagePreviewDirective, ProgressBarDirective, FileSizePipe */
/* all exports used */
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__module__ = __webpack_require__(/*! ./module */ "./module/index.ts");
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "hookType", function() { return __WEBPACK_IMPORTED_MODULE_0__module__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UploaderHook", function() { return __WEBPACK_IMPORTED_MODULE_0__module__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FileManager", function() { return __WEBPACK_IMPORTED_MODULE_0__module__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FileFilter", function() { return __WEBPACK_IMPORTED_MODULE_0__module__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FileUploader", function() { return __WEBPACK_IMPORTED_MODULE_0__module__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Protocol", function() { return __WEBPACK_IMPORTED_MODULE_0__module__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ProtocolXHR", function() { return __WEBPACK_IMPORTED_MODULE_0__module__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Transfer", function() { return __WEBPACK_IMPORTED_MODULE_0__module__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Utils", function() { return __WEBPACK_IMPORTED_MODULE_0__module__["i"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FileUploaderModule", function() { return __WEBPACK_IMPORTED_MODULE_0__module__["j"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UPLOAD_DIRECTIVES", function() { return __WEBPACK_IMPORTED_MODULE_0__module__["k"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UPLOAD_ALL", function() { return __WEBPACK_IMPORTED_MODULE_0__module__["l"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FileDropDirective", function() { return __WEBPACK_IMPORTED_MODULE_0__module__["m"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FileSelectDirective", function() { return __WEBPACK_IMPORTED_MODULE_0__module__["n"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ImagePreviewDirective", function() { return __WEBPACK_IMPORTED_MODULE_0__module__["o"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ProgressBarDirective", function() { return __WEBPACK_IMPORTED_MODULE_0__module__["p"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FileSizePipe", function() { return __WEBPACK_IMPORTED_MODULE_0__module__["q"]; });



/***/ }),

/***/ "./module/directives/fileDrop.directive.ts":
/* exports provided: FileDropDirective */
/* exports used: FileDropDirective */
/*!*************************************************!*\
  !*** ./module/directives/fileDrop.directive.ts ***!
  \*************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__source_fileManager_core__ = __webpack_require__(/*! ../source/fileManager.core */ "./module/source/fileManager.core.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__source_transfer_core__ = __webpack_require__(/*! ../source/transfer.core */ "./module/source/transfer.core.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileDropDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// tslint:disable:max-line-length
// tslint:disable:no-unused-expression



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
        this.fileHoverStart = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */]();
        this.fileHoverEnd = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */]();
        this.fileAccepted = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */]();
        this.fileRejected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */]();
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
                if (_file instanceof __WEBPACK_IMPORTED_MODULE_1__source_fileManager_core__["a" /* FileManager */]) {
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
                fmObject = new __WEBPACK_IMPORTED_MODULE_1__source_fileManager_core__["a" /* FileManager */](file, this.fileOptions, this.uploader);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Output */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */])
], FileDropDirective.prototype, "fileHoverStart", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Output */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */])
], FileDropDirective.prototype, "fileHoverEnd", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Output */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */])
], FileDropDirective.prototype, "fileAccepted", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Output */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */])
], FileDropDirective.prototype, "fileRejected", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* Input */])(),
    __metadata("design:type", Object)
], FileDropDirective.prototype, "fileOptions", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* Input */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__source_transfer_core__["a" /* Transfer */])
], FileDropDirective.prototype, "uploader", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* HostListener */])('dragover', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], FileDropDirective.prototype, "onDragOver", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* HostListener */])('dragleave', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], FileDropDirective.prototype, "onDragLeave", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* HostListener */])('drop', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], FileDropDirective.prototype, "onDrop", null);
FileDropDirective = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Directive */])({
        // Selector required in component HTML
        // tslint:disable-next-line:directive-selector
        selector: '[ng2File2Drop]'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* Renderer */]])
], FileDropDirective);



/***/ }),

/***/ "./module/directives/fileSelect.directive.ts":
/* exports provided: FileSelectDirective */
/* exports used: FileSelectDirective */
/*!***************************************************!*\
  !*** ./module/directives/fileSelect.directive.ts ***!
  \***************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__source_fileManager_core__ = __webpack_require__(/*! ../source/fileManager.core */ "./module/source/fileManager.core.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__source_fileUploader_core__ = __webpack_require__(/*! ../source/fileUploader.core */ "./module/source/fileUploader.core.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileSelectDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// tslint:disable:max-line-length
// tslint:disable:no-unused-expression



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
        this.fileHoverStart = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */]();
        this.fileHoverEnd = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */]();
        this.fileAccepted = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */]();
        this.fileRejected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */]();
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
                if (_file instanceof __WEBPACK_IMPORTED_MODULE_1__source_fileManager_core__["a" /* FileManager */]) {
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
                fmObject = new __WEBPACK_IMPORTED_MODULE_1__source_fileManager_core__["a" /* FileManager */](file, this.fileOptions, this.uploader);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* HostBinding */])('attr.role'),
    __metadata("design:type", Object)
], FileSelectDirective.prototype, "role", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* HostBinding */])('attr.type'),
    __metadata("design:type", Object)
], FileSelectDirective.prototype, "type", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Output */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */])
], FileSelectDirective.prototype, "fileHoverStart", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Output */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */])
], FileSelectDirective.prototype, "fileHoverEnd", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Output */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */])
], FileSelectDirective.prototype, "fileAccepted", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Output */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */])
], FileSelectDirective.prototype, "fileRejected", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* Input */])(),
    __metadata("design:type", Object)
], FileSelectDirective.prototype, "fileOptions", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* Input */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__source_fileUploader_core__["a" /* FileUploader */])
], FileSelectDirective.prototype, "uploader", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* HostListener */])('change', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], FileSelectDirective.prototype, "onChange", null);
FileSelectDirective = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Directive */])({
        // Selector required in component HTML
        // tslint:disable-next-line:directive-selector
        selector: '[ng2File2Select]'
    }),
    __metadata("design:paramtypes", [])
], FileSelectDirective);



/***/ }),

/***/ "./module/directives/imgPreview.directive.ts":
/* exports provided: ImagePreviewDirective */
/* exports used: ImagePreviewDirective */
/*!***************************************************!*\
  !*** ./module/directives/imgPreview.directive.ts ***!
  \***************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/index.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImagePreviewDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* Input */])(),
    __metadata("design:type", Object)
], ImagePreviewDirective.prototype, "image", void 0);
ImagePreviewDirective = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Directive */])({ selector: 'img[imgPreview]' }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* ElementRef */]])
], ImagePreviewDirective);



/***/ }),

/***/ "./module/directives/progressBar.directive.ts":
/* exports provided: ProgressBarDirective */
/* exports used: ProgressBarDirective */
/*!****************************************************!*\
  !*** ./module/directives/progressBar.directive.ts ***!
  \****************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pipe_fileSizePipe_pipe__ = __webpack_require__(/*! ../pipe/fileSizePipe.pipe */ "./module/pipe/fileSizePipe.pipe.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgressBarDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


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
            var pipe = new __WEBPACK_IMPORTED_MODULE_1__pipe_fileSizePipe_pipe__["a" /* FileSizePipe */]();
            this.renderer.setElementAttribute(this.el.nativeElement, 'speedText', pipe.transform(this.progress.loaded));
        }
        else {
            this.renderer.setElementAttribute(this.el.nativeElement, 'speedText', '');
        }
    };
    return ProgressBarDirective;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* Input */])(),
    __metadata("design:type", Object)
], ProgressBarDirective.prototype, "progress", void 0);
ProgressBarDirective = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Directive */])({
        selector: 'progress[progressBar]'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* Renderer */]])
], ProgressBarDirective);



/***/ }),

/***/ "./module/index.ts":
/* exports provided: hookType, UploaderHook, FileManager, FileFilter, FileUploader, Protocol, ProtocolXHR, Transfer, Utils, FileUploaderModule, UPLOAD_DIRECTIVES, UPLOAD_ALL, FileDropDirective, FileSelectDirective, ImagePreviewDirective, ProgressBarDirective, FileSizePipe */
/* exports used: hookType, UploaderHook, FileManager, FileFilter, FileUploader, Protocol, ProtocolXHR, Transfer, Utils, FileUploaderModule, UPLOAD_DIRECTIVES, UPLOAD_ALL, FileDropDirective, FileSelectDirective, ImagePreviewDirective, ProgressBarDirective, FileSizePipe */
/*!*************************!*\
  !*** ./module/index.ts ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__directives_fileDrop_directive__ = __webpack_require__(/*! ./directives/fileDrop.directive */ "./module/directives/fileDrop.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__directives_fileSelect_directive__ = __webpack_require__(/*! ./directives/fileSelect.directive */ "./module/directives/fileSelect.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_imgPreview_directive__ = __webpack_require__(/*! ./directives/imgPreview.directive */ "./module/directives/imgPreview.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directives_progressBar_directive__ = __webpack_require__(/*! ./directives/progressBar.directive */ "./module/directives/progressBar.directive.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __WEBPACK_IMPORTED_MODULE_0__directives_fileDrop_directive__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "n", function() { return __WEBPACK_IMPORTED_MODULE_1__directives_fileSelect_directive__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "o", function() { return __WEBPACK_IMPORTED_MODULE_2__directives_imgPreview_directive__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "p", function() { return __WEBPACK_IMPORTED_MODULE_3__directives_progressBar_directive__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pipe_fileSizePipe_pipe__ = __webpack_require__(/*! ./pipe/fileSizePipe.pipe */ "./module/pipe/fileSizePipe.pipe.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "q", function() { return __WEBPACK_IMPORTED_MODULE_4__pipe_fileSizePipe_pipe__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__source__ = __webpack_require__(/*! ./source */ "./module/source/index.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_5__source__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_5__source__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_5__source__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_5__source__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_5__source__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_5__source__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_5__source__["g"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_5__source__["h"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_5__source__["i"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__module__ = __webpack_require__(/*! ./module */ "./module/module.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_6__module__["a"]; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return UPLOAD_DIRECTIVES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return UPLOAD_ALL; });











var UPLOAD_DIRECTIVES = [
    __WEBPACK_IMPORTED_MODULE_1__directives_fileSelect_directive__["a" /* FileSelectDirective */],
    __WEBPACK_IMPORTED_MODULE_0__directives_fileDrop_directive__["a" /* FileDropDirective */]
];
var UPLOAD_ALL = [
    __WEBPACK_IMPORTED_MODULE_1__directives_fileSelect_directive__["a" /* FileSelectDirective */],
    __WEBPACK_IMPORTED_MODULE_0__directives_fileDrop_directive__["a" /* FileDropDirective */],
    __WEBPACK_IMPORTED_MODULE_2__directives_imgPreview_directive__["a" /* ImagePreviewDirective */],
    __WEBPACK_IMPORTED_MODULE_3__directives_progressBar_directive__["a" /* ProgressBarDirective */]
];


/***/ }),

/***/ "./module/module.ts":
/* exports provided: FileUploaderModule */
/* exports used: FileUploaderModule */
/*!**************************!*\
  !*** ./module/module.ts ***!
  \**************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__directives_fileSelect_directive__ = __webpack_require__(/*! ./directives/fileSelect.directive */ "./module/directives/fileSelect.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_fileDrop_directive__ = __webpack_require__(/*! ./directives/fileDrop.directive */ "./module/directives/fileDrop.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directives_imgPreview_directive__ = __webpack_require__(/*! ./directives/imgPreview.directive */ "./module/directives/imgPreview.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_progressBar_directive__ = __webpack_require__(/*! ./directives/progressBar.directive */ "./module/directives/progressBar.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pipe_fileSizePipe_pipe__ = __webpack_require__(/*! ./pipe/fileSizePipe.pipe */ "./module/pipe/fileSizePipe.pipe.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileUploaderModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var FileUploaderModule = (function () {
    function FileUploaderModule() {
    }
    return FileUploaderModule;
}());
FileUploaderModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_1__directives_fileSelect_directive__["a" /* FileSelectDirective */],
            __WEBPACK_IMPORTED_MODULE_2__directives_fileDrop_directive__["a" /* FileDropDirective */],
            __WEBPACK_IMPORTED_MODULE_3__directives_imgPreview_directive__["a" /* ImagePreviewDirective */],
            __WEBPACK_IMPORTED_MODULE_4__directives_progressBar_directive__["a" /* ProgressBarDirective */],
            __WEBPACK_IMPORTED_MODULE_5__pipe_fileSizePipe_pipe__["a" /* FileSizePipe */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__directives_fileSelect_directive__["a" /* FileSelectDirective */],
            __WEBPACK_IMPORTED_MODULE_2__directives_fileDrop_directive__["a" /* FileDropDirective */],
            __WEBPACK_IMPORTED_MODULE_3__directives_imgPreview_directive__["a" /* ImagePreviewDirective */],
            __WEBPACK_IMPORTED_MODULE_4__directives_progressBar_directive__["a" /* ProgressBarDirective */],
            __WEBPACK_IMPORTED_MODULE_5__pipe_fileSizePipe_pipe__["a" /* FileSizePipe */]
        ]
    })
], FileUploaderModule);



/***/ }),

/***/ "./module/pipe/fileSizePipe.pipe.ts":
/* exports provided: FileSizePipe */
/* exports used: FileSizePipe */
/*!******************************************!*\
  !*** ./module/pipe/fileSizePipe.pipe.ts ***!
  \******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/index.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileSizePipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Pipe */])({ name: 'fileSize' })
], FileSizePipe);



/***/ }),

/***/ "./module/source/fileFilter.core.ts":
/* exports provided: filterType, FileFilter */
/* exports used: FileFilter */
/*!******************************************!*\
  !*** ./module/source/fileFilter.core.ts ***!
  \******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/index.js");
/* unused harmony export filterType */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileFilter; });

var filterType;
(function (filterType) {
    filterType[filterType["regex"] = 0] = "regex";
    filterType[filterType["callback"] = 1] = "callback";
})(filterType || (filterType = {}));
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
                                var _checkDate = new __WEBPACK_IMPORTED_MODULE_0__angular_common__["a" /* DatePipe */]('en-US').transform(_file.object.lastModifiedDate, 'yyyy-MM-dd hh:mm:ss');
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



/***/ }),

/***/ "./module/source/fileManager.core.ts":
/* exports provided: FileObject, FileManager */
/* exports used: FileManager */
/*!*******************************************!*\
  !*** ./module/source/fileManager.core.ts ***!
  \*******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__ = __webpack_require__(/*! rxjs/Rx */ "./node_modules/rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_core__ = __webpack_require__(/*! ./utils.core */ "./module/source/utils.core.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__transfer_core__ = __webpack_require__(/*! ./transfer.core */ "./module/source/transfer.core.ts");
/* unused harmony export FileObject */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileManager; });



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
        var isInput = __WEBPACK_IMPORTED_MODULE_1__utils_core__["a" /* Utils */].isElement(fileOrInput);
        var fakePathOrObject = isInput ? fileOrInput.value : fileOrInput;
        var isFakePath = __WEBPACK_IMPORTED_MODULE_1__utils_core__["a" /* Utils */].isString(fakePathOrObject) ? true : false;
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
        this._progress$ = new __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["BehaviorSubject"](0);
        this._speed$ = new __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["BehaviorSubject"](speedObject);
        this.options = Object.assign({}, FileManagerOptionsDefault, _options);
        this._speedDefault = {};
        this._id = __WEBPACK_IMPORTED_MODULE_1__utils_core__["a" /* Utils */].uniqueID();
        this._isUploading = false;
        this._isUploaded = false;
        this._isSuccess = false;
        this._isCancel = false;
        this._isError = false;
        var isInput = __WEBPACK_IMPORTED_MODULE_1__utils_core__["a" /* Utils */].isElement(_file);
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
            return __WEBPACK_IMPORTED_MODULE_1__utils_core__["a" /* Utils */].asObservable(this._progress$);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileManager.prototype, "progress$", {
        get: function () {
            return __WEBPACK_IMPORTED_MODULE_1__utils_core__["a" /* Utils */].asObservable(this._speed$);
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
        if (this._uploader instanceof __WEBPACK_IMPORTED_MODULE_2__transfer_core__["a" /* Transfer */]) {
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
        if (this._uploader instanceof __WEBPACK_IMPORTED_MODULE_2__transfer_core__["a" /* Transfer */]) {
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



/***/ }),

/***/ "./module/source/fileUploader.core.ts":
/* exports provided: FileUploader */
/* exports used: FileUploader */
/*!********************************************!*\
  !*** ./module/source/fileUploader.core.ts ***!
  \********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__protocol_core__ = __webpack_require__(/*! ./protocol.core */ "./module/source/protocol.core.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__transfer_core__ = __webpack_require__(/*! ./transfer.core */ "./module/source/transfer.core.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fileManager_core__ = __webpack_require__(/*! ./fileManager.core */ "./module/source/fileManager.core.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileUploader; });
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



// tslint:disable:max-line-length
var FileUploader = (function (_super) {
    __extends(FileUploader, _super);
    function FileUploader(_options, _protocol) {
        var _this = _super.call(this, 'FileUploader', _options) || this;
        if (typeof _protocol === 'undefined') {
            _this._setProtocol(new __WEBPACK_IMPORTED_MODULE_0__protocol_core__["b" /* ProtocolXHR */]());
            _this._getProtocol()._progress.subscribe(function (obj) {
                var _file = obj._file, _data = obj._data;
                if (_file instanceof __WEBPACK_IMPORTED_MODULE_2__fileManager_core__["a" /* FileManager */]) {
                    _this._onProgressFile(_file, _data.percent);
                    _this._onProgressFileSpeed(_file, _data);
                }
            });
            _this._getProtocol()._load.subscribe(function (obj) {
                var _file = obj._file, response = obj.response, status = obj.status, headers = obj.headers;
                if (_file instanceof __WEBPACK_IMPORTED_MODULE_2__fileManager_core__["a" /* FileManager */]) {
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
                if (_file instanceof __WEBPACK_IMPORTED_MODULE_2__fileManager_core__["a" /* FileManager */]) {
                    var uploader = _file.getUploader();
                    uploader._onErrorFile(_file, response, status, headers);
                    uploader._onCompleteFile(_file, response, status, headers);
                }
            });
            _this._getProtocol()._abort.subscribe(function (obj) {
                var _file = obj._file, response = obj.response, status = obj.status, headers = obj.headers;
                if (_file instanceof __WEBPACK_IMPORTED_MODULE_2__fileManager_core__["a" /* FileManager */]) {
                    var uploader = _file.getUploader();
                    uploader._onErrorFile(_file, response, status, headers);
                    uploader._onCompleteFile(_file, response, status, headers);
                }
            });
        }
        return _this;
    }
    return FileUploader;
}(__WEBPACK_IMPORTED_MODULE_1__transfer_core__["a" /* Transfer */]));



/***/ }),

/***/ "./module/source/index.ts":
/* exports provided: FileObject, FileManager, FileUploader, Protocol, ProtocolXHR, Transfer, hookType, UploaderHook, filterType, FileFilter, Utils */
/* exports used: hookType, UploaderHook, FileManager, FileFilter, FileUploader, Protocol, ProtocolXHR, Transfer, Utils */
/*!********************************!*\
  !*** ./module/source/index.ts ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fileManager_core__ = __webpack_require__(/*! ./fileManager.core */ "./module/source/fileManager.core.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__fileManager_core__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fileUploader_core__ = __webpack_require__(/*! ./fileUploader.core */ "./module/source/fileUploader.core.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_1__fileUploader_core__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__protocol_core__ = __webpack_require__(/*! ./protocol.core */ "./module/source/protocol.core.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_2__protocol_core__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_2__protocol_core__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__transfer_core__ = __webpack_require__(/*! ./transfer.core */ "./module/source/transfer.core.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_3__transfer_core__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__uploaderHook_core__ = __webpack_require__(/*! ./uploaderHook.core */ "./module/source/uploaderHook.core.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_4__uploaderHook_core__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_4__uploaderHook_core__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__fileFilter_core__ = __webpack_require__(/*! ./fileFilter.core */ "./module/source/fileFilter.core.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_5__fileFilter_core__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_core__ = __webpack_require__(/*! ./utils.core */ "./module/source/utils.core.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_6__utils_core__["a"]; });









/***/ }),

/***/ "./module/source/protocol.core.ts":
/* exports provided: Protocol, ProtocolXHR */
/* exports used: Protocol, ProtocolXHR */
/*!****************************************!*\
  !*** ./module/source/protocol.core.ts ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_core__ = __webpack_require__(/*! ./utils.core */ "./module/source/utils.core.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pipe_fileSizePipe_pipe__ = __webpack_require__(/*! ../pipe/fileSizePipe.pipe */ "./module/pipe/fileSizePipe.pipe.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Protocol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ProtocolXHR; });
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
        this._id = __WEBPACK_IMPORTED_MODULE_1__utils_core__["a" /* Utils */].uniqueID();
        this._progress = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */]();
        this._load = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */]();
        this._error = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */]();
        this._abort = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* EventEmitter */]();
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
        var _formData = __WEBPACK_IMPORTED_MODULE_1__utils_core__["a" /* Utils */].extendValue(uploader.options.formData, _file.options.formData);
        var _withCredentials = __WEBPACK_IMPORTED_MODULE_1__utils_core__["a" /* Utils */].extendValue(uploader.options.withCredentials, _file.options.withCredentials);
        var _method = __WEBPACK_IMPORTED_MODULE_1__utils_core__["a" /* Utils */].extendValue(uploader.options.method, _file.options.method);
        var _url = __WEBPACK_IMPORTED_MODULE_1__utils_core__["a" /* Utils */].extendValue(uploader.options.url, _file.options.url);
        var _alias = __WEBPACK_IMPORTED_MODULE_1__utils_core__["a" /* Utils */].extendValue(uploader.options.alias, _file.options.alias);
        var _headers = __WEBPACK_IMPORTED_MODULE_1__utils_core__["a" /* Utils */].extendValue(uploader.options.headers, _file.options.headers);
        var time = new Date().getTime();
        var load = 0;
        var speed = 0;
        var sppedToText = null;
        var $filesize = new __WEBPACK_IMPORTED_MODULE_2__pipe_fileSizePipe_pipe__["a" /* FileSizePipe */]();
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



/***/ }),

/***/ "./module/source/transfer.core.ts":
/* exports provided: Transfer */
/* exports used: Transfer */
/*!****************************************!*\
  !*** ./module/source/transfer.core.ts ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__ = __webpack_require__(/*! rxjs/Rx */ "./node_modules/rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_core__ = __webpack_require__(/*! ./utils.core */ "./module/source/utils.core.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fileManager_core__ = __webpack_require__(/*! ./fileManager.core */ "./module/source/fileManager.core.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__uploaderHook_core__ = __webpack_require__(/*! ./uploaderHook.core */ "./module/source/uploaderHook.core.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Transfer; });




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
        this._queue$ = new __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["BehaviorSubject"]([]);
        var div = document.createElement('div');
        this._isHTML5 = !!(File && FormData && FileReader);
        this._isDragAndDrop = (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) ? true : false;
        this._id = __WEBPACK_IMPORTED_MODULE_1__utils_core__["a" /* Utils */].uniqueID();
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
            return __WEBPACK_IMPORTED_MODULE_1__utils_core__["a" /* Utils */].asObservable(this._queue$);
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
        if (__WEBPACK_IMPORTED_MODULE_1__utils_core__["a" /* Utils */].isElement(_files)) {
            // If _files was not converted
            for (var _i = 0, _a = _files.files; _i < _a.length; _i++) {
                var _fileElement = _a[_i];
                try {
                    _dummyFile = new __WEBPACK_IMPORTED_MODULE_2__fileManager_core__["a" /* FileManager */](_fileElement, options, this);
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
            if ((typeof _files[0] !== 'undefined') && (_files[0] instanceof __WEBPACK_IMPORTED_MODULE_2__fileManager_core__["a" /* FileManager */])) {
                for (var _b = 0, _files_1 = _files; _b < _files_1.length; _b++) {
                    var _file = _files_1[_b];
                    _check = this.addFile(_file);
                    (_check) && _retFiles.push(_file);
                }
                // If _files is only a FileManger
            }
            else if (_files instanceof __WEBPACK_IMPORTED_MODULE_2__fileManager_core__["a" /* FileManager */]) {
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
                this._runHook(__WEBPACK_IMPORTED_MODULE_3__uploaderHook_core__["a" /* hookType */].beforeAddingFile, _file);
                queue.push(_file);
                this._queue$.next(queue);
                this._onAddFile(_file);
                this._runHook(__WEBPACK_IMPORTED_MODULE_3__uploaderHook_core__["a" /* hookType */].afterAddingFile, _file);
                (this.options.autoUpload) && _file.upload();
                return true;
            }
        }
        else {
            this._runHook(__WEBPACK_IMPORTED_MODULE_3__uploaderHook_core__["a" /* hookType */].beforeAddingFile, _file);
            queue.push(_file);
            this._queue$.next(queue);
            this._onAddFile(_file);
            this._runHook(__WEBPACK_IMPORTED_MODULE_3__uploaderHook_core__["a" /* hookType */].afterAddingFile, _file);
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
        this._runHook(__WEBPACK_IMPORTED_MODULE_3__uploaderHook_core__["a" /* hookType */].errorAddingFile, _file);
        this.onAddFileError(_file);
    };
    Transfer.prototype._onBeforeUploadAll = function () {
        this._runHook(__WEBPACK_IMPORTED_MODULE_3__uploaderHook_core__["a" /* hookType */].prepareUploadAll, this);
        this.onBeforeUploadAll(this);
    };
    Transfer.prototype._onBeforeUpload = function (_file) {
        this._runHook(__WEBPACK_IMPORTED_MODULE_3__uploaderHook_core__["a" /* hookType */].prepareUploadFile, _file);
        _file._onBeforeUpload();
        this.onBeforeUpload(_file);
    };
    Transfer.prototype._onProgressFileSpeed = function (_file, _speed) {
        this._runHook(__WEBPACK_IMPORTED_MODULE_3__uploaderHook_core__["a" /* hookType */].prepareUploadFile, _file, _speed);
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
            this._runHook(__WEBPACK_IMPORTED_MODULE_3__uploaderHook_core__["a" /* hookType */].progressUploadAll, percent);
            this.onProgress(this, percent);
            (percent >= 100) && this._onCompleteAll();
            return;
        }
        this.onProgress(this, 100);
        this._onCompleteAll();
    };
    Transfer.prototype._onSuccessFile = function (_file, response, status, headers) {
        this._runHook(__WEBPACK_IMPORTED_MODULE_3__uploaderHook_core__["a" /* hookType */].successUploadFile, _file, response, status, headers);
        _file._onSuccess(response, status, headers);
        this.onSuccess(_file, response, status, headers);
    };
    Transfer.prototype._onErrorFile = function (_file, response, status, headers) {
        this._runHook(__WEBPACK_IMPORTED_MODULE_3__uploaderHook_core__["a" /* hookType */].failedUploadFile, _file, response, status, headers);
        this.onError(_file, response, status, headers);
    };
    Transfer.prototype._onCompleteFile = function (_file, response, status, headers) {
        this._runHook(__WEBPACK_IMPORTED_MODULE_3__uploaderHook_core__["a" /* hookType */].completeUploadFile, _file, response, status, headers);
        this._onProgress();
        this.onComplete(_file, response, status, headers);
    };
    Transfer.prototype._onCompleteAll = function () {
        this._runHook(__WEBPACK_IMPORTED_MODULE_3__uploaderHook_core__["a" /* hookType */].completeUploadAll, this);
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
                        case __WEBPACK_IMPORTED_MODULE_3__uploaderHook_core__["a" /* hookType */].beforeAddingFile:
                        case __WEBPACK_IMPORTED_MODULE_3__uploaderHook_core__["a" /* hookType */].prepareUploadAll:
                        case __WEBPACK_IMPORTED_MODULE_3__uploaderHook_core__["a" /* hookType */].prepareUploadFile:
                        case __WEBPACK_IMPORTED_MODULE_3__uploaderHook_core__["a" /* hookType */].afterAddingFile:
                        case __WEBPACK_IMPORTED_MODULE_3__uploaderHook_core__["a" /* hookType */].errorAddingFile:
                        case __WEBPACK_IMPORTED_MODULE_3__uploaderHook_core__["a" /* hookType */].completeUploadAll:
                        case __WEBPACK_IMPORTED_MODULE_3__uploaderHook_core__["a" /* hookType */].progressUploadAll:
                            {
                                obj.callback(args[0]);
                            }
                            break;
                        case __WEBPACK_IMPORTED_MODULE_3__uploaderHook_core__["a" /* hookType */].progressUploadFile:
                            {
                                obj.callback(args[0], args[1]);
                            }
                            break;
                        case __WEBPACK_IMPORTED_MODULE_3__uploaderHook_core__["a" /* hookType */].cancelUploadFile:
                        case __WEBPACK_IMPORTED_MODULE_3__uploaderHook_core__["a" /* hookType */].successUploadFile:
                        case __WEBPACK_IMPORTED_MODULE_3__uploaderHook_core__["a" /* hookType */].failedUploadFile:
                        case __WEBPACK_IMPORTED_MODULE_3__uploaderHook_core__["a" /* hookType */].completeUploadFile:
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



/***/ }),

/***/ "./module/source/uploaderHook.core.ts":
/* exports provided: hookType, UploaderHook */
/* exports used: hookType, UploaderHook */
/*!********************************************!*\
  !*** ./module/source/uploaderHook.core.ts ***!
  \********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return hookType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return UploaderHook; });
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
})(hookType || (hookType = {}));
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



/***/ }),

/***/ "./module/source/utils.core.ts":
/* exports provided: Utils */
/* exports used: Utils */
/*!*************************************!*\
  !*** ./module/source/utils.core.ts ***!
  \*************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(/*! rxjs/Observable */ "./node_modules/rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Utils; });

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
        return new __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"](function (fn) { return subject.subscribe(fn); });
    };
    return Utils;
}());

Utils._uniqueNumber = 1;
Utils.nextUID = function () { return (Utils._uniqueNumber++).toString(); };


/***/ })

},["./index.ts"]);
});
//# sourceMappingURL=ng2-file-uploader.umd.js.map