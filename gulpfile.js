var gulp = require( 'gulp' ),
    sass = require( 'gulp-sass' ),
    csso = require( 'gulp-csso' ),
    del = require( 'del' ),
    colors = require( 'ansi-colors' ),
    imagemin = require( 'gulp-imagemin' ),
    autoprefixer = require( 'gulp-autoprefixer' );

// Filenames of source and distribution folders
var source_folder = 'src',
    distribution_folder = 'dist';

// Task to clean out the distribution folder, run before rebuilding files
gulp.task( 'clean',
    function() {
        return clean( distribution_folder );
    }
);
gulp.task( 'clean' ).description = "Remove old files from the distribution folder";

// Task to build all files for distribution
gulp.task( 'dist',
    gulp.series(
        'clean',
        css,
        images,
        fonts
    )
);
gulp.task( 'dist' ).description = "Build all files for distribution to the FitPay web app";

// Remove all files from the specified folder
function clean( folder ) {
    if( folder == distribution_folder ) {
        console.log( colors.red( 'Cleaning the ' + folder + ' folder...' ) );
        return del([
            'dist/**/*'
            // Negate the pattern to ignore files (add a comma above)
            //'!build/js/jquery.js.min'
        ]);
    } else {
        console.log( colors.red( 'Cannot clean the ' + folder + ' folder, permission denied.' ) );
        // Need to figure out how to signal that the task is done in this case...
    }
}

// Compile the Sass files, autoprefix, and run the CSS through an optimizer
function css() {
    return gulp.src( './' + source_folder + '/scss/style.scss', { allowEmpty: true } )
        // Compile Sass files
        .pipe( sass( { precision: 10 } ).on( 'error', sass.logError ) )
        // Auto-prefix CSS for cross-browser compatibility
        .pipe( autoprefixer() )
        // Optimize and minify the resulting CSS
        .pipe( csso() )
        // Output to the distribution folder
        .pipe( gulp.dest( './' + distribution_folder + '/css/' ) );
}

// Prepare images for distribution
function images() {
    return gulp.src( './' + source_folder + '/img/**/*', { allowEmpty: true } )
        // Minify PNG, JPG, GIF, and SVG files
        .pipe( imagemin() )
        // Output to the distribution folder
        .pipe( gulp.dest( './' + distribution_folder + '/img/' ) );
}

function fonts() {
    // Do something
}
