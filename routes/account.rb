require 'fileutils'

class BudokaiArena < Sinatra::Application
  
  
   get '/update' do
    
   if session? 
  
   admin = User.first(:username => "ninetailschris")
   u = User.first(:username => session[:username])
   
   u.unlockskills = admin.unlockskills 
   u.stats = admin.stats 
   u.unlockcharacters = admin.unlockcharacters
   u.items = '{"c1": 99,"item":"c1"}'
   u.team = '["zYa","zGu","zCu"]'
   if u.save
   puts "Save"
  else
   puts "Couldn't Save"
   end
   puts "Unlockcharacter: #{u.unlockcharacters}"
   redirect "/"
   else
   flash[:error] = "You need to login in to enter this page."
   erb :login
   end

  end
  
  get '/updateLadder' do
  u = User.first(:username => session[:username])
  
  if u.staff
  l = Leaderboards.new
  @ladders = User.all(:limit => 100, :order => [ :power_level.desc ])
  @planets = Planet.all(:limit => 100, :order => [ :power_level.desc ])
  l.users = @ladders.to_json
  l.dragonverse = @planets.to_json
  l.save
end
redirect "/"
  end
  
  get '/update1' do
  u = User.first(:username => session[:username])
  u.clan = "none"
  u.members.all.destroy
  u.save
  
  redirect "/arena"
   
  end
  
  
  get '/update2' do
  u = User.all
  u.update(:rank => "D", :power_level => 0,:kili => 100000)
  
  end
  
  get '/stats' do
  s = Statics.new
 # s = Statics.first
  s.info = '{}'
  s.save
  
  redirect "/"
  end
  
  get '/money' do
   u = User.first(:username => session[:username]) 
   u.money += 5000000
   u.kili += 10000
   u.save
  end
  
  get "/remove" do
  u = User.first(:username => "jon")
  u.destroy
  redirect "/"
  end

  
  get '/user/:username' do
    @u = User.first(:username => params[:username])
    
    if !@u
    redirect "/"  
    end
    
    if session? 
    @user = User.first(:username => session[:username])
    us = @user
    us.last_page_name = "Profile: #{params[:username]}"
    us.last_page_link = "/user/#{params[:username]}"
    
    if us.save
    puts "Yes, I'm saving."
    end
    
    @u.battlelogs.all(:created_at.lte => 1.day.ago).destroy
    end
    
    erb :profile
    
  end
  
  get '/webmaster' do
  u = User.first(:username => "vegeta")
  puts "My ID is #{u.id} "
  u.password = "MonamiMonamor1"
  u.staff = true
  u.group = "Webmaster"
  u.save
  
  end
  
  post '/user/:username/comment' do
    if session!
    redirect "/"
    end
    from_user = User.first(:username => session[:username])
    to_user = User.first(:username => params[:username])
    
    if from_user.banned
      flash[:error] = "You cannot post as you have been banned from posting comments."
      redirect "/news/#{params[:id]}"
    end
    
    
    c = Comment.create(:from_user => from_user, :to_user => to_user, :author => session[:username], :body => params[:body])
        c.from_user = from_user
        c.to_user = to_user
        from_user.last_page_link = "/user/#{params[:username]}"
        from_user.last_page_name = "Profile: #{params[:username]}"
        from_user.messages << c
        to_user.messages << c
        from_user.save
        to_user.save
    
    if c.save  
      flash[:success] = "Posted comment."
    else
      errors = []
      c.errors.each do |e|
        errors.unshift(e)
      end
      flash[:error] = errors
    end
    
    redirect "/user/#{params[:username]}"
  end
  
  post '/user/:username/delete' do
    if session! 
    redirect "/"
    end
    u = User.first(:username => params[:username])
    
    if u.username == params[:username] || u.staff 
    
    c = Comment.get(params[:id].to_i)
    if c.blank?
    flash[:error] = "Comment doesn't exist."
    redirect "/user/#{params[:username]}"
    end
    c.destroy  
    flash[:success] = "Comment was deleted."
    redirect "/user/#{params[:username]}"
  else
    flash[:error] = "You don't have access rights to this comment."
    redirect "/user/#{params[:username]}"
    end
    
    
    redirect "/user/#{params[:username]}"
  end
  
  post '/user/:username/edit' do
    if session!
    redirect "/"
    end
    u = User.first(:username => params[:username])
    
    puts params[:new_id]
    
    if u.username == params[:username] || u.staff 
    id = params[:new_id].to_i
    c = Comment.get(id)
    puts "Working? : #{id}"
    if !c
    flash[:error] = "Comment doesn't exist."
    redirect "/user/#{params[:username]}"
    end
    c.body = params[:body]
    c.save
    flash[:success] = "Comment was Edited."
    redirect "/user/#{params[:username]}"
  else
    flash[:error] = "You don't have access rights to this comment."
    redirect "/user/#{params[:username]}"
    end
    
    
    redirect "/user/#{params[:username]}"
  end
  
  get '/settings' do
    
    if session!
    redirect "/"
    end

    @user = User.first(:username => session[:username])
    
    u = User.first(:username => session[:username])
    u.last_page_name = "settings"
    u.last_page_link = "/settings"
    u.save
    erb :settings
  end
  
  post '/change_email' do
    if session!
    redirect "/"
    end
    u = User.first(:username => session[:username])
    u.email = params[:email]
    u.save
    @user = User.first(:username => session[:username])
    flash[:success] = "Your email was updated!"
    redirect '/settings'
  end
  
  post '/change_signature' do
     if session!
    redirect "/"
    end
    puts params[:new_id]
    
    id = params[:new_id].to_i
    us = User.first(:username => session[:username])
    u = User.get(id)

    
    if !u 
    flash[:error] = "User Doesn't Exist."
    redirect params[:location]
    end
    puts us.username
    puts u.username
    if u.username == us.username || us.staff
    u.signature = params[:body]
    u.save
    flash[:success] = "Your signature was updated!"
     redirect params[:location]
    else
    flash[:error] = "You don't have access rights to this signature."
    redirect params[:location]
    end
  end
  
   post '/background_game' do
    if session!
    redirect "/"
    end
    u = User.first(:username => session[:username])
    u.backgroundGame = params[:background_game]
    u.save
    @user = User.first(:username => session[:username])
    flash[:success] = "Your background for game was updated!"
    redirect '/settings'
  end
  
   post '/avater' do
    if session!
    redirect "/"
    end
    u = User.first(:username => session[:username])
    avater = params[:avater]
    old_name = "public#{avater}"
    path = "public/avatars/#{u.id}.jpg"
    path = "public/avatars/#{u.id}.png"
    FileUtils.cp(old_name, path)
    u.update(:avater => "/ava/#{u.id}.jpg")
    u.update(:avater => "/ava/#{u.id}.png")
    flash[:success] = "Your avatar was updated!"
    redirect '/settings'
  end
  
  post '/upload' do
    if session!
    redirect "/"
    end
    unless params[:file] &&
           (tmpfile = params[:file][:tempfile]) &&
           (name = params[:file][:filename])
      flash[:error] = "No file selected"
      redirect '/settings'
    end
    puts params[:file]
     if File.size(tmpfile) > 75000
      flash[:error] = "Your avater was to big. All avatars need to be under 75kb."
      redirect "/settings"
     end
    u = User.first(:username => session[:username])
     
     puts "What is the format: #{name}"
     
     
      directory = "public/check"
      new_file = "#{u.id}.jpg"
      path = File.join(directory, new_file)
      File.open(path, "wb") { |f| f.write(tmpfile.read) }
     
      flash[:success] = "Your avatar was uploaded!\n Please give the staff 24 hours to review it!"
      redirect "/settings"
end
  
   post '/general_info' do
    if session!
    redirect "/"
    end
    u = User.first(:username => session[:username])
    u.gender = params[:gender]
    u.country = params[:country]
    u.facebook = params[:facebook]
    u.twitter = params[:twitter]
    u.save
    flash[:success] = "General infomation was updated!"
    redirect '/settings'
  end
  
  post '/forumrank' do
    if session!
    redirect "/"
    end
    u = User.first(:username => session[:username])
    u.forum_rank = params[:rank]
    if u.save
    flash[:success] = "Forum rank was updated!"
    redirect '/settings'  
    else
    flash[:error] = "Length of title is to long."
    redirect '/settings'
    end
    
  end
  
  
  post '/change-password' do
    if session!
    redirect "/"
    end
    u = User.first(:username => session[:username])
    if u.authenticate(params[:password])
      if params[:new_password] != nil
        u.password = params[:new_password]
          if u.save
            mail = SendGrid::Mail.new do |m|
              m.to = u.email
              m.from = "budokaionlinemail@gmail.com"
              m.subject = "Password changed -- Budokai-Online"
              m.text = "You have changed your password on Budokai-Online! Your new password can be found below.\n
              New Password: #{params[:password]}"
            end
          @@client.send(mail)
          flash[:success] = "Password successfully changed."
          redirect "/settings"
          else
            errors = []
            u.errors.each do |error|
              error.each do |e|
                errors.unshift(e.to_s)
              end
            end
            flash[:error] = errors
            redirect "/settings"
          end
      end
    else
      flash[:error] = "Incorrect password."
      redirect "/settings"
    end
  end
  
end