require 'json'

class BudokaiArena < Sinatra::Application

  get '/staffonly' do
  if session!
    redirect "/"
  end
  @user = User.first(:username => session[:username])
  if @user.staff
      @user = User.first(:username => session[:username])
      @banned_users = User.all(:banned => true)
      @images = Dir.glob("public/check/*")
      @planet = Dir.glob("public/symbol/check/*")
      @statics = Statics.first


      erb :staff_mod
    else
  redirect "/"
  end
end

 post '/staff/avater' do
  if session!
    redirect "/"
  end
  @user = User.first(:username => session[:username])
  if @user.staff


    if params[:choice] == "yes"
      avater = params[:avater]
      puts "Moving File"
    @banned_users = User.all(:banned => true)
      new_avater = avater.gsub("check/","")
      link = new_avater.gsub(".png","")
      u = User.get(link.to_i)
      u.avater = "/avatar/#{new_avater}"
      u.save


      old_name = "public/#{avater}"
      path = "public/avatar/#{new_avater}"
      FileUtils.mv(old_name, path)
    flash[:success] = "Avatar was approved!"
  else
    puts "Removing File"
avater = params[:avatar]
puts avater
  puts avater
  puts "/public/#{avater}"

    if File.file? "public/#{avater}"
 File.delete "public/#{avater}"
    flash[:success] = "Avatar was removed!"
  else
    flash[:error] = "Avatar wasn't removed!"
    end

    end

    redirect "/staffonly"
    else
  redirect "/"
  end
end

post '/staff/planet/avatar' do
  if session!
    redirect "/"
  end
  @user = User.first(:username => session[:username])
  puts params[:choice]
  if @user.staff
    if params[:choice] == "yes"
      avater = params[:avater1]
      puts avater
      new_avater = avater.gsub("check/","")
      puts new_avater
      link = new_avater.gsub("symbol/","")
      puts link
      link1 = link.gsub('.png',"")
      puts link1
      u = Planet.get(link1.to_i)
      u.avater = "/#{new_avater}"
      u.save

      old_name = "public/#{avater}"
      path = "public/#{new_avater}"
      FileUtils.mv(old_name, path)

  else
    avater = params[:avatar]
    if File.file? "public/#{avater}"
    File.delete "public/#{avater}"
  else

    end

    end

    redirect "/staffonly"
    else
  redirect "/"
  end
end

  get '/admin-only' do
  if session!
    redirect "/"
  end
  @user = User.first(:username => session[:username])
  if @user.group == "Admin" || @user.group == "Webmaster"
      erb :staff_login
    else
  redirect "/"
  end
end


  post '/admin-only' do
     if session!
    redirect "/"
   end
   puts params[:password]
    @user = User.first(:username => session[:username])
    if params[:password] == "2kcgUHdVYc&MZb*Tm^7:z'aUF7m@U@?5r*NfV25"
      @user = User.first(:username => session[:username])
      @banned_users = User.all(:banned => true)
      puts "Hey I'm working"
      erb :staff, :layout => :layout3
    else
      redirect "/"
    end
  end

  get '/admin-only/news' do
    if session!
    redirect "/"
    end
  @user = User.first(:username => session[:username])
  if @user.group == "Admin" || @user.group == "Webmaster"
  @posts = Post.all(:order => :id.desc).paginate(:page => params[:page], :per_page => 10)
  end

    @fpost = @posts.first
    erb :staff_news, :layout => false
  end



   post '/admin-only/news' do
    p = Post.new(:title => params[:title],:body => params[:body])
    u = User.first(:username => session[:username])

    if u.group != "Admin" && u.group != "Webmaster"
    redirect "/"
    end

    p.user = u
    if u.save && p.save

    flash[:success] = "Post was successfully made!"
     redirect '/'
    else
    errors = []
      p.errors.each do |e|
        errors.unshift(e)
    puts errors
    end
    end
    flash[:alert] = "Post wasn't successfully made!"
     redirect '/admin-only'
    end

    post '/admin-only/news/:id' do
    p = Post.get(params[:id].to_i)
    u = User.first(:username => session[:username])

    if u.group != "Admin" && u.group != "Webmaster"
    redirect "/"
    end

    p.title = params[:title]
    p.body = params[:body]

    if u.save && p.save

    flash[:success] = "Post was successfully Edited!"
     redirect '/'
    else
    errors = []
      p.errors.each do |e|
        errors.unshift(e)
    puts errors
    end
    end
    flash[:alert] = "Post wasn't successfully made!"
     redirect '/admin-only'
    end


  post '/admin-only/password' do
     content_type :json
  @u= User.first(:username => session[:username])

  if @u.group == "Admin" || @u.group == "Webmaster"

    u = User.first(:username => params[:username])
    if u && u.group != "Webmaster"
      u.password = params[:password]
      u.save
      if u.save
      a = "User password was successfully changed."
    else
       a = "User password didn't change."
       end

    else
      a = "User does not exist."
    end


  end
{ :report => a, :key2 => params[:password] }.to_json
  end

  post '/admin-only/admin' do
     content_type :json
    session!
    @u = User.first(:username => session[:username])
  if @u.group == "Webmaster"

    u = User.first(:username => params[:username])
    if u

      u.group = "Admin"
      u.staff = true
      u.save
      a = "User admin property edited."
    elsif u.group = "Admin"

     a = "User admin property edited. User No longer Admin."
      u.group = "Member"
      u.staff = false
      u.save
    else
    a = "User does not exist."
    end
   { :report => a}.to_json
  end
end

post '/admin-only/ban' do
     content_type :json
    session!
    @u = User.first(:username => session[:username])
  if @u.group == "Webmaster" || @u.group == "Admin"

    u = User.first(:username => params[:username])
    if u

      u.banned = !u.banned
      u.save
      a = "User is banned."

    else
    a = "User does not exist."
    end
   { :report => a}.to_json
  end
end

post '/admin-only/update' do
     content_type :json
    session!
    @u = User.first(:username => session[:username])
  if @u.group == "Webmaster" || @u.group == "Admin"

    u = User.all(:group => "Webmaster")
    if u

      u.banned = !u.banned
      u.save
      a = "User is banned."

    else
    a = "User does not exist."
    end
   { :report => a}.to_json
  end
end

get '/money' do
      u = User.first(:username => session[:username])
      if u.staff
      u.money += 30000
      u.save
      end
redirect '/'
end

post '/admin-only/mod' do
     content_type :json
    session!
    @u = User.first(:username => session[:username])
  if @u.group == "Webmaster" || @u.group == "Admin"

    u = User.first(:username => params[:username])
    if u && u.staff == false

      u.group = params[:group]
      u.staff = true
      u.save
      a = "User Moderator property edited."
    elsif u.staff

     a = "User Moderator property edited. User No longer Moderator."
      u.group = "Member"
      u.staff = false
      u.save
    else
    a = "User does not exist."
    end
   { :report => a}.to_json
  end
end



end

 post '/admin-only/characters' do
     content_type :json
  u = User.first(:username => session[:username])
puts "I'm In characters"
puts params
a = 6
puts u.group
  if u.group == "Admin" || u.group == "Webmaster"

  skills = JSON.parse(u.unlockskills)
  stats = JSON.parse(u.stats)
  characters = JSON.parse(u.unlockcharacters)
  newcharacter = {}
  characters[params[:name]] = 0
  stats[params[:name]] = [1,0,0]
  newskills = params[:skills]
  puts newskills
  len = newskills.length
  x = 0
  while (x < len)
  skills[newskills[x].to_s] = 0
  x += 1
  #puts "Skills #{skills}"
  #puts "X is #{x}  and Len #{len}"
  end

  puts "hello"
  puts "Skills: #{skills.to_json}"
  u.unlockskills = skills.to_json
  u.unlockcharacters = characters.to_json
  u.stats = stats.to_json
  u.save
  end



{ :report => a, :key2 => params[:password] }.to_json
  end


get '/character-builder/admin-only' do
@user = User.first(:username => session[:username])
      if @user.group == "Admin" || @user.group == "Webmaster"

      erb :character_admin
      end

end

get '/character-builder' do
@user = User.first(:username => session[:username])
      if @user.staff
      erb :character_builder
    else
      redirect "/"
      end

end
