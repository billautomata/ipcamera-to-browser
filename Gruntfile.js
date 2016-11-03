module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-express-server')
  grunt.loadNpmTasks('grunt-run')

  grunt.registerTask('serve', [ 'watch' ])
  grunt.registerTask('default', 'serve')

  grunt.initConfig({
    watch: {
      html_and_css : {
        files: [
          './docs/*.html',
          './docs/css/*.css'
        ],
        options : {
          force: true,
          livereload : {
            port: 35729
          }
        }
      }
    }
  })
}
