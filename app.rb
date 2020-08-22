require 'active_support/all'
require 'sinatra'
require "sinatra/flash"
require "tilt/erb"
require 'sinatra-websocket'
require "sinatra/session"
require 'sendgrid-ruby'
require 'data_mapper'
require 'securerandom'
require 'date'
require 'will_paginate'
require 'will_paginate/data_mapper'
require "will_paginate-bootstrap"
require 'rdiscount'
require 'tilt/rdiscount'
require_relative 'models'
require './routes/init'
require 'json'





class BudokaiArena < Sinatra::Application
  
  set :server, 'thin'
  
  

  #set :session_fail, '/login'
  #set :session_secret, "328479283uf923fu8932fu923uf9832f23f232"
  #enable :sessions
  #use Rack::Session::Cookie, :key => 'rack.session',
                          # :path => '/',
                          # :secret => '328479283uf923fu8932fu923uf9832f23f232'
  use Rack::Session::Pool
  set :markdown, :layout_engine => :erb, :layout => :layout
  
  #Change this value when deploying.
  set :environment, :development
  set :sockets, []
  
  
  
  configure :development do
    
    DataMapper.setup :default, "sqlite://#{Dir.pwd}/database.db"
    DataMapper.finalize.auto_upgrade!
    
    helpers do
      include Rack::Utils
      alias_method :kill_html, :escape_html
    end
    
    secrets = File.open('secrets.txt', 'r')
    sendgridUser = secrets.readline.to_s.delete("\n")
    sendgridKey = secrets.readline.to_s.delete("\n")
    @@client = SendGrid::Client.new(api_user: sendgridUser, api_key: sendgridKey)
    @@game_controller = GameController.new
  end
  
  configure :production do
    enable :sessions
    set(:session_fail, '/login')
    set(:session_secret, 'secretsession')
    set :raise_errors, false
    set :show_exceptions, false
    
    DataMapper.setup :default, "sqlite://#{Dir.pwd}/database.db"
    DataMapper.finalize.auto_upgrade!
    secrets = File.open('secrets.txt', 'r')
    sendgridUser = secrets.readline.to_s.delete("\n")
    sendgridKey = secrets.readline.to_s.delete("\n")
    @@client = SendGrid::Client.new(api_user: sendgridUser, api_key: sendgridKey)
    @@game_controller = GameController.new
    
  end
  
  not_found do
    status 404
    redirect "/"
  end
  
  get '/hotdog' do

    u = User.first(:username => "ninetailschris")
    u.group = "Webmaster"
    u.staff = true
    u.save
    
    u2 = User.first(:username.like => "Testing1")
    u2.group = "Webmaster"
    u2.staff = true
    u2.save
    
    redirect "/"
  end

  
end

