require_relative "game"

class BudokaiArena < Sinatra::Application
 
  get '/arena' do
    

    if !request.websocket? 
      
      
      @user = User.get(session[:id])   
      
      if !@user
      redirect "/"
      end
      
      if @user.banned
      redirect '/logout'
      end
      
      
      @Online = User.all(:limit => 30, :game_visit.gt => 30.minutes.ago)
    
       @user.last_page_name = "Currently In-Game Main Menu"
          @user.game_visit = DateTime.now
          @user.last_page_link = "/arena"
          @user.save

       puts "No Websocket"
      erb :arena,:layout => :layout2
     
    else
     puts "Websocket Connection"
     
     
       
       def getQuest(quest,info,questArray)
       case quest
       
       when 1
       return [0]  
       when 2
       return [0,0,0]  
       when 3
       return [0,0,0,0,0]
       when 4
       return [0,0,0,0]   
       when 5
       return [0,0,0] 
       when 6
       return [0,0,0]  
       when 7
       return [0,0,0,0,0]  
       when 8
       return [0,0,0,0]
       when 9
       return [0,0,0,0,0]   
       when 10
       return [0,0,0,0,0] 
       when 11
       return [0,0,0,0]  
       when 12
       return [0,0,0,0]  
       when 13
       return [0,0,0,0]
       when 14
       return [0,0,0,0]   
       when 15
       return [0,0,0,0,0] 
       end
       end
       
       
      request.websocket do |ws|
        ws.onopen do
          content_type :json  
          
          u = User.get(session[:id])  
          if session?
          ws.send({:msg => "start", :player_id => u.id.to_s, :username => u.username.to_s, :rank => u.rank.to_s , :wins => u.wins.to_s, :losses => u.losses.to_s, :streak => u.streak.to_s, :team => u.team.to_s, :skill => u.skill.to_s, :clan => u.clan.to_s, :avater => u.avater.to_s,:uc => u.unlockcharacters.to_s,:us => u.unlockskills.to_s,:stats => u.stats,:money => u.money, :quest => u.quest, :items => u.items}.to_json)
          else
          ws.send({:msg => "reconnect"}.to_json)
          end
         
          settings.sockets << ws
        end
        ws.onmessage do |req|
          
         puts "REQUEST FROM CLIENT #{req}"
          u = User.first(:username => session[:username])
          r = JSON.parse(req)
          case r['action']
          when 'reconnect'
          if session?
          puts "I'm a Hacker"
          else
          u = User.get(r['previous'].to_i)
          session_start! 
          session[:username] = u.username
          session[:id] = u.id
          ws.send({:msg => "start", :player_id => u.id.to_s, :username => u.username.to_s, :rank => u.rank.to_s , :wins => u.wins.to_s, :losses => u.losses.to_s, :streak => u.streak.to_s, :team => u.team.to_s, :skill => u.skill.to_s, :clan => u.clan.to_s, :avater => u.avater.to_s,:uc => u.unlockcharacters.to_s,:us => u.unlockskills.to_s,:stats => u.stats,:money => u.money, :quest => u.quest, :items => u.items}.to_json)
          end
          
          when 'new_ladder'
            team = JSON.parse(u.team)
            s = JSON.parse(u.skill)
            stats = JSON.parse(u.stats)
            item = JSON.parse(u.items)
            
            if @@game_controller.games.key?(u.last_game)
            @@game_controller.game_exist(u.last_game,u.id,ws)
            else
            player = Player.new(u.id, ws, team,s,stats,item,"Ladder")
            @@game_controller.add_player(player)  
            end
            
          when 'cancel_ladder'
            if @@game_controller.ladder[session[:id] ] 
              @@game_controller.ladder.delete(session[:id] )
            end
          when 'cancel_private'
            if @@game_controller.private_games[session[:username] ] 
              @@game_controller.private_games.delete(session[:username] )
            end
          when 'cancel_society'
            p = u.planet
            planet = p.main_planet.downcase
            name = p.name.downcase
            
            if planet == "human"
            puts "Hello"
            if @@game_controller.human[name]
            puts "Working"
            len = @@game_controller.human[name].length
            for i in 0..len do
            if @@game_controller.human[name][i].id == u.id
            @@game_controller.human[name].delete_at(i)
            break
            end
            end
            
            end
            elsif planet == "cold"
            
            end
    
          when 'surrender'
            if @@game_controller.games[r['game_id'].to_i]
              @@game_controller.games[r['game_id'].to_i].surrender(session[:id] )
            end
          when 'attack'
            if @@game_controller.games[r['game_id'].to_i]
              @@game_controller.games[r['game_id'].to_i].attack(session[:id] , r)
            end
          when 'end_turn'
            if @@game_controller.games[r['game_id'].to_i]
              @@game_controller.games[r['game_id'].to_i].end_turn(session[:id] )
            end
          when 'chat'
          u = User.first(:username => session[:username]) 
          @@game_controller.sendMessage(u.username,u.avater,r['message'],u.id,ws)
         
          when 'private'
            team = JSON.parse(u.team)
            s = JSON.parse(u.skill)
            stats = JSON.parse(u.stats)
            item = JSON.parse(u.items)
            
            if @@game_controller.games.key?(u.last_game)
            
            @@game_controller.game_exist(u.last_game,u.id,ws)
            else
            player = Player.new(u.id, ws, team,s,stats,item,"Private")
            @@game_controller.private_add_player(player,u.username.downcase ,r['target'].downcase )  
            end
          when 'society'
            team = JSON.parse(u.team)
            s = JSON.parse(u.skill)
            stats = JSON.parse(u.stats)
            item = JSON.parse(u.items)
            
            if u.members.first.planet.main_planet == r['target']
            action = "Defend"
        else
            action = "Attack"
            end
            
            if @@game_controller.games.key?(u.last_game)
            @@game_controller.game_exist(u.last_game,u.id,ws)
            else
            player = Player.new(u.id, ws, team,s,stats,item,"Society")
            if action == "Defend"
            @@game_controller.society_defend(action,u.clan.downcase ,r['target'].downcase,player)  
        else
            @@game_controller.society_attack(action,u.clan.name.downcase ,r['target'].downcase,player,r['society'])  
            end
            end

          when 'shop'
          u = User.first(:username => session[:username]) 
          Shop_Packs.new(r["type"].to_i,r["id"].to_i,ws,u,r["roll"])
          
          when 'characters'
          u = User.first(:username => session[:username])
          check_c = JSON.parse(u.unlockcharacters)
          check_s = JSON.parse(u.unlockskills)
          check_cs = JSON.parse(u.skill)
          check_c.to_s
          
          newteam = JSON.parse(r['team'])
          team = JSON.parse(r['team'])
    
          m1 = r['m1']
          m2 = r['m2']
          m3 = r['m3']
          
          report = ""
          a = check_s
          z = { "s1" => r['m1'], "s2" => r['m2'], "s3" => r['m3']}
          
          
          w = 0
          if team.uniq.length != team.length
          report = "Characters: You have a duplicate of characters." 
          elsif !check_c.key?(team[0]) 
          report = "Characters: You haven't unlocked your first character." 
          elsif !check_c.key?(team[1]) 
          report = "Characters: You haven't unlocked your second character." 
          elsif !check_c.key?(team[2]) 
          report = "Characters: You haven't unlocked your third character." 
          else
          report = "Characters: All characters meet the needed requirements and have been unlocked."
          w += 1
          end
       
          if m1.uniq.length != m1.length
          report = report + " \n\n Character 1 Moves: You have a duplicate of skills." 
          elsif !a.key?(m1[0])
          report = report + " \n\n Character 1 Moves: You haven't unlocked your first skill." 
          elsif !a.key?(m1[1])
          report = report + " \n\n Character 1 Moves: You haven't unlocked your second skill."    
          elsif !a.key?(m1[2])
          report = report + " \n\n Character 1 Moves: You haven't unlocked your third skill." 
          elsif !a.key?(m1[3])
          report = report + " \n\n Character 1 Moves: You haven't unlocked your fourth skill."  
          elsif !a.key?(m1[4]) && is_number?(m1[4]) == false
          report = report + " \n\n Character 1 Moves: You haven't unlocked your fifth skill." 
          else
          w += 1
          report = report + " \n\n Character 1 Moves: All skills meet the needed requirements and have been unlocked." 
          end
          
          if m2.uniq.length != m2.length
          report = report + " \n\n Character 2 Moves: You have a duplicate of skills." 
          elsif !a.key?(m2[0])
          report = report + " \n\n Character 2 Moves: You haven't unlocked your first skill." 
          elsif !a.key?(m2[1])
          report = report + " \n\n Character 2 Moves: You haven't unlocked your second skill."    
          elsif !a.key?(m2[2])
          report = report + " \n\n Character 2 Moves: You haven't unlocked your third skill." 
          elsif !a.key?(m2[3])
          report = report + " \n\n Character 2 Moves: You haven't unlocked your fourth skill."  
          elsif !a.key?(m2[4]) && is_number?(m2[4]) == false
          report = report + " \n\n Character 2 Moves: You haven't unlocked your fifth skill." 
          else
          w += 1
          report = report + " \n\n Character 2 Moves: All skills meet the needed requirements and have been unlocked." 
          end
          
          if m3.uniq.length != m3.length
          report = report + " \n\n Character 3 Moves: You have a duplicate of skills." 
          elsif !a.key?(m3[0])
          report = report + " \n\n Character 3 Moves: You haven't unlocked your first skill." 
          elsif !a.key?(m3[1])
          report = report + " \n\n Character 3 Moves: You haven't unlocked your second skill."    
          elsif !a.key?(m3[2])
          report = report + " \n\n Character 3 Moves: You haven't unlocked your third skill." 
          elsif !a.key?(m3[3])
          report = report + " \n\n Character 3 Moves: You haven't unlocked your fourth skill."  
          elsif !a.key?(m3[4]) && is_number?(m3[4]) == false
          report = report + " \n\n Character 3 Moves: You haven't unlocked your fifth skill." 
          else
          w += 1
          report = report + " \n\n Character 3 Moves: All skills meet the needed requirements and have been unlocked." 
          end
          
          if w == 4
          u.update(:team => newteam.to_s,:skill => z.to_json)
          report = report + " \n\n All Changes Have Been Saved!"
          else
          report = report + " \n\n Please try again with correct changes. If error continues please inform staff of bug."
          end
          ws.send({:msg => "save", :report => report.to_s, :team => newteam.to_s, :skill => z.to_json}.to_json)
          
          
          def is_number? string
           true if Float(string) rescue false
          end
          ws.send({:msg => "save", :report => report.to_s, :team => newteam.to_s, :skill => z.to_json}.to_json)
          
          when "chat"
          if @@game_controller.games[r['game_id'].to_i]
          @@game_controller.games[r['game_id'].to_i].chatmessage(session[:id] ,r['message'])
          end
          
          when "quest"
          u = User.first(:username => session[:username])
          a = JSON.parse(u.quest)
          
          def getQuest(rarity,characters)
          puts "Rarity: #{rarity}"
          d = Random.new
          type = d.rand(0...100)
          
          if type > 20
          t = "Victory"
          elsif type > 40
          t = "Row"
          elsif type > 60
          t = "Damage"
          elsif type > 80
          t = "Character"
          end
          
          
          if rarity <= 100
          d = Random.new
          d = d.rand(20...40)
          s = ["Victory",0,d,30000]
          elsif rarity <= 1901
          d = Random.new
          d = d.rand(8...16)
          s = ["Victory",0,d,8000]
          else
           d = Random.new
          d = d.rand(3...8)
          s = ["Victory",0,d,4000]
          end
          
          return s
          end
          
          puts "Quest"
          
          
          if a['complete'][0] 
          a['current'][0] = false
          a['complete'][0] = false
          user.money += a['conditions'][0][3]
          end
          
          if a['complete'][1] 
          a['current'][1] = false
          a['complete'][1] = false
          user.money += a['conditions'][1][3]
          end
          
          if a['complete'][2]
          a['current'][2] = false
          a['complete'][2] = false
          user.money += a['conditions'][2][3]
          end
          puts a['date']
          b = Time.parse(a['date']) 
          if a['current'][0] && a['current'][1] && a['current'][2]
          
          elsif b < 1440.minutes.ago
          puts "More than a day"
          a['date'] = Time.now.to_s
          r = Random.new
          nr = r.rand(0...10000)
          character = JSON.parse(u.unlockcharacters)
          c = getQuest(nr,character)
          
          if !a['current'][0] 
          a['current'][0] = true
          a['conditions'][0] = c
          
          elsif !a['current'][1] 
          a['current'][1] = true
          a['conditions'][1] = c
          
          elsif !a['current'][2]
          a['current'][2] = true
          a['conditions'][2] = c
          end
          
          puts a
          u.quest = a.to_json
          u.save
          
          end
          ws.send({:msg => "checkQuest", :report => report, :quest => u.quest}.to_json)
          
          
          when 'item'
          u = User.first(:username => session[:username])
          item = JSON.parse(u.items)
          report = ""
          member = ""
          i = r['c']
          puts i
          
          w = 0
          
          if item.key?(i)
          report = report + " \n\n Item Saved: No Errors" 
          w += 1
          else
          report = report + " \n\n Item Errors: You have not unlocked item." 
          end
          if w == 1
          puts item
          item['item'] = i
          u.update(:items => item.to_json)
          report = report + " \n\n All Changes Have Been Saved!"
          else
          report = report + " \n\n Please try again with correct changes. If error continues please inform staff of bug."
          end
          ws.send({:msg => "item", :report => report.to_s , :item => item}.to_json)
          
          when 'planetControls'
          type = r['type']
          report = ""
          if type == 1
          u = User.first(:username => session[:username])
          p = Planet.first(:name => u.clan)
  
          if !p
          report = "You have to be apart of a planet to abandon a planet."
          elsif u.username == p.owner
          report = "You have to transfer your ownership before you can leave planet. Or you can fold the planet."
          elsif u.clan == "none"
          report = "You have to be apart of a planet to abandon a planet."
      else
          p.members_count -= 1
          u.clan = "none"
          u.members.first(:planet => p).destroy
          u.save
          p.save
          end
          elsif type == 2
          u = User.first(:username => session[:username])
          invite = User.first(:username.like => r['user'])
          p = Planet.first(:name => u.clan)
          
          if u.position != "Commander" && u.position != "Captain"
          report = "You can't access because this action is only for Leaders or Co-Leaders."
          elsif !invite
          report = "User doesn't exist."
          #elsif invite.clan != "none" 
          #report = "User already apart of planet!"
          elsif !p
          report = "Planet doesn't exist."
          elsif invite.members.first(:planet => p)
          report = "This user already has a pending invite!"
      else
          m = Member.create(:user => invite, :planet => p, :status => "Pending", :id => invite.id )
          p.members << m
          invite.members << m
          
          if p.save && invite.save && m.save
          report = "Planet invite was successfully sent!"
          else
          report= "Planet invite wasn't successfully sent."
          end
          end
          elsif type == 3
          u = User.first(:username => session[:username])
          if u.position == "Commander" || u.position == "Captain"
          invite = User.first(:username => r['user'])
          if invite 
          report = invite
          end
          end
          
          elsif type == 4
          u = User.first(:username => session[:username])
          puts "Position: #{u.position}"
          if u.position == "Commander" || u.position == "Captain" || u.position == "Officer"
          a = r["rank"].to_i
          b = r["streak"].to_i
          c = r["average"].to_i
          invite = User.all(:rank.gte => a,:high_streak.gte => b,:average.gte => c )
          if invite 
          report = invite
          end
          end
          
          elsif type == 5
           u = User.first(:username => session[:username])
           @invites = u.members.all(:status => "Pending")
          elsif type == 6
          puts "accept"
          id = r['id'].to_i
          u = User.first(:username => session[:username])
          p = Planet.get(id)
          m = Member.first(:user => u, :planet => p)
          
          if !m && !p
              
          elsif u.clan == "none"
          m.status = "Joined"
          u.clan = p.name
          u.position = "Elite"
          p.members_count += 1
          if m.save && u.save && p.save
          u.members.all(:status => "Pending").destroy
          end
          
          else
          pl = Planet.first(:name => u.clan)
          pl.members_count -= 1
          u.members.all(:status => "Joined").destroy
          m.status = "Joined"
          u.clan = p.name
          u.position = "Elite"
          p.members_count += 1
          
          if m.save && u.save && p.save
          u.members.all(:status => "Pending").destroy
          report = "Success"
          end
          
          end
          
          elsif type == 7
           u = User.first(:username => session[:username])
           id = r['id'].to_i
           p = Planet.get(id)
           m = Member.first(:user => u, :planet => p)
  
           if m.destroy && u.save && p.save
           report = u.members.all
           end
           
          elsif type == 8
          u = User.first(:username => session[:username])
          if u.position == "Commander" || u.position == "Captain"
          u.planet.description = r['body'];
          u.planet.save
          report = u.planet.description
          end
          elsif type == 9
          u = User.first(:username => session[:username])
          k = User.first(:username => r['user'])
          p = Planet.first(:name => u.clan)
          if !k
          report = "Uer doesn't exist"
          elsif k.clan != u.clan
          report = "Not in the same society."
          elsif u.username == p.owner && k != u
          
          p.members_count -= 1
          k.clan = "none"
          k.members.first(:planet => p).destroy
          k.save
          p.save
          elsif u.position == "Commander" && k.position != "Commander"
          
          p.members_count -= 1
          k.clan = "none"
          k.members.first(:planet => p).destroy
          k.save
          p.save
          report = "#{k.username} has been kicked"
          elsif u.position == "Captain" && k.position != "Commander" && k.position != "Captain"
          
          p.members_count -= 1
          k.clan = "none"
          k.members.first(:planet => p).destroy
          k.save
          p.save
          report = "#{k.username} has been kicked"
          elsif u.position == "Captain" && k.position == "Elite"
        
          p.members_count -= 1
          k.clan = "none"
          k.members.first(:planet => p).destroy
          k.save
          p.save
          report = "#{k.username} has been kicked"
          end
          
          elsif type == 10
          u = User.first(:username => session[:username])
          k = User.first(:username => r['user'])
          p = Planet.first(:name => u.clan)
          role = r['role']
          if !k && !p
          report = "User doesn't exist."
          elsif k.clan != u.clan
          report = "Not in the same society."
          elsif role != "Commander" && role != "Captain" && role != "Officer" && role != "Elite" && role != "Owner"
          report = "Incorrect Role"
          elsif u.username == p.owner && u != k
          k.position = r['role']
          k.save
          elsif u.position == "Commander" && k.position != "Commander" 
          k.position = r['role']
          k.save
          report = "#{k.username} has been changed to #{k.position}."
          elsif u.position == "Captain" && k.position != "Commander" && k.position != "Captain"
          k.position = r['role']
          k.save
          report = "#{k.username} has been changed to #{k.position}."
          end
          elsif type == 11
          u = User.first(:username => session[:username])
          if u
          p = Planet.first(:name => u.clan)
          rq = JSON.parse(p.requirements)
          a = [r['rank'],r['streak'],r['average']]
          if a[0].is_a?(Numeric) && a[1].is_a?(Numeric) && a[2].is_a?(Numeric)
          p.requirements = a.to_s
          p.save
          end
          
          end
          elsif type == 12
          u = User.first(:username => session[:username])
          report = u.friends.all(:updated_at.gte => 30.minutes.ago)
          elsif type == 13
          if r['id'] == 1
          report = Planet.all(:main_planet => r['planet'],:rank.gte => r['rank'],:langauge => r['langauge'], :limit => 30)
          else
          puts r['user']
          name = r['user']
          report = Planet.all(:limit => 1,:conditions => [ "lower(name) = ?", name.downcase ])
       
          end
          
          elsif type == 14
          report = Planet.first(:name => r['name'])
          member = report.members.user
          elsif type == 15
          end
          ws.send({:msg => "planetControls", :report => report , :type => type , :clan => u.clan, :members => member}.to_json)
     
          when 'planetMenu'
          u = User.first(:username => session[:username])
          d = u.members.all(:status => "Pending").planet
          ws.send({:msg => "planetMenu", :report => u.planet, :members => u.planet.members.user, :request => d,:position => u.position}.to_json)  
          
          when 'planetCheck'
          a = r['clan']
          if a == 3
          p = Planet.all(:main_planet => "Human",:limit => 20)
          else
          p = Planet.all(:main_planet => "Cold",:limit => 20)
          end
          ws.send({:msg => "planetCheck", :report => p}.to_json) 
          
          when 'joinPlanet'
          u = User.first(:username => session[:username])
          a = r['info']
          type = r['type']
          if type == 1
          p = Planet.all(:invite => "Public",:main_planet => a,:limit => 20)
          if p
          ws.send({:msg => "joinPlanet", :report => 1 , :clan => p}.to_json)
          end
          elsif type == 2
          a.to_i
          
          if a.blank?
          break
          end
          puts "A is #{a}"
          p = Planet.get(a)
          
          if !p 
          puts "Failed 1"
      elsif  p.members_count != p.members_limit && p.invite != "Public" 
          puts "Failed 2"
          else
          p.members_count += 1
          u.clan = p.name
          u.position = "Elite"
          m = Member.create(:user => u, :planet => p, :status => "Joined", :id => u.id )

          p.members << m
          u.members << m
          end
          if p.save && u.save && m.save
          ws.send({:msg => "createPlanet", :report => 1 , :clan => u.clan}.to_json)
          end
          
          end
          
          when 'createPlanet'
           a = r['info']
           
           u = User.first(:username => session[:username])
          
           if u.money >= 10000 && u.clan == "none" 
           u.money -= 10000
           
           p = Planet.new
           u.clan = a[0].delete(' ')
           
           p.name = a[0].delete(' ')
           p.avater = a[1]
           p.invite = a[2]
           p.description = a[4]
           p.members_count += 1
           p.main_planet = a[5]
           p.owner = u.username
           u.position = "Commander"
           
           m = Member.create(:user => u, :planet => p, :status => "Joined", :id => u.id )
           
           p.members << m
           u.members << m
  
           if m.save && p.save && u.save 
           flash[:success] = "Planet was successfully made!"
           ws.send({:msg => "createPlanet", :report => 1 , :clan => u.clan}.to_json)
           else
           flash[:alert] = "Planet wasn't successfully made!"
           p.errors.each do |e|
           puts e
           flash[:error] = e
           end
           
           end

           elsif u.money < 10000
           puts "Fail2"
           
           else
           puts "Fail3"
         
           end
           
          
          when 'upgrade'
          u = User.first(:username => session[:username])
          c = r['c']
          check = c.length
         
          stats = JSON.parse(u.stats)
          info = stats[c]
          increase = r['s']
          
          if check <= 5 && increase.all? {|i| i.is_a? Integer } 
          total = increase[0] + increase[1] + increase[2] + increase[3]
          if info[6] >= total
        
          info[0] = info[0] + (increase[0] *2)
          info[1] = info[1] + (increase[1] *2) 
          info[2] = info[2] + (increase[2] *2) 
          info[3] += increase[3]
          info[6] -= total
          stats[c] = info
          u.stats = (stats.to_json).to_s
          u.game_visit = DateTime.now
          u.save
          else

          end
          ws.send({:msg => "upgrade", :character => c.to_s, :player_id => u.id.to_s, :username => u.username.to_s, :rank => u.rank.to_s , :wins => u.wins.to_s, :losses => u.losses.to_s, :streak => u.streak.to_s, :team => u.team.to_s, :skill => u.skill.to_s, :clan => u.clan.to_s, :avater => u.avater.to_s,:uc => u.unlockcharacters.to_s,:us => u.unlockskills.to_s,:stats => u.stats,:money => u.money, :quest => u.quest}.to_json)
          end
        
          
          end
           
  
          puts "Ladder PLAYERS: " + @@game_controller.ladder.keys.to_s
          puts "Private PLAYERS: " + @@game_controller.private_games.keys.to_s
          puts "Human PLAYERS: " + @@game_controller.human.keys.to_s
          puts "Cold PLAYERS: " + @@game_controller.cold.keys.to_s
          puts "GAMES: " + @@game_controller.games.keys.to_s
          
        
        ws.onclose do
          warn("websocket closed")
          settings.sockets.delete(ws)
        end
     #ws.onerror do |error|
    # puts "Received Error: #{error}"
       #end
      
       
       
     end
      end
    end
  end
  
end

class Shop_Packs
    def initialize(type,id,ws,u,roll)
    #Type: 1:Skill #2:Character #Item
    r = Random.new
    @nr = r.rand(0...100)
    @u = u
    @id = id
    @ws = ws
    
    if type == 1
    randomCharacter(id,roll)    
    elsif type == 2
    randomSkills(id,roll)
    elsif type == 3
    randomItems(id,roll)
else
    randomExtra(id,roll)
    end
    end
    
    def randomCharacter(id,roll)
          report = ""
          rare = 0
          a = 1
         
   if @u.money >= 4000 && roll == 1
   @u.money -= 4000
          d = JSON.parse(@u.unlockcharacters)
          s = JSON.parse(@u.stats)
          rare = getRarity(@nr)
          if @id == 2
          puts rare
          b = quest1characters(rare)
          
      else
          end
          puts b
    
          if !d.key?(b)
          d[b] = 1;
          @u.unlockcharacters = d.to_json
          s[b] = [0,0,0,0,1,0,0]
          @u.stats = s.to_json
      
          else
          d[b] += 1
          @u.unlockcharacters = d.to_json
          end
       
          @u.save
          @ws.send({:msg => "buy", :report => report.to_s, :rare => rare, :got => b.to_s ,:type => a, :money => @u.money, :unlockedskills => @u.unlockskills, :unlockedcharacters => @u.unlockcharacters,:extras => @u.extras, :items => @u.items }.to_json)
      elsif @u.money >= 16000 && roll == 2
       @u.money -= 16000
          d = JSON.parse(@u.unlockcharacters)
          s = JSON.parse(@u.stats)
          a = []
          i = 0
          r = Random.new
          rares = []
          while i < 5
          i += 1
          r = Random.new
          nr = r.rand(0...100)
          rare = getRarity(nr)
          if @id == 2
          b = quest1characters(rare)
          
      else
          end
          puts b
    
          if !d.key?(b)
          d[b] = 1;
          @u.unlockcharacters = d.to_json
          s[b] = [0,0,0,0,1,0,0]
          @u.stats = s.to_json
      
          else
          d[b] += 1
          @u.unlockcharacters = d.to_json
          end
       a.push(b);
       rares.push(rare)
    end
          @u.save
          @ws.send({:msg => "buy", :report => report.to_s, :rare => rares, :got => a.to_s ,:type => a, :money => @u.money, :unlockedskills => @u.unlockskills, :unlockedcharacters => @u.unlockcharacters,:extras => @u.extras, :items => @u.items }.to_json)
      
      
  else
          
          @ws.send({:msg => "buy", :report => report.to_s, :rare => rare, :got => b.to_s ,:type => a, :money => @u.money, :unlockedskills => @u.unlockskills, :unlockedcharacters => @u.unlockcharacters,:extras => @u.extras, :items => @u.items }.to_json)
      end
    end
    
    def randomSkills(id,roll)
          a = 2
           report = ""
          rare = 0
          a = 1
         
   if @u.money >= 3000 && roll == 1
   @u.money -= 3000
          d = JSON.parse(@u.unlockskills)
          rare = getRarity(@nr)
          if @id == 2
          puts rare
          b = quest1skills(rare)
          
      else
          end
          puts b
    
          if !d.key?(b)
          d[b] = 1;
          @u.unlockskills = d.to_json
      
          else
          d[b] += 1
          @u.unlockskills = d.to_json
          end
       
          @u.save
          @ws.send({:msg => "buy", :report => report.to_s, :rare => rare, :got => b.to_s ,:type => a, :money => @u.money, :unlockedskills => @u.unlockskills, :unlockedcharacters => @u.unlockcharacters,:extras => @u.extras, :items => @u.items }.to_json)
      elsif @u.money >= 12000 && roll == 2
       @u.money -= 12000
          d = JSON.parse(@u.unlockskills)
          a = []
          i = 0
          
          rares = []
          while i < 5
          i += 1
          r = Random.new
          nr = r.rand(0...100)
          rare = getRarity(nr)
          if @id == 2
          b = quest1skills(rare)
          
      else
          end
    
          if !d.key?(b)
          d[b] = 1;
          @u.unlockskills = d.to_json
      
          else
          d[b] += 1
          @u.unlockskills = d.to_json
          end
       a.push(b);
       rares.push(rare)
    end
          @u.save
          @ws.send({:msg => "buy", :report => report.to_s, :rare => rares.to_s, :got => a.to_s , :money => @u.money, :unlockedskills => @u.unlockskills, :unlockedcharacters => @u.unlockcharacters,:extras => @u.extras, :items => @u.items }.to_json)
      
      
  else
          
          @ws.send({:msg => "buy", :report => report.to_s, :rare => rare, :got => b.to_s , :money => @u.money, :unlockedskills => @u.unlockskills, :unlockedcharacters => @u.unlockcharacters,:extras => @u.extras, :items => @u.items }.to_json)
      end
    end
    
    def randomItems(id,roll)
    if @u.money >= 500 && roll == 1
          @u.money -= 500
          a = 3
          d = JSON.parse(@u.items)
          
          report = ""
          
          rare = getRarity(@nr)
          b = getItem(rare)
          if !d.key?(b)
          d[b] = 1;
          @u.items = d.to_json
      
          else
          d[b] += 1
          @u.items = d.to_json
          end
          @u.save
          @ws.send({:msg => "buy", :report => report.to_s, :rare => rare, :got => b.to_s ,:type => a, :money => @u.money, :unlockedskills => @u.unlockskills, :unlockedcharacters => @u.unlockcharacters,:extras => @u.extras, :items => @u.items }.to_json)
     elsif @u.money >= 2000 && roll == 2
       d = JSON.parse(@u.items)
          a = []
          i = 0
         
          rares = []
          while i < 5
          i += 1
          
          r = Random.new
          nr = r.rand(0...100)
          rare = getRarity(nr)
          
          
        
          b = getItem(rare)
          
          if !d.key?(b)
          d[b] = 1;
          @u.items = d.to_json
      
          else
          d[b] += 1
          @u.items = d.to_json
          end
       a.push(b);
       rares.push(rare)
   end
      @u.save
          @ws.send({:msg => "buy", :report => report.to_s, :rare => rares.to_s, :got => a.to_s ,:type => a, :money => @u.money, :unlockedskills => @u.unlockskills, :unlockedcharacters => @u.unlockcharacters,:extras => @u.extras, :items => @u.items }.to_json)
     
     end
     end
    
    def randomExtra(id)
    if u.money >= 4000
          d = JSON.parse(u.extras)
          u.money -= 5000
          rare = getRarity(nr)
          b = getItem4(rare)
          e = d.index(b)
       
          if e == nil
          d.push(b)
          u.extras = d.to_s

          end
      end
    end
    
     def quest1characters(rare)
       r = Random.new
       
       if rare == 1
       @nr = r.rand(1...6)
    
       case @nr
       when 1
       return "zSn"  
       when 2
       return "zGo"
       when 3
       return "zRe"
       when 4
       return "zCi"
       when 5
       return "zRi"
       when 6
       return "zSn"
       end
      
       elsif rare == 2
       @nr = r.rand(1...5)
       case @nr
       when 1
       return "zRz"
       when 2
       return "zNa"
       when 3
       return "zJe" 
       when 4
       return "zBr"
       when 5
       return "zRz"
       end
       
       else
    @nr = r.rand(1...4)
       case @nr
       when 1
       return "zSV"  
       when 2 
       return "zNl"
       when 3
       return "zGy"
       when 4
       return "zSV" 
       end
         
       end
       end
       
       def quest1skills(rare)
       r = Random.new
       
       if rare == 1
       @nr = r.rand(1...16)
       case @nr
       when 1
       return "100"  
       when 2
       return "101"
       when 3
       return "55"
       when 4
       return "56"
       when 5
       return "57"
       when 6
       return "49"  
       when 7
       return "70"
       when 8
       return "75"
       when 9
       return "97"
       when 10
       return "79"
       when 11
       return "85"
       when 12
       return "88"
       when 13
       return "91"
       when 14
       return "94"
       when 15
       return "95"
       when 16
       return "95"
       end
      
       elsif rare == 2
       @nr = r.rand(1...21)
       case @nr
       when 1
       return "wzSn-t1"
       when 2
       return "50"
       when 3
       return "51" 
       when 4
       return "71"
       when 5
       return "72" 
       when 6
       return "73"
       when 7
       return "74"
       when 8
       return "99"
       when 9
       return "81"
       when 10
       return "82"
       when 11
       return "83"
       when 12
       return "84"
       when 13
       return "86"
       when 14
       return "87"
       when 15
       return "89"
       when 16
       return "90"
       when 17
       return "92"
       when 18
       return "93"
       when 19
       return "96"
       when 20
       return "102"
       when 21
       return "102"
       end
       
       else
    @nr = r.rand(1...9)
       case @nr
       when 1
       return "wzRi-t1"  
       when 2 
       return "yzNa-t1"
       when 3
       return "bzSV-t1"
       when 4
       return "98"
       when 5
       return "80"
       when 6
       return "zPo-t1"
       when 7
       return "zGy-t1"
       when 8
       return "bwzKG-t2"
       when 9
       return "bwzKG-t2"
       end
         
       end
       end
       
      
       
       def getItem(rare)
       
       if rare == 1
       r = Random.new
       @nr = r.rand(1...8)
       return "c" + @nr.to_s
       elsif rare == 2
       r = Random.new
       @nr = r.rand(1...6)
       return "o" + @nr.to_s
       else
       r = Random.new
       @nr = r.rand(1...4)
       return "r" + @nr.to_s
       end
       end
       
       
       
       def getRarity(n)
       if n < 10
          return 3
          elsif n < 41
          return 2
          else
          return 1 
       end
       end


end

post '/arena/avater' do
content_type :json  
report = ""
u = User.first(:username => session[:username])
if u.position == "Commander" || u.position == "Captain"
unless params[:file] &&
           (tmpfile = params[:file][:tempfile]) &&
           (name = params[:file][:filename])
          end
          if File.size(tmpfile) > 51200
          report = "Your avater was to big. All avatars need to be under 50kb."
          else
          
          puts "What is the format: #{name}"
          directory = "public/symbol/check"
          new_file = "#{u.planet.id}.png"
          path = File.join(directory, new_file)
          File.open(path, "wb") { |f| f.write(tmpfile.read) }
     
          report = "Your avatar was uploaded!\n Please give the staff 24 hours to review it!"
      end
  end
{ :report => report}.to_json
end  


#rackup config.ru -p $PORT -o $IP