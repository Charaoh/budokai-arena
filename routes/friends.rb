require 'will_paginate'
require 'will_paginate/data_mapper'
require 'will_paginate-bootstrap'

class BudokaiArena < Sinatra::Application
  get '/friends' do
    redirect '/' if session!
    u = User.first(username: session[:username])
    u.last_page_name = 'Checking Friends List'
    u.last_page_link = '/friends'
    u.save
    friends = User.first(username: session[:username]).friendships.all
    # @incoming_requests = friends.all(status: 'requested').paginate(page: params[:page], per_page: 5)
    @incoming_requests = friends.all(status: 'requested').paginate(page: params[:page], per_page: 5,
                                                                   order: :updated_at.desc)
    # @outgoing_requests = friends.all(status: 'pending').paginate(page: params[:page], per_page: 5)
    @outgoing_requests = friends.all(status: 'pending').paginate(page: params[:page], per_page: 5,
                                                                 order: :updated_at.desc)
    @friendships = friends.all(status: 'friends').target(order: :updated_at.desc).paginate(page: params[:page],
                                                                                           per_page: 20)
    @title = 'Friends'

    @user = User.first(username: session[:username])

    erb :friends
  end

  post '/friends' do
    redirect '/' if session!
    from_user = User.first(username: session[:username])
    to_user = User.first(username: params[:username])

    if to_user
      if from_user.username == to_user.username
        flash[:error] = 'You cannot add yourself as a friend!'
        redirect '/friends'
      end
      a = Friendship.first(source: from_user, target: to_user)
      b = Friendship.first(source: to_user, target: from_user)
      if a || b
        flash[:error] = 'The friendship is currently pending or already exists.'
        redirect '/friends'
      else
        m = Message.create(from_user: from_user, to_user: to_user, title: 'Invite Sent',
                           body: "[Click Here To Friend #{from_user.username}](/friends)", otherbody: '')
        m.from_user = from_user
        m.to_user = to_user
        to_user.messages << m
        from_user.save
        to_user.save

        x = Friendship.create(source: from_user, target: to_user, status: 'pending')
        y = Friendship.create(source: to_user, target: from_user, status: 'requested')
        from_user.friendships << x
        to_user.friendships << y

        to_user.save
        from_user.save
        flash[:success] = "You have sent a friend request to #{params[:username]}."
        redirect '/friends'
      end
    else
      flash[:error] = 'The user you are trying to add does not exist!'
      redirect '/friends'
    end
  end

  post '/friends2' do
    redirect '/' if session!
    user = User.first(username: session[:username])
    user_friend = User.first(username: params[:username])
    if user_friend
      if user.username == user_friend.username
        flash[:error] = 'You cannot add yourself as a friend!'
        redirect "/user/#{params[:username]}"
      end
      a = Friendship.first(source: user, target: user_friend)
      b = Friendship.first(source: user_friend, target: user)
      if a || b
        flash[:error] = 'The friendship is currently pending or already exists.'
        redirect "/user/#{params[:username]}"
      else
        x = Friendship.create(source: user, target: user_friend, status: 'pending')
        y = Friendship.create(source: user_friend, target: user, status: 'requested')
        user.friendships << x
        user_friend.friendships << y
        user.save
        user_friend.save
        flash[:success] = "You have sent a friend request to #{params[:username]}."
        redirect "/user/#{params[:username]}"
      end
    else
      flash[:error] = 'The user you are trying to add does not exist!'
      redirect "/user/#{params[:username]}"
    end
  end

  put '/friends/accept/:id' do
    redirect '/' if session!
    user = User.first(username: session[:username])
    user_friend = User.first(username: params[:id])

    if user_friend
      a = Friendship.first(source: user, target: user_friend)
      b = Friendship.first(source: user_friend, target: user)

      if a && b
        a.status = 'friends'
        b.status = 'friends'
        a.save
        b.save

        user.save
        user_friend.save
        redirect '/friends'
      else
        redirect '/'
      end
    else
      redirect '/'
    end
  end

  post '/friends/deny/:id' do
    redirect '/' if session!
    user = User.first(username: session[:username])
    user_friend = User.first(username: params[:id])

    if user_friend
      a = Friendship.first(source: user, target: user_friend)
      b = Friendship.first(source: user_friend, target: user)

      if a && b
        a.destroy
        b.destroy
      else
        redirect '/'
      end

      user.save
      user_friend.save
      redirect '/friends'

    else

      redirect '/friends'
    end
  end

  get '/friends/delete/:id' do
    redirect '/' if session!
    user = User.first(username: session[:username])
    user_friend = User.first(username: params[:id])

    if user_friend
      a = Friendship.first(source: user, target: user_friend)
      b = Friendship.first(source: user_friend, target: user)

      if a && b
        a.destroy
        b.destroy
      else
        redirect '/'
      end

      user.save
      user_friend.save
      redirect '/friends'
    else
      redirect '/'
    end
  end
end
