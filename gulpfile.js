const gulp = require('gulp');
const typedoc = require('gulp-typedoc');
const conventionalChangelog = require('gulp-conventional-changelog');
const systemjsBuilder = require('gulp-systemjs-builder')

gulp.task('changelog', () => {
  return gulp.src('CHANGELOG.md', {
    buffer: false
  })
  .pipe(conventionalChangelog({
    preset: 'angular',
    releaseCount: 1
  }, {
    currentTag: require('./package.json').version
  }))
  .pipe(gulp.dest('./'));
});

gulp.task('docs', () => {
  return gulp.src([
    'index.ts',
    '!node_modules/**/*'])
    .pipe(typedoc({
      name: '@uniprank/ng2-file-upluader',
      mode: 'file',
      out: 'docs',
      ignoreCompilerErrors: true,
      experimentalDecorators: true,
      emitDecoratorMetadata: true,
      target: 'ES6',
      moduleResolution: 'node',
      preserveConstEnums: true,
      stripInternal: true,
      suppressExcessPropertyErrors: true,
      suppressImplicitAnyIndexErrors: true,
      module: 'es6',
      ignoreCompilerErrors: true,
      noLib: true
    }));
});

// Bundle dependencies into vendors file
gulp.task('bundle:libs', function () {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/semantic-ui/dist/semantic.min.js',
        'node_modules/es6-shim/es6-shim.min.js',
        'node_modules/es6-promise/dist/es6-promise.min.js',
        'node_modules/systemjs/dist/system.src.js',
        'system.config.js',
      ])
        .pipe(concat('vendors.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/lib/js'));
});

// Compile TypeScript to JS
gulp.task('compile:ts', function () {
  return gulp
    .src([
        "module/**/*.ts",
        "lib/**/*.d.ts"
    ])
    .pipe(sourcemaps.init())
    .pipe(tsc({
        "module": "system",
        "moduleResolution": "node",
        "outDir": "public/dist/js",
        "target": "ES5"
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

// Generate systemjs-based builds
gulp.task('bundle:js', function() {
  var builder = new sysBuilder('public', './system.config.js');
  return builder.buildStatic('app', 'public/dist/js/app.min.js');
});

// Minify JS bundle
gulp.task('minify:js', function() {
  return gulp
    .src('public/dist/js/app.min.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/dist/js'));
});

gulp.task('scripts', ['compile:ts', 'bundle:js', 'minify:js']);

gulp.task('build-sjs', function () {
    var builder = systemjsBuilder()
    builder.loadConfigSync('./system.config.js')
 
    builder.buildStatic('./lib/index.js - rxjs/Rx - rxjs/Observable - @angular/common - @angular/core', 'ng2-file-uploader.systemjs.umd.js', {
        minify: false,
        mangle: false,
        sourceMaps: true
    })
    .pipe(gulp.dest('./bundles'));
})
