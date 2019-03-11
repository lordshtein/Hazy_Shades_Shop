var gulp      = require('gulp'), // Подключаем Gulp
    sass        = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync = require('browser-sync'); // Подключаем Browser Sync

gulp.task('sass', function(){ // Создаем таск Sass
    return gulp.src('./sass/**/*.scss') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest('./dist/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: './dist' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('code', function() {
    return gulp.src('./*.html')
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function() {
    gulp.watch('./sass/**/*.scss', gulp.parallel('sass')); // Наблюдение за sass файлами
    gulp.watch('./*.html', gulp.parallel('code')); // Наблюдение за HTML файлами в корне проекта
});

gulp.task('default', gulp.parallel('sass', 'code', 'browser-sync', 'watch'));