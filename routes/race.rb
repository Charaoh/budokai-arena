class BudokaiArena < Sinatra::Application

  get '/planet' do
  if session!
    redirect "/"
  end
  
  @user = User.first(:username => session[:username])
  @p = Planet.all
  @m = Member.all
  
  if @user.clan != "none"
  @member = @user.members.first(:id => @user.id)
  puts "Working?"
  else

  flash[:info] = "You Have Not Joined A Planet! Check Your Request Or Explore Other Planets!"
  end
  
  @user.last_page_name = "Planet Panel"
  @user.last_page_link = "/planet"
  @user.save  
  erb :race
  end
  
  #get '/race/:race' do
  
  #end
  
  get '/planet/create' do
  if session!
    redirect "/"
  end
  u =  User.first(:username => session[:username])
  if u.clan == "none"
  erb :racecreate, :layout => false
  else
  flash[:error] = "You already joined a planet."
  redirect "/planet"
  end
  end
  
  
  get '/planet/mangement' do
  if session!
    redirect "/"
  end
  @user = User.first(:username => session[:username])
  check = @user.members.first(:id => @user.id)
  if @user.clan != "none" && check.position == "Leader" || check.position == "Co-Leader" 
  p = Planet.first(:name => @user.clan)
  @members = p.members.all(:position => "Member")
  @elite = p.members.all(:position => "Elite")
  @co = p.members.all(:position => "Co-Leader")
  @leader = p.members.all(:position => "Leader")
  
  erb :racemangement, :layout => false
  
  else
  flash[:error] = "Your position doesn't allow you access."    
  end
  end
  
  post '/planet/mangement/remove/:id' do
  u = User.first(:username => session[:username])
  user = User.get(params[:id])
  check = u.members.first(:id => @user.id)
  
  if !user
  flash[:error] = "User doesn't exist."   
  redirect "/planet"
  end
  
  if check == "Leader" || check == "Co-Leader" && u.clan == user.clan
  user.clan = "none"
  user.members.destroy
  else
  flash[:error] = "You can't remove this user because of your position or because user isn't in the planet."
  redirect "/planet"
  end
  
  if user.save
  flash[:success] = "User position was sucessfully changed."  
  redirect "/planet"
  puts "Success"
  else
  flash[:error] = "User position wasn't sucessfully changed."   
   redirect "/planet"
  
  end
  end
  
  post '/planet/mangement/change' do
  u = User.first(:username => session[:username])
  user = User.first(:username => params[:username])
  m = user.members.first(:id => user.id)
  check = u.members.first(:id => user.id)
  
  if !user
  flash[:error] = "User doesn't exist."   
  redirect "/planet"
  end
  
  if params[:rank] == "Leader" && check != "Leader"
  flash[:error] = "You can't change this user because of your position or because user isn't in the planet."
  redirect "/planet"
  end
  
  if check == "Leader" || check == "Co-Leader" && u.clan == user.clan
  m.position = params[:rank]
  else
  flash[:error] = "You can't change this user because of your position or because user isn't in the planet."
  redirect "/planet"
  end
  
  
  
  if user.save && m.save
  flash[:success] = "User position was sucessfully changed."  
  redirect "/planet"
  puts "Success"
  else
  flash[:error] = "User position wasn't sucessfully changed."   
   redirect "/planet"
  end
 
  puts "Fail"
  end
  
  post '/planet/mangement/transfer' do
  u = User.first(:username => session[:username])
  c = User.first(:username => params[:username])
  
  
  if !c
  flash[:error] = "User doesn't exist."   
  redirect "/planet"
  end
  
  check = u.members.first(:id => user.id)
  
  if check == "Leader" && u.clan == user.clan 
  c.members.first(:id => user.id).position = "Leader"
  p = Planet.get(u.planet.id)
  p.owner = c.username
  else
  flash[:error] = "You can't transfer ownership to this user because of your position or because user isn't in the planet."
  redirect "/planet"    
  end
  
  if p.save && c.members.save
  flash[:success] = "User is now sucessfully changed to owner of planet."   
   redirect "/planet"
  else
  flash[:error] = "Couldn't save changes because of incorrect input."    
  redirect "/planet"
  end
  
  
  redirect "/planet"
  end
  
   post '/planet/mangement/message' do
    session!
   u = User.first(:username => session[:username])
   check = u.members.first(:id => u.id)
   if check.position != "Leader" && check.position != "Co-Leader"
   flash[:error] = "You can't sent clan mail because this action is only for Leaders or Co-Leader."
   redirect "/planet"
   end
   
   @p1 = Planet.get(u.planet.id)
   

   p = params[:position]
    puts "Planet Position? : #{p}"
    
    if p == "Leaders"
    @p2 = @p1.members.all(:position => "Leader")
    elsif p == "Co-Leaders"
    @p2 = @p1.members.all(:position => "Co-Leader")
    elsif p == "Elites"
    @p2 = @p1.members.all(:position => "Elite")
    elsif p == "Members"
    @p2 = @p1.members.all(:position => "Member")
    elsif p == "All"
    @p2 = @p1.members.all
else
    flash[:error]  = "Message could not be sent. Rank Error."
    redirect "/planet"
    end
    
   puts "p2 = #{@p2.count}"
  if @p2
     
    @p2.each do |m|
      puts "Message Sent to : #{m.user.username}"
      
        to_user = User.get(m.user.id)
        from_user = User.get(u.id)
        me = Message.create(:from_user => from_user, :to_user => to_user, :title => params[:title], :body => params[:body],:otherbody => "")
        me.from_user = from_user
        me.to_user = to_user
        from_user.messages << me
        to_user.messages << me
        from_user.save
        to_user.save
        
        
       
        
            
    end
    flash[:success] = "Message sent to #{p} successfully."
    redirect "/planet"
   
  end
  flash[:error] = "No one is in selected position."
  redirect "/planet"
      
 
end
  
  get '/planet/enroll' do
  
  erb :raceenroll, :layout => false
  end
  
  get '/planet/arrangement' do
  u = User.first(:username => session[:username])
  check = u.members.first(:id => u.id)
  
  puts check.position
  if check.position != "Leader" && check.position != "Co-Leader"
   flash[:error] = "You can't access because this action is only for Leaders or Co-Leader."
  end
  
  erb :racearrangement, :layout => false
  end
  
  post '/planet/arrangement/text' do
  u = User.first(:username => session[:username])
  check = u.members.first(:id => u.id)
  
  if check.position != "Leader" && check.position != "Co-Leader"
   flash[:error] = "You can't access because this action is only for Leaders or Co-Leader."
   redirect "/planet"
  end
  
  u.planet.description = params[:body]
  u.save
  redirect "/planet"
  end
  
  post '/planet/arrangement/avater' do
  u = User.first(:username => session[:username])
  check = u.members.first(:id => u.id)
  
  if check.position != "Leader" && check.position != "Co-Leader"
   flash[:error] = "You can't access because this action is only for Leaders or Co-Leader."
   redirect "/planet"
  end
  
  u.planet.avater = params[:avater]
  u.save
  
  redirect "/planet"
  end
  
  post '/planet/arrangement/invite' do
  u = User.first(:username => session[:username])
  check = u.members.first(:id => u.id)
  
  if check.position != "Leader" && check.position != "Co-Leader"
   flash[:error] = "You can't access because this action is only for Leaders or Co-Leader."
   redirect "/planet"
  end
  
  u.planet.invite = params[:invite]
  u.save
  
  redirect "/planet"
  end
  
  get '/planet/request' do
  if session!
    redirect "/"
  end
  u = User.first(:username => session[:username])
  
  if u.clan != "none"
   flash[:error] = "You can't access because this action is only for users not in a planet."
   redirect "/planet"
  end
  
  @invites = u.members.all(:status => "Pending")
  erb :racerequest, :layout => false
  end
  
  post '/planet/request/accept/:id' do
  u = User.first(:username => session[:username])
  
  if u.clan != "none"
  flash[:error] = "You can't access because this action is only for users not in a planet."
  redirect "/planet"
  end 
  
  p = Planet.get(params[:id])
  m = Member.first(:user => u, :planet => p)
  m.position = "Member"
  m.status = "Joined"
  u.clan = p.name
  
   if m.save && u.save && p.save
   u.members.all(:status => "Pending").destroy
   flash[:success] = "You sucessfully join the #{p.name}!"
   redirect "/planet"
   else
   flash[:error] = "Error accepting invite.Contact staff for help."
   redirect "/planet"    
   end
  redirect "/planet"
  
  end
  
  post '/planet/request/decline/:id' do
  u = User.first(:username => session[:username])

  p = Planet.get(params[:id])
  m = Member.first(:user => u, :planet => p)
  p.members.first(:id => m.id).destroy
  
   if m.save && u.save && p.save
  report = "Success"
   end
  end
  
  get '/planet/alliance' do
  if session!
    redirect "/"
  end
  u = User.first(:username => session[:username])
  check = u.members.first(:id => u.id)
  
  puts check.position
  if check.position != "Leader" && check.position != "Co-Leader"
   flash[:error] = "You can't access because this action is only for Leaders or Co-Leader."
   redirect "/planet"
  end
  
  @request_allies = u.planet.alliances.all(:status => "request").target(:order => :updated_at.desc).paginate(:page => params[:page], :per_page => 10)
  @pending_allies = u.planet.alliances.all(:status => "pending").target(:order => :updated_at.desc).paginate(:page => params[:page], :per_page => 10)
  @allies = u.planet.alliances.all(:status => "allies").target(:order => :updated_at.desc).paginate(:page => params[:page], :per_page => 15)
  erb :racealliance, :layout => false
  end
  
   post '/planet/alliance/ally' do
  u = User.first(:username => session[:username])
  check = u.members.first(:id => u.id)
  
  if check.position != "Leader" && check.position != "Co-Leader"
   flash[:error] = "You can't access because this action is only for Leaders or Co-Leaders."
   redirect "/planet"
  end
  
  from_user = Planet.get(u.planet.id)
    to_user = Planet.first(:name => params[:username])
    
    
    
    if to_user
        if from_user.name == to_user.name
            flash[:error] = "You cannot make yourself an ally!"
            redirect "/planet"
        end
        a = Alliance.first(:source => from_user, :target => to_user)
        b = Alliance.first(:source => to_user, :target => from_user)
        if a || b
            flash[:error] = "The planet is currently an ally already."
            redirect "/planet"
        else
        
        x = Alliance.create(:source => from_user, :target => to_user, :status => "pending")
        y = Alliance.create(:source => to_user, :target => from_user, :status => "request")
        from_user.alliances << x
        to_user.alliances << y
      
        
            to_user.save
            from_user.save
            flash[:success] = "You have made an ally request to #{params[:username]}."
            redirect '/planet'
        end
      else
        flash[:error] = "The planet you are trying to make an ally does not exist!"
        redirect "/planet"
    end
  end
  
  post '/planet/alliance/ally/:id' do
    !session
    u = User.first(:username => session[:username])
    check = u.members.first(:id => u.id)
  
  if check.position != "Leader" && check.position != "Co-Leader"
   flash[:error] = "You can't access because this action is only for Leaders or Co-Leaders."
   redirect "/planet"
  end
  
    user = Planet.get(u.planet.id)
    user_friend = Planet.get(params[:id])
    
    if user_friend
        a = Alliance.first(:source => user, :target => user_friend)
        b = Alliance.first(:source => user_friend, :target => user)
        
        if a && b
            a.status = "allies"
            b.status = "allies"
            a.save
            b.save
            
            user.save
            user_friend.save
            flash[:success] = "You are now allies with planet #{user_friend.name}."
            redirect "/planet"
        else
            flash[:error] = "Planet doesn't exist anymore."
            redirect "/planet"
        end
    else
        flash[:error] = "Planet doesn't exist anymore."
        redirect "/planet"
    end
end

post '/planet/alliance/remove/:id' do
    !session
    u = User.first(:username => session[:username])
    check = u.members.first(:id => u.id)
  
  if check.position != "Leader" && check.position != "Co-Leader"
   flash[:error] = "You can't access because this action is only for Leaders or Co-Leaders."
   redirect "/planet"
  end
  
    user = Planet.get(u.planet.id)
    user_friend = Planet.get(params[:id])
    
    if user_friend
        a = Alliance.first(:source => user, :target => user_friend)
        b = Alliance.first(:source => user_friend, :target => user)
        
        if a && b
            a.destroy
            b.destroy
        else
            redirect "/"
        end
        
        user.save
        user_friend.save
        redirect "/friends"
    else
        flash[:error] = "Planet doesn't exist anymore."
        redirect "/"
    end
end
  
  get '/planet/find' do
  if session!
    redirect "/"
  end
  @planets = Planet.all(:invite => "Public", :limit => 100).paginate(:page => params[:page], :per_page => 15)
  erb :racefind, :layout => false
  end
  
  get '/planet/profile/:name' do
  if session!
    redirect "/"
  end
  @user = User.first(:username => session[:username])
  @planet = Planet.first(:name => params[:name])
  
  if @planet
  @members = @planet.members.all(:position => "Member")
  @elite = @planet.members.all(:position => "Elite")
  @co = @planet.members.all(:position => "Co-Leader")
  @leader = @planet.members.all(:position => "Leader")
  @allies = @planet.alliances.all(:status => "allies").target(:order => :updated_at.desc).paginate(:page => params[:page], :per_page => 15)
  @ladder = User.all(:limit => 5, :order => [ :power_level.desc ]) 
  erb :raceprofile
  else
  redirect "/planet"
  end
  
  
  end
  
  post '/planet/abandon' do
  u = User.first(:username => session[:username])
  p = Planet.first(:name => u.clan)
  
  if !p
   flash[:error] = "You have to be apart of a planet to abandon a planet."
   redirect "/planet"
  end
  
  if u.username != p.owner
   flash[:error] = "You have to transfer your ownership before you can leave planet. Or you can fold the planet."
   redirect "/planet"
  elsif u.clan == "none"
  flash[:error] = "You have to be apart of a planet to abandon a planet."
   redirect "/planet"
  end
  u.clan = "none"
  u.members.destroy
  u.save
  end
  
  
  
  
  get '/planet/fold' do
  u = User.first(:username => session[:username])
  p = Planet.get(u.planet.id)
  check = u.members.first(:id => u.id)
  
  if check.position != "Leader" && u.username != p.owner
   flash[:error] = "You can't access because this action is only for the owner of planet."
   redirect "/planet"
  end
  
  up = User.all(:clan => p.name)
  
  
  if p.members.destroy && p.destroy && u.members.destroy && up.update(:clan => 'none')

  flash[:success] = "Planet was sucessfully destroyed."
  
  redirect "/planet"
  else
  flash[:error] = "Planet wasn't sucessfully destroyed."
  redirect "/planet"
  end
  
  end
 
  post '/planet/join' do
  u = User.first(:username => session[:username])
  
  
  if u.clan != "none" 
  flash[:error] = "You can't join this planet because you already apart of a planet."
  redirect "/planet"
  end
  
  p = Planet.get(params[:planet])
  
  if !p
   flash[:error] = "This planet doesn't show up in the records."
   redirect "/planet"
  end
  
  if p.invite != "Public"
  flash[:error] = "You can't join this planet isn't set to public."
  redirect "/planet"
  end

  
  u.clan = p.name
  m = Member.create(:user => u, :planet => p, :status => "Joined",:position => "Member", :id => u.id )

  p.members << m
  u.members << m
  
  
  if p.save && u.save
  flash[:success] = "You successfully joined this planet!"
  puts "Start Now"
  redirect "/planet/profile/#{p.name}"
  else
    flash[:error] = "Planet invite wasn't successfully sent."
   p.errors.each do |e|
      puts e
      flash[:error] = e
     end
  puts "Fail"
  
  redirect "/planet"
  end
  
  
  
  end
  
  post '/planet/enroll' do
  u = User.first(:username => session[:username])
  check = u.members.first(:id => u.id)
  
  if check.position != "Leader" && check.position != "Co-Leader"
   flash[:error] = "You can't access because this action is only for Leaders or Co-Leaders."
   redirect "/planet"
  end
  
  invite = User.first(:username => params[:username])
  p = Planet.first(:name => u.clan)

  if !invite
  flash[:error] = "User doesn't exist."
  redirect "/planet"
  elsif invite.clan != "none" 
  flash[:error] = "User already apart of planet!"
  redirect "/planet"
  elsif !p
  flash[:error] = "Planet doesn't exist."
  redirect "/planet"
  elsif invite.members.first(:planet => p)
  flash[:error] = "This user already has a pending invite!"
  redirect "/planet"
  end
  
  
  m = Member.create(:user => invite, :planet => p, :status => "Pending",:position => "None", :id => invite.id )

  p.members << m
  invite.members << m
  
  
  if p.save && invite.save
  flash[:success] = "Planet invite was successfully sent!"
  puts "Start Now"
  redirect "/planet"
  else
    flash[:error] = "Planet invite wasn't successfully sent."
   p.errors.each do |e|
      puts e
      flash[:error] = e
     end
  puts "Fail"
  
  redirect "/planet"
  end
  
  end

  
  post '/planet/create' do
  u = User.first(:username => session[:username])
  if u.clan == "none" && u.money >= 5000
  #u.money -= 5000
  
  u.clan = params[:clanname].downcase.capitalize.delete(' ')
  p = Planet.new
  p.description = params[:body]
  p.name = params[:clanname].downcase.capitalize.delete(' ')
  p.avater = params[:symbol]
  p.owner = u.username
  
  m = Member.create(:user => u, :planet => p, :status => "Joined",:position => "Leader", :id => u.id )
  p.members << m
  u.members << m
  
  if p.save && u.save && m.save
  flash[:success] = "Planet was successfully made!"
  redirect "/planet"
  else
  flash[:alert] = "Planet wasn't successfully made!"
  p.errors.each do |e|
      puts e
      flash[:error] = e
     end
  redirect "/planet"
  end
  
  
  
  elsif u.money < 5000
  puts "Fail2"
  flash[:error] = "Insufficient funds."
  redirect "/planet"
  else
  puts "Fail 3"
  flash[:error] = "You are already apart of a planet!"
  redirect "/planet"
  end
  flash[:error] = "Unknown error!"
   redirect "/planet"
  end
end










