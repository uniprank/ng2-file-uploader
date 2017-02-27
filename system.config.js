(function(global) {
    var meta = {
        'lib/vendor.js': { 
            format: 'global',
            exports: '@angular'
        }
    };

    // map tells the System loader where to look for things
    var map = {
        'lib':                        'lib', // 'dist',
        'rxjs':                       'node_modules/rxjs',
        '@angular':                   'node_modules/@angular'
    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'lib':                        { main: 'index.js',  defaultExtension: 'js' },
        'lib/module':                 { main: 'index.js',  defaultExtension: 'js' },
        'lib/module/source':          { main: 'index.js',  defaultExtension: 'js' },
        'rxjs':                       { defaultExtension: 'js' }
    };

    var packageNames = [
        '@angular/common',
        '@angular/compiler',
        '@angular/core',
        //
    ];

    // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
    packageNames.forEach(function(pkgName) {
        packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
    });

    var config = {
        meta: meta,
        map: map,
        packages: packages
    }

    // filterSystemConfig - index.html's chance to modify config before we register it.
    if (global.filterSystemConfig) { global.filterSystemConfig(config); }

    System.config(config);

})(this);