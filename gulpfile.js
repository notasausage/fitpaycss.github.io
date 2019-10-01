var gulp = require( 'gulp' ),
    sass = require( 'gulp-sass' ),
    csso = require( 'gulp-csso' ),
    del = require( 'del' ),
    colors = require( 'ansi-colors' ),
    autoprefixer = require( 'gulp-autoprefixer' );

gulp.task( 'clean',
    function() {
        return clean( 'dist' );
    }
);
gulp.task( 'clean' ).description = "Remove old files from the distribution folder";

gulp.task( 'dist',
    gulp.series(
        'clean',
        scss,
        images,
        fonts
    )
);
gulp.task( 'dist' ).description = "Build all files for distribution to the FitPay web app";

// Remove all files from the specified folder
function clean( folder ) {
    if( folder == 'dist' ) {
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

function scss() {
    // Do something
}

function images() {
    // Do something
}

function fonts() {
    // Do something
}
