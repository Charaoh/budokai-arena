# frozen_string_literal: true

require_relative 'game'

# Main configuration for the arena route.
class BudokaiArena < Sinatra::Application
  get '/arena' do
    if !request.websocket?

      @user = User.get(session[:id])

      redirect '/' unless @user

      redirect '/logout' if @user.banned

      @Online = @@game_controller.ladder.keys.length
      puts "#{@Online}"

      @user.last_page_name = 'Currently In-Game Main Menu'
      @user.game_visit = DateTime.now
      @user.last_page_link = '/arena'
      @user.save

      puts 'No Websocket'
      erb :arena, layout: :layout2

    else
      puts 'Websocket Connection'

      def getQuest(quest, _info, _questArray)
        case quest

        when 1
          [0]
        when 2
          [0, 0, 0]
        when 3
          [0, 0, 0, 0, 0]
        when 4
          [0, 0, 0, 0]
        when 5
          [0, 0, 0]
        when 6
          [0, 0, 0]
        when 7
          [0, 0, 0, 0, 0]
        when 8
          [0, 0, 0, 0]
        when 9
          [0, 0, 0, 0, 0]
        when 10
          [0, 0, 0, 0, 0]
        when 11
          [0, 0, 0, 0]
        when 12
          [0, 0, 0, 0]
        when 13
          [0, 0, 0, 0]
        when 14
          [0, 0, 0, 0]
        when 15
          [0, 0, 0, 0, 0]
        end
      end

      def getInventory(tag, choice, type)
        # tag = r['tag'].to_i
        # choice = r['choice']
        # type = r['type'].to_i
        if type == 1
          case choice
          when 'zCi'
            return 400 if tag == 1

            1600

          when 'zNa'
            return 2500 if tag == 1

            10_000

          when 'zRe'
            return 400 if tag == 1

            1600

          when 'zRi'
            return 400 if tag == 1

            1600

          when 'zJe'
            return 2500 if tag == 1

            10_000

          when 'zBr'
            return 2500 if tag == 1

            10_000

          when 'zGy'
            return 4000 if tag == 1

            1000

          when 'zNl'
            return 4000 if tag == 1

            20_000

          when 'zRz'
            return 2500 if tag == 1

            10_000

          when 'zSn'
            return 400 if tag == 1

            1600

          when 'zSV'
            return 4000 if tag == 1

            20_000

          when 'zGo'
            return 400 if tag == 1

            1600

          when 'bKG'
            return 4000 if tag == 1

            20_000

          end

        else
          puts "I'm a skill"
          case choice

          when 49
            return 125 if tag == 1

            500

          when 50
            return 1250 if tag == 1

            1250

          when 51
            return 1250 if tag == 1

            5000

          when 55
            return 125 if tag == 1

            500

          when 56
            return 125 if tag == 1

            500

          when 57
            return 125 if tag == 1

            500

          when 70
            return 125 if tag == 1

            500

          when 71
            return 1250 if tag == 1

            5000

          when 72
            return 1250 if tag == 1

            5000

          when 73
            return 1250 if tag == 1

            5000

          when 74
            return 1250 if tag == 1

            5000

          when 75
            return 125 if tag == 1

            500

          when 79
            return 125 if tag == 1

            500

          when 80
            return 500 if tag == 1

            2000

          when 81
            return 1250 if tag == 1

            5000

          when 82
            return 125 if tag == 1

            500

          when 83
            return 125 if tag == 1

            500

          when 84
            return 125 if tag == 1

            500

          when 85
            return 125 if tag == 1

            500

          when 86
            return 1250 if tag == 1

            5000

          when 87
            return 1250 if tag == 1

            5000

          when 88
            return 125 if tag == 1

            500

          when 89
            return 1250 if tag == 1

            5000

          when 90
            return 1250 if tag == 1

            5000

          when 91
            return 125 if tag == 1

            500

          when 92
            return 1250 if tag == 1

            5000

          when 93
            return 1250 if tag == 1

            5000

          when 94
            return 125 if tag == 1

            500

          when 95
            return 125 if tag == 1

            500

          when 96
            return 1250 if tag == 1

            5000

          when 97
            return 125 if tag == 1

            500

          when 98
            return 500 if tag == 1

            2000

          when 99
            return 1250 if tag == 1

            5000

          when 100
            return 125 if tag == 1

            500

          when 101
            return 125 if tag == 1

            500

          when 102
            return 1250 if tag == 1

            5000

          when 109
            return 125 if tag == 1

            500

          when 110
            return 125 if tag == 1

            500

          when 111
            return 125 if tag == 1

            500

          when '10018'
            return 2000 if tag == 1

            10_000

          when '10007'
            return 2000 if tag == 1

            10_000

          when '10008'
            return 2000 if tag == 1

            10_000

          when '10006'
            return 2000 if tag == 1

            10_000

          when '10009'
            return 2000 if tag == 1

            10_000

          when '10011'
            return 2000 if tag == 1

            10_000

          end

        end
      end

      request.websocket do |ws|
        ws.onopen do
          content_type :json

          u = User.get(session[:id])
          if session?
            ws.send({ msg: 'start', player_id: u.id.to_s, username: u.username.to_s, rank: u.rank.to_s,
                      wins: u.wins.to_s, losses: u.losses.to_s, streak: u.streak.to_s, team: u.team.to_s, skill: u.skill.to_s, clan: u.clan.to_s, avater: u.avater.to_s, uc: u.unlockcharacters.to_s, us: u.unlockskills.to_s, stats: u.stats, money: u.money, quest: u.quest, items: u.items, kili: u.kili }.to_json)
          else
            ws.send({ msg: 'reconnect' }.to_json)
          end

          settings.sockets << ws
        end
        ws.onmessage do |req|
          puts "REQUEST FROM CLIENT #{req}"
          u = User.first(username: session[:username])
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
              ws.send({ msg: 'start', player_id: u.id.to_s, username: u.username.to_s, rank: u.rank.to_s,
                        wins: u.wins.to_s, losses: u.losses.to_s, streak: u.streak.to_s, team: u.team.to_s, skill: u.skill.to_s, clan: u.clan.to_s, avater: u.avater.to_s, uc: u.unlockcharacters.to_s, us: u.unlockskills.to_s, stats: u.stats, money: u.money, quest: u.quest, items: u.items, kili: u.kili }.to_json)

            end

          when 'new_ladder'
            team = JSON.parse(u.team)
            s = JSON.parse(u.skill)
            stats = JSON.parse(u.stats)
            item = JSON.parse(u.items)
            if @@game_controller.games.key?(u.last_game)
              @@game_controller.game_exist(u.last_game, u.id, ws)
            else
              player = Player.new(u.id, ws, team, s, stats, item, 'Ladder')
              @@game_controller.add_player(player)
            end

          when 'cancel_ladder'

            @@game_controller.ladder.delete(u.id) if @@game_controller.ladder[u.id]
          when 'cancel_private'
            @@game_controller.private_games.delete(u.id) if @@game_controller.private_games[u.id]
          when 'cancel_society'
            p = u.members.first(status: 'Joined').source.main_planet

            @@game_controller.ladder.delete(u.id) if @@game_controller.ladder[u.id]

          when 'surrender'
            if @@game_controller.games[r['game_id'].to_i]
              @@game_controller.games[r['game_id'].to_i].surrender(session[:id])
            end
          when 'attack'
            if @@game_controller.games[r['game_id'].to_i]
              @@game_controller.games[r['game_id'].to_i].attack(session[:id], r)
            end
          when 'end_turn'
            if @@game_controller.games[r['game_id'].to_i]
              @@game_controller.games[r['game_id'].to_i].end_turn(session[:id])
            end
          when 'private'
            team = JSON.parse(u.team)
            s = JSON.parse(u.skill)
            stats = JSON.parse(u.stats)
            item = JSON.parse(u.items)
            if @@game_controller.games.key?(u.last_game)

              @@game_controller.game_exist(u.last_game, u.id, ws)
            else
              player = Player.new(u.id, ws, team, s, stats, item, 'Private')
              @@game_controller.private_add_player(player, u.username.downcase, r['target'].downcase)
            end
          when 'society'
            team = JSON.parse(u.team)
            s = JSON.parse(u.skill)
            stats = JSON.parse(u.stats)
            item = JSON.parse(u.items)

            if @@game_controller.games.key?(u.last_game)
              @@game_controller.game_exist(u.last_game, u.id, ws)
            else
              player = Player.new(u.id, ws, team, s, stats, item, 'Society')
              @@game_controller.add_player(player)
            end

          when 'shop'
            u = User.first(username: session[:username])
            Shop_Packs.new(r['type'].to_i, r['id'].to_i, ws, u, r['roll'])

          when 'shopItems'
            u = User.first(username: session[:username])
            name = r['name']
            amount = r['amount'].to_i
            if name[0] === 'c'
              money = 250 * amount
            elsif name[0] === 'o'
              money = 500 * amount

            elsif name[0] === 'r'
              money = 750 * amount
            end

            if u.money >= money
              u.money -= 250

              d = JSON.parse(u.items)

              report = ''

              if !d.key?(name)
                d[name] = amount
                u.items = d.to_json

              else
                d[name] += amount
                u.items = d.to_json
              end

              puts "u.it  ems #{u.items}"

              u.save

              ws.send({ msg: 'buy', report: report.to_s, got: name.to_s, stats: u.stats, money: u.money,
                        unlockedskills: u.unlockskills, unlockedcharacters: u.unlockcharacters, extras: u.extras, items: u.items, newItem: true }.to_json)
            else
              u.save
              ws.send({ msg: 'buy', report: report.to_s, got: name.to_s, money: u.money, stats: u.stats,
                        unlockedskills: u.unlockskills, unlockedcharacters: u.unlockcharacters, extras: u.extras, items: u.items, newItem: true }.to_json)

            end

          when 'characters'
            u = User.first(username: session[:username])
            check_c = JSON.parse(u.unlockcharacters)
            check_s = JSON.parse(u.unlockskills)
            check_cs = JSON.parse(u.skill)
            check_c.to_s

            newteam = JSON.parse(r['team'])
            team = JSON.parse(r['team'])

            m1 = r['m1']
            m2 = r['m2']
            m3 = r['m3']

            report = ''
            a = check_s
            z = { 's1' => r['m1'], 's2' => r['m2'], 's3' => r['m3'] }

            w = 0
            if team.uniq.length != team.length
              report = 'Characters: You have a duplicate of characters.'
            elsif !check_c.key?(team[0])
              report = "Characters: You haven't unlocked your first character."
            elsif !check_c.key?(team[1])
              report = "Characters: You haven't unlocked your second character."
            elsif !check_c.key?(team[2])
              report = "Characters: You haven't unlocked your third character."
            else
              report = 'Characters: All characters meet the needed requirements and have been unlocked.'
              w += 1
            end

            if m1.uniq.length != m1.length
              report += " \n\n Character 1 Moves: You have a duplicate of skills."
            elsif !a.key?(m1[0])
              report += " \n\n Character 1 Moves: You haven't unlocked your first skill."
            elsif !a.key?(m1[1])
              report += " \n\n Character 1 Moves: You haven't unlocked your second skill."
            elsif !a.key?(m1[2])
              report += " \n\n Character 1 Moves: You haven't unlocked your third skill."
            elsif !a.key?(m1[3])
              report += " \n\n Character 1 Moves: You haven't unlocked your fourth skill."
            elsif !a.key?(m1[4])
              report += " \n\n Character 1 Moves: You haven't unlocked your fifth skill."
            else
              w += 1
              report += " \n\n Character 1 Moves: All skills meet the needed requirements and have been unlocked."
            end

            if m2.uniq.length != m2.length
              report += " \n\n Character 2 Moves: You have a duplicate of skills."
            elsif !a.key?(m2[0])
              report += " \n\n Character 2 Moves: You haven't unlocked your first skill."
            elsif !a.key?(m2[1])
              report += " \n\n Character 2 Moves: You haven't unlocked your second skill."
            elsif !a.key?(m2[2])
              report += " \n\n Character 2 Moves: You haven't unlocked your third skill."
            elsif !a.key?(m2[3])
              report += " \n\n Character 2 Moves: You haven't unlocked your fourth skill."
            elsif !a.key?(m2[4])
              report += " \n\n Character 2 Moves: You haven't unlocked your fifth skill."
            else
              w += 1
              report += " \n\n Character 2 Moves: All skills meet the needed requirements and have been unlocked."
            end

            if m3.uniq.length != m3.length
              report += " \n\n Character 3 Moves: You have a duplicate of skills."
            elsif !a.key?(m3[0])
              report += " \n\n Character 3 Moves: You haven't unlocked your first skill."
            elsif !a.key?(m3[1])
              report += " \n\n Character 3 Moves: You haven't unlocked your second skill."
            elsif !a.key?(m3[2])
              report += " \n\n Character 3 Moves: You haven't unlocked your third skill."
            elsif !a.key?(m3[3])
              report += " \n\n Character 3 Moves: You haven't unlocked your fourth skill."
            elsif !a.key?(m3[4])
              report += " \n\n Character 3 Moves: You haven't unlocked your fifth skill."
            else
              w += 1
              report += " \n\n Character 3 Moves: All skills meet the needed requirements and have been unlocked."
            end

            if w == 4
              u.update(team: newteam.to_s, skill: z.to_json)
              report += " \n\n All Changes Have Been Saved!"
            else
              report += " \n\n Please try again with correct changes. If error continues please inform staff of bug."
            end
            ws.send({ msg: 'save', report: report.to_s, team: newteam.to_s, skill: z.to_json }.to_json)

            ws.send({ msg: 'save', report: report.to_s, team: newteam.to_s, skill: z.to_json }.to_json)

          when 'chat'
            u = User.first(username: session[:username])
            @@game_controller.sendMessage(u.username, u.avater, r['message'], u.id, ws) if r['message'].length <= 101

          when 'quest'
            u = User.first(username: session[:username])
            a = JSON.parse(u.quest)

            def getQuest(rarity, characters)
              puts "Rarity: #{rarity}"
              d = Random.new
              type = d.rand(0...100)

              t = if type < 25
                    'Victory'
                  elsif type < 50
                    'Row'
                  elsif type < 75
                    'Damage'
                  else
                    'Character'
                  end

              puts "Type #{t}  #{type}"

              if t == 'Victory'
                if rarity <= 100
                  d = Random.new
                  d = d.rand(20...40)
                  s = ['Victory', 0, d, 10_000]
                elsif rarity <= 2901
                  d = Random.new
                  d = d.rand(8...16)
                  s = ['Victory', 0, d, 4000]
                else
                  d = Random.new
                  d = d.rand(3...8)
                  s = ['Victory', 0, d, 2000]
                end

              elsif t == 'Row'
                if rarity <= 100
                  d = Random.new
                  d = d.rand(6...8)
                  s = ['Row', 0, d, 10_000]
                elsif rarity <= 2901
                  d = Random.new
                  d = d.rand(4...5)
                  s = ['Row', 0, d, 4000]
                else
                  d = Random.new
                  d = d.rand(2...3)
                  s = ['Row', 0, d, 2000]
                end

              elsif t == 'Damage'
                if rarity <= 100
                  d = Random.new
                  d = d.rand(12_000...15_000)
                  s = ['Damage', 0, d, 10_000]
                elsif rarity <= 2901
                  d = Random.new
                  d = d.rand(4000...6000)
                  s = ['Damage', 0, d, 4000]
                else
                  d = Random.new
                  d = d.rand(2000...3000)
                  s = ['Damage', 0, d, 2000]
                end

              elsif t == 'Character'
                c = characters.keys
                puts "c: #{c}"
                ch = c[rand(c.length)]
                puts "ch #{ch}"
                if rarity <= 100
                  d = Random.new
                  d = d.rand(20...40)
                  s = ['Character', 0, d, 10_000, ch]
                elsif rarity <= 2901
                  d = Random.new
                  d = d.rand(8...16)
                  s = ['Character', 0, d, 4000, ch]
                else
                  d = Random.new
                  d = d.rand(3...8)
                  s = ['Character', 0, d, 2000, ch]
                end
              end

              s
            end

            puts 'Quest'

            if a['complete'][0]
              a['current'][0] = false
              a['complete'][0] = false
              u.money += a['conditions'][0][3]
            end

            if a['complete'][1]
              a['current'][1] = false
              a['complete'][1] = false
              u.money += a['conditions'][1][3]
            end

            if a['complete'][2]
              a['current'][2] = false
              a['complete'][2] = false
              u.money += a['conditions'][2][3]
            end
            puts a['date']
            b = Time.parse(a['date'])
            # b = "2016-01-21 19:47:16 +0000"
            if a['current'][0] && a['current'][1] && a['current'][2]

            elsif b < 1440.minutes.ago
              puts 'More than a day'
              a['date'] = Time.now.to_s
              # a['date'] = "2016-01-21 19:47:16 +0000"

              character = JSON.parse(u.unlockcharacters)

              unless a['current'][0]
                r = Random.new
                nr = r.rand(0...10_000)
                c = getQuest(nr, character)
                a['current'][0] = true
                a['conditions'][0] = c
              end

              unless a['current'][1]
                r = Random.new
                nr = r.rand(0...10_000)
                c = getQuest(nr, character)
                a['current'][1] = true
                a['conditions'][1] = c
              end

              unless a['current'][2]
                r = Random.new
                nr = r.rand(0...10_000)
                c = getQuest(nr, character)
                a['current'][2] = true
                a['conditions'][2] = c
              end

              puts a
              u.quest = a.to_json
              u.save

            end
            ws.send({ msg: 'checkQuest', report: report, quest: u.quest }.to_json)

          when 'inventory'

            tag = r['tag'].to_i
            choice = r['choice']
            type = r['type'].to_i
            report = 'Success'
            if tag == 1 && type == 1
              character = JSON.parse(u.unlockcharacters)

              if character[choice] >= 1
                kili = getInventory(tag, choice, type)
                character[choice] -= 1
                u.unlockcharacters = character.to_json
                u.kili += kili
                u.save
              end
            elsif tag == 1 && type == 2
              skill = JSON.parse(u.unlockskills)
              if skill[choice] >= 1
                choice = choice.to_i if choice.match(/^(\d)+$/)
                kili = getInventory(tag, choice, type)
                choice = choice.to_s
                skill[choice] -= 1
                u.unlockskills = skill.to_json
                u.kili += kili
                u.save
              end

            elsif tag == 2 && type == 1
              character = JSON.parse(u.unlockcharacters)
              stats = JSON.parse(u.stats)
              kili = getInventory(tag, choice, type)
              if u.kili >= kili
                character[choice] = 0
                u.unlockcharacters = character.to_json
                stats[choice] = [0, 0, 0, 0, 1, 0, 0]
                u.stats = stats.to_json
                u.kili -= kili
                u.save
              end
            elsif tag == 2 && type == 2
              skill = JSON.parse(u.unlockskills)
              choice = choice.to_i if choice.match(/^(\d)+$/)
              kili = getInventory(tag, choice, type)
              choice = choice.to_s
              if u.kili >= kili
                skill[choice] = 0
                u.unlockskills = skill.to_json
                u.kili -= kili
                u.save
              end
            end

            ws.send({ msg: 'inventory', report: report.to_s, got: choice.to_s, kili: u.kili, stats: u.stats,
                      items: u.items, unlockedskills: u.unlockskills, unlockedcharacters: u.unlockcharacters, extras: u.extras }.to_json)

          when 'item'
            u = User.first(username: session[:username])
            item = JSON.parse(u.items)
            report = ''
            member = ''
            i = r['c']
            puts i

            w = 0

            if item.key?(i)
              report += " \n\n Item Saved: No Errors"
              w += 1
            else
              report += " \n\n Item Errors: You have not unlocked item."
            end
            if w == 1
              puts item
              item['item'] = i
              u.update(items: item.to_json)
              report += " \n\n All Changes Have Been Saved!"
            else
              report += " \n\n Please try again with correct changes. If error continues please inform staff of bug."
            end
            ws.send({ msg: 'item', report: report.to_s, item: item }.to_json)

          when 'planetControls'
            type = r['type']
            report = ''
            if type == 1
              u = User.first(username: session[:username])
              p = Planet.first(name: u.clan)

              if !p
                report = 'You have to be apart of a planet to abandon a planet.'
              elsif u.username == p.owner
                report = 'You have to transfer your ownership before you can leave planet. Or you can fold the planet.'
              elsif u.clan == 'none'
                report = 'You have to be apart of a planet to abandon a planet.'
              else
                p.members_count -= 1
                u.clan = 'none'
                u.members.first(source: p, status: 'Joined').destroy
                u.save
                p.save
              end

            elsif type == 2
              u = User.first(username: session[:username])
              invite = User.first(:username.like => r['user'])
              p = Planet.first(name: u.clan)

              a = Member.first(target: invite, source: p)
              if u.position != 'Commander' && u.position != 'Captain'
                report = "You can't access because this action is only for Leaders or Co-Leaders."
              elsif !invite
                report = "User doesn't exist."
              elsif !p
                report = "Planet doesn't exist."
              elsif p.members_count >= p.members_limit
                report = 'Your planet is full. No more members can join this clan.'
              elsif a
                report = 'This user already has a pending invite!'
              else

                m = Member.create(target: invite, source: p, status: 'Pending', planet_id: p.id)

                p.members << m
                invite.members << m

                report = if p.save && invite.save
                           'Society invite was successfully sent!'
                         else
                           "Society invite wasn't successfully sent."
                         end
              end

            elsif type == 3
              u = User.first(username: session[:username])
              if u.position == 'Commander' || u.position == 'Captain'
                invite = User.first(username: r['user'])
                if invite
                  report = invite.to_json(only: %i[id position username wins losses streak rank avater average
                                                   power_level])
                  member = "Found Match For #{r['user']} "
                else
                  report = ''
                  member = "Couldn't find username."
                end
              end

            elsif type == 4
              u = User.first(username: session[:username])
              puts "Position: #{u.position}"
              if u.position == 'Commander' || u.position == 'Captain' || u.position == 'Officer'
                a = r['rank'].to_i
                b = r['streak'].to_i
                c = r['average'].to_i
                invite = User.all(:rank.gte => a, :high_streak.gte => b, :average.gte => c)
                if invite
                  report = invite.to_json(only: %i[id position username wins losses streak rank avater average
                                                   power_level])
                  member = 'Sucessfully found users who meet these requirements. Select the user and hit the send invite button to send invite!'
                else
                  report = ''
                  member = 'Unsucessfully found users who meet these requirements.'
                end
              end

            elsif type == 5
              u = User.first(username: session[:username])
              @invites = u.members.all(status: 'Pending')
            elsif type == 6
              puts 'accept'
              id = r['id'].to_i
              u = User.first(username: session[:username])
              p = Planet.get(id)
              m = Member.first(target: u, source: p)

              if !m && !p
                report = 'No Invites.'
              elsif u.clan == 'none'
                m.status = 'Joined'
                u.clan = p.name
                u.position = 'Elite'
                p.members_count += 1
                u.members.all(status: 'Pending').destroy if m.save && u.save && p.save

              else
                pl = Planet.first(name: u.clan)
                pl.members_count -= 1
                u.members.all(status: 'Joined').destroy
                m.status = 'Joined'
                u.clan = p.name
                u.position = 'Elite'
                p.members_count += 1

                if m.save && u.save && p.save
                  u.members.all(status: 'Pending').destroy
                  report = 'Success'
                end

              end

            elsif type == 7
              u = User.first(username: session[:username])
              id = r['id'].to_i
              p = Planet.get(id)
              m = Member.first(target: u, source: p)

              report = u.members.all if m && p && (m.destroy && u.save && p.save)

            elsif type == 8
              report = []
              u = User.first(username: session[:username])
              if u.position == 'Commander' || u.position == 'Captain' && r['body'].length <= 2500
                p = u.members.first.source
                p.description = Rack::Utils.escape_html(r['body'])
                p.save
                report = p.description
              end
            elsif type == 9
              u = User.first(username: session[:username])
              k = User.first(username: r['user'])
              p = Planet.first(name: u.clan)
              report = [0, 0]
              if !k
                report[0] = "User doesn't exist"
              elsif k.clan != u.clan
                report[0] = 'Not in the same society.'
              elsif k.username == p.owner
                report[0] = "Can't remove an owner of society!"
              elsif u.username == p.owner && k != u

                p.members_count -= 1
                k.clan = 'none'
                k.members.first(planet: p).destroy
                k.save
                p.save
                report[0]  = "#{k.username} has been kicked."
                report[1]  = k.id
              elsif u.position == 'Commander' && k.position != 'Commander'

                p.members_count -= 1
                k.clan = 'none'
                k.members.first(planet: p).destroy
                k.save
                p.save
                report[0]  = "#{k.username} has been kicked."
                report[1]  = k.id

              elsif u.position == 'Captain' && k.position != 'Commander' && k.position != 'Captain'

                p.members_count -= 1
                k.clan = 'none'
                k.members.first(planet: p).destroy
                k.save
                p.save
                report[0] = "#{k.username} has been kicked."
                report[1] = k.id
              elsif u.position == 'Officer' && k.position != 'Commander' && k.position != 'Captain' && k.position != 'Officer'

                p.members_count -= 1
                k.clan = 'none'
                k.members.first(planet: p).destroy
                k.save
                p.save
                report[0] = "#{k.username} has been kicked."
                report[1] = k.id

              else
                report[0] = "#{k.username} can't be kicked because you don't have permission."
                report[1] = ''

              end

              member = p.members.all(status: 'Joined').target.to_json(only: %i[id position username wins losses
                                                                               streak avater average power_level])
              puts report
            elsif type == 10
              u = User.first(username: session[:username])
              k = User.first(username: r['user'])
              p = Planet.first(name: u.clan)
              nr = r['role']
              puts "Role : #{nr}"

              if !k && !p
                report = "User doesn't exist."
              elsif k.clan != u.clan
                report = 'Not in the same society.'
              elsif u == k
                report = "You can't change your own role.Unless your owner."
              elsif r['role'] == 'Owner' && k.username == p.owner
                report = "#{k.username} is already owner."
              elsif nr == 'Owner' && u.username != p.owner
                report = "You don't have permission to change this role."
              elsif !%w[Commander Officer Captain Elite Owner].include?(r['role'])
                report = 'Incorrect Role'
                puts "Role : #{nr}"
              elsif nr == 'Owner' && u.username == p.owner
                p.owner = k.username
                k.position = 'Commander'
                p.save
                k.save
                report = "#{k.username} has been changed to owner."

              elsif u.username == p.owner
                k.position = nr
                puts "Position: #{k.position}  Role: #{r['role']}  Role2: #{nr} k.username #{k.username}"
                k.save
                report = "#{k.username} has been changed to #{k.position}"
              elsif u.position == 'Commander' && k.position != 'Commander' && r['role'] != 'Commander'
                k.position = nr
                k.save
                report = "#{k.username} has been changed to #{k.position}."
              elsif u.position == 'Captain' && k.position != 'Commander' && k.position != 'Captain' && r['role'] != 'Commander' && r['role'] != 'Captain'
                k.position = nr
                k.save
                report = "#{k.username} has been changed to #{k.position}."
              else
                report = "You don't have permission to change this role."
              end

            elsif type == 11
              u = User.first(username: session[:username])
              if u
                p = Planet.first(name: u.clan)
                a = [r['rank'], r['streak'], r['average'], r['invite']]
                if a[0].is_a?(Numeric) && a[1].is_a?(Numeric) && a[2].is_a?(Numeric)
                  p.lowest_rank = a[0]
                  p.lowest_streak = a[1]
                  p.lowest_average = a[2]
                  p.invite = if p.members_count <= p.members_limit
                               a[3]
                             else
                               'Private'
                             end
                  report = if p.save
                             'You successfully changed your settings.'
                           else
                             'You unsuccessfully changed your settings. Check your input for numbers only.'
                           end
                else
                  report = 'You unsuccessfully changed your settings. Check your input for numbers only.'
                end
                member = p.members(status: 'Joined').target.to_json(only: %i[id position username wins losses
                                                                             streak avater average power_level])

              end
            elsif type == 12
              u = User.first(username: session[:username])
              report = u.friends.all(:updated_at.gte => 30.minutes.ago)
            elsif type == 13
              if r['id'] == 1
                report = Planet.all(:main_planet => r['planet'], :rank.gte => r['rank'], :langauge => r['langauge'],
                                    :limit => 30)
                report.to_json(only: %i[id name reputation members_count members_limit health max_health owner
                                        invite main_planet avater money description wins losses average])
              else
                puts r['user']
                name = r['user']
                report = Planet.all(limit: 1, conditions: ['lower(name) = ?', name.downcase])
                report.to_json(only: %i[id name reputation members_count members_limit health max_health owner
                                        invite main_planet avater money description wins losses average])
              end

            elsif type == 14

              report = Planet.first(name: r['name'])
              if report
                report.to_json(only: %i[id name reputation members_count members_limit health max_health owner
                                        invite main_planet avater money description wins losses average])
                member = report.members.all(status: 'Joined').source.to_json(only: %i[id position username wins
                                                                                      losses streak avater average power_level])
                puts "Members #{member}"
              end
            elsif type == 15
              u = User.first(username: session[:username])
              p = u.members.first(status: 'Joined').source
              if u.username == p.owner
                u.clan = 'none'
                u.position = 'none'
                u.save
                p.users.all.update(clan: 'none')
                p.destroy
              end
            elsif type == 16
              puts "I'm in 16"
              u = User.first(username: session[:username])

              d = Member.all(status: 'Pending', target: u, limit: 20)

              puts "D: #{d.source.first}"
              if d
                report = d.source.to_json(only: %i[id name reputation members_count members_limit health max_health
                                                   owner invite main_planet avater money description wins losses average])
              else
                report = '[]'
              end

            elsif type == 17
            end
            ws.send({ msg: 'planetControls', report: report, type: type, clan: u.clan,
                      members: member }.to_json)

          when 'planetMenu'
            u = User.first(username: session[:username])
            d = u.members.all(status: 'Pending')
            p = Planet.first(name: u.clan).members.all(status: 'Joined')

            if d && p
              puts "Count: #{p.count}"
              ws.send({ msg: 'planetMenu',
                        report: p.source.to_json(only: %i[id name reputation members_count members_limit health max_health owner invite main_planet avater money description wins losses average]), members: p.target.to_json(only: %i[id position username wins losses streak avater average power_level]), request: d.source.to_json(only: %i[id name reputation members_count members_limit health max_health owner invite main_planet avater money description wins losses average]), position: u.position }.to_json)
            else
              ws.send({ msg: 'planetMenu', report: false, members: false, request: false,
                        position: u.position }.to_json)
            end

          when 'planetCheck'
            a = r['clan']
            if a == 3
              name = 'Human'
              p = Planet.all(:main_planet => 'Human', :limit => 50, :defense.gte => 10.minutes.ago)
            else
              name = 'Cold'
              p = Planet.all(:main_planet => 'Cold', :limit => 50, :defense.gte => 10.minutes.ago)
            end
            ws.send({ msg: 'planetCheck', report: p, planet: name }.to_json)

          when 'joinPlanet'
            report = ''
            u = User.first(username: session[:username])
            a = r['info']
            type = r['type']
            if type == 1
              p = Planet.all(invite: 'Public', main_planet: a, limit: 20)
              ws.send({ msg: 'joinPlanet', report: 1, clan: p }.to_json) if p
            elsif type == 2
              a.to_i

              if a.blank?

              else
                puts "A is #{a}"
                p = Planet.get(a)

                if !p && u.clan != 'none'
                  puts 'Failed 1'
                elsif p.members_count != p.members_limit && p.invite != 'Public'
                  puts 'Failed 2'
                else
                  puts 'Success 1'
                  p.members_count += 1

                  p.invite = 'Private' if p.members_count + 1 >= p.members_limit

                  u.position = 'Elite'

                  previous = Member.first(target: u, source: p, status: 'Pending', planet_id: p.id)

                  if previous
                    puts 'In previous!'
                    u.clan = p.name
                    puts "Clan: #{u.clan}"
                    previous.status = 'Joined'
                    previous.save
                    u.save
                    ws.send({ msg: 'createPlanet', report: report, clan: u.clan, success: true }.to_json)
                  else
                    m = Member.create(target: u, source: p, status: 'Joined', planet_id: p.id)
                    u.clan = p.name

                    p.members << m
                    u.members << m

                    if p.save && u.save && m.save
                      ws.send({ msg: 'createPlanet', report: report, clan: u.clan, success: true }.to_json)
                    end
                  end
                end

              end

            end

          when 'createPlanet'
            a = r['info']

            u = User.first(username: session[:username])
            p = Planet.first(conditions: ['lower(name) = ?', a[0].downcase])

            if !p
              report = 'Society name already exist.'
            elsif u.money >= 0
              report = 'Not enough money to buy.'
              ws.send({ msg: 'createPlanet', report: report, clan: u.clan, success: false }.to_json)
            elsif a[0].delete(' ').downcase != 'none'
              report = "Name can't be be called none."
              ws.send({ msg: 'createPlanet', report: report, clan: u.clan, success: false }.to_json)
            end

            if  u.clan == 'none' && !p
              # u.money -= 10000

              p = Planet.new
              u.clan = a[0].delete(' ')

              p.name = a[0].delete(' ')
              p.langauge = a[4]
              p.description = Rack::Utils.escape_html(a[2])
              p.members_count += 1
              p.main_planet = a[3]
              p.owner = u.username
              u.position = 'Commander'
              u.members.all.destroy

              m = Member.create(target: u, source: p, status: 'Joined', planet_id: p.id)

              p.members << m
              u.members << m

              if m.save && p.save && u.save
                ws.send({ msg: 'createPlanet', report: report, clan: u.clan, success: true }.to_json)
              else
                p.errors.each do |e|
                  puts e
                  flash[:error] = e
                end
                ws.send({ msg: 'createPlanet', report: report, clan: u.clan, success: false }.to_json)
              end

            end
          when 'removeDone'
            if @@game_controller.games[r['game_id'].to_i]
              @@game_controller.games[r['game_id'].to_i].player.key[0].done = false
              @@game_controller.games[r['game_id'].to_i].player.key[1].done = false
            end

          when 'upgrade'
            u = User.first(username: session[:username])
            c = r['c']
            check = c.length

            stats = JSON.parse(u.stats)
            info = stats[c]
            increase = r['s']

            if check <= 5 && increase.all? { |i| i.is_a? Integer }
              total = increase[0] + increase[1] + increase[2] + increase[3]
              if info[6] >= total

                info[0] = info[0] + (increase[0] * 2)
                info[1] = info[1] + (increase[1] * 2)
                info[2] = info[2] + (increase[2] * 2)
                info[3] += increase[3]
                info[6] -= total
                stats[c] = info
                u.stats = stats.to_json.to_s
                u.game_visit = DateTime.now
                u.save
              end
              ws.send({ msg: 'upgrade', character: c.to_s, player_id: u.id.to_s, username: u.username.to_s,
                        rank: u.rank.to_s, wins: u.wins.to_s, losses: u.losses.to_s, streak: u.streak.to_s, team: u.team.to_s, skill: u.skill.to_s, clan: u.clan.to_s, avater: u.avater.to_s, uc: u.unlockcharacters.to_s, us: u.unlockskills.to_s, stats: u.stats, money: u.money, quest: u.quest }.to_json)
            end

          end

          puts 'Ladder PLAYERS: ' + @@game_controller.ladder.keys.to_s
          puts 'Private PLAYERS: ' + @@game_controller.private_games.keys.to_s
          puts 'GAMES: ' + @@game_controller.games.keys.to_s

          ws.onclose do
            warn('websocket closed')
            settings.sockets.delete(ws)
          end
          # ws.onerror do |error|
          # puts "Received Error: #{error}"
          # end
        end
      end
    end
  end
end

class Shop_Packs
  def initialize(type, id, ws, u, _roll)
    # Type: 1:Skill #2:Character #Item
    r = Random.new
    @nr = r.rand(0...100)
    @u = u
    @id = id
    @ws = ws

    return unless type == 1

    if id == 1
      randomSkills(id, 1)
    elsif id == 2
      randomSkills(id, 2)
    elsif id == 3
      randomCharacter(id, 1)
    else
      randomCharacter(id, 2)
    end
  end

  def randomCharacter(_id, roll)
    puts 'Characters'
    report = ''
    rare = 0
    a = 1

    if @u.money >= 4000 && roll == 1
      @u.money -= 4000

      puts 'roll 1'
      d = JSON.parse(@u.unlockcharacters)
      s = JSON.parse(@u.stats)
      rare = getRarity(@nr)
      if @id == 3
        puts "id  1 + rare #{rare}"
        b = quest1characters(rare)

      end
      puts "b + #{b}"

      if !d.key?(b)
        d[b] = 1
        @u.unlockcharacters = d.to_json
        s[b] = [0, 0, 0, 0, 1, 0, 0]
        @u.stats = s.to_json

      else
        d[b] += 1
        @u.unlockcharacters = d.to_json
      end

      @u.save
      @ws.send({ msg: 'buy', report: report.to_s, rare: rare, got: b.to_s, type: a,
                 money: @u.money, stats: @u.stats, unlockedskills: @u.unlockskills.to_s, unlockedcharacters: @u.unlockcharacters.to_s, extras: @u.extras, items: @u.items }.to_json)
    elsif @u.money >= 16_000 && roll == 2
      @u.money -= 16_000
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
        b = quest1characters(rare) if @id == 4
        puts b

        if !d.key?(b)
          d[b] = 1
          @u.unlockcharacters = d.to_json
          s[b] = [0, 0, 0, 0, 1, 0, 0]
          @u.stats = s.to_json

        else
          d[b] += 1
          @u.unlockcharacters = d.to_json
        end
        a.push(b)
        rares.push(rare)
      end
      @u.save
      @ws.send({ msg: 'buy', report: report.to_s, rare: rares, got: a.to_s, type: a,
                 stats: @u.stats, money: @u.money, unlockedskills: @u.unlockskills.to_s, unlockedcharacters: @u.unlockcharacters.to_s, extras: @u.extras, items: @u.items }.to_json)

    else

      @ws.send({ msg: 'buy', report: report.to_s, rare: rare, got: b.to_s, type: a,
                 stats: @u.stats, money: @u.money, unlockedskills: @u.unlockskills.to_s, unlockedcharacters: @u.unlockcharacters.to_s, extras: @u.extras, items: @u.items }.to_json)
    end
  end

  def randomSkills(_id, roll)
    a = 2
    report = ''
    rare = 0
    a = 1

    if @u.money >= 3000 && roll == 1
      @u.money -= 3000
      d = JSON.parse(@u.unlockskills)
      rare = getRarity(@nr)
      if @id == 1
        puts rare
        b = quest1skills(rare)

      end
      puts b

      if !d.key?(b)
        d[b] = 1
        @u.unlockskills = d.to_json

      else
        d[b] += 1
        @u.unlockskills = d.to_json
      end

      @u.save
      @ws.send({ msg: 'buy', report: report.to_s, rare: rare, stats: @u.stats, got: b.to_s,
                 type: a, money: @u.money, unlockedskills: @u.unlockskills.to_s, unlockedcharacters: @u.unlockcharacters.to_s, extras: @u.extras, items: @u.items }.to_json)
    elsif @u.money >= 12_000 && roll == 2
      @u.money -= 12_000
      d = JSON.parse(@u.unlockskills)
      a = []
      i = 0

      rares = []
      while i < 5
        i += 1
        r = Random.new
        nr = r.rand(0...100)
        rare = getRarity(nr)
        b = quest1skills(rare) if @id == 2

        if !d.key?(b)
          d[b] = 1
          @u.unlockskills = d.to_json

        else
          d[b] += 1
          @u.unlockskills = d.to_json
        end
        a.push(b)
        rares.push(rare)
      end
      @u.save
      @ws.send({ msg: 'buy', report: report.to_s, stats: @u.stats, rare: rares.to_s, got: a.to_s,
                 money: @u.money, unlockedskills: @u.unlockskills.to_s, unlockedcharacters: @u.unlockcharacters.to_s, extras: @u.extras, items: @u.items }.to_json)

    else

      @ws.send({ msg: 'buy', report: report.to_s, stats: @u.stats, rare: rare, got: b.to_s,
                 money: @u.money, unlockedskills: @u.unlockskills.to_s, unlockedcharacters: @u.unlockcharacters.to_s, extras: @u.extras, items: @u.items }.to_json)
    end
  end

  def randomExtra(_id)
    return unless u.money >= 4000

    d = JSON.parse(u.extras)
    u.money -= 5000
    rare = getRarity(nr)
    b = getItem4(rare)
    e = d.index(b)

    return unless e.nil?

    d.push(b)
    u.extras = d.to_s
  end

  def quest1characters(rare)
    r = Random.new

    if rare == 0
      @nr = 0 # r.rand(1...16)
      case @nr
      when 0
        'zSV'
      end

    elsif rare == 1
      @nr = r.rand(1...13)

      case @nr
      when 1
        'zSn'
      when 2
        'zGo'
      when 3
        'zRe'
      when 4
        'zCi'
      when 5
        'zRi'
      when 6
        'zSn'
      when 7
        'zSo'
      when 8
        'zGr'
      when 9
        'zNy'
      when 10
        'zDa'
      when 11
        'zGr'
      when 12
        'zNy'
      when 13
        'zNy'
      end

    elsif rare == 2
      @nr = r.rand(1...9)
      case @nr
      when 1
        'zRz'
      when 2
        'zNa'
      when 3
        'zJe'
      when 4
        'zBr'
      when 5
        'zRz'
      when 6
        'zDo'
      when 7
        'zMa'
      when 8
        'zZn'
      when 9
        'zTs'
      end

    else
      @nr = r.rand(1...6)
      case @nr
      when 1
        'zSV'
      when 2
        'zNl'
      when 3
        'zGy'
      when 4
        'zSV'
      when 5
        'zDe'
      when 6
        'zCr'
      end

    end
  end

  def quest1skills(rare)
    r = Random.new

    if rare == 0
      @nr = 0 # r.rand(1...16)
      case @nr
      when 0
        '10020'
      end

    elsif rare == 1
      @nr = r.rand(1...16)
      case @nr
      when 1
        '100'
      when 2
        '101'
      when 3
        '55'
      when 4
        '56'
      when 5
        '57'
      when 6
        '49'
      when 7
        '70'
      when 8
        '75'
      when 9
        '97'
      when 10
        '79'
      when 11
        '85'
      when 12
        '88'
      when 13
        '91'
      when 14
        '94'
      when 15
        '95'
      when 16
        '95'
      end

    elsif rare == 2
      @nr = r.rand(1...21)
      case @nr
      when 1
        '50'
      when 2
        '50'
      when 3
        '51'
      when 4
        '71'
      when 5
        '72'
      when 6
        '73'
      when 7
        '74'
      when 8
        '99'
      when 9
        '81'
      when 10
        '82'
      when 11
        '83'
      when 12
        '84'
      when 13
        '86'
      when 14
        '87'
      when 15
        '89'
      when 16
        '90'
      when 17
        '92'
      when 18
        '93'
      when 19
        '96'
      when 20
        '102'
      when 21
        '102'
      end

    else
      @nr = r.rand(1...8)
      case @nr
      when 1
        '10012'
      when 2
        '10007'
      when 3
        '10008'
      when 4
        '98'
      when 5
        '80'
      when 6
        '10006'
      when 7
        '10011'
      when 8
        '10011'
      when 9
        '10009'
      end
    end
  end

  def getRarity(n)
    if n <= 2
      0
    elsif n < 8
      3
    elsif n < 41
      2
    else
      1
    end
  end
end

post '/arena/avater' do
  content_type :json
  report = ''
  u = User.first(username: session[:username])
  if u.position == 'Commander' || u.position == 'Captain'
    unless params[:file] &&
           (tmpfile = params[:file][:tempfile]) &&
           (name = params[:file][:filename])
    end
    if File.size(tmpfile) > 51_200
      report = 'Your avater was to big. All avatars need to be under 50kb.'
    else

      puts "What is the format: #{name}"
      directory = 'public/symbol/check'
      new_file = "#{u.members.first(status: 'Joined').planet_id}.png"
      path = File.join(directory, new_file)
      File.open(path, 'wb') { |f| f.write(tmpfile.read) }

      report = "Your avatar was uploaded!\n Please give the staff 24 hours to review it!"
    end
  end
  { report: report }.to_json
end

post '/lol' do
  case b

  when 'zCi'

  when 'zNa'

  when 'zRe'

  when 'zJe'

  when 'zBr'

  when 'zGy'

  when 'zNl'

  when 'zRz'

  when 'zSn'

  when 'zSV'

  when 'zGo'

  when 'bKG'

  end
end
