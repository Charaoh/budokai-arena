class BudokaiArena < Sinatra::Application

#Main Page    
get '/forums' do
    
    if !session?
      puts "Forums"
    @Online = User.all(:limit => 30, :last_visit.gt => 15.minutes.ago)
    #@category= Category.all
    @newT = Forumpost.all(:limit => 5,  :order => :updated_at.desc, :staff => false)
    @newC = Forumcomment.all(:limit => 20, :order => :updated_at.desc,:staff => false)
    erb :forums, :layout => :layout4
  else
    @user = User.first(:username => session[:username])   
    @user.last_page_name = "Forum"
    @user.last_page_link = "/forums"
    @user.last_visit = DateTime.now
    @user.save 
    @Online = User.all(:limit => 30, :last_visit.gt => 15.minutes.ago)
    #@category= Category.all
    @newT = Forumpost.all(:limit => 5,  :order => :updated_at.desc, :staff => false)
    puts "Count: #{@newT.count}"
    @newC = Forumcomment.all(:limit => 20, :order => :updated_at.desc,:staff => false)
    erb :forums, :layout => :layout4
    end
    
  end
#Create Category and  Forum Page 
  get '/forums/create' do
    
    if session!
    redirect "/"
    end
    @user = User.first(:username => session[:username])
    if @user.group == "Admin" || @user.group == "Webmaster"
    @user = User.first(:username => session[:username])
    @forum = Forum.all(:order => :id.desc).paginate(:page => params[:page], :per_page => 5)
    @category= Category.all(:order => :id.desc).paginate(:page => params[:page], :per_page => 4)
    @newT = Forumpost.all(:limit => 5,  :order => :updated_at, :staff => false)
    @newC = Forumcomment.all(:limit => 20, :order => :updated_at.desc,:staff => false)
   
    @category= Category.all(:order => :id.desc)
    erb :forums_post, :layout => :layout4
  else 
    redirect "/forums"
    end
end

get '/forums/category/:name' do
    @category = Category.first(:name => params[:name])
    if @category
    puts "Category: #{@category.name}"
    @user = User.first(:username => session[:username])
    @Online = User.all(:limit => 30, :last_visit.gt => 15.minutes.ago)
    
     @newT = Forumpost.all(:limit => 5,  :order => :updated_at.desc, :staff => false)
    @forums = @category.forums.all
    puts "Count #{@forums.count}"
    erb :forums_category, :layout => :layout4
  else
   redirect '/forums'
  end
  
end

 #Forum Page
  get '/forums/:name' do
    @user = User.first(:username => session[:username])
    @forum = Forum.first(:url => params[:name])
    @Online = User.all(:limit => 30, :last_visit.gt => 15.minutes.ago)
    if @forum.blank?
    flash[:error] = "This forum name doesn't exist."
    redirect "/forums"
    elsif @forum.staff 
    if !@user.staff
    flash[:error] = "This forum name doesn't exist."
    redirect "/forums"  
    end
    end
    
    @fp  = @forum.forumposts.all(:sticky => false, :announcements => false).paginate(:page => params[:page], :per_page => 15)
     @newT = Forumpost.all(:limit => 5,  :order => :updated_at.desc, :staff => false)
    if @forum
        @user.last_visit = DateTime.now
        @user.last_page_name = "Forum: #{@forum.title}"
        @user.last_page_link = "/forums/#{params[:name]}"
        @user.save 
        erb :forums_list, :layout => :layout4
    else
        not_found
    end
  end
  
  #Post Page
  get '/forums/:name/:id' do
    @forumpost = Forumpost.first(:id => params[:id])
   #@Online = User.all(:limit => 30, :last_visit.gt => 15.minutes.ago)
    @viewing = User.all(:limit => 30, :last_page_link => "/forums/#{params[:name]}/#{params[:id]}", :last_visit.gt => 15.minutes.ago)
    if @forumpost.blank?
    flash[:error] = "This forum name doesn't exist."
    redirect "/forums/#{params[:name]}"
    elsif @forumpost.staff 
    if !@user.staff
    flash[:error] = "This forum name doesn't exist."
    redirect "/forums/#{params[:name]}" 
    end
    end
    
     @newT = Forumpost.all(:limit => 5,  :order => :updated_at.desc, :staff => false)
    @fc = @forumpost.forumcomments.paginate(:page => params[:page], :per_page => 10)
    
    @title = "Forums: #{params[:name]}- #{@forumpost.title}"
    if session?
    @user = User.first(:username => session[:username])
    @forumpost.views += 1
    @user.last_visit = DateTime.now
    @user.last_page_name = "Forum: #{@forumpost.title}"
    @user.last_page_link = "/forums/#{params[:name]}/#{params[:id]}"
    @user.save 
    @forumpost.save
    end
        erb :forum_comments, :layout => :layout4
    
  end

  get '/forums/staff/move/:id' do
    puts "Move Topic"
    if session? 
    @user = User.first(:username => session[:username])
    if @user.staff 
      puts "I'm staff member"
    @topic = Forumpost.get(params[:id].to_i)
    @forum = Forum.all
    erb :forum_search, :layout => :layout4
  else
    redirect '/forums'
    end
    else
    redirect '/forums'
    end
    
    
  end
  
  post '/forums/staff/move/:forum/:topic' do
    puts "Moving to this topic"
  f = Forum.get(params[:forum].to_i)
  t = Forumpost.get(params[:topic].to_i)
  
  if f && t
  puts "This is working"
  puts "Title: #{f.title}"
  puts "Forum: #{t.title}"
  t.forum = f
  t.save
else
  
  end
  redirect '/forums'
  end
 
  
#Create Category
  post '/forums/create' do
    if session!
    redirect "/"
    end
    u = User.first(:username => session[:username])
    if u.group != "Admin" && u.group != "Webmaster"
      redirect "/forums"
    end
    
    c = Category.new
    c.name = params[:name]
    c.rank = params[:order].to_i
    
    if params[:staff] == "true"
    c.staff = true
    else
    c.staff = false;
    end
    
  
    if c.save 
        flash[:success] = "Category Created"
      redirect "/forums/create"
    else
      errors = []
      c.errors.each do |error|
        error.each do |e|
          errors.unshift(e.to_s)
        end
      end
      flash[:error] = errors
      redirect "/forums/create"
    end
    
  end

  #Create Forum
  post '/forums/:id/create' do
    if session!
    redirect "/"
    end
    u = User.first(:username => session[:username])
    
    puts u.group
    if u.group != "Admin" &&  u.group != "Webmaster"
      flash[:error] = "You don't have permission to enter this."
      redirect "/forums/create"
    end
    
    c = Category.first(:id => params[:id])
    
    f = Forum.new
    f.author = session[:username]
    f.title = params[:title]
    f.body = params[:body]
    f.url = params[:url]
    f.staff = c.staff
    f.incategory = c.name
    f.category = c
    
    c.forums << f
   
    
    if c.save && f.save && u.save
      flash[:success] = "Forum Created."
    else
      errors = []
      f.errors.each do |e|
        errors.unshift(e)
      end
      flash[:error] = errors
    end
    
    redirect "/forums/create"
  end
  
  #Create Forum Post
   post '/forums/:name/create_topic' do
    if session!
    redirect "/"
    end
    u = User.first(:username => session[:username])
    
    f = Forum.first(:url => params[:name])
    
    puts u.banned
    
    if !f
      flash[:error] = "Forum doesn't exist anymore."
      redirect "/forums"
    end
    
    u.post_count = u.post_count + 1
    
    fp = Forumpost.new
    
    f.post_count += 1
    f.topics += 1
    f.updated_by = u.username
    
    
    fp.author = session[:username]
    fp.body = params[:body]
    fp.url = "#{params[:name]}/#{fp.id}"
    fp.title = params[:title]
    fp.updated_by = session[:username]
    fp.user = u
    fp.staff = f.staff
    fp.incategory = f.incategory
    fp.inforum = f.title
    fp.forum = f
    
    puts "title #{params[:title]}"
    
    
    puts "FP #{fp.announcements} #{fp.sticky}"
    f.forumposts << fp
    
    
    if fp.save && f.save && u.save
      flash[:success] = "Posted comment."
    else
      errors = []
      fp.errors.each do |e|
        errors.unshift(e)
      end
      flash[:error] = errors
      redirect "/forums/#{params[:name]}"
    end
    
    redirect "/forums/#{params[:name]}/#{fp.id}"
  end
  #Create Forum Comment
   post '/forums/:name/:id' do
    if session!
    redirect "/"
    end
    u = User.first(:username => session[:username])
    f = Forum.first(:url => params[:name])
    fp = Forumpost.first(:id => params[:id])
    
    if !fp && !f
    flash[:error] = "This topic doesn't exist."
    redirect "/forums/#{params[:name]}"
    end
    
    u.post_count = u.post_count + 1
    
    
    f.post_count += 1
    f.updated_by = u.username
    f.save
    
    
    fp.comments += 1
    fp.updated_by = u.username
    
    if fp.locked
    flash[:error] = "This Topic is Locked. Post aren't allowed."
    redirect "/forums/#{params[:name]}/#{params[:id]}"
    end
    
    fc = Forumcomment.new
    fc.author = session[:username]
    fc.current = fp.forumcomments.count + 1
    fc.staff = f.staff
    fc.url = params[:location]
    fc.body = params[:body]
    fc.user = u
    
    
    fp.forumcomments << fc
   
    
    if fc.save && fp.save && u.save
      flash[:success] = "Posted comment."
    else
      errors = []
      fc.errors.each do |e|
        errors.unshift(e)
      end
      flash[:error] = errors
      redirect "/forums/#{params[:name]}/#{params[:id]}"
    end
    
    redirect params[:location]
  end
  #--------------------------------
  
  post '/create/category/edit' do
    if session!
    redirect "/"
    end
    u = User.first(:username => session[:username])
    if u.group != "Admin" &&  u.group != "Webmaster"
        redirect "/forums/create"
    end
   
    c = Category.get(params[:id])
    c.name = params[:name]
    c.staff = params[:staff]
    c.save
    flash[:success] = "Category was edited."
    redirect "/forums/create"
  end
  
  post '/create/category' do
    if session!
    redirect "/"
    end
    u = User.first(:username => session[:username])
    if u.group != "Admin" &&  u.group != "Webmaster"
        redirect '/forums'
    end
    
    c = Category.first(:id => params[:id])
    
    if c
    c.destroy
    flash[:success] = "Category was deleted."
    redirect "/forums/create"
  else
    flash[:success] = "Category wasn't deleted. Category Doesn't Exist"
    redirect "/forums/create"
    end 
  end
  
  post '/create/forum/:id' do
    if session!
    redirect "/"
    end
    u = User.first(:username => session[:username])
    if u.group != "Admin" &&  u.group != "Webmaster"
        redirect "/forums"
    end
   
    f = Forum.get(params[:id])
    f.title = params[:title]
    f.body = params[:body]
    f.staff = params[:staff]
    f.save
    flash[:success] = "Forum was edited."
    redirect "/forums/create"
  end
  post '/forum/delete/:id' do
    u = User.first(:username => session[:username])
    if u.group != "Admin" &&  u.group != "Webmaster"
    flash[:error] = "You don't have permission to enter this."
        redirect '/forums'
    end
    
    f = Forum.first(:id => params[:id])
    f.destroy
    
    flash[:success] = "Forum was deleted."
    redirect "/forums/create"
  end
  
  
  #forum comment
  put '/forums/:name/:id' do
    if session!
    redirect "/"
    end
    u = User.first(:username => session[:username])
    fp = Forumpost.first(:id => params[:id])
    #!comment.username.banned
    if fp.user.username == session[:username] || u.staff
      user = fp.user
      fp.body = params[:body]
      fp.title = params[:title]
       
      if fp.save && user.save
     flash[:success] = "You Successfully Edited Post"
      redirect "/forums/#{params[:name]}/#{params[:id]}"
      
    else
      errors = []
      fp.errors.each do |error|
        error.each do |e|
          errors.unshift(e.to_s)
      flash[:error] = errors
      redirect "/forums/#{params[:name]}/#{params[:id]}"
    end
    
  end
end
   else
     flash[:error] = "You don't have permission to edit this"
    end
  end
  
  #forum comment
  post '/forums/:name/:id/staff/topic' do
    session!
    u = User.first(:username => session[:username])
    fp = Forumpost.first(:id => params[:id])
  
    puts "Option: #{params[:quick]} "
    
    if !u.staff && !fp
    flash[:error] = "You don't have permission to edit this"
    redirect "/forums/#{params[:name]}/#{params[:id]}"
    end
    
    case params[:quick]
    when "Lock"
    flash[:success] = "You Successfully Made This Topic Locked!"
    fp.locked = !fp.locked
    fp.save
    when "Delete"
    fp.destroy
    flash[:success] = "You Successfully Deleted This Topic!"
    redirect "/forums/#{params[:name]}"
    when "Sticky"
    flash[:success] = "You Successfully Made This Topic A Sticky!"
    fp.sticky = !fp.sticky
    fp.save
    when "Annoucement"
    flash[:success] = "You Successfully Made This Topic An Annoucement!"
    fp.announcements = !fp.announcements
    fp.save
    end
    
    redirect "/forums/#{params[:name]}/#{params[:id]}"
  end
  
  post '/forums/:name/:id/staff/post' do
    session!
    u = User.first(:username => session[:username])
    fp = Forumpost.first(:id => params[:id])
    fc = fp.forumcomments.first(:current => params[:post])
    
    
    if !u.staff && !fp && !fc
    flash[:error] = "You don't have permission to edit this"
    redirect "/forums/#{params[:name]}/#{params[:id]}"
  else
      fc.destroy
    end
  
    flash[:success] = "You Successfully Deleted Post"
    redirect "/forums/#{params[:name]}/#{params[:id]}"
  end
  
  post '/forums/:name/:id/staff/move' do
    session!
    u = User.first(:username => session[:username])
    fp = Forumpost.first(:id => params[:id])
    f = Forum.first(:id => params[:move])
    
    if !u.staff && !fp && !f
    flash[:error] = "You don't have permission to edit this"
    redirect "/forums/#{f.name}/#{params[:id]}"
    end
    
    f.forumposts << fp
    
    if u.save && fp.save & f.save
    flash[:success] = "You Successfully Moved Post"
    redirect "/forums/#{params[:name]}/#{params[:id]}"
    end
    flash[:error] = "Fail to save changes."
    redirect "/forums/#{params[:name]}/#{params[:id]}"
  end
  
  
   #forum comment
  put '/forums/:name/:f/:id' do
    session!
    
     u = User.first(:username => session[:username])
    fc = Forumcomment.first(:id => params[:id])
    #!comment.username.banned
    if !fc 
    puts "This comment doesn't exist: #{params[:id]}"
    
    elsif fc.user.username == session[:username] && !fc.user.banned || u.group == "Admin" || u.group == "Webmaster"
      user = fc.user
      fc.body = params[:body]
  
       
      if fc.save && user.save
     flash[:success] = "You Successfully Edited Post"
     puts "You Successfully Edited Post"
      redirect "/forums/#{params[:name]}/#{params[:f]}"
      
    else
      errors = []
      fc.errors.each do |error|
        error.each do |e|
          errors.unshift(e.to_s)
      flash[:error] = errors
      puts "You unSuccessfully Edited Post"
      redirect "/forums/#{params[:name]}/#{params[:f]}"
    end
  end
end
      
    end
  end
  
  
  delete '/forums/:name/:id' do
    session!
     u = User.first(:username => session[:username])
    fp = Forumpost.first(:id => params[:id])
    if u.staff && fp
      user = fp.user
      user.post_count -= 1
      fp.destroy
      user.save
      flash[:success] = "Deleted comment."
      redirect "/forums/#{params[:name]}"
    end
    redirect "/forums/#{params[:name]}/#{params[:id]}"
    flash[:success] = "Doesn't Exist."
  end
  
  delete '/forums/:name/:c/:id' do
    session!
     u = User.first(:username => session[:username])
    fc = Forumcomment.first(:id => params[:id])
    if  u.staff && !fc.blank?
      user = fc.user
      user.post_count -= 1
      fc.destroy
      user.save
      flash[:success] = "Deleted comment."
      redirect "/forums/#{params[:name]}/#{params[:c]}"
    end
    redirect "/forums/#{params[:name]}/#{params[:c]}"
    flash[:success] = "Only Staff members can delete post."
  end
  
end