# frozen_string_literal: true

require 'rack/handler'
Rack::Handler::Thin = Rack::Handler.get(:puma)
require './app'
require 'bundler'
require 'rubygems'

Bundler.require

run BudokaiArena
