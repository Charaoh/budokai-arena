class BudokaiArena < Sinatra::Application
  
  post '/login' do
    check = User.first(:ip_address => request.ip.to_s,:banned => true)
    u = User.first(:username => params[:username].downcase)
    
    if u
      if check
      flash[:error] = "This User account has been banned!"
      u.banned = true
      u.save
      redirect "/login"
      end 
        if u.authenticate(params[:password]) && u.banned == false 
            if !u.confirmed_email
              flash[:info] = "Please check your email in order to confirm your account."
              redirect "/"
            end
            session_start!
            session[:username] = params[:username].downcase 
            session[:id] = u.id
            redirect "/"
         elsif u.banned == true
         
            redirect "/"
        else
            flash[:error] = "Invalid credentials."
            redirect "/"
        end
    else
        flash[:error] = "User does not exist."
        redirect "/"
    end
  end
  
  get '/logout' do
    flash[:info] = "You have logged out."
    session_end!
    redirect "/"
  end
  
  
  post '/reset_password/:id' do
      pcr = PasswordChangeRequest.first(:id => params[:id])
      u = User.first(:email => pcr.user_email)
      u.password = params[:password]
      u.save
      if pcr.destroy
         redirect "/login" 
      else
          return "Something went wrong."
      end
  end
  
  post '/forgot_password' do
      email_exists = User.first(:email => params[:email])
      if !email_exists 
          flash[:error] = "That email is not associated with any account."
          redirect "/"
      end
      unique_url = SecureRandom.uuid.to_s
      email_exists.password = unique_url
      email_exists.save
      
      mail = SendGrid::Mail.new do |m|
              m.to = params[:email]
              m.from = "budokaionlinemail@gmail.com"
              m.subject = "Password reset on Budokai-Arena!"
              m.text = "Your new password is: #{unique_url}
              
              Once you login in you can change your password to your new desired password.
              
              Note: If this was not your doing, please ignore this email.
              
              Budokai-Online, Staff"
      end
      
          @@client.send(mail)
          flash[:success] = "A link to reset your password has been sent to your email. Email may take up to 30 minutes to be sent."
          redirect "/"
  end
  
end