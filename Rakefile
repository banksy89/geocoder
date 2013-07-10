desc "Start the PHP Server"
task :server do 
    system('php -S localhost:9292')
end

desc "Run unit tests"
task :units do
    puts "Running all Unit tests through Codeception"
    run_tests()
end

task :acceptance do
    puts "Running all Accpetance tests through Codeception"
    run_tests("acceptance")
end

desc "Deploys the website after running tests and clean ups"
task :deploy do
  puts "--> Running all system tests before deployment..."
  result = run_tests("all")
  if result
    puts "--> All Tests successfully passed"
    puts "--> Initiating PHP clean up..."
    system("php-cs-fixer fix . -fixers=linefeed,short_tag,indentation,trailing_spaces,unused_use,phpdoc_params,visibility,return,braces,extra_empty_lines,elseif,php_closing_tag")
    puts "--> PHP all cleaned up - pushing up to GitHub"
    lazy_git("master")
    puts "--> Uploading files to production server"
    system('ant upload_files')
    puts "--> Deployment completed."
    growl_notify("Deployment complete and successful!", "")
  end
end

desc "A lazy push task"
task :push do
  lazy_git('master')
end

task :selenium do
  system('java -jar tests/selenium-server-standalone-2.33.0.jar')
end

def lazy_git(branch="development")
  system('git add .')
  system('git add -A')
  system("git commit -m 'Deloyment - updating with master branch'")
  system("git push origin #{branch}")
end

def run_tests(type="unit")
    if type == 'all'
        type = ""
    end
    result = system("php codecept.phar run #{type}")
    type = type.capitalize
    if result
        message = "#{type} Tests Passed!"
        image = ""
    else
        message = "#{type} Tests Failed!"
        image = ""
    end
    growl_notify(message, image)
    return result
end

def growl_notify(message, image="") 
    if !image.nil?
        image = "--image '#{image}'"
    end
    system("growlnotify #{image} -m '#{message}'")
end

desc "Create a basic controller"
task :phpcontroller, :arg1 do |t, args|
  controller_name = args[:arg1].capitalize
  puts "Actioning the basic controller GUI for #{controller_name}"
  puts "Writing Cest Unit Test for #{controller_name}"
  system("php codecept.phar generate:cept unit Test#{controller_name}Cest")
  system("php cmd/b_con.php")
end

desc "Create a Model"
task :model, :arg1 do |t, args|
  model_name = args[:arg1].capitalize
  puts "Actioning the basic model GUI to build #{model_name} model"
  puts "Going to build Unit Test for #{model_name}"
  system("php codecept.phar generate:cept unit Test#{model_name}Cept")
  system("php cmd/b_mod.php")
end

desc "Cleans up all PHP Code"
task :phpcleanup do
  system("php-cs-fixer fix .")
end

desc "Create just a simple controller"
task :controller do
  STDOUT.puts "What would you like this controller to be called?"
  input = STDIN.gets.strip
  methods = ""

  controller_name = input.capitalize
  puts "Building the Controller Test ( Cest in other words ) for #{controller_name}"
  system("php codecept.phar generate:cept unit Test#{controller_name}Cest")

  view_directory = "app/views/templates/#{input}"
  controller_path = "app/controllers/#{input}.php"

  puts "Creating View Directory: #{view_directory}"
  FileUtils.mkdir_p(view_directory) unless File.exists?(view_directory)
  
  if( !input.nil? )
    method = ""
    while method != 'n'
      STDOUT.puts "Please name a method to add to the controller...type n to stop"
      method = STDIN.gets.strip
      if method != "n" && !method.nil?
        methods << "public function #{method}() {} \n\n"
        puts "Creating view files for #{method} within #{input} views directory"

        view_file = ""
        view_file = view_directory+"/#{method}.php"
        
        File.open(view_file, "w") {|file| file.puts "<h1>#{method}</h1>"}
      
        puts "Building acceptance test for #{method}"
        system("php codecept.phar generate:cept acceptance Test#{method.capitalize}Cept")

        
      end
    end
  end

  contents = "<?php
    class #{input.capitalize} extends C_Controller {

        public function index()
        {

        }

        #{methods}

    }
  ?>"

  puts "Creating controller #{controller_path}"
  File.open(controller_path, "w") {|file| file.puts contents}

  puts "Action of Controller has now all been done. Thank you, and come again!"
end

desc "Create a javascript file: choice of backbone or require"
task :javascript do
  STDOUT.puts "Standard Require script (R) or Backbone View (B)?"
  script_type = STDIN.gets.strip

  if !script_type.nil?
    STDOUT.puts "Enter the script name."
    script_name = STDIN.gets.strip

    dependencies = []
    dependency = ""

    while dependency != "n"
      STDOUT.puts "Enter dependency title:"
      dependency = STDIN.gets.strip  
      if dependency != 'n'
        dependencies.push("'#{dependency}'")
      end
    end

    if script_type == 'b' || script_type == 'B'
      example_file = "assets/scripts/views/backbone-example.js"
      create_file = "assets/scripts/views/#{script_name}.js"
      message = "Backbone view File successfully created"
      dependencies = (dependencies.length > 0 ? "," + dependencies.join(",") : "")
    else
      example_file = "assets/scripts/app/_require-example.js"
      create_file = "assets/scripts/app/#{script_name}.js"
      message = "Require JS File successfully created"
      dependencies = (dependencies.length > 0 ? dependencies.join(",") : "")
    end

    example_file = File.read(example_file)

    replace = example_file.gsub('<<dependencies>>', dependencies)
    File.open(create_file, "w") {|file| file.puts replace}
    
    puts message
  end
end

desc "Database migrations"
task :dbmigrate do
  puts "Actioning migration of database schemas"
  system("php cmd/migrate.php")
end

task :default => ["tests"]

desc "Initialise the admin area"
task :admininit do
  puts "Creating the most basic version of the admin area"
  system("php cmd/admin_init.php")
end

desc "Create a listing page and all the necesary files"
task :adminlisting do
  puts "Create a listing page"
  system("php cmd/admin_listing.php")
end

desc "Run script to publish the database to the live server"
task :publish_db do
  puts "Publish database"
  system("php cmd/publish_db.php")
end

desc "Just create a database with a migration"
task :dba do
  puts "Create database"
  system("php cmd/dba.php")
end

desc "Interaction Tests"
task :mochait do
  system( "mocha tests/interaction" )
end