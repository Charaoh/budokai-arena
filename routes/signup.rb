require 'fileutils'
class BudokaiArena < Sinatra::Application
  
  post '/signup' do
    errors = []

    if params[:password].length < 6
      errors.push("Password does not meet the minimum requirement of 6 characters")
      
    redirect "/signup"
    elsif params[:password] != params[:passwordcheck]
    flash[:error] = "Password wasn't the same. Please try again with the correct input."
    redirect "/signup"
    end
    u = User.first(:ip_address => request.ip.to_s,:banned => true)
    
    if u
    flash[:error] = "Error in user information."
    redirect "/signup"
    end
   # timezone = params[:timezone].to_i
    @user = User.new
    @user.email = params[:email]
    @user.username = params[:username].delete(' ')
    @user.password = params[:password]
    @user.confirmed_email = true
    @user.ip_address = request.ip.to_s
    @user.confirmation_code = SecureRandom.uuid
    
    
    
    if @user.save
       #mail = SendGrid::Mail.new do |m|
             #m.to = params[:email]
             #m.from = "budokaionlinemail@gmail.com"
            # m.subject = "Confirm your registration -- Budokai-Online"
             #m.text = "Confirm your registration on Budokai-Online by clicking the link below.\n
             #https://game-ninetailschris.c9users.io/confirm/#{@user.confirmation_code}\n
             #Your account details are listed below:\n
             #Username:#{params[:username]}\n
             #Password:#{params[:password]}\n"
         #end
         #@@client.send(mail)
      flash[:info] = "Please check your email in the next 24 hours in order to confirm your account."
      redirect "/"
    else
      @user.errors.each do |error|
        error.each do |e|
          errors.unshift(e.to_s)
        end
      end
      flash[:error] = errors
      redirect "/signup"
    end
  end
  
  get '/confirm/:confirmation_code' do
    u = User.first(:confirmation_code => params[:confirmation_code])
    if u
      if (u.confirmed_email != true && ((DateTime.now - u.confirmed_email_sent_time) / 3600).round > 24)
        u.destroy
        flash[:error] = "Your account was deleted because it was not confirmed within 24 hours via the link sent to your email. You can signup below again."
        redirect "/signup"
      end
      u.confirmed_email = true
      u.save
      flash[:success] = "Account confirmed."
      redirect "/login"
    else
      redirect not_found
    end
  end
  
end