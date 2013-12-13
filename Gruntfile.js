module.exports = function(grunt){
  grunt.initConfig({
     pkg : grunt.file.readJSON("package.json"),

     transport : {
        options : {
          paths : ['.']
         ,alias : '<%= pkg.spm.alias %>'
        }
        ,models : {
          options : {
            idleading : 'dist/'
          }
         ,files : [
           {
              cwd : 'assets/scripts/src'
             ,src : [
              'main.js',
              'common.js',
              'collections/todos.js',
              'models/todo.js',
              'routers/router.js',
              'vendor/backbone.localStorage.js',
              'views/app.js',
              'views/todos.js'
             ]  
             ,filter : 'isFile'
             ,dest : '.build'
           }
         ]
        }
     }
    
    ,concat : {
      options : {
        paths : ['.'],
        include : 'relative'
      }
     ,app : {
        options : {
          include : 'relative'
        }
       ,files : {
          'dist/app.js' : ['.build/**/*.js'],
          'dist/app-debug.js' : ['.build/**/*-debug.js']
       }
     }
    }
    ,uglify: {
      index : {
        files : {
          'dist/app.js' : ['dist/app.js']
        }
      }
    }
    
    ,clean : {
      spm : ['.build']
    }
  });

  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-cmd-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('build',['transport','concat','uglify']);
}