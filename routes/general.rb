class BudokaiArena < Sinatra::Application
  
  get '/how_to_play' do
  if session?
  @user = User.first(:username => session[:username])   
  end
  erb :howtoplay
  end
  
  get '/faq' do
  if session?
  @user = User.first(:username => session[:username])   
  end

  erb :questions
     
  end
  
  get '/thanks' do
  
  
  if session?
  @user = User.first(:username => session[:username])   
  end
  erb :thanks
  end
 
  get '/ladder' do

  l = Leaderboards.last
  @ladders  =JSON.parse(l.users)
  puts @ladders.count
  if session?
  @user = User.first(:username => session[:username])   
  end
     
  erb :ladder
  end
  
  post '/ladder/dragonverse' do
  content_type :json  
  ladder = Leaderboards.last
  { :report => ladder.dragonverse}.to_json
  end
  
  post '/ladder/user' do
content_type :json  
   ladder = Leaderboards.last
   { :report => ladder.users}.to_json
  end
  
  get '/ladder/rank' do
  
  @ladders = User.all(:limit => 200, :order => [ :rank.desc ]).paginate(:page => params[:page], :per_page => 20)
  if session?
  @user = User.first(:username => session[:username])   
  end
        
  end
 
  get '/legal' do

  
  if session?
  @user = User.first(:username => session[:username])   
  end
     
  erb :legal  
  end
  
  
  get '/characters' do
  
  if session?
  @user = User.first(:username => session[:username])   
  end
  
  erb :characters
  end
  
  get '/staff' do

  if session?
  @user = User.first(:username => session[:username])   
  end
  
  erb :staff_list
  end
  
end

