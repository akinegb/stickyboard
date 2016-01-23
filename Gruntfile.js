module.exports = function(grunt){

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	// grunt.loadNpmTasks('grunt-reactify');
	grunt.loadNpmTasks('grunt-react');
	
	grunt.initConfig({
		react: {
			single_file_output: {
				files: {
					'build/app.js': 'js/app.jsx'
				}
			}
		},
		compass : {
			dev: {
				options: {
					config: './config.rb'
				}
			}
		},	
		watch: {
			react : {
				files: ["js/*.jsx"],
				tasks: ["react"]
			},
			sass : {
				files : ["assets/sass/*.sass", "assets/sass/partials/*.sass"],
				tasks : ['compass:dev']
			}
		},
	});

	grunt.registerTask("default", "watch");

}