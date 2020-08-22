

class Player
  
  attr_reader :id
  attr_accessor :socket, :characters, :bp, :team, :type
  
  def initialize(id,socket,t,s1,s2,s3,stats)
    @id = id
    @socket = socket
    @bp = 0
    @characters = Game.create_team(self,t[0],t[1],t[2],s1,s2,s3,stats)
    @team = t
    @type = "Ladder"
    puts @team
  end
  
  def notify(json_object)
    @socket.send(json_object)
  end
  
   
  
end

class Game
  
  attr_accessor :id, :turn
  
  def initialize(id,player1,player2,game_controller)
    @id = id
    @players = {}
    
    [player1, player2].each do |player|
      @players[player.id] = player
    end
    
    
    @game_controller = game_controller
    @turn = 0
    @players.each do |player_id, player|
    player.notify({:msg => "battle", :game_id => @id.to_s }.to_json)
    end
    
    player1.bp = 1
    u1 = User.first(:id => player1.id)
    u2 = User.first(:id => player2.id)
    
    player1.notify({:msg => "opponent_info", :username => u2.username.to_s, :rank => u2.rank.to_s , :wins => u2.wins.to_s, :losses => u2.losses.to_s, :streak => u2.streak.to_s, :team => u2.team.to_s, :clan => u2.clan.to_s, :avater => u2.avater.to_s}.to_json)
    player2.notify({:msg => "opponent_info", :username => u1.username.to_s, :rank => u1.rank.to_s , :wins => u1.wins.to_s, :losses => u1.losses.to_s, :streak => u1.streak.to_s, :team => u1.team.to_s, :clan => u1.clan.to_s, :avater => u1.avater.to_s}.to_json)
    
    player1.notify({ :msg => "Y_turn"}.to_json)
    player2.notify({ :msg => "O_turn"}.to_json)
    
    player1.notify(game_info(@players.keys[0]).to_json)
    player2.notify(game_info(@players.keys[1]).to_json)
    
    @current_player = player1.id
    @other_player = player2.id
    
    def game_exist(player)
  puts @players
    end
  end
  
  
  
  def surrender(loser_id)
    g = GameModel.first(:id => @id)

    if @players.keys[0] == loser_id
      
      team = @players[@players.keys[0]].team
      losing_user = User.first(:id => @players.keys[0])
      winning_user = User.first(:id => @players.keys[1])
      g.update(:winner => winning_user.username, :loser => losing_user.username)
      
      losing_user.losses += 1
      losing_user.power_level += 100
      losing_user.average = (losing_user.wins/(losing_user.wins+losing_user.losses).to_f * 100).round(2)
      winning_user.wins += 1
      winning_user.power_level += 300
      winning_user.average = (winning_user.wins/(winning_user.wins+winning_user.losses).to_f * 100).round(2)
      if losing_user.streak >= 0
      losing_user.streak = 0 - 1
      
      else
      losing_user.streak -= 1
      end
      
       if winning_user.streak >= 0
      winning_user.streak += 1
      
       else
      winning_user.streak = 0 + 1
       end
       w_s = JSON.parse(winning_user.stats)
       l_s = JSON.parse(losing_user.stats)
       
       c1_w = JSON.parse(w_s[team[0]])
       c2_w = JSON.parse(w_s[team[1]])
       c3_w = JSON.parse(w_s[team[2]])
       
       c1_l = JSON.parse(l_s[team[0]])
       c2_l = JSON.parse(l_s[team[1]])
       c3_l = JSON.parse(l_s[team[2]])
       
       puts "Array Length: #{c1_w.length}"
       
       old_we = [c1_w[6],c2_w[6],c3_w[6],c1_w[7],c2_w[7],c3_w[7],c1_w[8],c2_w[8],c3_w[8]]
       old_le = [c1_l[6],c2_l[6],c3_l[6],c1_l[7],c2_l[7],c3_l[7],c1_w[8],c2_w[8],c3_w[8]]
       #stats [mn_s 0,mn_k 1,mn_d 2,extra_s 3,extra_k 4,extra_d 5,Level 6,Experience 7 ,points 8,points total 9]
       c1_w[7] += 50
       c2_w[7] += 50
       c3_w[7] += 50
       
       case c1_w[6]
       when 1
       if c1_w[7] >= 100
       c1_w[6] += 1
       c1_w[8] += 3
       c1_w[9] += 3
       c1_w[7] = 0
       end
       
       when 2
       if c1_w[7] >= 200
       c1_w[6] += 1
       c1_w[8] += 3
       c1_w[9] += 3
       c1_w[7] = 0
       end
       
       when 3
       if c1_w[7] >= 300
       c1_w[6] += 1
       c1_w[8] += 3
       c1_w[9] += 3
       c1_w[7] = 0
       end
       
       when 4
       if c1_w[7] >= 400
       c1_w[6] += 1
       c1_w[8] += 3
       c1_w[9] += 3
       c1_w[7] = 0
       end
       
       when 5
       if c1_w[7] >= 500
       c1_w[6] += 1
       c1_w[8] += 3
       c1_w[9] += 3
       c1_w[7] = 0
       end
       
       when 6
       if c1_w[7] >= 600
       c1_w[6] += 1
       c1_w[8] += 3
       c1_w[9] += 3
       c1_w[7] = 0
       end
       
       when 7
       if c1_w[7] >= 700
       c1_w[6] += 1
       c1_w[8] += 3
       c1_w[9] += 3
       c1_w[7] = 0
       end
       
       when 8
       if c1_w[7] >= 800
       c1_w[6] += 1
       c1_w[8] += 3
       c1_w[9] += 3
       c1_w[7] = 0
       end
       
       end
       
       case c2_w[6]
       when 1
       if c2_w[7] >= 100
       c2_w[6] += 1
       c2_w[8] += 3
       c2_w[9] += 3
       c2_w[7] = 0
       end
       
       when 2
       if c2_w[7] >= 200
       c2_w[6] += 1
       c2_w[8] += 3
       c2_w[9] += 3
       c2_w[7] = 0
       end
       
       when 3
       if c2_w[7] >= 300
       c2_w[6] += 1
       c2_w[8] += 3
       c2_w[9] += 3
       c2_w[7] = 0
       end
       
       when 4
       if c2_w[7] >= 400
       c2_w[6] += 1
       c2_w[8] += 3
       c2_w[9] += 3
       c2_w[7] = 0
       end
       
       when 5
       if c2_w[7] >= 500
       c2_w[6] += 1
       c2_w[8] += 3
       c2_w[9] += 3
       c2_w[7] = 0
       end
       
       when 6
       if c2_w[7] >= 600
       c2_w[6] += 1
       c2_w[8] += 3
       c2_w[9] += 3
       c2_w[7] = 0
       end
       
       when 7
       if c2_w[7] >= 700
       c2_w[6] += 1
       c2_w[8] += 3
       c2_w[9] += 3
       c2_w[7] = 0
       end
       
       when 8
       if c2_w[7] >= 800
       c2_w[6] += 1
       c2_w[8] += 3
       c2_w[9] += 3
       c2_w[7] = 0
       end
       
       end
       
       case c3_w[6]
       when 1
       if c3_w[7] >= 100
       c3_w[6] += 1
       c3_w[8] += 3
       c3_w[9] += 3
       c3_w[7] = 0
       end
       
       when 2
       if c3_w[7] >= 200
       c3_w[6] += 1
       c3_w[8] += 3
       c3_w[9] += 3
       c3_w[7] = 0
       end
       
       when 3
       if c3_w[7] >= 300
       c3_w[6] += 1
       c3_w[8] += 3
       c3_w[9] += 3
       c3_w[7] = 0
       end
       
       when 4
       if c3_w[7] >= 400
       c3_w[6] += 1
       c3_w[8] += 3
       c3_w[9] += 3
       c3_w[7] = 0
       end
       
       when 5
       if c3_w[7] >= 500
       c3_w[6] += 1
       c3_w[8] += 3
       c3_w[9] += 3
       c3_w[7] = 0
       end
       
       when 6
       if c3_w[7] >= 600
       c3_w[6] += 1
       c3_w[8] += 3
       c3_w[9] += 3
       c3_w[7] = 0
       end
       
       when 7
       if c3_w[7] >= 700
       c3_w[6] += 1
       c3_w[8] += 3
       c3_w[9] += 3
       c3_w[7] = 0
       end
       
       when 8
       if c3_w[7] >= 800
       c3_w[6] += 1
       c3_w[8] += 3
       c3_w[9] += 3
       c3_w[7] = 0
       end
       
       end
       
       new_we = [c1_w[6],c2_w[6],c3_w[6],c1_w[7],c2_w[7],c3_w[7],c1_w[8],c2_w[8],c3_w[8]]
       new_le = [c1_l[6],c2_l[6],c3_l[6],c1_l[7],c2_l[7],c3_l[7],c1_w[8],c2_w[8],c3_w[8]]
       
       w_s[team[0]] = c1_w.to_s
       w_s[team[1]] = c2_w.to_s
       w_s[team[2]] = c3_w.to_s
       
       winning_user.stats = (w_s.to_json).to_s
       
       #stats [mn_hp 0,mn_ep 1,mn_s 2,mn_k 3,mn_d 4,extra_s 5,extra_k 6,extra_d 7,Level 8,Experience 9 ,points 10,points total 11]
             

       losing_user.save
       winning_user.save
      @players[@players.keys[1]].notify({:msg => "user_info", :player_id => winning_user.id.to_s, :avater => winning_user.avater.to_s,:username => winning_user.username.to_s, :rank => winning_user.rank.to_s , :wins => winning_user.wins.to_s, :losses => winning_user.losses.to_s, :streak => winning_user.streak.to_s,:team => losing_user.team.to_s, :skill1 => losing_user.skill1.to_s,:skill2 => losing_user.skill2.to_s,:skill3 => losing_user.skill3.to_s}.to_json)
      @players[@players.keys[0]].notify({:msg => "user_info", :player_id => losing_user.id.to_s, :avater => losing_user.avater.to_s, :username => losing_user.username.to_s, :rank => losing_user.rank.to_s , :wins => losing_user.wins.to_s, :losses => losing_user.losses.to_s, :streak => losing_user.streak.to_s,:team => winning_user.team.to_s, :skill1 => winning_user.skill1.to_s,:skill2 => winning_user.skill2.to_s,:skill3 => winning_user.skill3.to_s}.to_json)
      @players[@players.keys[0]].notify({:msg => "lose", :old => old_le.to_s, :new => new_le.to_s}.to_json)
      @players[@players.keys[1]].notify({:msg => "win", :old => old_we.to_s, :new => new_we.to_s}.to_json)
    else
      
      losing_user = User.first(:id => @players.keys[1])
      winning_user = User.first(:id => @players.keys[0])
      team = @players[@players.keys[1]].team
      g.update(:winner => winning_user.username, :loser => losing_user.username)
      
      puts losing_user.username
      
      losing_user.losses += 1
      losing_user.power_level += 100
      losing_user.average = (losing_user.wins/(losing_user.wins+losing_user.losses).to_f * 100).round(2)
      winning_user.wins += 1
      winning_user.power_level += 300
      winning_user.average = (winning_user.wins/(winning_user.wins+winning_user.losses).to_f * 100).round(2)
      if losing_user.streak >= 0
      losing_user.streak = 0 - 1
      
    else
      losing_user.streak -= 1
      end
      
       if winning_user.streak >= 0
      winning_user.streak += 1
      
    else
      winning_user.streak = 0 + 1
       end
       
       w_s = JSON.parse(winning_user.stats)
       l_s = JSON.parse(losing_user.stats)
       
       c1_w = JSON.parse(w_s[team[0]])
       c2_w = JSON.parse(w_s[team[1]])
       c3_w = JSON.parse(w_s[team[2]])
       
       c1_l = JSON.parse(l_s[team[0]])
       c2_l = JSON.parse(l_s[team[1]])
       c3_l = JSON.parse(l_s[team[2]])
       
       puts "Array Length: #{c1_w.length}"
       
       old_we = [c1_w[6],c2_w[6],c3_w[6],c1_w[7],c2_w[7],c3_w[7],c1_w[8],c2_w[8],c3_w[8]]
       old_le = [c1_l[6],c2_l[6],c3_l[6],c1_l[7],c2_l[7],c3_l[7],c1_w[8],c2_w[8],c3_w[8]]
       #stats [mn_s 0,mn_k 1,mn_d 2,extra_s 3,extra_k 4,extra_d 5,Level 6,Experience 7 ,points 8,points total 9]
       c1_w[7] += 50
       c2_w[7] += 50
       c3_w[7] += 50
       
       case c1_w[6]
       when 1
       if c1_w[7] >= 100
       c1_w[6] += 1
       c1_w[8] += 3
       c1_w[9] += 3
       c1_w[7] = 0
       end
       
       when 2
       if c1_w[7] >= 200
       c1_w[6] += 1
       c1_w[8] += 3
       c1_w[9] += 3
       c1_w[7] = 0
       end
       
       when 3
       if c1_w[7] >= 300
       c1_w[6] += 1
       c1_w[8] += 3
       c1_w[9] += 3
       c1_w[7] = 0
       end
       
       when 4
       if c1_w[7] >= 400
       c1_w[6] += 1
       c1_w[8] += 3
       c1_w[9] += 3
       c1_w[7] = 0
       end
       
       when 5
       if c1_w[7] >= 500
       c1_w[6] += 1
       c1_w[8] += 3
       c1_w[9] += 3
       c1_w[7] = 0
       end
       
       when 6
       if c1_w[7] >= 600
       c1_w[6] += 1
       c1_w[8] += 3
       c1_w[9] += 3
       c1_w[7] = 0
       end
       
       when 7
       if c1_w[7] >= 700
       c1_w[6] += 1
       c1_w[8] += 3
       c1_w[9] += 3
       c1_w[7] = 0
       end
       
       when 8
       if c1_w[7] >= 800
       c1_w[6] += 1
       c1_w[8] += 3
       c1_w[9] += 3
       c1_w[7] = 0
       end
       
       end
       
       case c2_w[6]
       when 1
       if c2_w[7] >= 100
       c2_w[6] += 1
       c2_w[8] += 3
       c2_w[9] += 3
       c2_w[7] = 0
       end
       
       when 2
       if c2_w[7] >= 200
       c2_w[6] += 1
       c2_w[8] += 3
       c2_w[9] += 3
       c2_w[7] = 0
       end
       
       when 3
       if c2_w[7] >= 300
       c2_w[6] += 1
       c2_w[8] += 3
       c2_w[9] += 3
       c2_w[7] = 0
       end
       
       when 4
       if c2_w[7] >= 400
       c2_w[6] += 1
       c2_w[8] += 3
       c2_w[9] += 3
       c2_w[7] = 0
       end
       
       when 5
       if c2_w[7] >= 500
       c2_w[6] += 1
       c2_w[8] += 3
       c2_w[9] += 3
       c2_w[7] = 0
       end
       
       when 6
       if c2_w[7] >= 600
       c2_w[6] += 1
       c2_w[8] += 3
       c2_w[9] += 3
       c2_w[7] = 0
       end
       
       when 7
       if c2_w[7] >= 700
       c2_w[6] += 1
       c2_w[8] += 3
       c2_w[9] += 3
       c2_w[7] = 0
       end
       
       when 8
       if c2_w[7] >= 800
       c2_w[6] += 1
       c2_w[8] += 3
       c2_w[9] += 3
       c2_w[7] = 0
       end
       
       end
       
       case c3_w[6]
       when 1
       if c3_w[7] >= 100
       c3_w[6] += 1
       c3_w[8] += 3
       c3_w[9] += 3
       c3_w[7] = 0
       end
       
       when 2
       if c3_w[7] >= 200
       c3_w[6] += 1
       c3_w[8] += 3
       c3_w[9] += 3
       c3_w[7] = 0
       end
       
       when 3
       if c3_w[7] >= 300
       c3_w[6] += 1
       c3_w[8] += 3
       c3_w[9] += 3
       c3_w[7] = 0
       end
       
       when 4
       if c3_w[7] >= 400
       c3_w[6] += 1
       c3_w[8] += 3
       c3_w[9] += 3
       c3_w[7] = 0
       end
       
       when 5
       if c3_w[7] >= 500
       c3_w[6] += 1
       c3_w[8] += 3
       c3_w[9] += 3
       c3_w[7] = 0
       end
       
       when 6
       if c3_w[7] >= 600
       c3_w[6] += 1
       c3_w[8] += 3
       c3_w[9] += 3
       c3_w[7] = 0
       end
       
       when 7
       if c3_w[7] >= 700
       c3_w[6] += 1
       c3_w[8] += 3
       c3_w[9] += 3
       c3_w[7] = 0
       end
       
       when 8
       if c3_w[7] >= 800
       c3_w[6] += 1
       c3_w[8] += 3
       c3_w[9] += 3
       c3_w[7] = 0
       end
       
       end
       
       new_we = [c1_w[6],c2_w[6],c3_w[6],c1_w[7],c2_w[7],c3_w[7],c1_w[8],c2_w[8],c3_w[8]]
       new_le = [c1_l[6],c2_l[6],c3_l[6],c1_l[7],c2_l[7],c3_l[7],c1_w[8],c2_w[8],c3_w[8]]
       
       w_s[team[0]] = c1_w.to_s
       w_s[team[1]] = c2_w.to_s
       w_s[team[2]] = c3_w.to_s
       
       winning_user.stats = (w_s.to_json).to_s
       
       losing_user.save
       winning_user.save
     
      @players[@players.keys[1]].notify({:msg => "user_info", :player_id => losing_user.id.to_s,:avater => losing_user.avater.to_s, :username => losing_user.username.to_s, :rank => losing_user.rank.to_s , :wins => losing_user.wins.to_s, :losses => losing_user.losses.to_s, :streak => losing_user.streak.to_s,:team => losing_user.team.to_s, :skill1 => losing_user.skill1.to_s,:skill2 => losing_user.skill2.to_s,:skill3 => losing_user.skill3.to_s}.to_json)
      @players[@players.keys[0]].notify({:msg => "user_info", :player_id => winning_user.id.to_s, :avater => winning_user.avater.to_s,:username => winning_user.username.to_s, :rank => winning_user.rank.to_s , :wins => winning_user.wins.to_s, :losses => winning_user.losses.to_s, :streak => winning_user.streak.to_s,:team => winning_user.team.to_s, :skill1 => winning_user.skill1.to_s,:skill2 => winning_user.skill2.to_s,:skill3 => winning_user.skill3.to_s}.to_json)
      @players[@players.keys[1]].notify({:msg => "lose",:old => old_le.to_s, :new => new_le.to_s}.to_json)
      @players[@players.keys[0]].notify({:msg => "win",:old => old_we.to_s, :new => new_we.to_s}.to_json)
    end
    
    @game_controller.end_game(@id, @players)
  end

  
  def end_turn(player_id)
    if player_id == @current_player
      if @players.keys[0] == player_id
        @players[@players.keys[1]].bp += 3
        puts @players[@players.keys[1]].team
        @players[@players.keys[0]].notify({ :msg => "O_turn"}.to_json)
        @players[@players.keys[1]].notify({ :msg => "Y_turn"}.to_json)
        
        @players[@players.keys[0]].notify(game_info(@players.keys[0]).to_json)
        @players[@players.keys[1]].notify(game_info(@players.keys[1]).to_json)
        
        @current_player = @players.keys[1]
        @other_player = @players.keys[0]
        @turn += 1
 
      else
        @players[@players.keys[0]].notify({ :msg => "Y_turn"}.to_json)
        @players[@players.keys[1]].notify({ :msg => "O_turn"}.to_json)
        @players[@players.keys[0]].bp += 3
        @players[@players.keys[0]].notify(game_info(@players.keys[0]).to_json)
        @players[@players.keys[1]].notify(game_info(@players.keys[1]).to_json)
        
        @current_player = @players.keys[0]
        @other_player = @players.keys[1]
        @turn += 1
      
      end
    else
      @players[player_id].notify({ :msg => "Not your turn..."}.to_json)
    end
  end
  
  def self.create_team(controlling_player,c1,c2,c3,s1,s2,s3,stats)
    team = {}
    case c1
      when 'zGu'
        team['zGu'] = Goku.new(controlling_player,s1,JSON.parse(stats['zGu']))
      when 'zKG'
        team['zKG'] = KidGohan.new(controlling_player,s1,JSON.parse(stats['zKG']))
      when 'zKn'
        team['zKn'] = Krillin.new(controlling_player,s1,JSON.parse(stats['zKn']))
      when 'zPo'
        team['zPo'] = Piccolo.new(controlling_player,s1,JSON.parse(stats['zPo']))
      when 'zRz'
        team['zRz'] = Raditz.new(controlling_player,s1,JSON.parse(stats['zRz']))
      when 'zYa'
        team['zYa'] = Yamcha.new(controlling_player,s1,JSON.parse(stats['zYa']))
    end
    case c2
      when 'zGu'
        team['zGu'] = Goku.new(controlling_player,s2,JSON.parse(stats['zGu']))
      when 'zKG'
        team['zKG'] = KidGohan.new(controlling_player,s2,JSON.parse(stats['zKG']))
      when 'zKn'
        team['zKn'] = Krillin.new(controlling_player,s2,JSON.parse(stats['zKn']))
      when 'zPo'
        team['zPo'] = Piccolo.new(controlling_player,s2,JSON.parse(stats['zPo']))
      when 'zRz'
        team['zRz'] = Raditz.new(controlling_player,s2,JSON.parse(stats['zRz']))
      when 'zYa'
        team['zYa'] = Yamcha.new(controlling_player,s2,JSON.parse(stats['zYa']))
    end
    case c3
      when 'zGu'
        team['zGu'] = Goku.new(controlling_player,s3,JSON.parse(stats['zGu']))
      when 'zKG'
        team['zKG'] = KidGohan.new(controlling_player,s3,JSON.parse(stats['zKG']))
      when 'zKn'
        team['zKn'] = Krillin.new(controlling_player,s3,JSON.parse(stats['zKn']))
      when 'zPo'
        team['zPo'] = Piccolo.new(controlling_player,s3,JSON.parse(stats['zPo']))
      when 'zRz'
        team['zRz'] = Raditz.new(controlling_player,s3,JSON.parse(stats['zRz']))
      when 'zYa'
        team['zYa'] = Yamcha.new(controlling_player,s3,JSON.parse(stats['zYa']))
    end
    return team
  end
  
  def game_info(player_id)
    if player_id == @players.keys[0]
      
      y_c1 = @players[@players.keys[0]].characters[@players[@players.keys[0]].characters.keys[0]]
      y_c2 = @players[@players.keys[0]].characters[@players[@players.keys[0]].characters.keys[1]]
      y_c3 = @players[@players.keys[0]].characters[@players[@players.keys[0]].characters.keys[2]]
      
      o_c1 = @players[@players.keys[1]].characters[@players[@players.keys[1]].characters.keys[0]]
      o_c2 = @players[@players.keys[1]].characters[@players[@players.keys[1]].characters.keys[1]]
      o_c3 = @players[@players.keys[1]].characters[@players[@players.keys[1]].characters.keys[2]]
      
      your_characters_info = {}
      your_characters_info['y_c1_health'] = y_c1.health
      your_characters_info['y_c2_health'] = y_c2.health
      your_characters_info['y_c3_health'] = y_c3.health
      your_characters_info['y_c1_stunned'] = y_c1.stunned.to_s
      your_characters_info['y_c2_stunned'] = y_c2.stunned.to_s
      your_characters_info['y_c3_stunned'] = y_c3.stunned.to_s
      your_characters_info['y_c1_energy'] = y_c1.energy
      your_characters_info['y_c2_energy'] = y_c2.energy
      your_characters_info['y_c3_energy'] = y_c3.energy
      your_characters_info['y_c1_strength'] = y_c1.strength
      your_characters_info['y_c2_strength'] = y_c2.strength
      your_characters_info['y_c3_strength'] = y_c3.strength
      your_characters_info['y_c1_kai'] = y_c1.kai
      your_characters_info['y_c2_kai'] = y_c2.kai
      your_characters_info['y_c3_kai'] = y_c3.kai
      your_characters_info['y_c1_defense'] = y_c1.defense
      your_characters_info['y_c2_defense'] = y_c2.defense
      your_characters_info['y_c3_defense'] = y_c3.defense
      your_characters_info['y_c1_cooldown'] = y_c1.cooldown.to_s
      your_characters_info['y_c2_cooldown'] = y_c2.cooldown.to_s
      your_characters_info['y_c3_cooldown'] = y_c3.cooldown.to_s
      your_characters_info['y_c1_effect'] = y_c1.effect.to_s
      your_characters_info['y_c2_effect'] = y_c2.effect.to_s
      your_characters_info['y_c3_effect'] = y_c3.effect.to_s
      your_characters_info['y_c1_skillhold'] = y_c1.skillhold.to_s
      your_characters_info['y_c2_skillhold'] = y_c2.skillhold.to_s
      your_characters_info['y_c3_skillhold'] = y_c3.skillhold.to_s
      your_characters_info['y_c1_experience'] = y_c1.experience.to_s
      your_characters_info['y_c2_experience'] = y_c2.experience.to_s
      your_characters_info['y_c3_experience'] = y_c3.experience.to_s
      
      opponents_characters_info = {}
      your_characters_info['o_c1_health'] = o_c1.health
      your_characters_info['o_c2_health'] = o_c2.health
      your_characters_info['o_c3_health'] = o_c3.health
      your_characters_info['o_c1_stunned'] = o_c1.stunned.to_s
      your_characters_info['o_c2_stunned'] = o_c2.stunned.to_s
      your_characters_info['o_c3_stunned'] = o_c3.stunned.to_s
      your_characters_info['o_c1_block'] = o_c1.block.to_s
      your_characters_info['o_c2_block'] = o_c2.block.to_s
      your_characters_info['o_c3_block'] = o_c3.block.to_s
      your_characters_info['o_c1_energy'] = o_c1.energy
      your_characters_info['o_c2_energy'] = o_c2.energy
      your_characters_info['o_c3_energy'] = o_c3.energy
      your_characters_info['o_c1_strength'] = o_c1.strength
      your_characters_info['o_c2_strength'] = o_c2.strength
      your_characters_info['o_c3_strength'] = o_c3.strength
      your_characters_info['o_c1_kai'] = o_c1.kai
      your_characters_info['o_c2_kai'] = o_c2.kai
      your_characters_info['o_c3_kai'] = o_c3.kai
      your_characters_info['o_c1_defense'] = o_c1.defense
      your_characters_info['o_c2_defense'] = o_c2.defense
      your_characters_info['o_c3_defense'] = o_c3.defense
      your_characters_info['o_c1_effect'] = o_c1.effect.to_s
      your_characters_info['o_c2_effect'] = o_c2.effect.to_s
      your_characters_info['o_c3_effect'] = o_c3.effect.to_s
      your_characters_info['o_c1_experience'] = o_c1.experience.to_s
      your_characters_info['o_c2_experience'] = o_c2.experience.to_s
      your_characters_info['o_c3_experience'] = o_c3.experience.to_s
      
      
     if 1 > y_c1.health + y_c2.health + y_c3.health
       
     
     return lose(@players.keys[0])
      
  elsif 1 > o_c1.health + o_c2.health + o_c3.health
     return win(@players.keys[0])
  else
  return { :msg => "game_info", :turn => @turn, :bp => @players[@players.keys[0]].bp }.merge(your_characters_info).merge(opponents_characters_info)
     end
    
    
  
    
    
      
    elsif player_id == @players.keys[1]
    
      y_c1 = @players[@players.keys[1]].characters[@players[@players.keys[1]].characters.keys[0]]
      y_c2 = @players[@players.keys[1]].characters[@players[@players.keys[1]].characters.keys[1]]
      y_c3 = @players[@players.keys[1]].characters[@players[@players.keys[1]].characters.keys[2]]
      
      o_c1 = @players[@players.keys[0]].characters[@players[@players.keys[0]].characters.keys[0]]
      o_c2 = @players[@players.keys[0]].characters[@players[@players.keys[0]].characters.keys[1]]
      o_c3 = @players[@players.keys[0]].characters[@players[@players.keys[0]].characters.keys[2]]
      
      your_characters_info = {}
      your_characters_info = {}
      your_characters_info['y_c1_health'] = y_c1.health
      your_characters_info['y_c2_health'] = y_c2.health
      your_characters_info['y_c3_health'] = y_c3.health
      your_characters_info['y_c1_stunned'] = y_c1.stunned.to_s
      your_characters_info['y_c2_stunned'] = y_c2.stunned.to_s
      your_characters_info['y_c3_stunned'] = y_c3.stunned.to_s
      your_characters_info['y_c1_energy'] = y_c1.energy
      your_characters_info['y_c2_energy'] = y_c2.energy
      your_characters_info['y_c3_energy'] = y_c3.energy
      your_characters_info['y_c1_strength'] = y_c1.strength
      your_characters_info['y_c2_strength'] = y_c2.strength
      your_characters_info['y_c3_strength'] = y_c3.strength
      your_characters_info['y_c1_kai'] = y_c1.kai
      your_characters_info['y_c2_kai'] = y_c2.kai
      your_characters_info['y_c3_kai'] = y_c3.kai
      your_characters_info['y_c1_defense'] = y_c1.defense
      your_characters_info['y_c2_defense'] = y_c2.defense
      your_characters_info['y_c3_defense'] = y_c3.defense
      your_characters_info['y_c1_cooldown'] = y_c1.cooldown.to_s
      your_characters_info['y_c2_cooldown'] = y_c2.cooldown.to_s
      your_characters_info['y_c3_cooldown'] = y_c3.cooldown.to_s
      your_characters_info['y_c1_effect'] = y_c1.effect.to_s
      your_characters_info['y_c2_effect'] = y_c2.effect.to_s
      your_characters_info['y_c3_effect'] = y_c3.effect.to_s
      your_characters_info['y_c1_skillhold'] = y_c1.skillhold.to_s
      your_characters_info['y_c2_skillhold'] = y_c2.skillhold.to_s
      your_characters_info['y_c3_skillhold'] = y_c3.skillhold.to_s 
      your_characters_info['y_c1_experience'] = y_c1.experience.to_s
      your_characters_info['y_c2_experience'] = y_c2.experience.to_s
      your_characters_info['y_c3_experience'] = y_c3.experience.to_s
      
      opponents_characters_info = {}
      your_characters_info['o_c1_health'] = o_c1.health
      your_characters_info['o_c2_health'] = o_c2.health
      your_characters_info['o_c3_health'] = o_c3.health
      your_characters_info['o_c1_stunned'] = o_c1.stunned.to_s
      your_characters_info['o_c2_stunned'] = o_c2.stunned.to_s
      your_characters_info['o_c3_stunned'] = o_c3.stunned.to_s
      your_characters_info['o_c1_block'] = o_c1.block.to_s
      your_characters_info['o_c2_block'] = o_c2.block.to_s
      your_characters_info['o_c3_block'] = o_c3.block.to_s
      your_characters_info['o_c1_energy'] = o_c1.energy
      your_characters_info['o_c2_energy'] = o_c2.energy
      your_characters_info['o_c3_energy'] = o_c3.energy
      your_characters_info['o_c1_strength'] = o_c1.strength
      your_characters_info['o_c2_strength'] = o_c2.strength
      your_characters_info['o_c3_strength'] = o_c3.strength
      your_characters_info['o_c1_kai'] = o_c1.kai
      your_characters_info['o_c2_kai'] = o_c2.kai
      your_characters_info['o_c3_kai'] = o_c3.kai
      your_characters_info['o_c1_defense'] = o_c1.defense
      your_characters_info['o_c2_defense'] = o_c2.defense
      your_characters_info['o_c3_defense'] = o_c3.defense
      your_characters_info['o_c1_effect'] = o_c1.effect.to_s
      your_characters_info['o_c2_effect'] = o_c2.effect.to_s
      your_characters_info['o_c3_effect'] = o_c3.effect.to_s
      your_characters_info['o_c1_experience'] = o_c1.experience.to_s
      your_characters_info['o_c2_experience'] = o_c2.experience.to_s
      your_characters_info['o_c3_experience'] = o_c3.experience.to_s
      
       
 if 1 > y_c1.health + y_c2.health + y_c3.health
       
     return lose(@players.keys[1])
 
      
    elsif 1 > o_c1.health + o_c2.health + o_c3.health
     return win(@players.keys[1])
    else
  return { :msg => "game_info", :turn => @turn, :bp => @players[@players.keys[1]].bp }.merge(your_characters_info).merge(opponents_characters_info)
 end
      
    end
  end
  
  def win(win_id)
  g = GameModel.first(:id => @id)
  
  winning_user = User.first(:id => win_id)
  g.update(:winner => winning_user.username)
  team = @players[win_id].team
  
  winning_user.wins += 1
  winning_user.power_level += 300
  winning_user.average = (winning_user.wins/(winning_user.wins+winning_user.losses).to_f * 100).round(2)
  
  if winning_user.streak >= 0
     winning_user.streak += 1
  else
     winning_user.streak = 0 + 1
  end
  
      w_s = JSON.parse(winning_user.stats)

       c1_w = JSON.parse(w_s[team[0]])
       c2_w = JSON.parse(w_s[team[1]])
       c3_w = JSON.parse(w_s[team[2]])
       
       puts "Array Length: #{c1_w.length}"
       
       old_we = [c1_w[6],c2_w[6],c3_w[6],c1_w[7],c2_w[7],c3_w[7],c1_w[8],c2_w[8],c3_w[8]]
       #stats [mn_s 0,mn_k 1,mn_d 2,extra_s 3,extra_k 4,extra_d 5,Level 6,Experience 7 ,points 8,points total 9]
       c1_w[7] += 50
       c2_w[7] += 50
       c3_w[7] += 50
       
       case c1_w[6]
       when 1
       if c1_w[7] >= 100
       c1_w[6] += 1
       c1_w[8] += 3
       c1_w[9] += 3
       c1_w[7] = 0
       end
       
       when 2
       if c1_w[7] >= 200
       c1_w[6] += 1
       c1_w[8] += 3
       c1_w[9] += 3
       c1_w[7] = 0
       end
       
       when 3
       if c1_w[7] >= 300
       c1_w[6] += 1
       c1_w[8] += 3
       c1_w[9] += 3
       c1_w[7] = 0
       end
       
       when 4
       if c1_w[7] >= 400
       c1_w[6] += 1
       c1_w[8] += 3
       c1_w[9] += 3
       c1_w[7] = 0
       end
       
       when 5
       if c1_w[7] >= 500
       c1_w[6] += 1
       c1_w[8] += 3
       c1_w[9] += 3
       c1_w[7] = 0
       end
       
       when 6
       if c1_w[7] >= 600
       c1_w[6] += 1
       c1_w[8] += 3
       c1_w[9] += 3
       c1_w[7] = 0
       end
       
       when 7
       if c1_w[7] >= 700
       c1_w[6] += 1
       c1_w[8] += 3
       c1_w[9] += 3
       c1_w[7] = 0
       end
       
       when 8
       if c1_w[7] >= 800
       c1_w[6] += 1
       c1_w[8] += 3
       c1_w[9] += 3
       c1_w[7] = 0
       end
       
       end
       
       case c2_w[6]
       when 1
       if c2_w[7] >= 100
       c2_w[6] += 1
       c2_w[8] += 3
       c2_w[9] += 3
       c2_w[7] = 0
       end
       
       when 2
       if c2_w[7] >= 200
       c2_w[6] += 1
       c2_w[8] += 3
       c2_w[9] += 3
       c2_w[7] = 0
       end
       
       when 3
       if c2_w[7] >= 300
       c2_w[6] += 1
       c2_w[8] += 3
       c2_w[9] += 3
       c2_w[7] = 0
       end
       
       when 4
       if c2_w[7] >= 400
       c2_w[6] += 1
       c2_w[8] += 3
       c2_w[9] += 3
       c2_w[7] = 0
       end
       
       when 5
       if c2_w[7] >= 500
       c2_w[6] += 1
       c2_w[8] += 3
       c2_w[9] += 3
       c2_w[7] = 0
       end
       
       when 6
       if c2_w[7] >= 600
       c2_w[6] += 1
       c2_w[8] += 3
       c2_w[9] += 3
       c2_w[7] = 0
       end
       
       when 7
       if c2_w[7] >= 700
       c2_w[6] += 1
       c2_w[8] += 3
       c2_w[9] += 3
       c2_w[7] = 0
       end
       
       when 8
       if c2_w[7] >= 800
       c2_w[6] += 1
       c2_w[8] += 3
       c2_w[9] += 3
       c2_w[7] = 0
       end
       
       end
       
       case c3_w[6]
       when 1
       if c3_w[7] >= 100
       c3_w[6] += 1
       c3_w[8] += 3
       c3_w[9] += 3
       c3_w[7] = 0
       end
       
       when 2
       if c3_w[7] >= 200
       c3_w[6] += 1
       c3_w[8] += 3
       c3_w[9] += 3
       c3_w[7] = 0
       end
       
       when 3
       if c3_w[7] >= 300
       c3_w[6] += 1
       c3_w[8] += 3
       c3_w[9] += 3
       c3_w[7] = 0
       end
       
       when 4
       if c3_w[7] >= 400
       c3_w[6] += 1
       c3_w[8] += 3
       c3_w[9] += 3
       c3_w[7] = 0
       end
       
       when 5
       if c3_w[7] >= 500
       c3_w[6] += 1
       c3_w[8] += 3
       c3_w[9] += 3
       c3_w[7] = 0
       end
       
       when 6
       if c3_w[7] >= 600
       c3_w[6] += 1
       c3_w[8] += 3
       c3_w[9] += 3
       c3_w[7] = 0
       end
       
       when 7
       if c3_w[7] >= 700
       c3_w[6] += 1
       c3_w[8] += 3
       c3_w[9] += 3
       c3_w[7] = 0
       end
       
       when 8
       if c3_w[7] >= 800
       c3_w[6] += 1
       c3_w[8] += 3
       c3_w[9] += 3
       c3_w[7] = 0
       end
       
       end
       
       new_we = [c1_w[6],c2_w[6],c3_w[6],c1_w[7],c2_w[7],c3_w[7],c1_w[8],c2_w[8],c3_w[8]]
       
        
    w_s[team[0]] = c1_w.to_s
       w_s[team[1]] = c2_w.to_s
       w_s[team[2]] = c3_w.to_s
       winning_user.stats = (w_s.to_json).to_s
       winning_user.save
       @game_controller.end_game(@id, @players)
       return {"msg": "win",:old => old_we.to_s, :new => new_we.to_s}
   
  end
  
  def lose(loser_id)
      team = @players[loser_id].team
      losing_user = User.first(:id => loser_id)
      losing_user.losses += 1
      losing_user.power_level += 100
      losing_user.average = (losing_user.wins/(losing_user.wins+losing_user.losses).to_f * 100).round(2)
      
      w_s = JSON.parse(losing_user.stats)
      c1_w = JSON.parse(w_s[team[0]])
      c2_w = JSON.parse(w_s[team[1]])
      c3_w = JSON.parse(w_s[team[2]])
      old_we = [c1_w[8],c2_w[8],c3_w[8],c1_w[9],c2_w[9],c3_w[9],c1_w[10],c2_w[10],c3_w[10]]
      
      if losing_user.streak >= 0
      losing_user.streak = 0 - 1
      
      else
      losing_user.streak -= 1
      end
      
       w_s = JSON.parse(winning_user.stats)

       c1_w = JSON.parse(w_s[team[0]])
       c2_w = JSON.parse(w_s[team[1]])
       c3_w = JSON.parse(w_s[team[2]])
       
       puts "Array Length: #{c1_w.length}"
       
       old_we = [c1_w[6],c2_w[6],c3_w[6],c1_w[7],c2_w[7],c3_w[7],c1_w[8],c2_w[8],c3_w[8]]
       #stats [mn_s 0,mn_k 1,mn_d 2,extra_s 3,extra_k 4,extra_d 5,Level 6,Experience 7 ,points 8,points total 9]
       c1_w[7] += 50
       c2_w[7] += 50
       c3_w[7] += 50
       
       case c1_w[6]
       when 1
       if c1_w[7] >= 100
       c1_w[6] += 1
       c1_w[8] += 3
       c1_w[9] += 3
       c1_w[7] = 0
       end
       
       when 2
       if c1_w[7] >= 200
       c1_w[6] += 1
       c1_w[8] += 3
       c1_w[9] += 3
       c1_w[7] = 0
       end
       
       when 3
       if c1_w[7] >= 300
       c1_w[6] += 1
       c1_w[8] += 3
       c1_w[9] += 3
       c1_w[7] = 0
       end
       
       when 4
       if c1_w[7] >= 400
       c1_w[6] += 1
       c1_w[8] += 3
       c1_w[9] += 3
       c1_w[7] = 0
       end
       
       when 5
       if c1_w[7] >= 500
       c1_w[6] += 1
       c1_w[8] += 3
       c1_w[9] += 3
       c1_w[7] = 0
       end
       
       when 6
       if c1_w[7] >= 600
       c1_w[6] += 1
       c1_w[8] += 3
       c1_w[9] += 3
       c1_w[7] = 0
       end
       
       when 7
       if c1_w[7] >= 700
       c1_w[6] += 1
       c1_w[8] += 3
       c1_w[9] += 3
       c1_w[7] = 0
       end
       
       when 8
       if c1_w[7] >= 800
       c1_w[6] += 1
       c1_w[8] += 3
       c1_w[9] += 3
       c1_w[7] = 0
       end
       
       end
       
       case c2_w[6]
       when 1
       if c2_w[7] >= 100
       c2_w[6] += 1
       c2_w[8] += 3
       c2_w[9] += 3
       c2_w[7] = 0
       end
       
       when 2
       if c2_w[7] >= 200
       c2_w[6] += 1
       c2_w[8] += 3
       c2_w[9] += 3
       c2_w[7] = 0
       end
       
       when 3
       if c2_w[7] >= 300
       c2_w[6] += 1
       c2_w[8] += 3
       c2_w[9] += 3
       c2_w[7] = 0
       end
       
       when 4
       if c2_w[7] >= 400
       c2_w[6] += 1
       c2_w[8] += 3
       c2_w[9] += 3
       c2_w[7] = 0
       end
       
       when 5
       if c2_w[7] >= 500
       c2_w[6] += 1
       c2_w[8] += 3
       c2_w[9] += 3
       c2_w[7] = 0
       end
       
       when 6
       if c2_w[7] >= 600
       c2_w[6] += 1
       c2_w[8] += 3
       c2_w[9] += 3
       c2_w[7] = 0
       end
       
       when 7
       if c2_w[7] >= 700
       c2_w[6] += 1
       c2_w[8] += 3
       c2_w[9] += 3
       c2_w[7] = 0
       end
       
       when 8
       if c2_w[7] >= 800
       c2_w[6] += 1
       c2_w[8] += 3
       c2_w[9] += 3
       c2_w[7] = 0
       end
       
       end
       
       case c3_w[6]
       when 1
       if c3_w[7] >= 100
       c3_w[6] += 1
       c3_w[8] += 3
       c3_w[9] += 3
       c3_w[7] = 0
       end
       
       when 2
       if c3_w[7] >= 200
       c3_w[6] += 1
       c3_w[8] += 3
       c3_w[9] += 3
       c3_w[7] = 0
       end
       
       when 3
       if c3_w[7] >= 300
       c3_w[6] += 1
       c3_w[8] += 3
       c3_w[9] += 3
       c3_w[7] = 0
       end
       
       when 4
       if c3_w[7] >= 400
       c3_w[6] += 1
       c3_w[8] += 3
       c3_w[9] += 3
       c3_w[7] = 0
       end
       
       when 5
       if c3_w[7] >= 500
       c3_w[6] += 1
       c3_w[8] += 3
       c3_w[9] += 3
       c3_w[7] = 0
       end
       
       when 6
       if c3_w[7] >= 600
       c3_w[6] += 1
       c3_w[8] += 3
       c3_w[9] += 3
       c3_w[7] = 0
       end
       
       when 7
       if c3_w[7] >= 700
       c3_w[6] += 1
       c3_w[8] += 3
       c3_w[9] += 3
       c3_w[7] = 0
       end
       
       when 8
       if c3_w[7] >= 800
       c3_w[6] += 1
       c3_w[8] += 3
       c3_w[9] += 3
       c3_w[7] = 0
       end
       
       end
       
       new_we = [c1_w[6],c2_w[6],c3_w[6],c1_w[7],c2_w[7],c3_w[7],c1_w[8],c2_w[8],c3_w[8]]
      
       w_s[team[0]] = c1_w.to_s
       w_s[team[1]] = c2_w.to_s
       w_s[team[2]] = c3_w.to_s
       losing_user.stats = (w_s.to_json).to_s
       losing_user.save
       return {"msg": "lose",:old => old_we.to_s, :new => new_we.to_s}
 #end?
  end
  
  def attack(player_id, attack_request)
    if player_id == @current_player
      if attack_request['m1'] != -1
       @players[@current_player].characters[@players[@current_player].characters.keys[attack_request['ofC1']]].skills(string_to_target(attack_request['target1']),attack_request['m1'],attack_request['ms1'])
      end
      if attack_request['m2'] != -1
       @players[@current_player].characters[@players[@current_player].characters.keys[attack_request['ofC2']]].skills(string_to_target(attack_request['target2']),attack_request['m2'],attack_request['ms2'])
      end
      if attack_request['m3'] != -1
       @players[@current_player].characters[@players[@current_player].characters.keys[attack_request['ofC3']]].skills(string_to_target(attack_request['target3']),attack_request['m3'],attack_request['ms3'])
      end
   
      puts "Didn't attack count:  #{attack_request['c']}"
      case attack_request['c'] 
      when 0
      when 1
      @players[@current_player].characters[@players[@current_player].characters.keys[0]].skills(false,true,0)   
      when 2
      @players[@current_player].characters[@players[@current_player].characters.keys[1]].skills(false,true,0)   
      when 3
      @players[@current_player].characters[@players[@current_player].characters.keys[0]].skills(false,true,0)   
      @players[@current_player].characters[@players[@current_player].characters.keys[1]].skills(false,true,0)   
      when 4
      @players[@current_player].characters[@players[@current_player].characters.keys[2]].skills(false,true,0)   
      when 5  
      @players[@current_player].characters[@players[@current_player].characters.keys[0]].skills(false,true,0)  
      @players[@current_player].characters[@players[@current_player].characters.keys[2]].skills(false,true,0)   
      when 6   
      @players[@current_player].characters[@players[@current_player].characters.keys[1]].skills(false,true,0)   
      @players[@current_player].characters[@players[@current_player].characters.keys[2]].skills(false,true,0)   
      when 7 
      @players[@current_player].characters[@players[@current_player].characters.keys[0]].skills(false,true,0)
      @players[@current_player].characters[@players[@current_player].characters.keys[1]].skills(false,true,0)   
      @players[@current_player].characters[@players[@current_player].characters.keys[2]].skills(false,true,0)     
      end
     
    else
      @players[player_id].notify({ :msg => "Not your turn..."}.to_json)
    end
    
    end_turn(@current_player)
  end
  
  def string_to_target(target)
    
    case target
      when 1
        return @players[@current_player].characters[@players[@current_player].characters.keys[0]]
      when 2
        return @players[@current_player].characters[@players[@current_player].characters.keys[1]]
      when 3
        return @players[@current_player].characters[@players[@current_player].characters.keys[2]]
      when 4
        return @players[@other_player].characters[@players[@other_player].characters.keys[0]]
      when 5
        return @players[@other_player].characters[@players[@other_player].characters.keys[1]]
      when 6
        return @players[@other_player].characters[@players[@other_player].characters.keys[2]]
      when 7
       eall = [@players[@other_player].characters[@players[@other_player].characters.keys[0]],@players[@other_player].characters[@players[@other_player].characters.keys[1]],@players[@other_player].characters[@players[@other_player].characters.keys[2]]]
      return eall
    end
  end
end

class GameController
  
  attr_accessor :free_players ,:games, :ladder
  
  def initialize
    @games = {}
    @free_players = {}
    @ladder = {}
    @private = {}
    @fun = {}
    @Ladder2 = {}
    @Ladder4 = {}
    @Ladder6 = {}
    @Ladder9 = {}


  end
  
  def add_player(player)
    puts "MY ID #{player.id}"
    partner = @ladder.fetch(@ladder.keys[0]) unless @ladder.empty?
    
    if @ladder.key?(player.id)
    puts "Found Yourself"    
        
    elsif partner.nil?
      unless @ladder.key?(player.id)
        @ladder[player.id] = player
        player.notify({ :msg => "Finding a match..."}.to_json)
      end
    else
      unless @games.has_key?(player.id) && @games.has_key?(partner.id)
        partner.notify({ :msg => "Found match!"}.to_json)
        player.notify({ :msg => "Found match!"}.to_json)
      end
      pair_up(player,partner)
    end
  end
  
  def game_exist(player)
  puts @players
  end
  
  
  def pair_up(player,partner)
    puts "Player #{player} and Partner #{partner}"
    @ladder.delete(partner.id)
    @ladder.delete(player.id)

    g = GameModel.create
    y = User.get(player.id) 
    o = User.get(partner.id) 
    
    puts y.id
    
    y.last_page_name = "Ladder: #{y.username} vs #{o.username}"
    y.last_page_link = "/arena"
    y.last_game = g.id
    
    o.last_page_name = "Ladder: #{o.username} vs #{y.username}"
    o.last_page_link = "/arena"
    o.last_game = g.id
    y.save
    o.save
    game = Game.new(g.id, player,partner, self)
    @games[game.id] = game
    puts "Game ID:  #{@games[game.id].id}"
  end
  
  def end_game(game_id, players)
    @games.delete(game_id)
    g = GameModel.first(:id => game_id)
    g.update(:ended => true)
    players.each do |id, player|
      @ladder.delete(player.id)
    end
  end
end

class Character
  attr_accessor :health, :energy, :stunned, :block, :controlling_player, :cooldown,:strength,:kai,:defense,:transformation,:current_defense,:effect, :skillhold, :max,:experience,:counter,:effecting 
  
  def initialize(controlling_player,s,stats)
    @health = 300
    @energy = 100
    @max = [300,100]
    @stunned = [0,0,0]
    @counter = [0,0,0,0,0,0,0]
    @block = [0,0,0,0]
    @cooldown = [0,0,0,0]
    @controlling_player = controlling_player
    @strength = stats[0]
    @kai = stats[1]
    @defense = stats[2]
    @current_defense = stats[2]
    @skillhold = s
    @transformation = [s[4],0,false,0,0,0,false,0]
    @effect = []
    @effecting = []
    @experience = [stats[7],stats[6]]
    
    #effecting = [1,2,3][turn,who,effect]
    #transformation = [name 0,energy 1,t/f In use 2,strength 3,kai 4,defense 5,show pic? 6,spot7]
    #block = [strength,kai,all,friendly,power-down]
    #counter = [y_strength,y_kai,y_all,o_strength,o_kai,o_all,reflect]
    #stunned = [strength,kai,all]
    #stats [mn_hp 0,mn_ep 1,mn_s 2,mn_k 3,mn_d 4,extra_s 5,extra_k 6,extra_d 7,Level 8,Experience 9 ,points 10,points total 11]
  end
  
  def next_turn
  self.current_defense = self.defense
x = 0

while (x < 4)
    if cooldown[x] > 0
    cooldown[x] -= 1
    end
x += 1
end


 if transformation[2]
       if self.energy > transformation[1] 
       self.energy -= transformation[1]
      
     else
      transformation[1] = 0
      transformation[2] = false
      strength -= transformation[3] 
      kai -= transformation[4]
      defense -= transformation[5]
      transformation[3] = 0
      transformation[4] = 0
      transformation[5] = 0
      effect.delete(c1.transformation[0])
       end
 end

x = 0
      while 3 > x
      if block[x] > 0
      block[x] -= 1 
      end
      if block[x] > 0
      block[x] -= 1 
      end
      if block[x] > 0
      block[x] -= 1 
      end
      x += 1
      end
     
      if stunned[0] > 0
      stunned[0] -= 1
      end
      
      if stunned[1] > 0
      stunned[1] -= 1
      end
      
      if stunned[2] > 0
      stunned[2] -= 1
      end

self.energy += 20
     if self.energy > max[1]
     self.energy = max[1]
     end
  end
  
  #counter = [y_strength,y_kai,y_all,o_strength,o_kai,o_all,reflect]
  def s_damage(player, damage)
    amount = 1
    if player.block[0] == 0 && player.block[2] == 0 && player.counter[0] == 0 &&  player.counter[2] == 0 && counter[3] == 0 && counter[5] == 0
      amount = player.current_defense - damage - strength 
      puts "Damage: #{amount}"
    end
    if amount  < 0
       player.current_defense = 0
       player.health += amount
    end
    if  0 > player.health 
    player.health = 0
    end
  end
  
  def k_damage(player, damage)
    amount = 1
    if player.block[0] == 0 && player.block[2] == 0 && player.counter[1] == 0 &&  player.counter[2] == 0 && counter[4] == 0 && counter[5] == 0
      amount = player.current_defense - damage - kai 
    end
   
    if amount  < 0
       player.current_defense = 0
       player.health += amount
    end
    
     if  0 > player.health 
    player.health = 0
     end
  end
  
   def a_k_damage(player,damage)
       amount = [1,1,1]
   if player[0].block[0] == 0 && player[0].block[2] == 0 && player[0].counter[1] == 0 &&  player[0].counter[2] == 0 && counter[4] == 0 && counter[5] == 0
      amount[0] = player[0].current_defense - damage - kai 
   if amount[0]  < 0
       player[0].current_defense = 0
       player[0].health += amount[0]
   end
   if  0 > player[0].health 
    player[0].health = 0
   end  
   end
   
   if player[1].block[0] == 0 && player[1].block[2] == 0 && player[1].counter[1] == 0 &&  player[1].counter[2] == 0 && counter[4] == 0 && counter[5] == 0
      amount[1] = player[1].current_defense - damage - kai 
   if amount[1]  < 0
       player[1].current_defense = 0
       player[1].health += amount[1]
   end
   if  0 > player[1].health 
    player[1].health = 0
   end
   end
   
   if player[2].block[0] == 0 && player[2].block[2] == 0 && player[2].counter[1] == 0 &&  player[2].counter[2] == 0 && counter[4] == 0 && counter[5] == 0
      amount[2] = player[2].current_defense - damage - kai 
   if amount[2]  < 0
       player[2].current_defense = 0
       player[2].health += amount[2]
   end
   if  0 > player[2].health 
    player[2].health = 0
   end
   end
   
   end
  
  def p_s_damage(player,damage)
      
    if player.block[0] == 0 && player.block[2] == 0 && player.counter[3] == 0 &&  player.counter[5] == 0 && counter[0] == 0 && counter[2] == 0
      player.health = player.health - damage - strength
    end
  
     if  0 > player.health 
    player.health = 0
     end
  end
  
  def p_k_damage(player, damage)
    if player.block[0] == 0 && player.block[2] == 0 && player.counter[4] == 0 &&  player.counter[5] == 0 && counter[1] == 0 && counter[2] == 0
      player.health = player.health - damage - kai
    end
    
     if  0 > player.health 
    player.health = 0
     end
  end
  
  def s_k_damage(player, damage)
    amount = 1
    if player.block[0] == 0 && player.block[1] == 0 && player.block[2] == 0 && player.counter[3] == 0 &&  player.counter[4] == 0 && player.counter[5] == 0 && counter[0] == 0 && counter[1] == 0 && counter[2] == 0
      amount = player.current_defense - damage[0] - damage[1] - strength - kai
    end
   
    if amount < 0
       player.current_defense = 0
       player.health += amount
    end
    
    if 0 > player.health 
    player.health = 0
    end
  end
  
  def k_heal(player, health)
    if player.health > 0
      player.health = player.health + (damage + kai) 
    end
    if player.health > 100
      player.health = 100
    end
  end
  
  def d_heal(player, h)
    if player.health > 0
      player.health = player.health + (h + player.defense) 
    end
    if player.health > 100
      player.health = 100
    end
  end
  
  def bpeffect(player,amount)
  player.controlling_player.bp += amount
  end
  
  def skill_turns(player,turn,skill_id,name,type)
    case type
    when 1
    if player.block[0] == 0 && player.block[2] == 0 && player.counter[0] == 0 &&  player.counter[2] == 0 && counter[3] == 0 && counter[5] == 0 && player.health > 0
   
    self.effecting.push(turn)
    self.effecting.push(player)
    self.effecting.push(skill_id)
    player.effect.push(name)
    end    
    when 2
    if player.block[1] == 0 && player.block[2] == 0 && player.counter[1] == 0 &&  player.counter[2] == 0 && counter[4] == 0 && counter[5] == 0 && player.health > 0
   
    self.effecting.push(turn)
    self.effecting.push(player)
    self.effecting.push(skill_id)
    player.effect.push(name)
    end
    when 3
    self.effecting.push(turn)
    self.effecting.push(player)
    self.effecting.push(skill_id)
    player.effect.push(name) 
    puts name
    when 4
        
    when 5 
    
    end
      #effecting = [1,2,3][turn,who,effect,slot]
  end
  
  def e_control(player,energy)
  player.energy += energy
  end
  
  def power_down(player, amount)
  player.strength = player.strength - amount[0]
  player.kai = player.kai - amount[1]
  player.defense = player.defense - amount[2] 
  end
  
  def power_up(player,amount)
  player.strength = player.strength + amount[0]
  player.kai = player.kai + amount[1]
  player.defense = player.defense + amount[2] 
  end
  
  def stun(player,turn)
    if !player.block[5]
      player.stunned[0] = turn[0]
      player.stunned[1] = turn[1]
      player.stunned[2] = turn[2]
    end
  end
  
  def countering(player,turn,type,ally,show,name,eturn)
      if ally
      player.counter[0] = turn[0]
      player.counter[1] = turn[1]
      player.counter[2] = turn[2]
      elsif type == 1 && player.block[0] == 0 && player.block[2] == 0
      player.counter[3] = turn
      elsif type == 2 && player.block[1] == 0 && player.block[2] == 0
      player.counter[4] = turn
      elsif type == 3 && player.block[2] == 0
      player.counter[5] = turn
      else
      puts "Counter Fail"
      end
      puts "Counter Player: #{player.counter}"
      
      if show
      player.effect.push(name)
      end
      #type = [strength, kai,]
      
  end
  
  def transform(energy,name,s,k,d)
    if !transformation[2] 
      transformation[1] = energy
      transformation[2] = true
      transformation[3] += s 
      transformation[4] += k 
      transformation[5] += d
      self.kai += k
      self.strength += s 
      self.defense += d
      self.effect.push(name)
     
    #transformation = [name 0,energy 1,t/f In use 2,strength 3,kai 4,defense 5,show pic? 6,spot7]
  else
    transformation[1] = 0
      transformation[2] = false
      self.kai -= k
      self.strength -= s 
      self.defense -= d
      transformation[3] = 0
      transformation[4] = 0
      transformation[5] = 0
      effect.delete(name)
    end
  end
  #transformation = [name,energy,t/f In use,strength,kai,defense]
  def blocks(player,turns,type,sturns,name)
    case type
when 1
  player.block[0] = turns
when 2
  player.block[1] = turns
when 3
  player.block[2] = turns
    end
  player.effect.push(name)
  end
   
  def check(bp,e,moveslot,cd)
    if controlling_player.bp >= bp && energy >= e && cooldown[moveslot] == 0
    controlling_player.bp -= bp
    self.energy -= e
    cooldown[moveslot] = cd
    return true
  else
    return false
    end
  end
end

class Goku < Character
  @last_used_skill_a = nil
  @last_used_skill_b = nil
  @last_used_skill_c = nil
  
  #transform(player,energy,name,s,k,d)
  def skills(player,move,skill)
    if move.is_a?(String)
      t = move
      move = true;
    else
    t = true
    end
    
    puts "Gz Energy: #{energy}"
    case move

when true
    case t
    when true
    
    when "ge-t"
    transform(10,"ge-t",5,5,5)  
    when "zGu-t1"
    transform(15,"zGu-t1",8,8,8)  
    end
when 1
  if check(2,20,skill,3)
  power_up(player, [0,0,5])
  end
when 2
  if check(1,20,skill,2)
  blocks(player, 2, 2,2,"g2")
  end
when 3
  if check(1,20,skill,0)
      damage = [10,10]
      s_k_damage(player,damage)
  end
when 4
  if check(2,20,skill,4)
    blocks(player, 2, 3,2,"g4")
  end
when 5
  if check(2,5,skill,4)
    power_down(player,[5,0,5])
    skill_turns(player,3,5,"g5",1)
  end
when 6
  if check(1,10,skill,0)
    s_damage(player,10)
  end
when 7
  if check(1,20,skill,2)
    blocks(player, 2, 1,2,"g7")
  end
when 8
  if check(1,10,skill,0)
    k_damage(player,10)
  end
when 9
  if check(2,20,skill,2)
  a_k_damage(player,5)
  end
when 20
if check(1,20,skill,2)
  s_damage(player,10)
  power_down(player, [0,0,0])
end
when 21
if check(1,20,skill,2)
  k_damage(player,25)
  stun(player,[0,0,1])
end
when 22
if check(1,20,skill,2)
  k_damage(player,20)
end
else
  puts "No Move"
    end
len = effecting.length 
stop = false;
c = 0
while(c < len)
puts "e = #{effecting[c]} #{effecting[c+2]} #{effecting[c+3]}"
case effecting[c+2]

when 5
m = "g5"
if effecting[c] == 1
power_up(effecting[c+1],[5,0,5])
end

end #Case end
effecting[c] -= 1
if(effecting[c] == 0 || stop)
puts "Zero?"
n = effecting[c+1].effect.index(m)
effecting[c+1].effect.delete_at(n)
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
len -= 3
else
c += 3  
puts "c = #{c}"
end # If end

end #While
    next_turn
  end
end

class KidGohan < Character
  @last_used_skill_a = nil
  @last_used_skill_b = nil
  @last_used_skill_c = nil
  
  def skills(player,move,skill)
   
    if move.is_a?(String)
      t = move
      move = true;
    else
     
    end
    puts "Current Move KG: #{move}"
    case move

when true
    case t
    when "ge-t"
      puts "ge-t"
     transform(10,"ge-t",5,5,5)   
    when "zKG-t1"
      puts "zKG-t1"
     transform(15,"zKG-t1",8,8,8)   
    end
    
when 1
  if check(2,20,skill,3)
  power_up(player, [0,0,5])
  end
when 2
  if check(1,20,skill,2)
  blocks(player, 2, 2,2,"g2")
  end
when 3
  if check(1,20,skill,0)
      damage = [10,10]
      s_k_damage(player,damage)
  end
when 4
  if check(2,20,skill,4)
    blocks(player, 2, 3,2,"g4")
  end
when 5
  if check(2,5,skill,4)
    power_down(player,[5,0,5])
    skill_turns(player,3,5,"g5",1)
  end
when 6
  if check(1,10,skill,0)
    s_damage(player,10)
  end
when 7
  if check(1,20,skill,2)
    blocks(player, 2, 1,2,"g7")
  end
when 8
  if check(1,10,skill,0)
    k_damage(player,10)
  end
when 9
  if check(2,20,skill,2)
  a_k_damage(player,5)
  end
when 20
  if check(1,20,skill,2)
    skill_turns(player,2,20,"zKG1",3)
  end
when 21
  if check(1,20,skill,2)
    k_damage(player,15)
  end
when 22
  if check(1,20,skill,2)
    s_damage(player,20)
    power_down(self, [0,0,5])
    skill_turns(self,2,22,"zKG3",3)
  end

else
 
    end
    
    len = effecting.length 
stop = false;
c = 0
while(c < len)
puts "e = #{effecting[c]} #{effecting[c+2]} #{effecting[c+3]}"
case effecting[c+2]
when 5
m = "g5"
if effecting[c] == 1
power_up(effecting[c+1],[5,0,5])
puts "KG YES!"
end
when 20
m = "zKG1"
bpeffect(effecting[c+1],1)
when 22
m = "zKG3"
if (effecting[c] == 1)
power_up(effecting[c+1],[0,0,5])
end

end #Case end
effecting[c] -= 1
if(effecting[c] == 0 || stop)
puts "Zero?"
n = effecting[c+1].effect.index(m)
puts "N : #{n}"
effecting[c+1].effect.delete_at(n)
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
len -= 3
else
c += 3  
puts "c = #{c}"
end # If end

end #While
    next_turn
  end
  
end

class Piccolo < Character
  @last_used_skill_a = nil
  @last_used_skill_b = nil
  @last_used_skill_c = nil
  
  def skills(player,move,skill)
    
    if move.is_a?(String)
      t = move
      move = true;
    else
    t = true
    end
    
    case move

when true
    case t
    when true
        
    when "ge-t"
      puts "Working?"
     transform(10,"ge-t",5,5,5)  
    when "zPo-t1"
     transform(10,"zPo-t1",8,8,8)  
    end
when 1
  if check(2,20,skill,3)
  power_up(player, [0,0,5])
  end
when 2
  if check(1,20,skill,2)
  blocks(player, 2, 2,2,"g2")
  end
when 3
  if check(1,20,skill,0)
      damage = [10,10]
      s_k_damage(player,damage)
  end
when 4
  if check(2,20,skill,4)
    blocks(player, 2, 3,2,"g4")
  end
when 5
  if check(2,5,skill,4)
    power_down(player,[5,0,5])
    skill_turns(player,3,5,"g5",1)
  end
when 6
  if check(1,10,skill,0)
    s_damage(player,10)
  end
when 7
  if check(1,20,skill,2)
    blocks(player, 2, 1,2,"g7")
  end
when 8
  if check(1,10,skill,0)
    k_damage(player,10)
  end
when 9
  if check(2,20,skill,2)
  a_k_damage(player,5)
  end

when 20
  if check(1,0,skill,2)
    power_up(player,[0.2,0,0])
    e_control(player,20)
  end
when 21
  if check(1,20,skill,2)
    k_damage(player,20)
    power_down(player,[0,0,0.1])
  end
when 22
  if check(1,20,skill,2)
   power_up(player,[0,0,0.4]) 
   power_down(player,[0,0,0.2]) 
  end
else
  
    end
    len = effecting.length 
stop = false;
c = 0
while(c < len)
puts "e = #{effecting[c]} #{effecting[c+2]} #{effecting[c+3]}"
case effecting[c+2]

when 5
m = "g5"
if effecting[c] == 1
power_up(effecting[c+1],[5,0,5])
end

end #Case end
effecting[c] -= 1
if(effecting[c] == 0 || stop)
puts "Zero?"
n = effecting[c+1].effect.index(m)
effecting[c+1].effect.delete_at(n)
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
len -= 3
else
c += 3  
puts "c = #{c}"
end # If end

end #While
    next_turn
  end
  
end

class Krillin < Character
  @last_used_skill_a = nil
  @last_used_skill_b = nil
  @last_used_skill_c = nil
  
  def skills(player,move,skill)
    
    if move.is_a?(String)
      t = move
      move = true;
    else
    t = true
    end
    
    puts "Current Move Pi: #{move}"
    case move

when true
    case t
    when true
    when "ge-t"
      puts "Working?"
     transform(10,"ge-t",5,5,5)  
    when "zPo-t1"
     transform(10,"zPo-t1",0.5,0.7,0.3)  
    end
when 1
  if check(2,20,skill,3)
  power_up(player, [0,0,5])
  end
when 2
  if check(1,20,skill,2)
  blocks(player, 2, 2,2,"g2")
  end
when 3
  if check(1,20,skill,0)
      damage = [10,10]
      s_k_damage(player,damage)
  end
when 4
  if check(2,20,skill,4)
    blocks(player, 2, 3,2,"g4")
  end
when 5
  if check(2,5,skill,4)
    power_down(player,[5,0,5])
    skill_turns(player,3,5,"g5",1)
  end
when 6
  if check(1,10,skill,0)
    s_damage(player,10)
  end
when 7
  if check(1,20,skill,2)
    blocks(player, 2, 1,2,"g7")
  end
when 8
  if check(1,10,skill,0)
    k_damage(player,10)
  end
when 9
  if check(2,20,skill,2)
  a_k_damage(player,5)
  end
when 20
  if check(1,0,skill,2)
    countering(player,1,3,false,true,"zKn1",1)
  end
when 21
  if check(1,20,skill,2)
    p_k_damage(player,15)
  end
when 22
  if check(1,20,skill,2)
  a_k_damage(player,10)
  end
else
  puts "No Move"
    end
    
len = effecting.length 
stop = false;
c = 0
while(c < len)
puts "e = #{effecting[c]} #{effecting[c+2]} #{effecting[c+3]}"
case effecting[c+2]

when 5
m = "g5"
if effecting[c] == 1
power_up(effecting[c+1],[5,0,5])
end

end #Case end
effecting[c] -= 1
if(effecting[c] == 0 || stop)
puts "Zero?"
n = effecting[c+1].effect.index(m)
effecting[c+1].effect.delete_at(n)
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
len -= 3
else
c += 3  
puts "c = #{c}"
end # If end

end #While
    next_turn
  end
  
end

class Yamcha < Character
  @last_used_skill_a = nil
  @last_used_skill_b = nil
  @last_used_skill_c = nil
  
  def skills(player,move,skill)
    puts " Back in skills?"
    if move.is_a?(String)
      t = move
      move = true;
    else
    t = true
    end
    
    puts "Current Move Pi: #{move}"
    case move

when true
    case t
    when true
    when "ge-t"
      puts "Working?"
     transform(10,"ge-t",5,5,5)  
    when "zPo-t1"
     transform(10,"zPo-t1",5,5,5)  
    end
    
when 1
  if check(2,20,skill,3)
  power_up(player, [0,0,5])
  end
when 2
  if check(1,20,skill,2)
  blocks(player, 2, 2,2,"g2")
  end
when 3
  if check(1,20,skill,0)
      damage = [10,10]
      s_k_damage(player,damage)
  end
when 4
  if check(2,20,skill,4)
    blocks(player, 2, 3,2,"g4")
  end
when 5
  if check(2,5,skill,4)
    power_down(player,[5,0,5])
    skill_turns(player,3,5,"g5",1)
  end
when 6
  if check(1,10,skill,0)
    s_damage(player,10)
  end
when 7
  if check(1,20,skill,2)
    blocks(player, 2, 1,2,"g7")
  end
when 8
  if check(1,10,skill,0)
    k_damage(player,10)
  end
when 9
  if check(2,20,skill,2)
  a_k_damage(player,5)
  end
when 20
  if check(1,30,skill,4)
  skill_turns(player,3,20,"zYa1",1)
  end
when 21
  if check(1,20,skill,2)
    power_down(player,[0,0,5])
    skill_turns(player,2,21,"zYa2",1)
    stun(player,[0,0,1])
  end
when 22
  if check(1,30,skill,4)
   skill_turns(player,3,22,"zYa3",2)
  end
else
  puts "No Move"
end
    
len = effecting.length 
stop = false;
c = 0
while(c < len)
puts "e = #{effecting[c]} #{effecting[c+2]} #{effecting[c+3]}"
case effecting[c+2]

when 5
m = "g5"
if effecting[c] == 1
power_up(effecting[c+1],[5,0,5])
end

when 20
m = "zYa1"
if block[2] == 0
s_damage(effecting[c+1],10)
else
stop = true;
end

when 21
m = "zYa2"
if effecting[c] == 1
power_up(effecting[c+1],[0,0,5])
end

when 22
m = "zYa3"
if (block[2] == 0)
k_damage(effecting[c+1],10) 
else
stop = true;
end

end #Case end
effecting[c] -= 1
if(effecting[c] == 0 || stop)
puts "Zero?"
n = effecting[c+1].effect.index(m)
effecting[c+1].effect.delete_at(n)
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
len -= 3
else
c += 3  
puts "c = #{c}"
end # If end

end #While

next_turn
  end  # Skills

#effecting = [1,2,3][turn,who,effect]
end #class



