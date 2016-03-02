module.exports = (grunt) ->

  # configuration
  grunt.initConfig

    # grunt sass
    sass:
      compile:
        options:
          style: 'expanded'
        files: [
          expand: true
          cwd: 'src/stylesheets'
          src: ['**/*.scss']
          dest: 'dist/stylesheets'
          ext: '.css'
        ]

    # grunt coffee
    coffee:
      compile:
        expand: true
        cwd: 'src/scripts'
        src: ['**/*.coffee']
        dest: 'dist/scripts'
        ext: '.js'
        options:
          bare: true
          preserve_dirs: true

    # grunt slim
    slim:
      dist:
        files: [{
          expand: true
          cwd: 'src'
          src: ['**/*.slim']
          dest: 'dist'
          ext: '.html'
        }]

    copy:
      main:
        expand: true
        cwd: 'src'
        src: ['scripts/vendor/*.js', 'assets/icons/**/*.svg']
        dest: 'dist'

    # grunt watch (or simply grunt)
    watch:
      html:
        files: ['**/*.html']
      sass:
        files: '<%= sass.compile.files[0].src %>'
        tasks: ['sass']
      js:
        files: ['**/*.js']
        tasks: ['copy']
      coffee:
        files: '<%= coffee.compile.src %>'
        tasks: ['coffee']
      slim:
        files: ['**/*.slim']
        tasks: ['slim']
      options:
        livereload: true

  # load plugins
  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-slim'

  # tasks
  grunt.registerTask 'default', ['sass', 'coffee', 'slim', 'copy', 'watch']