
class BudokaiArena < Sinatra::Application
  
  get '/messages' do
    if session!
    redirect "/"
    end
    @user = User.first(:username => session[:username])
    
    u = User.first(:username => session[:username])    
    u.last_page_name = "Messages: Inbox"
    u.last_page_link = "/messages"
    u.save
    @messages = User.first(:username => session[:username]).messages.all(:order => :id.desc).paginate(:page => params[:page], :per_page => 10)
    @title = "Messages"
    erb :messages
  end
  
  get '/messages/:id' do
    if session!
    redirect "/"
    end
    @user = User.first(:username => session[:username])
    
    @user.last_page_name = "Reading Message"
    @user.last_page_link = "/messages"
       
    @message = @user.messages.get(params[:id])
    if @message && @message.to_user.username == session[:username]
        @message.read = true
        @message.save
        @user.save 
        @title = "Message"
        erb :your_message
    else
        flash[:error] = "Message does not exist."
        redirect "/messages"
    end
  end
  
  post '/messages' do
    if session!
    redirect "/"
    end
    from_user = User.first(:username => session[:username])
    to_user = User.first(:username => params[:send_to])
    
    if to_user
        
        m = Message.create(:from_user => from_user, :to_user => to_user, :title => params[:title], :body => params[:body],:otherbody => params[:previous])
        m.from_user = from_user
        m.to_user = to_user
        from_user.last_page_link = params[:location]
        from_user.last_page_name = "Sent Message"
        from_user.messages << m
        to_user.messages << m
        from_user.save
        to_user.save
        puts "#{params[:body]}"
        flash[:success] = "Message was successfully sent!"
        redirect "#{params[:location]}"
    else
        flash[:error] = "That user does not exist."
        redirect "#{params[:location]}"
    end
  end

  
  post '/messages/delete' do
    if session!
    redirect "/"
    end
   
    puts "Message Id? : #{params[:messageid]}"
  if !params[:messageid].blank?
    params[:messageid].each do |m|
      puts "Message Id? : #{m}"
      message = User.first(:username => session[:username]).messages.get(m)
       to_user = User.first(:username => session[:username])
            from_user = User.first(:username => message.from_user.username)
            
            message.destroy
            to_user.save
            from_user.save
            
    end
    flash[:success] = "Message deleted."
  end
  flash[:info] = "No Messages selected"
 end
end

