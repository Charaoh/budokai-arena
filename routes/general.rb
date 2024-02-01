class BudokaiArena < Sinatra::Application
  get '/how_to_play' do
    @user = User.first(username: session[:username]) if session?
    erb :howtoplay
  end

  get '/faq' do
    @user = User.first(username: session[:username]) if session?

    erb :questions
  end

  get '/thanks' do
    @user = User.first(username: session[:username]) if session?
    erb :thanks
  end

  get '/ladder' do
    l = Leaderboards.last
    @ladders = JSON.parse(l.users)
    puts @ladders.count
    @user = User.first(username: session[:username]) if session?

    erb :layout
  end

  post '/ladder/dragonverse' do
    content_type :json
    ladder = Leaderboards.last
    { report: ladder.dragonverse }.to_json
  end

  post '/ladder/user' do
    content_type :json
    ladder = Leaderboards.last
    { report: ladder.users }.to_json
  end

  get '/ladder/rank' do
    @ladders = User.all(limit: 200, order: [:rank.desc]).paginate(page: params[:page], per_page: 20)
    @user = User.first(username: session[:username]) if session?
  end

  get '/legal' do
    @user = User.first(username: session[:username]) if session?

    erb :legal
  end

  get '/characters' do
    @user = User.first(username: session[:username]) if session?

    erb :characters
  end

  get '/staff' do
    @user = User.first(username: session[:username]) if session?

    erb :staff_list
  end
end
