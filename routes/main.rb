# frozen_string_literal: true

require 'rdiscount'
class BudokaiArena < Sinatra::Application # rubocop:disable Style/Documentation
  get '/' do
    if session?
      @user = User.first(username: session[:username])
      @user = User.first(username: session[:username])
      @user.last_page_name = 'Home'
      @user.last_page_link = '/'
      @user.save
      @posts = Post.all(order: :id.desc, limit: 4)
      @fpost = @posts.first
      erb :home

    else
      @posts = Post.all(order: :id.desc, limit: 4)
      @fpost = @posts.first
      erb :home
    end
  end
end
