require 'json'
class Player

attr_reader :id
attr_accessor :socket,:characters,:bp,:team,:type,:done, :reset, :enemy, :logs, :vs

def initialize(id,socket,t,s,stats,item,type)
@id = id
@socket = socket
@bp = 0
@characters = Game.create_team(self,t, s, stats, item)
@team = t.push(item)
@type = type
puts "Type: #{type}"
@done = false
@reset = [0,0]
@enemy = false
@logs = ""
@vs = 0
end

def notify(json_object)
@socket.send(json_object)
end

def check_connect
a = @socket.state.to_s


if (a === "closed")
  puts "Disconnect"
  return true
else
   puts "Connect"
   self.reset[1] += 1
   puts "Check Connection: #{self.reset}"
  return false
end

end
end

class Game

attr_accessor :id,:players

def initialize(id, player1, player2, game_controller)
@id = id
@players = {}

@players[player1.id] = player1
@players[player2.id] = player2

@game_controller = game_controller
@turn = 0
@players.each do |player_id, player |
    player.notify({:msg => "battle", :game_id => @id.to_s}.to_json)


end

battleinfo = Report.new

player1.bp = 3
player2.bp = 3
player1.logs = battleinfo
player2.logs = battleinfo
player1.vs = 1
player2.vs = 2

u1 = User.first(:id => player1.id)
u2 = User.first(:id => player2.id)

player1.enemy = player2.characters
player2.enemy = player1.characters

player1.notify({:msg => "opponent_info",:username => u2.username.to_s,:rank => u2.rank.to_s,:wins => u2.wins.to_s,:losses => u2.losses.to_s,:streak => u2.streak.to_s,:team => u2.team.to_s,:clan => u2.clan.to_s,:avater => u2.avater.to_s}.to_json)
player2.notify({:msg => "opponent_info",:username => u1.username.to_s,:rank => u1.rank.to_s,:wins => u1.wins.to_s,:losses => u1.losses.to_s,:streak => u1.streak.to_s,:team => u1.team.to_s,:clan => u1.clan.to_s,:avater => u1.avater.to_s}.to_json)

player1.notify(game_info(@players.keys[0]).to_json)
player2.notify(game_info(@players.keys[1]).to_json)

@player1 = player1.id
@player2 = player2.id

end

def reconnect(id)
  
if @players.keys[0] == id
u1 = User.first(:id => @players.keys[1])
@players[@players.keys[0]].notify({:msg => "battle",:game_id => @id.to_s}.to_json)
@players[@players.keys[0]].notify({:msg => "opponent_info",:username => u1.username.to_s,:rank => u1.rank.to_s,:wins => u1.wins.to_s,:losses => u1.losses.to_s,:streak => u1.streak.to_s,:team => u1.team.to_s,:clan => u1.clan.to_s,:avater => u1.avater.to_s}.to_json)

@players[@players.keys[0]].notify(game_info(@players.keys[0]).to_json)
else
  u1 = User.first(:id => @players.keys[0])
@players[@players.keys[1]].notify({:msg => "battle",:game_id => @id.to_s}.to_json)
@players[@players.keys[1]].notify({:msg => "opponent_info",:username => u1.username.to_s,:rank => u1.rank.to_s,:wins => u1.wins.to_s,:losses => u1.losses.to_s,:streak => u1.streak.to_s,:team => u1.team.to_s,:clan => u1.clan.to_s,:avater => u1.avater.to_s}.to_json)
@players[@players.keys[1]].notify(game_info(@players.keys[1]).to_json)
end
end

def checkItem(item)
a = [100, 500]

case item
when "c13"
a[1] += 100
when "c14"
a[1] += 200
when "c15"
a[0] += 20
when "c16"
a[0] += 40
when "o9"
a[1] += 300
when "o10"
a[1] += 400
when "o11"
a[0] += 60
when "o12"
a[0] += 80
when "r8"
a[1] += 500
when "r9"
a[0] += 100
end

return a
end

def surrender(loser_id)

if @players.keys[0] == loser_id

team = @players[@players.keys[1]].team
team2 = @players[@players.keys[0]].team

losing_user = User.first(:id => @players.keys[0])
winning_user = User.first(:id => @players.keys[1])

w_s = JSON.parse(winning_user.stats)
l_s = JSON.parse(losing_user.stats)
user_old = [winning_user.rank,winning_user.power_level,winning_user.percent,winning_user.money]
loser_old = [losing_user.rank,losing_user.power_level,losing_user.percent,losing_user.money]
bg1 = Battlelog.create(:winner => winning_user.username,:vs => "#{@players[@players.keys[1]].type}: #{winning_user.username} vs #{losing_user.username}")
bg2 = Battlelog.create(:winner => winning_user.username,:vs => "#{@players[@players.keys[1]].type}: #{winning_user.username} vs #{losing_user.username}")
winning_user.battlelogs << bg1
losing_user.battlelogs << bg2

puts "Type: #{@players[@players.keys[1]].type}"
if @players[@players.keys[1]].type == "Society"
a = [100, 250]

winner = @players[@players.keys[1]]
loser = @players[@players.keys[0]]

team[3][team[3]['item']] = winner.characters.values[3].info
winning_user.items = team[3].to_json

team2[3][team2[3]['item']] = loser.characters.values[3].info
losing_user.items = team2[3].to_json

team.pop
team2.pop

losing_user.losses += 1
losing_user.power_level += 0
losing_user.average = (losing_user.wins / (losing_user.wins + losing_user.losses).to_f * 100).round(2)
winning_user.wins += 1

winning_user.money += a[1]
a = userRanking(winning_user, losing_user,true)

winning_user.percent = a[0]
winning_user.power_level = a[1]
winning_user.rank = a[2]
winning_user.promotion = a[3]
winning_user.nextLevel = a[4]

a = userRanking(losing_user,winning_user, true)

losing_user.percent = a[0]
losing_user.power_level = a[1]
losing_user.rank = a[2]
losing_user.promotion = a[3]
losing_user.nextLevel = a[4]

winning_user.average = (winning_user.wins / (winning_user.wins + winning_user.losses).to_f * 100).round(2)

puts winning_user.members.first(:status => "Joined")
winning_planet = winning_user.members.first(:status => "Joined").source
losing_planet = losing_user.members.first(:status => "Joined").source

winning_planet.wins += 1
winning_planet.money += 250
winning_planet.reputation += 50
winning_planet.power_level  += 200
winning_planet.average = (winning_planet.wins / (winning_planet.wins + winning_planet.losses).to_f * 100).round(2)

losing_planet.losses += 1
losing_planet.health -= 5

if losing_planet.health == 0
losing_planet.health =  losing_planet.max_health
winning_planet.money += 10000
losing_planet.money -= 10000
end
losing_planet.average = (losing_planet.wins / (losing_planet.wins + losing_planet.losses).to_f * 100).round(2)

#winning_user.health -= 5
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

if winning_user.streak > winning_user.high_streak
winning_user.high_streak = winning_user.streak
end

#--------------------------------------------------#
s = Statics.first
staticsInfo = JSON.parse(s.info)


if staticsInfo.key? (team[0])
staticsInfo[team[0]][0] += 1
staticsInfo[team[0]][2] = (staticsInfo[team[0]][0]  / (staticsInfo[team[0]][0]  + staticsInfo[team[0]][1] ).to_f * 100).round(2)
staticsInfo[team[0]][3] += 1
else
staticsInfo[team[0]] = []
staticsInfo[team[0]][0] = 1
staticsInfo[team[0]][1] = 0
staticsInfo[team[0]][2] = (staticsInfo[team[0]][0]  / (staticsInfo[team[0]][0]  + staticsInfo[team[0]][1] ).to_f * 100).round(2)
staticsInfo[team[0]][3] = 1
#[Win,Losses,Average,Used]
end

if staticsInfo.key? (team[1])
staticsInfo[team[1]][0] += 1
staticsInfo[team[1]][2] = (staticsInfo[team[1]][0]  / (staticsInfo[team[1]][0]  + staticsInfo[team[1]][1] ).to_f * 100).round(2)
staticsInfo[team[1]][3] += 1
else
staticsInfo[team[1]] = []
staticsInfo[team[1]][0] = 1
staticsInfo[team[1]][1] = 0
staticsInfo[team[1]][2] = (staticsInfo[team[1]][0]  / (staticsInfo[team[1]][0]  + staticsInfo[team[1]][1] ).to_f * 100).round(2)
staticsInfo[team[1]][3] = 1
end

if staticsInfo.key? (team[2])
staticsInfo[team[2]][0] += 1
staticsInfo[team[2]][2] = (staticsInfo[team[2]][0]  / (staticsInfo[team[2]][0]  + staticsInfo[team[2]][1] ).to_f * 100).round(2)
staticsInfo[team[2]][3] += 1  
else
staticsInfo[team[2]] = []  
staticsInfo[team[2]][0] = 1
staticsInfo[team[2]][1] = 0
staticsInfo[team[2]][2] = (staticsInfo[team[2]][0]  / (staticsInfo[team[2]][0]  + staticsInfo[team[2]][1] ).to_f * 100).round(2)
staticsInfo[team[2]][3] = 1  
end

#--------------------------------------------------#
if staticsInfo.key? (team2[0])
staticsInfo[team2[0]][1] += 1
staticsInfo[team2[0]][2] = (staticsInfo[team2[0]][0]  / (staticsInfo[team2[0]][0]  + staticsInfo[team2[0]][1] ).to_f * 100).round(2)
staticsInfo[team2[0]][3] += 1
else
staticsInfo[team2[0]] = []
staticsInfo[team2[0]][0] = 0
staticsInfo[team2[0]][1] = 1
staticsInfo[team2[0]][2] = (staticsInfo[team2[0]][0]  / (staticsInfo[team2[0]][0]  + staticsInfo[team2[0]][1] ).to_f * 100).round(2)
staticsInfo[team2[0]][3] = 1
#[Win,Losses,Average,Used]

end

if staticsInfo.key? (team2[1])
staticsInfo[team2[1]][1] += 1
staticsInfo[team2[1]][2] = (staticsInfo[team2[1]][0]  / (staticsInfo[team2[1]][0]  + staticsInfo[team2[1]][1] ).to_f * 100).round(2)
staticsInfo[team2[1]][3] += 1
else
staticsInfo[team2[1]] = []
staticsInfo[team2[1]][0] = 0
staticsInfo[team2[1]][1] = 1
staticsInfo[team2[1]][2] = (staticsInfo[team2[1]][0]  / (staticsInfo[team2[1]][0]  + staticsInfo[team2[1]][1] ).to_f * 100).round(2)
staticsInfo[team2[1]][3] = 1
end

if staticsInfo.key? (team2[2])
staticsInfo[team2[2]][1] += 1
staticsInfo[team2[2]][2] = (staticsInfo[team2[2]][0]  / (staticsInfo[team2[2]][0]  + staticsInfo[team2[2]][1] ).to_f * 100).round(2)
staticsInfo[team2[2]][3] += 1 
else
staticsInfo[team2[2]] = []
staticsInfo[team2[2]][0] = 0
staticsInfo[team2[2]][1] = 1
staticsInfo[team2[2]][2] = (staticsInfo[team2[2]][0]  / (staticsInfo[team2[2]][0]  + staticsInfo[team2[2]][1] ).to_f * 100).round(2)
staticsInfo[team2[2]][3] = 1 
end

teamS = team.to_json
teamS2 = team2.to_json



s.info = staticsInfo.to_json



#--------------------------------------------------#

c1_w = w_s[team[0]]
c2_w = w_s[team[1]]
c3_w = w_s[team[2]]

c1_l = l_s[team2[0]]
c2_l = l_s[team2[1]]
c3_l = l_s[team2[2]]


old_we = [c1_w, c2_w, c3_w]
old_le = [c1_l, c2_l, c3_l]# stats[mn_s 0, mn_k 1, mn_d 2, extra_s 3, extra_k 4, extra_d 5, Level 6, power_level 7, points 8, points total 9]
c1_w[1] += 50
c2_w[1] += 50
c3_w[1] += 50


c1_w = characterRanking(c1_w)
c2_w = characterRanking(c2_w)
c3_w = characterRanking(c3_w)

new_we = [c1_w, c2_w, c3_w]
new_le = [c1_l, c2_l, c3_l]

w_s[team[0]] = c1_w
w_s[team[1]] = c2_w
w_s[team[2]] = c3_w

user_new = [winning_user.rank,winning_user.power_level,winning_user.percent,winning_user.money,winning_user.nextLevel,winning_user.promotion]
loser_new = [losing_user.rank,losing_user.power_level,losing_user.percent,losing_user.money,losing_user.nextLevel]

questinfo = JSON.parse(winning_user.quest)
a = quest(questinfo, winner, team,true,)
winning_user.quest = a.to_json

questinfo = JSON.parse(losing_user.quest)
a = quest(questinfo, loser, team,false)
losing_user.quest = a.to_json


winning_user.stats = (w_s.to_json).to_s

# stats[mn_hp 0, mn_ep 1, mn_s 2, mn_k 3, mn_d 4, extra_s 5, extra_k 6, extra_d 7, Level 8, power_level 9, points 10, points total 11]

losing_planet.save
winning_planet.save
losing_user.save
winning_user.save
s.save


@players[@players.keys[1]].notify({:msg => "user_info",:victory => true,:player_id => winning_user.id.to_s,:avater => winning_user.avater.to_s, :username => winning_user.username.to_s,:rank => winning_user.rank.to_s,:wins => winning_user.wins.to_s,:losses => winning_user.losses.to_s,:streak => winning_user.streak.to_s,:team => winning_user.team.to_s,:skill => winning_user.skill.to_s,:stats => winning_user.stats,:clan => winning_user.clan,:money => winning_user.money,:quest => winning_user.quest,:uc => winning_user.unlockcharacters,:us => winning_user.unlockskills, :items => winning_user.items,:old => old_we.to_s,:new => new_we.to_s,:olduser => user_old,:newuser => user_new}.to_json)
@players[@players.keys[0]].notify({:msg => "user_info",:victory => false,:player_id => losing_user.id.to_s,:avater => losing_user.avater.to_s,:username => losing_user.username.to_s,:rank => losing_user.rank.to_s,:wins => losing_user.wins.to_s,:losses => losing_user.losses.to_s,:streak => losing_user.streak.to_s,:team => losing_user.team.to_s,:skill => losing_user.skill.to_s,:stats => losing_user.stats,:clan => losing_user.clan,:money => losing_user.money,:quest => losing_user.quest,:uc => losing_user.unlockcharacters,:us => losing_user.unlockskills, :items => losing_user.items,:old => old_le.to_s,:new => new_le.to_s,:olduser => loser_old,:newuser => loser_new}.to_json)

else
c1_w = w_s[team[0]]
c2_w = w_s[team[1]]
c3_w = w_s[team[2]]

c1_l = l_s[team2[0]]
c2_l = l_s[team2[1]]
c3_l = l_s[team2[2]]
old_we = [c1_w, c2_w, c3_w]
old_le = [c1_l, c2_l, c3_l]


@players[@players.keys[1]].notify({:msg => "user_info",:victory => true,:player_id => winning_user.id.to_s,:avater => winning_user.avater.to_s, :username => winning_user.username.to_s,:rank => winning_user.rank.to_s,:wins => winning_user.wins.to_s,:losses => winning_user.losses.to_s,:streak => winning_user.streak.to_s,:team => winning_user.team.to_s,:skill => winning_user.skill.to_s,:stats => winning_user.stats,:clan => winning_user.clan,:money => winning_user.money,:quest => winning_user.quest,:uc => winning_user.unlockcharacters,:us => winning_user.unlockskills, :items => winning_user.items,:old => old_we.to_s,:new => new_we.to_s,:olduser => user_old,:newuser => user_new}.to_json)
@players[@players.keys[0]].notify({:msg => "user_info",:victory => false,:player_id => losing_user.id.to_s,:avater => losing_user.avater.to_s,:username => losing_user.username.to_s,:rank => losing_user.rank.to_s,:wins => losing_user.wins.to_s,:losses => losing_user.losses.to_s,:streak => losing_user.streak.to_s,:team => losing_user.team.to_s,:skill => losing_user.skill.to_s,:stats => losing_user.stats,:clan => losing_user.clan,:money => losing_user.money,:quest => losing_user.quest,:uc => losing_user.unlockcharacters,:us => losing_user.unlockskills, :items => losing_user.items,:old => old_le.to_s,:new => new_le.to_s,:olduser => loser_old,:newuser => loser_new}.to_json)

losing_user.save
winning_user.save
end

else #Player 2

losing_user = User.first(:id => @players.keys[1])
winning_user = User.first(:id => @players.keys[0])

team = @players[@players.keys[0]].team
team2 = @players[@players.keys[1]].team


w_s = JSON.parse(winning_user.stats)
l_s = JSON.parse(losing_user.stats)
user_old = [winning_user.rank,winning_user.power_level,winning_user.percent,winning_user.money,winning_user.promotion]
loser_old = [losing_user.rank,losing_user.power_level,losing_user.percent,losing_user.money]
bg1 = Battlelog.create(:winner => winning_user.username,:vs => "#{@players[@players.keys[1]].type}: #{winning_user.username} vs #{losing_user.username}")
bg2 = Battlelog.create(:winner => winning_user.username,:vs => "#{@players[@players.keys[1]].type}: #{winning_user.username} vs #{losing_user.username}")
winning_user.battlelogs << bg1
losing_user.battlelogs << bg2


user_old = [winning_user.rank,winning_user.power_level,winning_user.percent,winning_user.money,winning_user.promotion]
loser_old = [losing_user.rank,losing_user.power_level,losing_user.percent,losing_user.money]

if @players[@players.keys[1]].type == "Society"
a = [100, 250]

winner = @players[@players.keys[0]]
loser = @players[@players.keys[1]]

team[3][team[3]['item']] = players[@players.keys[0]].characters.values[3].info
winning_user.items = team[3].to_json

team2[3][team2[3]['item']] = players[@players.keys[1]].characters.values[3].info
losing_user.items = team2[3].to_json

team.pop
team2.pop

losing_user.losses += 1
losing_user.power_level += 0
losing_user.average = (losing_user.wins / (losing_user.wins + losing_user.losses).to_f * 100).round(2)
winning_user.wins += 1

winning_user.money += a[1]

a = userRanking(winning_user, losing_user,true)
winning_user.percent = a[0]
winning_user.power_level = a[1]
winning_user.rank = a[2]
winning_user.promotion = a[3]
winning_user.nextLevel = a[4]

a = userRanking( losing_user,winning_user,false)
losing_user.percent = a[0]
losing_user.power_level = a[1]
losing_user.rank = a[2]
losing_user.promotion = a[3]
losing_user.nextLevel = a[4]

winning_user.average = (winning_user.wins / (winning_user.wins + winning_user.losses).to_f * 100).round(2)
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

if winning_user.streak > winning_user.high_streak
winning_user.high_streak = winning_user.streak
end

w_s = JSON.parse(winning_user.stats)
l_s = JSON.parse(losing_user.stats)

puts winning_user.members.first(:status => "Joined")
winning_planet = winning_user.members.first(:status => "Joined").source
losing_planet = losing_user.members.first(:status => "Joined").source

winning_planet.wins += 1
winning_planet.money += 250
winning_planet.reputation += 50
winning_planet.power_level  += 200
winning_planet.average = (winning_planet.wins / (winning_planet.wins + winning_planet.losses).to_f * 100).round(2)

losing_planet.losses += 1
losing_planet.health -= 5
if losing_planet.health == 0
losing_planet.health =  losing_planet.max_health
winning_planet.money += 10000
winning_planet.money -= 10000
end

losing_planet.average = (losing_planet.wins / (losing_planet.wins + losing_planet.losses).to_f * 100).round(2)

#--------------------------------------------------#
s = Statics.first
staticsInfo = JSON.parse(s.info)

if staticsInfo.key? (team[0])
staticsInfo[team[0]][0] += 1
staticsInfo[team[0]][2] = (staticsInfo[team[0]][0]  / (staticsInfo[team[0]][0]  + staticsInfo[team[0]][1] ).to_f * 100).round(2)
staticsInfo[team[0]][3] += 1
else
staticsInfo[team[0]] = []
staticsInfo[team[0]][0] = 1
staticsInfo[team[0]][1] = 0
staticsInfo[team[0]][2] = (staticsInfo[team[0]][0]  / (staticsInfo[team[0]][0]  + staticsInfo[team[0]][1] ).to_f * 100).round(2)
staticsInfo[team[0]][3] = 1
#[Win,Losses,Average,Used]
end

if staticsInfo.key? (team[1])
staticsInfo[team[1]][0] += 1
staticsInfo[team[1]][2] = (staticsInfo[team[1]][0]  / (staticsInfo[team[1]][0]  + staticsInfo[team[1]][1] ).to_f * 100).round(2)
staticsInfo[team[1]][3] += 1
else
staticsInfo[team[1]] = []
staticsInfo[team[1]][0] = 1
staticsInfo[team[1]][1] = 0
staticsInfo[team[1]][2] = (staticsInfo[team[1]][0]  / (staticsInfo[team[1]][0]  + staticsInfo[team[1]][1] ).to_f * 100).round(2)
staticsInfo[team[1]][3] = 1
end

if staticsInfo.key? (team[2])
staticsInfo[team[2]][0] += 1
staticsInfo[team[2]][2] = (staticsInfo[team[2]][0]  / (staticsInfo[team[2]][0]  + staticsInfo[team[2]][1] ).to_f * 100).round(2)
staticsInfo[team[2]][3] += 1  
else
staticsInfo[team[2]] = []  
staticsInfo[team[2]][0] = 1
staticsInfo[team[2]][1] = 0
staticsInfo[team[2]][2] = (staticsInfo[team[2]][0]  / (staticsInfo[team[2]][0]  + staticsInfo[team[2]][1] ).to_f * 100).round(2)
staticsInfo[team[2]][3] = 1  
end

#--------------------------------------------------#
if staticsInfo.key? (team2[0])
staticsInfo[team2[0]][1] += 1
staticsInfo[team2[0]][2] = (staticsInfo[team2[0]][0]  / (staticsInfo[team2[0]][0]  + staticsInfo[team2[0]][1] ).to_f * 100).round(2)
staticsInfo[team2[0]][3] += 1
else
staticsInfo[team2[0]] = []
staticsInfo[team2[0]][0] = 0
staticsInfo[team2[0]][1] = 1
staticsInfo[team2[0]][2] = (staticsInfo[team2[0]][0]  / (staticsInfo[team2[0]][0]  + staticsInfo[team2[0]][1] ).to_f * 100).round(2)
staticsInfo[team2[0]][3] = 1
#[Win,Losses,Average,Used]

end

if staticsInfo.key? (team2[1])
staticsInfo[team2[1]][1] += 1
staticsInfo[team2[1]][2] = (staticsInfo[team2[1]][0]  / (staticsInfo[team2[1]][0]  + staticsInfo[team2[1]][1] ).to_f * 100).round(2)
staticsInfo[team2[1]][3] += 1
else
staticsInfo[team2[1]] = []
staticsInfo[team2[1]][0] = 0
staticsInfo[team2[1]][1] = 1
staticsInfo[team2[1]][2] = (staticsInfo[team2[1]][0]  / (staticsInfo[team2[1]][0]  + staticsInfo[team2[1]][1] ).to_f * 100).round(2)
staticsInfo[team2[1]][3] = 1
end

if staticsInfo.key? (team2[2])
staticsInfo[team2[2]][1] += 1
staticsInfo[team2[2]][2] = (staticsInfo[team2[2]][0]  / (staticsInfo[team2[2]][0]  + staticsInfo[team2[2]][1] ).to_f * 100).round(2)
staticsInfo[team2[2]][3] += 1 
else
staticsInfo[team2[2]] = []
staticsInfo[team2[2]][0] = 0
staticsInfo[team2[2]][1] = 1
staticsInfo[team2[2]][2] = (staticsInfo[team2[2]][0]  / (staticsInfo[team2[2]][0]  + staticsInfo[team2[2]][1] ).to_f * 100).round(2)
staticsInfo[team2[2]][3] = 1 
end

teamS = team.to_json
teamS2 = team2.to_json



s.info = staticsInfo.to_json



#--------------------------------------------------#

c1_w = w_s[team[0]]
c2_w = w_s[team[1]]
c3_w = w_s[team[2]]

c1_l = l_s[team2[0]]
c2_l = l_s[team2[1]]
c3_l = l_s[team2[2]]

old_we = [c1_w, c2_w, c3_w]
old_le = [c1_l, c2_l, c3_l]
c1_w[1] += 50
c2_w[1] += 50
c3_w[1] += 50


c1_w = characterRanking(c1_w)
c2_w = characterRanking(c2_w)
c3_w = characterRanking(c3_w)


new_we = [c1_w, c2_w, c3_w]
new_le = [c1_l, c2_l, c3_l]

w_s[team[0]] = c1_w
w_s[team[1]] = c2_w
w_s[team[2]] = c3_w


user_new = [winning_user.rank,winning_user.power_level,winning_user.percent,winning_user.money,winning_user.nextLevel,winning_user.promotion]
loser_new = [losing_user.rank,losing_user.power_level,losing_user.percent,losing_user.money,losing_user.nextLevel]


questinfo = JSON.parse(winning_user.quest)
a = quest(questinfo, winner, team,true)
winning_user.quest = a.to_json

questinfo = JSON.parse(losing_user.quest)
a = quest(questinfo, loser, team,false)
losing_user.quest = a.to_json


winning_user.stats = (w_s.to_json).to_s
losing_planet.save
winning_planet.save
losing_user.save
winning_user.save
s.save

@players[@players.keys[0]].notify({:msg => "user_info",:victory => true,:player_id => winning_user.id.to_s,:avater => winning_user.avater.to_s, :username => winning_user.username.to_s,:rank => winning_user.rank.to_s,:wins => winning_user.wins.to_s,:losses => winning_user.losses.to_s,:streak => winning_user.streak.to_s,:team => winning_user.team.to_s,:skill => winning_user.skill.to_s,:stats => winning_user.stats,:clan => winning_user.clan,:money => winning_user.money,:quest => winning_user.quest,:uc => winning_user.unlockcharacters,:us => winning_user.unlockskills, :items => winning_user.items,:old => old_we.to_s,:new => new_we.to_s,:olduser => user_old,:newuser => user_new}.to_json)
@players[@players.keys[1]].notify({:msg => "user_info",:victory => false,:player_id => losing_user.id.to_s,:avater => losing_user.avater.to_s,:username => losing_user.username.to_s,:rank => losing_user.rank.to_s,:wins => losing_user.wins.to_s,:losses => losing_user.losses.to_s,:streak => losing_user.streak.to_s,:team => losing_user.team.to_s,:skill => losing_user.skill.to_s,:stats => losing_user.stats,:clan => losing_user.clan,:money => losing_user.money,:quest => losing_user.quest,:uc => losing_user.unlockcharacters,:us => losing_user.unlockskills, :items => losing_user.items,:old => old_le.to_s,:new => new_le.to_s,:olduser => loser_old,:newuser => loser_new}.to_json)

else
  
  puts  "Else #{user.new} "
c1_w = w_s[team[0]]
c2_w = w_s[team[1]]
c3_w = w_s[team[2]]

c1_l = l_s[team2[0]]
c2_l = l_s[team2[1]]
c3_l = l_s[team2[2]]


old_we = [c1_w, c2_w, c3_w]
old_le = [c1_l, c2_l, c3_l]

@players[@players.keys[0]].notify({:msg => "user_info",:victory => true,:player_id => winning_user.id.to_s,:avater => winning_user.avater.to_s, :username => winning_user.username.to_s,:rank => winning_user.rank.to_s,:wins => winning_user.wins.to_s,:losses => winning_user.losses.to_s,:streak => winning_user.streak.to_s,:team => winning_user.team.to_s,:skill => winning_user.skill.to_s,:stats => winning_user.stats,:clan => winning_user.clan,:money => winning_user.money,:quest => winning_user.quest,:uc => winning_user.unlockcharacters,:us => winning_user.unlockskills, :items => winning_user.items,:old => old_we.to_s,:new => new_we.to_s,:olduser => user_old,:newuser => user_new}.to_json)
@players[@players.keys[1]].notify({:msg => "user_info",:victory => false,:player_id => losing_user.id.to_s,:avater => losing_user.avater.to_s,:username => losing_user.username.to_s,:rank => losing_user.rank.to_s,:wins => losing_user.wins.to_s,:losses => losing_user.losses.to_s,:streak => losing_user.streak.to_s,:team => losing_user.team.to_s,:skill => losing_user.skill.to_s,:stats => losing_user.stats,:clan => losing_user.clan,:money => losing_user.money,:quest => losing_user.quest,:uc => losing_user.unlockcharacters,:us => losing_user.unlockskills, :items => losing_user.items,:old => old_le.to_s,:new => new_le.to_s,:olduser => loser_old,:newuser => loser_new}.to_json)


losing_user.save
winning_user.save
end

end

@game_controller.end_game(@id, @players)
end

def ladder(user)

end

def userRanking(user,target,outcome)
promotion = JSON.parse(user.promotion)
power_level = user.power_level
percent = user.percent
rank = user.rank

if outcome
case user.rank
when "D"
if user.power_level >= 5001
rank = "C"
nextLevel = 5000 - power_level
elsif target.rank == "D"
power_level += 350
percent = ((power_level.to_f / 5000.0 ) * 100).ceil
nextLevel = 5000 - power_level
else
power_level += 500
percent = ((power_level.to_f / 5000.0 ) * 100).ceil
nextLevel = 5000 - power_level
end

when "C"
if power_level >= 10001 
rank = "B"
nextLevel = 15000 - power_level
elsif target.rank == "D"
power_level += 250
percent = ((power_level.to_f / 15000.0 ) * 100).ceil
nextLevel = 15000 - power_level
elsif target.rank == "C"
power_level += 350
percent = ((power_level.to_f / 15000.0 ) * 100).ceil
nextLevel = 15000 - power_level
else
power_level += 500
percent = ((power_level.to_f / 15000.0 ) * 100).ceil
nextLevel = 15000 - power_level
end


when "B"
if power_level >= 20000

promotion[0] += 1
promotion[2] += 1


if promotion[2] >= 5 && promotion[0] >= 3
promotion = [0,0,0]
rank = "A"
nextLevel = 30000 - power_level
end

elsif target.rank == "D" || target.rank == "C"
power_level += 250
percent = ((power_level.to_f / 20000.0 ) * 100).ceil
nextLevel = 20000 - power_level
elsif target.rank == "B"
power_level += 350
percent = ((power_level.to_f / 20000.0 ) * 100).ceil
nextLevel = 20000 - power_level
else
power_level += 500  
percent = ((power_level.to_f / 20000.0 ) * 100).ceil
nextLevel = 20000 - power_level
end

when "A"
if power_level >= 30001
promotion[0] += 1
promotion[2] += 1
nextLevel = 0

if promotion[2] >= 5 && promotion[0] >= 3
promotion = [0,0,0]
rank = "S"
nextLevel = 40000 - power_level
end

elsif target.rank == "D" || target.rank == "C" || target.rank == "B"
power_level += 250
percent = ((power_level.to_f / 30000.0 ) * 100).ceil
nextLevel = 30000 - power_level
elsif target.rank == "A"
power_level += 350
percent = ((power_level.to_f / 30000.0 ) * 100).ceil
nextLevel = 30000 - power_level
else
power_level += 500  
percent = ((power_level.to_f / 30000.0 ) * 100).ceil
nextLevel = 30000 - power_level
end
when "S"
if power_level >= 40001
promotion[0] += 1
promotion[2] += 1

nextLevel = 0
if promotion[2] >= 5 && promotion[0] >= 3
promotion = [0,0,0]
rank = "Z"
nextLevel = 50000 - power_level
end

elsif target.rank == "D" || target.rank == "C" || target.rank == "B" || target.rank == "A"
power_level += 250
percent = ((power_level.to_f / 40000.0 ) * 100).ceil
nextLevel = 40000 - power_level
elsif target.rank == "S"
power_level += 350
percent = ((power_level.to_f / 40000.0 ) * 100).ceil
nextLevel = 40000 - power_level
else
power_level += 500 
percent = ((power_level.to_f / 40000.0 ) * 100).ceil
nextLevel = 40000 - power_level
end

when "Z"
if target.rank == "Z" 
power_level+= 500
percent = 100
else
power_level+= 250 
percent = 100
end
end
else
case user.rank
when "D"
if power_level>= 5001

end
percent = ((power_level.to_f / 5000.0 ) * 100).ceil
when "C"
if power_level >= 15001 

elsif target.rank == "D" 
power_level-= 125
percent = ((power_level.to_f / 20000.0 ) * 100).ceil
nextLevel = 20000 - power_level
elsif target.rank == "C"
power_level-= 87.5
percent = ((power_level.to_f / 20000.0 ) * 100).ceil
nextLevel = 20000 - power_level
else
power_level-= 62.5  
percent = ((power_level.to_f / 20000.0 ) * 100).ceil
nextLevel = 20000 - power_level
end

percent = ((power_level.to_f / 15000.0 ) * 100).ceil

when "B"
if power_level >= 20001

promotion[1] += 1
promotion[2] += 1

if promotion[2] >= 5 && promotion[1] >= 3
promotion = [0,0,0]
rank = "A"
end

elsif target.rank == "D" || target.rank == "C"
power_level -= 200
percent = ((power_level.to_f / 20000.0 ) * 100).ceil
nextLevel = 20000 - power_level
elsif target.rank == "B"
power_level-= 140
percent = ((power_level.to_f / 20000.0 ) * 100).ceil
nextLevel = 20000 - power_level
else
power_level-= 100  
percent = ((power_level.to_f / 20000.0 ) * 100).ceil
nextLevel = 20000 - power_level
end


when "A"
if power_level >= 30001
promotion[1] += 1
promotion[2] += 1


if promotion[2] >= 5 && promotion[1] >= 3
promotion = [0,0,0]
rank = "S"
end

elsif target.rank == "D" || target.rank == "C" || target.rank == "B"
power_level-= 250
percent = ((power_level.to_f / 30000.0 ) * 100).ceil
nextLevel = 30000 - power_level
elsif target.rank == "A"
power_level-= 175
percent = ((power_level.to_f / 30000.0 ) * 100).ceil
nextLevel = 30000 - power_level
else
power_level-= 125
percent = ((power_level.to_f / 30000.0 ) * 100).ceil
nextLevel = 30000 - power_level
end
when "S"
if power_level >= 40001
promotion[1] += 1
promotion[2] += 1

if promotion[2] >= 5 && promotion[1] >= 3
promotion = [0,0,0]
rank = "Z"
end

elsif target.rank == "D" || target.rank == "C" || target.rank == "B" || target.rank == "A"
power_level-= 375
percent = ((power_level.to_f / 40000.0 ) * 100).ceil
nextLevel = 40000 - power_level
elsif target.rank == "S"
power_level-= 262.5
percent = ((power_level.to_f / 40000.0 ) * 100).ceil
nextLevel = 40000 - power_level
else
power_level-= 187.5
percent = ((power_level.to_f / 40000.0 ) * 100).ceil
nextLevel = 40000 - power_level
end

when "Z"
if target.rank == "Z" 
power_level-= 350
else
power_level-= 500

end
percent = 100
end

end

a = [percent,power_level,rank,promotion,nextLevel]
return a
end

def characterRanking(stats)

case stats[0]
when 1
if stats[1] >= 100
stats[0] += 1
stats[1] = 0
stats[2] = 0
stats[3] = 100 - stats[1]

else
stats[2] = ((stats[1].to_f / 100.0 ) * 100).ceil
stats[3] = 100 - stats[1]
end

when 2
if stats[1] >= 200
stats[0] += 1
stats[1] = 0
stats[2] = 0
stats[3] = 200 - stats[1]
else
stats[2] = ((stats[1].to_f / 200.0) * 100).ceil
stats[3] = 200 - stats[1]
end

when 3
if stats[1] >= 400
stats[0] += 1
stats[1] = 0
stats[2] = 0
stats[3] = 400 - stats[1]
else
stats[2] = ((stats[1].to_f / 400.0 )* 100).ceil
stats[3] = 400 - stats[1]
end

when 4
if stats[1] >= 800
stats[0] += 1
stats[1] = 0
stats[2] = 0
stats[3] = 800 - stats[1]
else
stats[2] = ((stats[1].to_f / 800.0 ) * 100).ceil
stats[3] = 800 - stats[1]
end

when 5
if stats[1] >= 1600
stats[0] += 1
stats[1] = 0
stats[2] = 0
stats[3] = 1600 - stats[1]
else
stats[2] = ((stats[1].to_f / 1600.0 ) * 100).ceil
stats[3] = 1600 - stats[1]
end

when 6
if stats[1] >= 3200
stats[0] += 1
stats[1] = 0
stats[2] = 0
stats[3] = 3200 - stats[1]
else
stats[2] = ((stats[1].to_f / 3200.0 ) * 100).ceil
stats[3] = 3200 - stats[1]
end

when 7
if stats[1] >= 6400
stats[0] += 1
stats[1] = 0
stats[2] = 0
stats[3] = 6400 - stats[1]
else
stats[2] = ((stats[1].to_f / 6400.0 ) * 100).ceil
stats[3] = 6400 - stats[1]
end

when 8
if stats[1] >= 12800
stats[0] += 1
stats[1] = 0
stats[2] = 12800 - stats[1]
stats[3] = 12800 - stats[1]
else
stats[2] = ((stats[1].to_f / 12800.0 )* 100).ceil
stats[3] = 12800 - stats[1]
end
end
return stats
end

def quest(list, player_info, team,won)

a = list
for x in 0..2 do

 if a['current'][x] 
  
  if a['conditions'][x][0] == "Victory" && won
  a['conditions'][x][1] += 1
  if a['conditions'][x][1] >=  a['conditions'][x][2]
  a['complete'][x] = true
  end
  
  elsif a['conditions'][x][0] == "Row"
  if won
  a['conditions'][x][1] += 1
  if a['conditions'][x][1] >=  a['conditions'][x][2]
  a['complete'][x] = true
  end
  else
  a['conditions'][x][1] = 0
  end
 
  
  elsif a['conditions'][x][0] == "Damage"
  a['conditions'][x][1] +=  player_info.logs.damage
  if a['conditions'][x][1] >=  a['conditions'][x][2]
  a['complete'][x] = true
  end
  
  #elsif a['conditions'][x][0] == "Character" && won
  #team = player_info.team
  #if team.count(a['conditions'][x][4]) != 0
  #a['conditions'][x][1] += 1
  #end
  #if a['conditions'][x][1] >=  a['conditions'][x][2]
  #a['complete'][x] = true
  #end
  end
end
 
 end #end of current if


return a

end



def end_turn(player_id)

if @players[@players.keys[1]].done && @players[@players.keys[0]].done
@players[@players.keys[1]].done = false
@players[@players.keys[0]].done = false

@players[@players.keys[0]].reset[1] = 0
@players[@players.keys[1]].reset[1] = 0

loginfo = JSON.parse(@players[@players.keys[0]].logs.battlelogs)
currentinfo = @players[@players.keys[0]].logs.currentlogs

oldarray = [@players[@player1].characters[@players[@player1].characters.keys[0]], @players[@player1].characters[@players[@player1].characters.keys[1]], @players[@player1].characters[@players[@player1].characters.keys[2]], @players[@player2].characters[@players[@player2].characters.keys[0]], @players[@player2].characters[@players[@player2].characters.keys[1]], @players[@player2].characters[@players[@player2].characters.keys[2]]]
oldarray.shuffle
newarray = oldarray.sort_by { | i | i.speed}.reverse

newarray[0].rush(newarray[0].attacked,currentinfo)
newarray[1].rush(newarray[1].attacked,currentinfo)
newarray[2].rush(newarray[2].attacked,currentinfo)
newarray[3].rush(newarray[3].attacked,currentinfo)
newarray[4].rush(newarray[4].attacked,currentinfo)
newarray[5].rush(newarray[5].attacked,currentinfo)

h = newarray[0].attacked
newarray[0].skills(h[0], h[2],currentinfo)
h = newarray[1].attacked
newarray[1].skills(h[0], h[2],currentinfo)
h = newarray[2].attacked
newarray[2].skills(h[0], h[2],currentinfo)
h = newarray[3].attacked
newarray[3].skills(h[0], h[2],currentinfo)
h = newarray[4].attacked
newarray[4].skills(h[0], h[2],currentinfo)
h = newarray[5].attacked
newarray[5].skills(h[0], h[2],currentinfo)


newarray[0].currentEffects
newarray[1].currentEffects
newarray[2].currentEffects
newarray[3].currentEffects
newarray[4].currentEffects
newarray[5].currentEffects
newarray[0].next_turn
newarray[1].next_turn
newarray[2].next_turn
newarray[3].next_turn
newarray[4].next_turn
newarray[5].next_turn

turn = loginfo[turn]
loginfo[turn] = currentinfo
loginfo['turn'] += 1;
loginfo = loginfo.to_json
@players[@players.keys[0]].logs.battlelogs = loginfo

@players[@players.keys[1]].bp += 3
@players[@players.keys[0]].bp += 3

if @players[@players.keys[0]].bp < 0
@players[@players.keys[0]].bp = 0
end
if @players[@players.keys[1]].bp < 0
@players[@players.keys[1]].bp = 0
end

@players[@players.keys[0]].notify(game_info(@players.keys[0]).to_json)
@players[@players.keys[1]].notify(game_info(@players.keys[1]).to_json)
@players[@players.keys[0]].logs.currentlogs = []

elsif player_id == @player1 

@players[@players.keys[0]].done = true

if @players[@player2].check_connect
@players[@players.keys[0]].notify(win(@players.keys[0]).to_json)
@players[@players.keys[1]].notify(lose(@players.keys[1]).to_json)
elsif @players[@player2].reset[1] == 12
@players[@players.keys[0]].notify(win(@players.keys[0]).to_json)
@players[@players.keys[1]].notify(lose(@players.keys[1]).to_json)

end

elsif player_id == @player2 


@players[@players.keys[1]].done = true

if @players[@player1].check_connect
@players[@players.keys[1]].notify(win(@players.keys[1]).to_json)
@players[@players.keys[0]].notify(lose(@players.keys[0]).to_json)
elsif @players[@player1].reset[1] == 12
@players[@players.keys[1]].notify(win(@players.keys[1]).to_json)
@players[@players.keys[0]].notify(lose(@players.keys[0]).to_json)
end

else

end
end


def self.create_team(controlling_player, c, s, stats, item)#(User, Character, Skills, stats, Item)
team = {}
s = [s['s1'], s['s2'], s['s3']]

#c[i]
for i in 0..2
case c[i]
when 'zCu'
team['zCu'] = ChiaotzuZ.new(controlling_player, s[i], stats['zCu'], 130, true, [7, 9, 8, 10],c[i],i,"Chiaotzu Z")
when 'zGu'
team['zGu'] = GokuZ.new(controlling_player, s[i], stats['zGu'], 170, true, [13, 10, 10, 9],c[i],i,"Goku Z")
when 'bKG'
team['bKG'] = KidGoku.new(controlling_player, s[i], stats['bKG'], 160, true, [9, 10, 10, 9],c[i],i,"Kid Goku Z")
when 'zKG'
team['zKG'] = KidGohan.new(controlling_player, s[i], stats['zKG'], 150, true, [10, 10, 9, 8],c[i],i,"Kid Gohan Z")
when 'zKn'
team['zKn'] = KrillinZ.new(controlling_player, s[i], stats['zKn'], 160, true, [10, 12, 9, 9],c[i],i,"Krillin Z")
when 'zRi'
team['zRi'] = Roshi.new(controlling_player, s[i], stats['zRi'], 160, true, [6, 12, 9, 9],c[i],i,"Roshi")
when 'zNa'
team['zNa'] = Nappa.new(controlling_player, s[i], stats['zNa'], 170, true, [11, 11, 12, 8],c[i],i,"Nappa")
when 'zPo'
team['zPo'] = PiccoloZ.new(controlling_player, s[i], stats['zPo'], 190, true, [8, 8, 15, 9],c[i],i,"Piccolo Z")
when 'zNl'
team['zNl'] = Nail.new(controlling_player, s[i], stats['zNl'], 190, true, [8, 8, 15, 10],c[i],i,"Nail")
when 'zRz'
team['zRz'] = Raditz.new(controlling_player, s[i], stats['zRz'], 170, true, [10,10,11,11],c[i],i,"Raditz Z")
when 'zSn'
team['zSn'] = Saibamen.new(controlling_player, s[i], stats['zSn'], 130, true, [5, 5, 5, 10],c[i],i,"Saibamen Z")
when 'zSV'
team['zSV'] = ScouterVegeta.new(controlling_player, s[i], stats['zSV'], 170, true, [10, 13, 10, 10],c[i],i,"Scouter Vegeta")
when 'zTn'
team['zTn'] = TienZ.new(controlling_player, s[i], stats['zTn'], 150, true, [10, 13, 10, 9],c[i],i,"Tien Z")
when 'zYe'
team['zYe'] = YajirobeZ.new(controlling_player, s[i], stats['zYe'], 150, true, [10, 7, 12, 7],c[i],i,"Yajirobe Z")
when 'zYa'
team['zYa'] = YamchaZ.new(controlling_player, s[i], stats['zYa'], 150, true, [10, 10, 10, 11],c[i],i,"Yamcha Z")
when 'zKk'
team['zKk'] = KingKai.new(controlling_player, s[i], stats['zYa'], 160, true, [8, 10, 11, 9],c[i],i,"King Kai")
when 'zGo'
team['zGo'] = Guldo.new(controlling_player, s[i], stats['zYa'], 160, true, [8, 10, 11, 9],c[i],i,"Guldo Z")
when 'zRe'
team['zRe'] = Reccome.new(controlling_player, s[i], stats['zRe'], 160, true, [10, 11, 10, 10],c[i],i,"Reccome Z")
when 'zJe'
team['zJe'] = Jeice.new(controlling_player, s[i], stats['zJe'], 170, true, [10, 11, 10, 9],c[i],i,"Jeice Z")
when 'zBr'
team['zBr'] = Burter.new(controlling_player, s[i], stats['zBr'], 170, true, [11, 7, 10, 12],c[i],i,"Burter Z")
when 'zGy'
team['zGy'] = Ginyu.new(controlling_player, s[i], stats['zGy'], 170, true, [11, 7, 10, 12],c[i],i,"Ginyu Z")
when 'zCi'
team['zCi'] = Cui.new(controlling_player, s[i], stats['zCi'], 150, true, [10, 10, 10, 10],c[i],i,"Cui")
when 'zGJ'
team['zGJ'] = GarlicJr.new(controlling_player, s[i], stats['zGJ'], 160, true, [9, 9, 9, 9],c[i],i,"Garlic Jr ")
when 'zCr'
team['zCr'] = Cooler.new(controlling_player, s[i], stats['zCr'], 170, true, [9, 10, 9, 9],c[i],i,"Cooler ")
when 'zDa'
team['zDa'] = Dodoria.new(controlling_player, s[i], stats['zDa'], 170, true, [8, 10, 9, 9],c[i],i,"Dodoria ")
when 'zZn'
team['zZn'] = Zarbon.new(controlling_player, s[i], stats['zZn'], 160, true, [8, 10, 9, 11],c[i],i,"Zarbon Z")
when 'zFa'
team['zFa'] = Frieza.new(controlling_player, s[i], stats['zFa'], 160, true, [9, 9, 9, 9],c[i],i,"Frieza Z")
when 'zMa'
team['zMa'] = Medamatcha.new(controlling_player, s[i], stats['zMa'], 170, true, [8, 9, 9, 8],c[i],i,"Medamatcha Z")
when 'zNy'
team['zNy'] = Nicky.new(controlling_player, s[i], stats['zNy'], 160, true, [11, 11, 9, 9],c[i],i,"Nicky Z")
when 'zGr'
team['zGr'] = Ginger.new(controlling_player, s[i], stats['zGr'], 160, true, [9, 9, 9, 9],c[i],i,"Ginger Z")
when 'zSo'
team['zSo'] = Sansho.new(controlling_player, s[i], stats['zSo'], 170, true, [9, 10, 10, 9],c[i],i,"Sansho Z")
when 'zDe'
team['zDe'] = Dende.new(controlling_player, s[i], stats['zDe'], 160, true, [5, 6, 12, 11],c[i],i,"Dende Z")
when 'zDo'
team['zDo'] = DrWheelo.new(controlling_player, s[i], stats['zDo'], 160, true, [8, 8, 11, 10],c[i],i,"Dr Wheelo")
when "zTs"
 team["zTs"] = Turles.new(controlling_player, s[i], stats["zTs"], 170, true, [7,9,9,9],c[i],i,"Turles Z")
end
end

team['item'] = Item.new(controlling_player, item['item'], item[item['item']], 0, false, 0,0,0,0)
return team
end


def game_info(player_id)
if player_id == @players.keys[0]

y_c1 = @players[@players.keys[0]].characters[@players[@players.keys[0]].characters.keys[0]]
y_c2 = @players[@players.keys[0]].characters[@players[@players.keys[0]].characters.keys[1]]
y_c3 = @players[@players.keys[0]].characters[@players[@players.keys[0]].characters.keys[2]]
y_u = @players[@players.keys[0]].characters[@players[@players.keys[0]].characters.keys[3]]

o_c1 = @players[@players.keys[1]].characters[@players[@players.keys[1]].characters.keys[0]]
o_c2 = @players[@players.keys[1]].characters[@players[@players.keys[1]].characters.keys[1]]
o_c3 = @players[@players.keys[1]].characters[@players[@players.keys[1]].characters.keys[2]]
o_u = @players[@players.keys[1]].characters[@players[@players.keys[1]].characters.keys[3]]


your_characters_info = {}
puts "Transformation #{y_c1.transformation}"
puts "Transformation #{y_c1.skillhold}"
your_characters_info['y_c1_health'] = y_c1.health
your_characters_info['y_c2_health'] = y_c2.health
your_characters_info['y_c3_health'] = y_c3.health
your_characters_info['y_c1_stunned'] = y_c1.stunned
your_characters_info['y_c2_stunned'] = y_c2.stunned
your_characters_info['y_c3_stunned'] = y_c3.stunned
your_characters_info['y_c1_block'] = y_c1.block
your_characters_info['y_c2_block'] = y_c2.block
your_characters_info['y_c3_block'] = y_c3.block
your_characters_info['y_c1_energy'] = y_c1.energy
your_characters_info['y_c2_energy'] = y_c2.energy
your_characters_info['y_c3_energy'] = y_c3.energy
your_characters_info['y_c1_strength'] = y_c1.strength
your_characters_info['y_c2_strength'] = y_c2.strength
your_characters_info['y_c3_strength'] = y_c3.strength
your_characters_info['y_c1_ki'] = y_c1.ki
your_characters_info['y_c2_ki'] = y_c2.ki
your_characters_info['y_c3_ki'] = y_c3.ki
your_characters_info['y_c1_defense'] = y_c1.defense
your_characters_info['y_c2_defense'] = y_c2.defense
your_characters_info['y_c3_defense'] = y_c3.defense
your_characters_info['y_c1_cooldown'] = y_c1.cooldown
your_characters_info['y_c2_cooldown'] = y_c2.cooldown
your_characters_info['y_c3_cooldown'] = y_c3.cooldown
your_characters_info['y_c1_conditions'] = y_c1.conditions
your_characters_info['y_c2_conditions'] = y_c2.conditions
your_characters_info['y_c3_conditions'] = y_c3.conditions
your_characters_info['y_c1_effect'] = y_c1.effect.to_s
your_characters_info['y_c2_effect'] = y_c2.effect.to_s
your_characters_info['y_c3_effect'] = y_c3.effect.to_s
your_characters_info['y_c1_skillhold'] = y_c1.skillhold
your_characters_info['y_c2_skillhold'] = y_c2.skillhold
your_characters_info['y_c3_skillhold'] = y_c3.skillhold
your_characters_info['y_c1_experience'] = y_c1.experience.to_s
your_characters_info['y_c2_experience'] = y_c2.experience.to_s
your_characters_info['y_c3_experience'] = y_c3.experience.to_s
your_characters_info['y_c1_speed'] = y_c1.speed.to_s
your_characters_info['y_c2_speed'] = y_c2.speed.to_s
your_characters_info['y_c3_speed'] = y_c3.speed.to_s
your_characters_info['y_c1_max'] = y_c1.max
your_characters_info['y_c2_max'] = y_c2.max
your_characters_info['y_c3_max'] = y_c3.max
your_characters_info['y_c1_transformation'] = y_c1.transformation[1]
your_characters_info['y_c2_transformation'] = y_c2.transformation[1]
your_characters_info['y_c3_transformation'] = y_c3.transformation[1]
your_characters_info['y_u_item'] = y_u.skillhold
your_characters_info['y_u_amount'] = y_u.info
your_characters_info['y_u_cooldown'] = y_u.cooldown
your_characters_info['y_u_stunned'] = y_u.stunned
your_characters_info['y_c_characters'] = [y_c1.info[0],y_c2.info[0],y_c3.info[0]]
puts y_c1.transformation[1]

your_characters_info['o_c1_health'] = o_c1.health
your_characters_info['o_c2_health'] = o_c2.health
your_characters_info['o_c3_health'] = o_c3.health
your_characters_info['o_c1_stunned'] = o_c1.stunned
your_characters_info['o_c2_stunned'] = o_c2.stunned
your_characters_info['o_c3_stunned'] = o_c3.stunned
your_characters_info['o_c1_block'] = o_c1.block
your_characters_info['o_c2_block'] = o_c2.block
your_characters_info['o_c3_block'] = o_c3.block
your_characters_info['o_c1_energy'] = o_c1.energy
your_characters_info['o_c2_energy'] = o_c2.energy
your_characters_info['o_c3_energy'] = o_c3.energy
your_characters_info['o_c1_strength'] = o_c1.strength
your_characters_info['o_c2_strength'] = o_c2.strength
your_characters_info['o_c3_strength'] = o_c3.strength
your_characters_info['o_c1_ki'] = o_c1.ki
your_characters_info['o_c2_ki'] = o_c2.ki
your_characters_info['o_c3_ki'] = o_c3.ki
your_characters_info['o_c1_defense'] = o_c1.defense
your_characters_info['o_c2_defense'] = o_c2.defense
your_characters_info['o_c3_defense'] = o_c3.defense
your_characters_info['o_c1_effect'] = o_c1.effect.to_s
your_characters_info['o_c2_effect'] = o_c2.effect.to_s
your_characters_info['o_c3_effect'] = o_c3.effect.to_s
your_characters_info['o_c1_skillhold'] = o_c1.skillhold
your_characters_info['o_c2_skillhold'] = o_c2.skillhold
your_characters_info['o_c3_skillhold'] = o_c3.skillhold
your_characters_info['o_c1_experience'] = o_c1.experience.to_s
your_characters_info['o_c2_experience'] = o_c2.experience.to_s
your_characters_info['o_c3_experience'] = o_c3.experience.to_s
your_characters_info['o_c1_conditions'] = o_c1.conditions
your_characters_info['o_c2_conditions'] = o_c2.conditions
your_characters_info['o_c3_conditions'] = o_c3.conditions
your_characters_info['o_c1_speed'] = o_c1.speed.to_s
your_characters_info['o_c2_speed'] = o_c2.speed.to_s
your_characters_info['o_c3_speed'] = o_c3.speed.to_s
your_characters_info['o_c1_max'] = o_c1.max
your_characters_info['o_c2_max'] = o_c2.max
your_characters_info['o_c3_max'] = o_c3.max
your_characters_info['o_c1_transformation'] = o_c1.transformation[1]
your_characters_info['o_c2_transformation'] = o_c2.transformation[1]
your_characters_info['o_c3_transformation'] = o_c3.transformation[1]
your_characters_info['o_u_item'] = o_u.skillhold
your_characters_info['o_u_amount'] = o_u.info
your_characters_info['o_c_characters'] = [o_c1.info[0],o_c2.info[0],o_c3.info[0]]

y_c1.attacked = [-1, -1, -1,-1,y_c1.health]
y_c2.attacked = [-1, -1, -1,-1,y_c2.health]
y_c3.attacked = [-1, -1, -1,-1,y_c3.health]


if 1 > y_c1.health + y_c2.health + y_c3.health


return lose(@players.keys[0])

elsif 1 > o_c1.health + o_c2.health + o_c3.health
return win(@players.keys[0])
else
turns = JSON.parse(@players[@players.keys[0]].logs.battlelogs)
turns = turns["turn"]

  return {:msg => "game_info",:bp => @players[@players.keys[0]].bp,:player => @players[@players.keys[0]].vs,:turns => turns , :battlelog => @players[@players.keys[0]].logs.currentlogs.to_json}.merge(your_characters_info)
end

elsif player_id == @players.keys[1]

y_c1 = @players[@players.keys[1]].characters[@players[@players.keys[1]].characters.keys[0]]
y_c2 = @players[@players.keys[1]].characters[@players[@players.keys[1]].characters.keys[1]]
y_c3 = @players[@players.keys[1]].characters[@players[@players.keys[1]].characters.keys[2]]
y_u = @players[@players.keys[1]].characters[@players[@players.keys[1]].characters.keys[3]]

o_c1 = @players[@players.keys[0]].characters[@players[@players.keys[0]].characters.keys[0]]
o_c2 = @players[@players.keys[0]].characters[@players[@players.keys[0]].characters.keys[1]]
o_c3 = @players[@players.keys[0]].characters[@players[@players.keys[0]].characters.keys[2]]
o_u = @players[@players.keys[0]].characters[@players[@players.keys[0]].characters.keys[3]]

your_characters_info = {}
puts "Transformation #{y_c1.transformation}"
puts "Transformation #{y_c1.skillhold}"
your_characters_info['y_c1_health'] = y_c1.health
your_characters_info['y_c2_health'] = y_c2.health
your_characters_info['y_c3_health'] = y_c3.health
your_characters_info['y_c1_stunned'] = y_c1.stunned
your_characters_info['y_c2_stunned'] = y_c2.stunned
your_characters_info['y_c3_stunned'] = y_c3.stunned
your_characters_info['y_c1_block'] = y_c1.block
your_characters_info['y_c2_block'] = y_c2.block
your_characters_info['y_c3_block'] = y_c3.block
your_characters_info['y_c1_energy'] = y_c1.energy
your_characters_info['y_c2_energy'] = y_c2.energy
your_characters_info['y_c3_energy'] = y_c3.energy
your_characters_info['y_c1_strength'] = y_c1.strength
your_characters_info['y_c2_strength'] = y_c2.strength
your_characters_info['y_c3_strength'] = y_c3.strength
your_characters_info['y_c1_ki'] = y_c1.ki
your_characters_info['y_c2_ki'] = y_c2.ki
your_characters_info['y_c3_ki'] = y_c3.ki
your_characters_info['y_c1_defense'] = y_c1.defense
your_characters_info['y_c2_defense'] = y_c2.defense
your_characters_info['y_c3_defense'] = y_c3.defense
your_characters_info['y_c1_cooldown'] = y_c1.cooldown
your_characters_info['y_c2_cooldown'] = y_c2.cooldown
your_characters_info['y_c3_cooldown'] = y_c3.cooldown
your_characters_info['y_c1_effect'] = y_c1.effect.to_s
your_characters_info['y_c2_effect'] = y_c2.effect.to_s
your_characters_info['y_c3_effect'] = y_c3.effect.to_s
your_characters_info['y_c1_skillhold'] = y_c1.skillhold
your_characters_info['y_c2_skillhold'] = y_c2.skillhold
your_characters_info['y_c3_skillhold'] = y_c3.skillhold
your_characters_info['y_c1_conditions'] = y_c1.conditions
your_characters_info['y_c2_conditions'] = y_c2.conditions
your_characters_info['y_c3_conditions'] = y_c3.conditions
your_characters_info['y_c1_experience'] = y_c1.experience.to_s
your_characters_info['y_c2_experience'] = y_c2.experience.to_s
your_characters_info['y_c3_experience'] = y_c3.experience.to_s
your_characters_info['y_c1_speed'] = y_c1.speed.to_s
your_characters_info['y_c2_speed'] = y_c2.speed.to_s
your_characters_info['y_c3_speed'] = y_c3.speed.to_s
your_characters_info['y_c1_max'] = y_c1.max
your_characters_info['y_c2_max'] = y_c2.max
your_characters_info['y_c3_max'] = y_c3.max
puts y_c1.transformation[1]
your_characters_info['y_c1_transformation'] = y_c1.transformation[1]
your_characters_info['y_c2_transformation'] = y_c2.transformation[1]
your_characters_info['y_c3_transformation'] = y_c3.transformation[1]
your_characters_info['y_u_item'] = y_u.skillhold
your_characters_info['y_u_amount'] = y_u.info
your_characters_info['y_u_cooldown'] = y_u.cooldown
your_characters_info['y_u_stunned'] = y_u.stunned
your_characters_info['y_c_characters'] = [y_c1.info[0],y_c2.info[0],y_c3.info[0]]
your_characters_info['o_c1_health'] = o_c1.health
your_characters_info['o_c2_health'] = o_c2.health
your_characters_info['o_c3_health'] = o_c3.health
your_characters_info['o_c1_stunned'] = o_c1.stunned
your_characters_info['o_c2_stunned'] = o_c2.stunned
your_characters_info['o_c3_stunned'] = o_c3.stunned
your_characters_info['o_c1_block'] = o_c1.block
your_characters_info['o_c2_block'] = o_c2.block
your_characters_info['o_c3_block'] = o_c3.block
your_characters_info['o_c1_energy'] = o_c1.energy
your_characters_info['o_c2_energy'] = o_c2.energy
your_characters_info['o_c3_energy'] = o_c3.energy
your_characters_info['o_c1_strength'] = o_c1.strength
your_characters_info['o_c2_strength'] = o_c2.strength
your_characters_info['o_c3_strength'] = o_c3.strength
your_characters_info['o_c1_ki'] = o_c1.ki
your_characters_info['o_c2_ki'] = o_c2.ki
your_characters_info['o_c3_ki'] = o_c3.ki
your_characters_info['o_c1_defense'] = o_c1.defense
your_characters_info['o_c2_defense'] = o_c2.defense
your_characters_info['o_c3_defense'] = o_c3.defense
your_characters_info['o_c1_effect'] = o_c1.effect.to_s
your_characters_info['o_c2_effect'] = o_c2.effect.to_s
your_characters_info['o_c3_effect'] = o_c3.effect.to_s
your_characters_info['o_c1_skillhold'] = o_c1.skillhold
your_characters_info['o_c2_skillhold'] = o_c2.skillhold
your_characters_info['o_c3_skillhold'] = o_c3.skillhold
your_characters_info['o_c1_experience'] = o_c1.experience.to_s
your_characters_info['o_c2_experience'] = o_c2.experience.to_s
your_characters_info['o_c3_experience'] = o_c3.experience.to_s
your_characters_info['o_c1_conditions'] = o_c1.conditions
your_characters_info['o_c2_conditions'] = o_c2.conditions
your_characters_info['o_c3_conditions'] = o_c3.conditions
your_characters_info['o_c1_speed'] = o_c1.speed.to_s
your_characters_info['o_c2_speed'] = o_c2.speed.to_s
your_characters_info['o_c3_speed'] = o_c3.speed.to_s
your_characters_info['o_c1_max'] = o_c1.max
your_characters_info['o_c2_max'] = o_c2.max
your_characters_info['o_c3_max'] = o_c3.max
your_characters_info['o_c1_transformation'] = o_c1.transformation[1]
your_characters_info['o_c2_transformation'] = o_c2.transformation[1]
your_characters_info['o_c3_transformation'] = o_c3.transformation[1]
your_characters_info['o_u_item'] = o_u.skillhold
your_characters_info['o_u_amount'] = o_u.info
your_characters_info['o_c_characters'] = [o_c1.info[0],o_c2.info[0],o_c3.info[0]]

y_c1.attacked = [-1, -1, -1,-1,y_c1.health]
y_c2.attacked = [-1, -1, -1,-1,y_c2.health]
y_c3.attacked = [-1, -1, -1,-1,y_c3.health]

if 1 > y_c1.health + y_c2.health + y_c3.health

return lose(@players.keys[1])


elsif 1 > o_c1.health + o_c2.health + o_c3.health
return win(@players.keys[1])
else  
  turns = JSON.parse(@players[@players.keys[0]].logs.battlelogs)
turns = turns["turn"]

  return {:msg => "game_info",:bp => @players[@players.keys[1]].bp,:player => @players[@players.keys[1]].vs,:turns => turns ,:battlelog => @players[@players.keys[1]].logs.currentlogs.to_json}.merge(your_characters_info)
end

end
end

def win(win_id)

if @players.keys[0] == win_id
losing_user = User.get(@players.keys[1].to_i)
team = @players[@players.keys[0]].team
team2 = @players[@players.keys[1]].team
else
losing_user = User.get(@players.keys[0].to_i)
team = @players[@players.keys[1]].team
team2 = @players[@players.keys[0]].team
end


win_id.to_i
winning_user = User.get(win_id)

bg1 = Battlelog.create(:winner => winning_user.username,:vs => "#{@players[@players.keys[1]].type}: #{winning_user.username} vs #{losing_user.username}")
winning_user.battlelogs << bg1

team = @players[win_id].team

user_old = [winning_user.rank,winning_user.power_level,winning_user.percent,winning_user.money,winning_user.promotion]
w_s = JSON.parse(winning_user.stats)

if @players[@players.keys[1]].type == "Society"
team[3][team[3]['item']] = @players[win_id].characters.values[3].info
winning_user.items = team[3].to_json


winning_user.wins += 1
a = [100, 250]


winning_user.money += a[1]

a = userRanking(winning_user, losing_user,true)
winning_user.percent = a[0]
winning_user.power_level = a[1]
winning_user.rank = a[2]
winning_user.promotion = a[3]
winning_user.nextLevel = a[4]

a = userRanking(losing_user,winning_user,false)
losing_user.percent = a[0]
losing_user.power_level = a[1]
losing_user.rank = a[2]
losing_user.promotion = a[3]
losing_user.nextLevel = a[4]
winning_user.average = (winning_user.wins / (winning_user.wins + winning_user.losses).to_f * 100).round(2)

if winning_user.streak >= 0
winning_user.streak += 1
else
  winning_user.streak = 0 + 1
end

if winning_user.streak > winning_user.high_streak
winning_user.high_streak = winning_user.streak
end

s = Statics.first
staticsInfo = JSON.parse(s.info)


if staticsInfo.key? (team[0])
staticsInfo[team[0]][0] += 1
staticsInfo[team[0]][2] = (staticsInfo[team[0]][0]  / (staticsInfo[team[0]][0]  + staticsInfo[team[0]][1] ).to_f * 100).round(2)
staticsInfo[team[0]][3] += 1
else
staticsInfo[team[0]] = []
staticsInfo[team[0]][0] = 1
staticsInfo[team[0]][1] = 0
staticsInfo[team[0]][2] = (staticsInfo[team[0]][0]  / (staticsInfo[team[0]][0]  + staticsInfo[team[0]][1] ).to_f * 100).round(2)
staticsInfo[team[0]][3] = 1
#[Win,Losses,Average,Used]
end

if staticsInfo.key? (team[1])
staticsInfo[team[1]][0] += 1
staticsInfo[team[1]][2] = (staticsInfo[team[1]][0]  / (staticsInfo[team[1]][0]  + staticsInfo[team[1]][1] ).to_f * 100).round(2)
staticsInfo[team[1]][3] += 1
else
staticsInfo[team[1]] = []
staticsInfo[team[1]][0] = 1
staticsInfo[team[1]][1] = 0
staticsInfo[team[1]][2] = (staticsInfo[team[1]][0]  / (staticsInfo[team[1]][0]  + staticsInfo[team[1]][1] ).to_f * 100).round(2)
staticsInfo[team[1]][3] = 1
end

if staticsInfo.key? (team[2])
staticsInfo[team[2]][0] += 1
staticsInfo[team[2]][2] = (staticsInfo[team[2]][0]  / (staticsInfo[team[2]][0]  + staticsInfo[team[2]][1] ).to_f * 100).round(2)
staticsInfo[team[2]][3] += 1  
else
staticsInfo[team[2]] = []  
staticsInfo[team[2]][0] = 1
staticsInfo[team[2]][1] = 0
staticsInfo[team[2]][2] = (staticsInfo[team[2]][0]  / (staticsInfo[team[2]][0]  + staticsInfo[team[2]][1] ).to_f * 100).round(2)
staticsInfo[team[2]][3] = 1  
end

#--------------------------------------------------#
if staticsInfo.key? (team2[0])
staticsInfo[team2[0]][1] += 1
staticsInfo[team2[0]][2] = (staticsInfo[team2[0]][0]  / (staticsInfo[team2[0]][0]  + staticsInfo[team2[0]][1] ).to_f * 100).round(2)
staticsInfo[team2[0]][3] += 1
else
staticsInfo[team2[0]] = []
staticsInfo[team2[0]][0] = 0
staticsInfo[team2[0]][1] = 1
staticsInfo[team2[0]][2] = (staticsInfo[team2[0]][0]  / (staticsInfo[team2[0]][0]  + staticsInfo[team2[0]][1] ).to_f * 100).round(2)
staticsInfo[team2[0]][3] = 1
#[Win,Losses,Average,Used]

end

if staticsInfo.key? (team2[1])
staticsInfo[team2[1]][1] += 1
staticsInfo[team2[1]][2] = (staticsInfo[team2[1]][0]  / (staticsInfo[team2[1]][0]  + staticsInfo[team2[1]][1] ).to_f * 100).round(2)
staticsInfo[team2[1]][3] += 1
else
staticsInfo[team2[1]] = []
staticsInfo[team2[1]][0] = 0
staticsInfo[team2[1]][1] = 1
staticsInfo[team2[1]][2] = (staticsInfo[team2[1]][0]  / (staticsInfo[team2[1]][0]  + staticsInfo[team2[1]][1] ).to_f * 100).round(2)
staticsInfo[team2[1]][3] = 1
end

if staticsInfo.key? (team2[2])
staticsInfo[team2[2]][1] += 1
staticsInfo[team2[2]][2] = (staticsInfo[team2[2]][0]  / (staticsInfo[team2[2]][0]  + staticsInfo[team2[2]][1] ).to_f * 100).round(2)
staticsInfo[team2[2]][3] += 1 
else
staticsInfo[team2[2]] = []
staticsInfo[team2[2]][0] = 0
staticsInfo[team2[2]][1] = 1
staticsInfo[team2[2]][2] = (staticsInfo[team2[2]][0]  / (staticsInfo[team2[2]][0]  + staticsInfo[team2[2]][1] ).to_f * 100).round(2)
staticsInfo[team2[2]][3] = 1 
end

teamS = team.to_json
teamS2 = team2.to_json



s.info = staticsInfo.to_json



c1_w = w_s[team[0]]
c2_w = w_s[team[1]]
c3_w = w_s[team[2]]


old_we = [c1_w, c2_w, c3_w]# stats[mn_s 0, mn_k 1, mn_d 2, extra_s 3, extra_k 4, extra_d 5, Level 6, power_level 7, points 8, points total 9]


c1_w[1] += 50
c2_w[1] += 50
c3_w[1] += 50

c1_w = characterRanking(c1_w)
c2_w = characterRanking(c2_w)
c3_w = characterRanking(c3_w)

new_we = [c1_w, c2_w, c3_w]

w_s[team[0]] = c1_w
w_s[team[1]] = c2_w
w_s[team[2]] = c3_w
user_new = [winning_user.rank,winning_user.power_level,winning_user.percent,winning_user.money,winning_user.nextLevel,winning_user.promotion]

questinfo = JSON.parse(winning_user.quest)
a = quest(questinfo, w_s, team,true)
winning_user.quest = a.to_json

winning_planet = winning_user.members.first(:status => "Joined").source

winning_planet.wins += 1
winning_planet.money += 250
winning_planet.reputation += 50
winning_planet.power_level  += 200
winning_planet.average = (winning_planet.wins / (winning_planet.wins + winning_planet.losses).to_f * 100).round(2)

winning_user.stats = (w_s.to_json).to_s
winning_planet.save
winning_user.save
s.save
@game_controller.end_game(@id, @players)
return {"msg" => "win",:old => old_we.to_s,:new => new_we.to_s,:olduser => user_old,:newuser => user_new}  


else

c1_w = w_s[team[0]]
c2_w = w_s[team[1]]
c3_w = w_s[team[2]]
old_we = [c1_w[0], c2_w[0], c3_w[0], c1_w[1], c2_w[1], c3_w[1], c1_w[6], c2_w[6], c3_w[6]]
winning_user.save
@game_controller.end_game(@id, @players)
return {"msg" => "win",:old => old_we.to_s,:new => old_we.to_s,:olduser => old_we.to_s}
end
end



def lose(loser_id)
if @players.keys[0] == loser_id
winning_user = User.get(@players.keys[1].to_i)
else
  winning_user = User.get(@players.keys[0].to_i)
end
loser_id.to_i
losing_user = User.first(:id => loser_id)
user_old = [losing_user.rank,losing_user.power_level,losing_user.percent,losing_user.money]
w_s = JSON.parse(losing_user.stats)
bg2 = Battlelog.create(:winner => winning_user.username,:vs => "#{@players[@players.keys[1]].type}: #{winning_user.username} vs #{losing_user.username}")
losing_user.battlelogs << bg2
team = @players[loser_id].team

if @players[loser_id].type[0] == "Society"

team[3][team[3]['item']] = @players[loser_id].characters.values[3].info
winning_user.items = team[3].to_json

losing_user.losses += 1
losing_user.average = (losing_user.wins / (losing_user.wins + losing_user.losses).to_f * 100).round(2)

c1_w = w_s[team[0]]
c2_w = w_s[team[1]]
c3_w = w_s[team[2]]
old_we = [c1_w[4], c2_w[4], c3_w[4], c1_w[5], c2_w[5], c3_w[5]]

if losing_user.streak >= 0
losing_user.streak = 0 - 1

else
  losing_user.streak -= 1
end


# stats[mn_s 0, mn_k 1, mn_d 2, extra_s 3, extra_k 4, extra_d 5, Level 6, power_level 7, points 8, points total 9]
c1_w[5] += 0
c2_w[5] += 0
c3_w[5] += 0

c1_w = characterRanking(c1_w)
c2_w = characterRanking(c2_w)
c3_w = characterRanking(c3_w)

new_we = [c1_w[4], c2_w[4], c3_w[4], c1_w[5], c2_w[5], c3_w[5]]

w_s[team[0]] = c1_w
w_s[team[1]] = c2_w
w_s[team[2]] = c3_w
user_new = [losing_user.rank,losing_user.power_level,losing_user.percent,losing_user.money]
losing_planet = losing_user.members.first(:status => "Joined").source

losing_planet.losses += 1

if losing_planet.health == 0
losing_planet.health =  losing_planet.max_health
losing_planet.money -= 10000
end


losing_planet.average = (losing_planet.wins / (losing_planet.wins + losing_planet.losses).to_f * 100).round(2)

losing_user.stats = (w_s.to_json).to_s
losing_planet.save
losing_user.save

return {"msg" => "lose",:old => old_we.to_s,:new => new_we.to_s,:olduser => user_old,:newuser => user_new}
else

c1_w = w_s[team[0]]
c2_w = w_s[team[1]]
c3_w = w_s[team[2]]
old_we = [c1_w[4], c2_w[4], c3_w[4], c1_w[5], c2_w[5], c3_w[5], c1_w[6], c2_w[6], c3_w[6]]
losing_user.save
return {"msg" => "lose",:old => old_we.to_s,:new => old_we.to_s,:olduser => user_old}
end
end


def chatmessage(player_id, message)

if player_id == @player1

@players[@players.keys[1]].notify({:msg => "chat",:message => message,:from => "O"}.to_json)
@players[@players.keys[0]].notify({:msg => "chat",:message => message,:from => "Y"}.to_json)
else

@players[@players.keys[1]].notify({:msg => "chat",:message => message,:from => "Y"}.to_json)
@players[@players.keys[0]].notify({:msg => "chat",:message => message,:from => "O"}.to_json)
end

end

def attack(player_id, attack_request)


if player_id == @player1
a = []
a.push(string_to_target(attack_request['target1'], 1))
a.push(attack_request['m1'])
a.push(attack_request['ms1'])
a.push(@players[@player1].characters[@players[@player1].characters.keys[0]].checkType(attack_request['ms1']))
a.push(@players[@player1].characters[@players[@player1].characters.keys[0]].health)
@players[@player1].characters[@players[@player1].characters.keys[0]].attacked = a
a = []
a.push(string_to_target(attack_request['target2'], 1))
a.push(attack_request['m2'])
a.push(attack_request['ms2'])
a.push(@players[@player1].characters[@players[@player1].characters.keys[1]].checkType(attack_request['ms2']))
a.push(@players[@player1].characters[@players[@player1].characters.keys[1]].health)
@players[@player1].characters[@players[@player1].characters.keys[1]].attacked = a

a = []
a.push(string_to_target(attack_request['target3'], 1))
a.push(attack_request['m3'])
a.push(attack_request['ms3'])
a.push(@players[@player1].characters[@players[@player1].characters.keys[2]].checkType(attack_request['ms3']))
a.push(@players[@player1].characters[@players[@player1].characters.keys[2]].health)
@players[@player1].characters[@players[@player1].characters.keys[2]].attacked = a
@players[@player1].characters[@players[@player1].characters.keys[3]].currentItem(string_to_target(attack_request['target4'], 1), attack_request['mu'])



elsif player_id == @player2
a = []
a.push(string_to_target(attack_request['target1'], 2))
a.push(attack_request['m1'])
a.push(attack_request['ms1'])
a.push(@players[@player2].characters[@players[@player2].characters.keys[0]].checkType(attack_request['ms1']))
a.push(@players[@player2].characters[@players[@player2].characters.keys[0]].health)
@players[@player2].characters[@players[@player2].characters.keys[0]].attacked = a


a = []
a.push(string_to_target(attack_request['target2'], 2))
a.push(attack_request['m2'])
a.push(attack_request['ms2'])
a.push(@players[@player2].characters[@players[@player2].characters.keys[1]].checkType(attack_request['ms2']))
a.push(@players[@player2].characters[@players[@player2].characters.keys[1]].health)
@players[@player2].characters[@players[@player2].characters.keys[1]].attacked = a


a = []
a.push(string_to_target(attack_request['target3'], 2))
a.push(attack_request['m3'])
a.push(attack_request['ms3'])
a.push(@players[@player2].characters[@players[@player2].characters.keys[2]].checkType(attack_request['ms3']))
a.push(@players[@player2].characters[@players[@player2].characters.keys[2]].health)
@players[@player2].characters[@players[@player2].characters.keys[2]].attacked = a
@players[@player2].characters[@players[@player2].characters.keys[3]].currentItem(string_to_target(attack_request['target4'], 2), attack_request['mu'])

end


end

def string_to_target(target, player)

if player === 1
case target
when -1
return -1
when 1
return @players[@player1].characters[@players[@player1].characters.keys[0]]
when 2
return @players[@player1].characters[@players[@player1].characters.keys[1]]
when 3
return @players[@player1].characters[@players[@player1].characters.keys[2]]
when 4
return @players[@player2].characters[@players[@player2].characters.keys[0]]
when 5
return @players[@player2].characters[@players[@player2].characters.keys[1]]
when 6
return @players[@player2].characters[@players[@player2].characters.keys[2]]
when 7
eall = [@players[@player2].characters[@players[@player2].characters.keys[0]], @players[@player2].characters[@players[@player2].characters.keys[1]], @players[@player2].characters[@players[@player2].characters.keys[2]]]
return eall
when 8

eall = [@players[@player1].characters[@players[@player1].characters.keys[0]], @players[@player1].characters[@players[@player1].characters.keys[1]], @players[@player1].characters[@players[@player1].characters.keys[2]]]
return eall
end
else
case target
when -1
return -1
when 1
return @players[@player2].characters[@players[@player2].characters.keys[0]]
when 2
return @players[@player2].characters[@players[@player2].characters.keys[1]]
when 3
return @players[@player2].characters[@players[@player2].characters.keys[2]]
when 4
return @players[@player1].characters[@players[@player1].characters.keys[0]]
when 5
return @players[@player1].characters[@players[@player1].characters.keys[1]]
when 6
return @players[@player1].characters[@players[@player1].characters.keys[2]]
when 7
eall = [@players[@player1].characters[@players[@player1].characters.keys[0]], @players[@player1].characters[@players[@player1].characters.keys[1]], @players[@player1].characters[@players[@player1].characters.keys[2]]]
return eall
when 8
eall = [@players[@player2].characters[@players[@player2].characters.keys[0]], @players[@player2].characters[@players[@player2].characters.keys[1]], @players[@player2].characters[@players[@player2].characters.keys[2]]]
return eall
end
end

end
end

class GameController

attr_accessor :private_games,:games,:ladder,:human,:cold, :globalchat

  def initialize
  @games = {}
  @ladder = {}
  @private_games = {}
  @human = {}
  @cold = {}
  @globalchat = {}
  #@fun = {}
  #@Ladder6 = {}
  #@Ladder9 = {}


  end

  def add_player(player)

  partner = @ladder.fetch(@ladder.keys[0]) unless @ladder.empty?

    if @ladder.key? (player.id)

  @ladder.delete(player.id)

  @ladder[player.id] = player

  elsif partner.nil?
    unless @ladder.key?(player.id)
  @ladder[player.id] = player
  player.notify({:msg => "Searching", :report => "Find"}.to_json)
    end
  else
    unless @games.has_key?(player.id) && @games.has_key?(partner.id)
  partner.notify({:msg => "Found match!"}.to_json)
  player.notify({:msg => "Found match!"}.to_json)
    end
  pair_up(player, partner)
    end
  end
  
  def private_add_player(player,player_username,enemy_username)
  if @private_games.key?(enemy_username)
  partner = @private_games.fetch(enemy_username)
else
  partner = nil
  end
  if @private_games.key? (player_username.downcase )
  @private_games.delete(player.id)
  @private_games[player_username.downcase ] = player

  elsif partner.nil?
    unless @private_games.key?(player_username.downcase )
  @private_games[player_username] = player
  player.notify({:msg => "Searching", :report => "Find"}.to_json)
    end
  else
    unless @games.has_key?(player.id) && @games.has_key?(partner.id)
  partner.notify({:msg => "Found match!"}.to_json)
  player.notify({:msg => "Found match!"}.to_json)
    end
  pair_up_private(player_username,enemy_username,player, partner)
    end
  end
  
  
  
  def sendMessage(username,avatar,message,id,ws)
  @globalchat[id] = ws
  chatmessage = {:msg => "chat", :username => username, :avatar => avatar, :message => message }.to_json
  @globalchat.each do |key, value|
  if (value.state.to_s === "closed")
  @globalchat.delete(key)
  else
  value.send(chatmessage)    
  end
end
  
  end
  
  def society_attack(action,planet,target,player,society)
  puts "Action #{action}  Player_username #{society} Target: #{target} Society: #{society} "
  if society.is_a? String
  society = society.downcase
else
  society = "none"
  end
  
  
  if target == "human"
  if @human.key? (society)
   if @human[society].keys.empty? 
   player.notify({:msg => "planetControls",:type => 17}.to_json)  
   else
     
   partner = @human[society].values[0]
   
   @human[society].delete(@human[society].keys[0])
   unless games.has_key?(player.id) && @games.has_key?(partner.id)
  partner.notify({:msg => "Found match!"}.to_json)
  player.notify({:msg => "Found match!"}.to_json)
   
   end
  pair_up(player, partner)
   end
 else
player.notify({:msg => "planetControls",:type => 17}.to_json)
   end #Check Key
 
      
  end #End of target
 
  end #End of function
 
  def game_exist(gameid, id, ws)
  @games[gameid].players[id].socket = ws
  @games[gameid].players[id].reset[0] += 1
  if games[gameid].players[id].reset[0] == 910
  @games[gameid].surrender(id)
else
  @games[gameid].reconnect(id)
  end
  
  end


  def pair_up(player, partner)

  @ladder.delete(partner.id)
  @ladder.delete(player.id)

  g = GameModel.create
  y = User.get(player.id)
  o = User.get(partner.id)

  y.last_page_name = "Ladder: #{y.username} vs #{o.username}"
  y.last_page_link = "/arena"
  y.last_game = g.id

  o.last_page_name = "Ladder: #{o.username} vs #{y.username}"
  o.last_page_link = "/arena"
  o.last_game = g.id
  y.game_visit = DateTime.now
  o.game_visit = DateTime.now
  y.save
  o.save
  game = Game.new(g.id, player, partner, self)
  @games[game.id] = game

  end
  
  def pair_up_private(p1, p2,player, partner)

  @private_games.delete(p1)
  @private_games.delete(p2)

  g = GameModel.create
  y = User.get(player.id)
  o = User.get(partner.id)



  y.last_page_name = "Ladder: #{y.username} vs #{o.username}"
  y.last_page_link = "/arena"
  y.last_game = g.id

  o.last_page_name = "Ladder: #{o.username} vs #{y.username}"
  o.last_page_link = "/arena"
  o.last_game = g.id
  y.game_visit = DateTime.now
  o.game_visit = DateTime.now
  y.save
  o.save
  game = Game.new(g.id, player, partner, self)
  @games[game.id] = game

  end

  def end_game(game_id, players)
  @games.delete(game_id)
  g = GameModel.first(:id => game_id)
  g.update(:ended => true)
  
 
  players.each do |id, player |
      @ladder.delete(player.id)
    end
  end
end

class Report
  attr_accessor :battlelogs, :damage, :currentlogs
  def initialize
    @battlelogs = '{"turn" : 0}'
    @damage = 0
    @currentlogs =  []
    #{Turn Number = [[success,skill,damage,user,target,reflect]]}
    #success 0:Success 1.Immunity 2.Stunned 3.Countered 4.Fail
    #Skill Number
    #Damage done
    #user of skill
    #target of skill
    #reflect who?
  end
end


class Character
  attr_accessor :health,:energy,:stunned,:block,:controlling_player,:cooldown,:strength,:ki,:defense,:transformation,:current_defense,:effect,:skillhold,:max,:experience,:counter,:effecting,:speed,:attacked,:reflect,:info,:conditions,:r_defense,:r_attack

  def initialize(controlling_player, s, stats, h, t, increase,name,order,full)
  
  if (t)
  @health = h
  @energy = 100
  @max = [h, 100]
  @stunned = [0, 0, 0, 0]#[full, Ki, Strength, Friendly]
  @counter = [0, 0, 0, 0, 0, 0, 0, 0] #[full,ki,strength,power_down]
  @block = [0,0,0,0,0]#[full, Ki, Strength, Power - Down, Friendly]
  @cooldown = [0, 0, 0, 0, 0]
  @controlling_player = controlling_player
  @strength = increase[0]
  @ki = increase[1]
  @defense = increase[2]
  @speed = increase[3] 
  @current_defense = @defense
  @skillhold = s
  @transformation = [false, "none", 0, 0, 0, 0, false,0]#[Transformed T / F, MoveId, Ki, Strength, Defense, Speed, We do you want the pic to change]
  @effect = []
  @effecting = []
  @experience = stats[0]
  @attacked = [-1, -1, -1,-1]
  @r_defense = []
  @r_attack = []
  @info = [name,order,full.to_s]
  @conditions = [0,0,0,0] #0.Dazed  1.Cannot Be killed 2.Increase Cooldown by 2.Increase Bp by 1 3.prevent healing
  #@extra [Dazed,More Bp Number How muc,Increase Turn of skill Number Turns,remove Number How Many,Increase Cooldown,Increase Damage]
  
  else
  
  @skillhold = s
  @effecting = []#[Items that turns]
  @cooldown = 0
  @controlling_player = controlling_player
  
  limit = itemLimit(s);
  if limit <= stats
  stats = limit
  end

  @info = stats
  
  # effecting = [1, 2, 3][turn, who, effect]# transformation = [o / f / name]# block = [strength, ki, all, friendly, power - down]# counter = [0 y_strength, 1 y_ki, 2 y_all, 3 o_strength, 4 o_ki, 5 o_all, 6 reflect, 7 reflected]# stunned = [strength, ki, all]# stats[mn_hp 0, mn_ep 1, mn_s 2, mn_k 3, mn_d 4, extra_s 5, extra_k 6, extra_d 7, Level 8, Experience 9, points 10, points total 11]
  end
  end

  def next_turn# Checks all variables at the end of the turn

  x = 0

  while (x <= 4)
    if self.cooldown[x] > 0
  self.cooldown[x] -= 1
  end
  x += 1
  end
  
  
  self.energy += 20
  if self.energy <= 0
  self.energy = 0
  elsif self.energy > self.max[1]
  self.energy = self.max[1]
  end
  
  if self.conditions[1] != 0 && self.health < 0
  self.health = 1  
  elsif self.health <= 0
  self.health = 0
  self.energy = 0
  self.effect = []
  self.r_attack = []
  self.r_defense = []
  self.transformation = [false, "none", 0, 0, 0, 0,false]
  elsif self.health >= self.max[0]
  self.health = self.max[0]
  end

  for i in 0..3
  if self.stunned[i] > 0
  self.stunned[i] -= 1
  end
  end

  for i in 0..4
  if self.block[i] > 0
  self.block[i] -= 1
  end
  end
  
  for i in 0..3
  if self.conditions[i] > 0
  self.conditions[i] -= 1
  end
  end
  
  for i in 0..7
  if self.counter[i] > 0
  self.counter[i] -= 1
  end
  end

  if self.speed < 0
  self.speed = 0
  end

  if self.strength < 0
  self.strength = 0
  end

  if self.ki < 0
  self.ki = 0
  end

  if self.defense < 0
  self.defense = 0
  end
  
  if self.r_attack.length != 0
  len = self.r_attack.length - 1
  for i in 0..len
  self.r_attack[i][0] -= 1
  if self.r_attack[i][0]  == 0
  self.r_attack.delete_at(i)
  i -= 1
  end
  end
  end
  
  if self.r_defense.length != 0
  len = self.r_defense.length - 1
  for i in 0..len
  self.r_defense[i][0] -= 1
  if self.r_defense[i][0]  == 0
  self.r_defense.delete_at(i)
  i -= 1
  end
  end
  end
  
  if self.r_defense.length != 0
  
  end

  self.current_defense = self.defense

  
  end

  # counter = [y_strength, y_ki, y_all, o_strength, o_ki, o_all, reflect]

  def s_damage(player, damage)# Strength Damage
  amount = 1
  amount = player.current_defense - damage - self.strength
  
  if amount < 0
  player.current_defense = 0
  player.health += amount
  self.controlling_player.logs.damage -= amount
  end

  end

  def k_damage(player, damage)# Ki Damage
  amount = 1
  amount = player.current_defense - damage - self.ki
  if amount < 0
  player.current_defense = 0
  player.health += amount
  self.controlling_player.logs.damage -= amount
  end

  end

  def a_k_damage(player, damage)# All players attacked by ki damage
  l = player.length - 1
  i = 0
  for i in 0..l
  amount = player[i].current_defense - damage - self.ki
  if amount < 0
  player[i].current_defense = 0
  player[i].health += amount
  self.controlling_player.logs.damage -= amount
  end
  
  end
  end

  def p_s_damage(player, damage)# Piercing Strength Damage
  
  if self.strength >= 0
  amount = damage + self.strength / 2
  player.health -= amount
  self.controlling_player.logs.damage += amount
  
  else
  amount = damage + self.strength / 2
  player.health -= amount
  self.controlling_player.logs.damage += amount
  end
  end

  def p_k_damage(p, damage)# Piercing Ki Damage
  if self.ki >= 0
  amount =  damage + self.ki/ 2
  p.health -= amount
  self.controlling_player.logs.damage += amount
  else
  amount =  damage 
  p.health -= amount
  self.controlling_player.logs.damage += amount 
  end
  end
  
  def a_damage(p, damage)# Afflication Damage
  p.health = p.health - damage 
  self.controlling_player.logs.damage += damage
  end
  

  def s_k_damage(player, damage)# Strength and Energy Damage
  amount = 1
  amount = player.current_defense - damage[0] - damage[1] - self.strength - self.ki
  if amount < 0
  player.current_defense = 0
  player.health += amount
  self.controlling_player.logs.damage -= amount 
  end
  end

  def heal(player, health,energy)# Item Heal Flat Health

  if player.health > 0 && player.conditions[3] == 0
  player.health += health
  if player.health > player.max[0]
  player.health = player.max[0]
  end
  end
  
  if player.energy > 0 
  player.energy += energy
  if player.energy > player.max[1]
  player.energy = player.max[1]
  end
  end
end

  def recover(player, e, h)# Item Heal Percent Health
  player.health = player.health + (player.max[0] * e).to_i
  player.energy = player.energy + (player.max[1] * e).to_i
  if player.health > player.max[0]
  player.health = player.max[0]
  end
  if player.energy > player.max[1]
  player.energy = player.max[1]
  end
  end

  def reflect_s(player, target, turns,type)# Reflecting Skills Type 1: Self 2: Specific
  #Type: 1.Protect 2.Stop
  reflectinfo = [] #Turns,type,target
  if type == 1
  reflectinfo = [turns,target]
  player.r_defense.push(reflectinfo)
  
  
  return true
  elsif type == 2
  reflectinfo = [turns,target]
  player.r_attack.push(reflectinfo)
  return true
  else
    return false
  end
  end


  def bpeffect(player, amount)# Adding Bp or losing
  player.controlling_player.bp += amount
  end

  def cooldownReduce(player, reduce, type)# Reduces Cooldowns
  if type == 1
  a = player.cooldown.index(player.cooldown.max)
  player.cooldown[a] -= reduce
  if player.cooldown[a] < 0
  player.cooldown[a] = 0
  end
  else

    end
  end

  def randomEffect(player, len)# Random Effect


  x = 0
  while x < len
  r = Random.new
  nr = r.rand(0...7)

  x += 1
case nr
when 0
e_control(player, 30)
when 1
heal(player, 30,0)
when 2
cooldownReduce(player, 1, 1)
when 3
bpeffect(player, 1)
when 4
player.stunned[0] = 2
when 5
power_up(player, [5, 5, 5, 5])
when 6
player.block[2] += 1
when 7
recover(player, 0.25, 0.25)
when 8
player.block[0] += 1
when 9
recover(player, 1, 1)
when 10
player.block[1] += 1
end
end
end

def skill_turns(player, turn, skill_id, name, type, show)

case type# If you need a skill to be last turns | Type 1[Moves] - Type 3[Items]
when 1
self.effecting.push(turn)
self.effecting.push(player)
self.effecting.push(skill_id)
self.effecting.push(name)
if show
player.effect.push(name)
end

when 2

self.effecting.push(turn)
self.effecting.push(player)
self.effecting.push(skill_id)
self.effecting.push(name)
if show
player.effect.push(name)
end

when 3
self.effecting.push(turn)
self.effecting.push(player)
self.effecting.push(skill_id)
self.effecting.push(name)
if show
player.effect.push(name)
end


end# effecting = [1, 2, 3][turn, who, effect, slot]
end

def e_control(player, energy)# Energy Increase Or Decrease
player.energy += energy
if player.energy > player.max[1]
player.energy = player.max[1]
end
end

def power_down(player, amount)# Power Down Stats

player.strength = player.strength - amount[0]
player.ki = player.ki - amount[1]
player.defense = player.defense - amount[2]
player.speed = player.speed - amount[3]
end

def power_up(player, amount)# Power Up Stats
player.strength = player.strength + amount[0]
player.ki = player.ki + amount[1]
player.defense = player.defense + amount[2]
player.speed = player.speed + amount[3]
end

def percent_up(player, percent)# Power Up Stats
player.strength = player.strength + (player.strength * percent[0]).ceil
player.ki = player.ki + (player.ki * percent[1]).ceil
player.defense = player.defense + (player.defense * percent[2]).ceil
player.speed = player.speed + (player.speed * percent[3]).ceil
end

def percent_down(player, percent)# Power Up Stats
player.strength = player.strength - (player.strength * percent[0]).ceil
player.ki = player.ki - (player.ki * percent[1]).ceil
player.defense = player.defense - (player.defense * percent[2]).ceil
player.speed = player.speed - (player.speed * percent[3]).ceil
end

def stun(player, turn, type)# Stuns

if type == 0
player.stunned[0] = turn
elsif type == 1
player.stunned[1] = turn
elsif type == 2
player.stunned[2] = turn
elsif type == 3
player.stunned[3] = turn
else
  player.stunned[4] = turn
end
end



def removeTurns(player,number)
for i in 0..numbers
player.effect.delete_at(0)
end
end

def countering(player, turn, type, ally, show, name, eturn)
# Countering
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

  end


# type = [strength, ki, ]

end


def blocks(player, turns, type)# Deals with immunity
case type
when 0
if player.block[0] < turns
player.block[0] = turns
end
when 1
if player.block[1] < turns
player.block[1] = turns
end
when 2
if player.block[2] < turns
player.block[2] = turns
end
when 3
if player.block[3] < turns && player.block[0] == 0
player.block[3] = turns
end
end
end

def check(bp, e, moveslot, cd, focus, type,logs,ignore) #Check Moves

if focus.kind_of?(Array)
other = [focus[0],focus[1],focus[2]]
else
other = focus
end

n = 0

if self.controlling_player.bp >= bp && self.energy >= e && self.cooldown[moveslot] == 0 && self.health > 0

self.controlling_player.bp -= bp
self.energy -= e
if self.conditions[2] == 0
self.cooldown[moveslot] = cd
else
self.cooldown[moveslot] = cd + 2
end
n += 1
basic = false

else

basic = true

 
end
# Stun[full, Ki, Strength, Friendly]# Block[full, Ki, Strength, Power - Down, Friendly]

if other.kind_of?(Array)
l = other.length - 1
i = 0

for i in 0..l
count = 0
if self.conditions[0] != 0 && type < 4

  target = []
  a = self.controlling_player.characters.values
  b = self.controlling_player.characters.values
  target = [a[0],a[1],a[2],b[0],b[1],b[2]]
  o = rand(0..5)

  other[i] = target[o]
  
  #[turns,2,target]
elsif self.r_attack.length != 0 && type < 4 && !ignore[2]
  if self.r_attack[0][1] == "Ally"
  if self.info[1] == 0
  a = [1,2].shuffle 
  other[i] = self.controlling_player.characters.values[a[0]]
  elsif self.info[1] == 1
  a = [0,2].shuffle 
  other[i]  = self.controlling_player.characters.values[a[0]]
else 
   a = [0,1].shuffle 
   other[i]  = self.controlling_player.characters.values[a[0]]
  end
  elsif self.r_attack[0][1]  == "Enemy"
  other[i] = self
  else
  other[i] = self.r_attack[0][1] 
  end
  #Defense reflect
  elsif other[i].r_defense.length != 0 && type < 4 && !ignore[2]
  puts "Other.r_defense area"
   if other[i].r_defense[0][1] == "Ally"
   if self.info[1] == 0
  a = [1,2].shuffle 
  other[i] = self.controlling_player.characters.values[a[0]]
  elsif self.info[1] == 1
  a = [0,2].shuffle 
  other[i] = self.controlling_player.characters.values[a[0]]
else
   a = [0,1].shuffle 
   other[i] = self.controlling_player.characters.values[a[0]]
  end
   else
     puts "Hey I'm reflected by defense"
   other[i] = other[i].r_defense[0][1] 
   end
  

end
end

else

if self.conditions[0] != 0 && type < 4 && !ignore[2]
  target = []
  a = self.controlling_player.characters.values
  b = self.controlling_player.enemy.values
  target = [a[0],a[1],a[2],b[0],b[1],b[2]]
  o = rand(0..5)
  other = target[o]
elsif self.r_attack.length != 0 && type < 4
  puts "Reflected attacked"
 
  if self.r_attack[0][1] == "Ally"
  if self.info[1] == 0
  a = [1,2].shuffle 
  other = self.controlling_player.characters.values[a[0]]
  elsif self.info[1] == 1
  a = [0,2].shuffle 
  other = self.controlling_player.characters.values[a[0]]
else
   a = [0,1].shuffle 
   other = self.controlling_player.characters.values[a[0]]
  end
  elsif self.r_attack[0][1] == "Enemy"
  other = self
else
  other = self.r_attack[0][1]
  end
  elsif other.r_defense.length != 0 && type < 4 && !ignore[2]
  puts "Other.r_defense area"
   if other.r_defense[0][1] == "Ally"
   if self.info[1] == 0
  a = [1,2].shuffle 
  other = self.controlling_player.characters.values[a[0]]
  elsif self.info[1] == 1
  a = [0,2].shuffle 
  other = self.controlling_player.characters.values[a[0]]
else
   a = [0,1].shuffle 
   other = self.controlling_player.characters.values[a[0]]
  end
   else
     puts "Hey I'm reflected by defense"
   other= other.r_defense[0][1] 
   end

end
end

if other.kind_of?(Array)
l = other.length - 1
i = 0
target = []
success = []
targetInfo = []

for i in 0..2
if other[i].controlling_player.id == self.controlling_player.id
success.push("Self")
else
success.push("Enemy")  
end
end

i = 0
while (i <= l)
success.push("")
count = 0
targetInfo.push(other[i].info[1])
case type

when 0# full

if other[i].health > 0
count += 1
end

if self.stunned[0] == 0 
count += 1
else
success[-1] = "Stunned"
reason = 1  
end

if self.counter[0] == 0 && other[i].counter[4] == 0  || ignore[1]
count += 1
else
success[-1] = "Counter"
reason = 2
end

if other[i].block[0] == 0 || ignore[0]
count += 1
else
success[-1] = "Block" 
reason = 3
end

if count == 4
i += 1
success[-1] = "Success"
reason = 0
else

l -= 1
other.delete_at(i)
end


when 1# Ki
if other[i].health > 0
count += 1

end

if self.stunned[0] == 0 && self.stunned[1] == 0 
count += 1

else
success[-1] = "Stunned"
reason = 1

end

if self.counter[0] == 0 && self.counter[1] == 0 && other[i].counter[4] == 0  || ignore[1]
count += 1

else
success[-1] = "Counter"
reason = 2

end

if other[i].block[0] == 0 && other[i].block[1] == 0 || ignore[0]
count += 1

else
success[-1] = "Block" 
reason = 3

end

if count == 4
i += 1
success[-1] = "Success"
reason = 0
else

l -= 1
other.delete_at(i)
end


when 2# Strength

if other[i].health > 0
count += 1
end

if self.stunned[0] == 0 && self.stunned[2] == 0 
count += 1
else
success[-1] = "Stunned"
reason = 1  
end

if self.counter[0] == 0 && self.counter[2] == 0 && other[i].counter[4] == 0  || ignore[1]
count += 1
else
success[-1] = "Counter"
reason = 2
end

if other[i].block[0] == 0 && other[i].block[2] == 0 || ignore[0]
count += 1
else
success[-1] = "Block" 
reason = 3
end

if count == 4
i += 1
success[-1] = "Success"
reason = 0
else

l -= 1
other.delete_at(i)
end

when 3# Power - Down

if other[i].health > 0
count += 1
end

if self.stunned[0] == 0 
count += 1
else
success[-1] = "Stunned"
reason = 1  
end

if self.counter[0] == 0 && self.counter[3] == 0 && other[i].counter[4] == 0 || ignore[1]
count += 1
else
success[-1] = "Counter"
reason = 2
end

if other[i].block[0] == 0 && other[i].block[3] == 0 || ignore[0]
count += 1
else
success[-1] = "Block" 
reason = 3
end

if count == 4
i += 1
success[-1] = "Success"
reason = 0
else

l -= 1
other.delete_at(i)
end

when 3# Power - Down

if other[i].health > 0
count += 1
end

if self.stunned[0] == 0 && self.stunned[3] == 0 
count += 1
else
success[-1] = "Stunned"
reason = 1  
end


if other[i].block[3] == 0 && other[i].block[0] == 0 || ignore[0]
count += 1
else
success[-1] = "Block" 
reason = 3
end

if self.counter[0] == 0 || ignore[1]
count += 1
else
success[-1] = "Counter"
reason = 2
end

if count == 4
i += 1
success[-1] = "Success"
reason = 0
else

l -= 1
other.delete_at(i)
end

when 4# Friendly One Ally or Yourself
if other[i].health <= 0
other.delete_at(i)
success.push("Fail")
l -= 1
reason = 0
elsif self.stunned[0] == 0 && self.stunned[3] == 0 && other[i].block[4] == 0
i += 1
success.push("Success")
elsif self.stunned[0] != 0 || self.stunned[3] != 0
success.push("Stunned")
other.delete_at(i)
l -= 1
reason = 1
else
success.push("Block")
other.delete_at(i)
l -= 1
reason = 3
end

end  
end
if other.length > 0
n += 1
end
if n == 2

return [true,other,target,success,targetInfo];
else
  if basic
     
  return [false,other,target,success,targetInfo,1];
else
 
   return [false,other,target,success,targetInfo,reason];
end
end
else
target = []
count = 0
if other.controlling_player.id == self.controlling_player.id

target.push("Self")
else

target.push("Enemy")  
end
case type

when 0# full
if other.health > 0
count += 1
end

if self.stunned[0] == 0 
count += 1
else
target.push("Stunned")
reason = 1  
end

if self.counter[0] == 0 && other.counter[4] == 0 || ignore[1]
count += 1
else
target.push("Counter")
reason = 2
end

if other.block[0] == 0 || ignore[0]
count += 1
else
target.push("Block")
reason = 3
end

if count == 4
n += 1
end

when 1# Ki
if other.health > 0
count += 1
end

if self.stunned[0] == 0 && self.stunned[1] == 0  
count += 1
else
target.push("Stunned")
reason = 1  
end

if self.counter[0] == 0 && self.counter[1] == 0 && other.counter[4] == 0 || ignore[1]
count += 1
else
target.push("Counter")
reason = 2
end

if other.block[0] == 0 && other.block[1] == 0 || ignore[0]
count += 1
else
target.push("Block")
reason = 3
end

if count == 4
n += 1
end


when 2# Strength
if other.health > 0
count += 1
end

if self.stunned[0] == 0 && self.stunned[2] == 0
count += 1
else
target.push("Stunned")
reason = 1  
end

if self.counter[0] == 0 && self.counter[2] == 0  && other.counter[4] == 0 || ignore[1]
count += 1
else
target.push("Counter")
reason = 2
end

if other.block[0] == 0 && other.block[2] == 0 || ignore[0]
count += 1
else
target.push("Block")
reason = 3
end

if count == 4
n += 1
end


when 3# Power - Down
if other.health > 0
count += 1
end

if self.stunned[0] == 0 && self.stunned[2] == 0
count += 1
else
target.push("Stunned")
reason = 1  
end

if self.counter[0] == 0 && self.counter[2] == 0  && other.counter[4] == 0 || ignore[1]
count += 1
else
target.push("Counter")
reason = 2
end

if self.block[0] == 0  && other.block[2] == 0 && other.block[0] == 0 || ignore[0]
count += 1
else
target.push("Block")
reason = 3
end

if count == 4
n += 1
end


when 4# Friendly One Ally or Yourself DOGDOg

if other.health > 0
count += 1
end

if self.stunned[0] == 0 && self.stunned[3] == 0
count += 1
else
target.push("Block")
reason = 1
end

if other.block[4] == 0
count += 1
else
target.push("Block")
reason = 3
end

if self.stunned[0] == 0 && self.stunned[3] == 0 
n += 1
end
end
if n == 2
return [true,other,target];
else
if basic 
  return [false,other,target,1];
else 
 return [false,other,target,reason]; 
end
end
end

end




def ucheck(bp, cd,player)# Checks
if self.controlling_player.bp >= bp && self.cooldown == 0 && self.info > 0 && player.health > 0 && player.block[3] == 0
self.controlling_player.bp -= bp
self.cooldown = cd
self.info -= 1 
if self.info === 0
self.cooldown = 99
end
return true
else
return false
end
end 

def currentCheck(target,type,ignore)
count = 0
n = 0
case type

when 0# full
if target.health > 0
count += 1
end

if self.stunned[0] == 0 || ignore[1]
count += 1
end

if target.block[0] == 0 || ignore[0]
count += 1
end

if count == 4
n += 1
end

when 1# Ki


if self.stunned[0] == 0 && self.stunned[1] == 0   || ignore[1]
count += 1
end


if target.block[0] == 0 && target.block[1] == 0 || ignore[0]
count += 1
end

if count == 2
n += 1
end


when 2# Strength

if self.stunned[0] == 0 && self.stunned[2] == 0 || ignore[1]
count += 1
end


if target.block[0] == 0 && target.block[2] == 0 || ignore[0]
count += 1
end

if count == 2
n += 1
end


when 3# Power - Down


if self.stunned[0] == 0 && self.stunned[2] == 0 || ignore[1]
count += 1
end

if self.block[0] == 0  && target.block[2] == 0 && target.block[0] == 0 || ignore[0]
count += 1
end

if count == 2
n += 1
end


when 4# Friendly One Ally or Yourself DOGDOg

if target.health > 0
count += 1
end

if self.stunned[0] == 0 && self.stunned[3] == 0 || ignore[1]
count += 1
end

if target.block[4] == 0 || ignore[0]
count += 1
end

if count == 3
n += 1
end
end

if n == 1
return true
else
return false
end

end

def transformskill(percent, name, type)# Transformation Effect Type[1] Percents - Type[2] Flat Increase

if type == 1
if self.stunned[0] == 0 && self.stunned[3] == 0
self.transformation[2] = (self.strength * percent[0]).ceil
self.transformation[3] = (self.ki * percent[1]).ceil
self.transformation[4] = (self.defense * percent[2]).ceil
self.transformation[5] = (self.speed * percent[3]).ceil
self.strength += self.transformation[2]
self.ki += self.transformation[3]
self.defense += self.transformation[4]
self.speed += self.transformation[5]
self.transformation[0] = true
self.transformation[1] = name

end
elsif type == 2
if  self.stunned[0] == 0 && self.stunned[3] == 0
self.transformation[0] = true
self.transformation[1] = name
self.transformation[6] = true

end
else
  self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]

end
end

def genericTurn(m, c)
if self.health > 0
stop = false
else
stop = true
end
show = true

case m
when 2

when 4

when 5
if self.effecting[c] == 1  || stop
power_up(effecting[c + 1], [0, 0, 5, 5])
end

when 7

end
end

# Generic
def generic(m, player, move, skill,logs) 


case m
when 1 # Afterimage
c = check(1, 20, skill, 3, player, 4,logs,[false,false,false])
if c[0]
power_up(c[1], [0, 0, 0, 3])
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end

when 3 #Energy Punch
c = check(1, 20, skill, 0, player, 1,logs,[false,false,false])
if c[0]
s_damage(c[1], 10)
e_control(c[1], -10)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end

when 5 #Solar Flare
c = check(2, 20, skill, 3, player, 3,logs,[false,false,false])
if c[0]
power_down(c[1], [0, 0, 5, 5])
skill_turns(c[1], 3, 5, "5", 3, true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end

when 6 # Punch
c = check(1, 20, skill, 2, player, 2,logs,[false,false,false])
if c[0]
s_damage(c[1], 10)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end

when 8 # Ki Blast
c = check(1, 20, skill, 2, player, 1,logs,[false,false,false])
if c[0]
k_damage(c[1], 10)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end

when 9 # Explosive Wave
c = check(1, 30, skill, 1, player, 1,logs,[false,false,false])
if c[0]
a_k_damage(c[1], 5)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end

end
end
end

def genericType(skill) 


case skill
when 1 # Afterimage
type = 4

when 3 #Energy Punch
type = 2
when 5 #Solar Flare
type = 3
when 6 # Punch
type = 2

when 8 # Ki Blast
type = 1
when 9 # Explosive Wave
type = 1
end

self.attacked[3] = type
end


class Item < Character

def itemLimit(item)

limit = 0
case item 
when "c1"
limit = 6
when "c2"
limit = 6
when "c3"
limit = 5
when "c4"
limit = 5
when "c5"
limit = 6
when "c6"
limit = 6
when "c7"
limit = 6
when "c8"
limit = 9
when "c9"
limit = 9
when "c10"
limit = 9
when "c11"
limit = 7
when "c12"
limit = 4
  
when "o1"
limit = 4
when "o2"
limit = 3
when "o3"
limit = 3
when "o4"
limit = 9
when "o5"
limit = 9
when "o6"
limit = 9
when "o7"
limit = 7
when "o8"
limit = 3
when "o9"
limit = 3
  
when "r1"
limit = 2
when "r2"
limit = 1
when "r3"
limit = 4
when "r4"
limit = 9
when "r5"
limit = 9
when "r6"
limit = 9
when "r7"
limit = 3

  
end

return limit
end

def currentItem(player, move)

if move
type = self.skillhold[0]# bp, cd
if type == "c"

case self.skillhold

when "c1"
if ucheck(0, 3,player)
heal(player, 20,0)
end
when "c2"
if ucheck(1, 3,player)
heal(player, 30,0)
end
when "c3"
if ucheck(1, 4,player)
heal(player, 40,0)
end
when "c4"
if ucheck(0, 3,player)
heal(player, 0,20)
end
when "c5"
if ucheck(1, 0,player)
heal(player, 0,30)
end
when "c6"
if ucheck(1, 3,player)
heal(player, 0,40)
end
when "c7"
if ucheck(1, 3,player)
cooldownReduce(player, 1, 1)
end
when "c8"
if ucheck(1, 2,player)
player.strength += 4
end
when "c9"
if ucheck(1, 2,player)
player.defense += 5
end
when "c10"
if ucheck(1, 2,player)
player.ki += 4
end
when "c11"
if ucheck(1, 2,player)
randomEffect(player, 1)
end
when "c12"
if ucheck(2, 0,player)
bpeffect(player, 1)
end
end


elsif type == "o"
case self.skillhold
when "o1"
if ucheck(2, 4,player)
recover(player, 0.25, 0.25)
end
when "o2"
if ucheck(3, 4,player)
recover(player, 0.33, 0.33)
end
when "o3"
if ucheck(2, 4,player)
cooldownReduce(player, 2, 1)
end
when "o4"
if ucheck(2, 3,player)
player.strength += 8
end
when "o5"
if ucheck(2, 3,player)
player.defense += 10
end
when "o6"
if ucheck(1, 2,player)
player.ki += 8
end
when "o7"
if ucheck(1, 2, player)
randomEffect(player, 2)
end

when "o8"
if ucheck(2,0)
player.counter = [0,0,0,0,0,0,0] 
player.conditions[0] = 0
end
when "o13"
  if ucheck(0,4)
    skill_turns(player, 2, "o12","o12", 3, false)
  end  
end


else
case self.skillhold
when "r1"
if ucheck(5, 6,player)
recover(player, 0.5, 0.5)
end
when "r2"
if ucheck(7, 8,player)
recover(player, 1, 1)
end
when "r3"
if ucheck(3, 4,player)
cooldownReduce(player, 0, 3)
end
when "r4"
if ucheck(3, 4,player)
player.strength += 12
end
when "r5"
if ucheck(2, 1,player)
player.defense += 15
end
when "r6"
if ucheck(3, 3,player)
player.ki += 12
end
when "r7"
if ucheck(2, 2,player)
randomEffect(player, 3)
end
end
end
end

len = self.effecting.length

stop = false
show = true
c = 0

while (c < len)
case self.skillhold


when "o12"
m = "o12"
if self.effecting[c + 1].block[3] == 0
self.controlling_player.bp += 1
end
end

self.effecting[c] -= 1
if self.effecting[c] == 0 || stop
n = effecting[c + 1].effect.index(m)
if n != nil
self.effecting[c + 1].effect.delete_at(n)
end
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
if show
effecting.delete_at(c)
end
len -= 4

else

  end# If end
c += 4

end# While
if self.cooldown > 0
self.cooldown -= 1
end
end
end


#------------------------------------------------------------------------------------------------------------------------
class Generic < Character
  
def checkType(skill)
  
if self.skillhold == skill
self.attacked[3] = 4
elsif skill < 30
genericType(skill)
else
  
case skill
#1:Ki  2:Strength  3:Power-down 4:Friendly
when 60
self.attacked[3] = 1
when 61
self.attacked[3] = 1
when 62
self.attacked[3] = 1
end
end
end

def rush(name,logs) #Skills come first

# Types: full 0, Ki 1, Strength 2, Power-Down 3, Friendly 4
case name[1]

when 2 # Energy Deflect
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 2, "2", 3, true)
if self.block[1] < 2
self.block[1] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 4 # Sonic Sway
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
#skill_turns(self, 2, 4, "4", 3, true)
if self.block[1] < 1
self.block[0] = 1;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 7 # Strength Block
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 7, "7", 3, true)
if self.block[2] < 2
self.block[2] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end
end
end



def currentEffects #Skills Effecting players over time
len = effecting.length

show = true
c = 0

while (c < len)
  a = self.effecting[c + 2]
  if self.effecting[c+1].health <= 0 || self.health < 0  
    stop = true
else
  stop = false
  end
  if effecting[c+1].effect.index(a.to_s) == nil
  stop = true
  show = false
  end
  
case a

when 1..30
genericTurn(a, c)
m = a.to_s

when 60
m = "60"

when 10000# Generic Trans.
m = "10000"
if self.energy > 10 && self.transformation[0] && !stop
self.energy -= 10
else
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end
end# Case end
effecting[c] -= 1
if (effecting[c] == 0 || stop)
  if show
n = effecting[c + 1].effect.index(m)
if n != nil
effecting[c + 1].effect.delete_at(n)
end
end
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)

len -= 4
else
c += 4
end# If end
end# While
end

def skills(player, skill,logs) #Speed Based Skills
move = self.skillhold[skill]

if skill <= -1
move = -1
elsif skill != 4
move = move.to_i
end

if skill == 4
case move
when true

#Transformation Area
when "10000" # Power-Up
c = check(1,10,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false && c[0]
transformskill([0.25, 0.25, 0.25, 0.25], "10000", 1)
skill_turns(self, 99, 10000, "10000", 3, true) 
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 

elsif self.transformation[0] == true && c[0]
transformskill(0, 0, 3)
end #Add more transformations before this "end" if there are any others.
end
#----------------------------Skill Area---------------------------------------
elsif 30 > move && move >= 0
generic(move, player, move, skill, logs)
elsif move >= 20
case move
when 58
c = check(3, 50, skill, 3, player, 1,logs,[false,false,false])
if c[0]
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    

end
when 59
c = check(2, 30, skill, 2, player, 1,logs,[false,false,false])
if c[0]
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end
when 60 #Generic Skill
c = check(1, 20, skill, 0, player, 1,logs,[false,false,false])
if c[0]
skill_turns(c[1], 99, 60, "60", 1, true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 61 #Generic AOe
c = check(1, 20, skill, 0, player, 1,logs,[false,false,false])
if c[0]
  l = c[1].length - 1
  i = 0
 

for i in 0..l
k_damage(c[1][i],30)
skill_turns(c[1][i], 1, 128, "63", 3, false)
end
health = [player[0].health,player[1].health,player[2].health]
logs.push(4,move,health,[self.controlling_player.vs,self.info[1]],c[3],c[4])  
else
logs.push(4,move,0,[self.controlling_player.vs,self.info[1]],c[3],c[4])  
end    
#------------------Skill Area----------------------------------------

end
end
end
end

class Turles < Character
  
def checkType(skill)
  
if self.skillhold == skill
self.attacked[3] = 4
elsif skill < 30
genericType(skill)
else
  
case skill
#1:Ki  2:Strength  3:Power-down 4:Friendly
when 60
self.attacked[3] = 1
when 61
self.attacked[3] = 1
when 62
self.attacked[3] = 1
end
end
end

def rush(name,logs) #Skills come first

# Types: full 0, Ki 1, Strength 2, Power-Down 3, Friendly 4
case name[1]

when 2 # Energy Deflect
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 2, "2", 3, true)
if self.block[1] < 2
self.block[1] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 4 # Sonic Sway
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
#skill_turns(self, 2, 4, "4", 3, true)
if self.block[1] < 1
self.block[0] = 1;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 7 # Strength Block
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 7, "7", 3, true)
if self.block[2] < 2
self.block[2] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end
end
end



def currentEffects #Skills Effecting players over time
len = effecting.length

show = true
c = 0

while (c < len)
  a = self.effecting[c + 2]
  if self.effecting[c+1].health <= 0 || self.health < 0  
    stop = true
else
  stop = false
  end
  
  
case a

when 1..30
genericTurn(a, c)
m = a.to_s

when 148
m = "148"
if effecting[c+1].effect.index(a.to_s) == nil
  stop = true
  show = false
end

when 149
m = "149"
ck = currentCheck(self.effecting[c+1],1,[false,false])
#0. Afflication 1.Ki 2.Strength 3.Power-Down 4.Friendly 
if ck
k_damage(self.effecting[c+1], 10)
end

when 150
if effecting[c+1].effect.index(a.to_s) == nil
  stop = true
  show = false
end
m = "150"

when 151
m = "151"
ck = currentCheck(self.effecting[c+1],1,[false,false])
#0. Afflication 1.Ki 2.Strength 3.Power-Down 4.Friendly 
if ck
k_damage(self.effecting[c+1], 15)
end

when 10000# Generic Trans.
m = "10000"
if self.energy > 10 && self.transformation[0] && !stop
self.energy -= 10
else
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end
end# Case end
effecting[c] -= 1
if (effecting[c] == 0 || stop)
  if show
n = effecting[c + 1].effect.index(m)
if n != nil
effecting[c + 1].effect.delete_at(n)
end
end
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)

len -= 4
else
c += 4
end# If end
end# While
end

def skills(player, skill,logs) #Speed Based Skills
move = self.skillhold[skill]

if skill <= -1
move = -1
elsif skill != 4
move = move.to_i
end

if skill == 4
case move
when true

#Transformation Area
when "10000" # Power-Up
c = check(1,10,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false && c[0]
transformskill([0.25, 0.25, 0.25, 0.25], "10000", 1)
skill_turns(self, 99, 10000, "10000", 3, true) 
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 

elsif self.transformation[0] == true && c[0]
transformskill(0, 0, 3)
end #Add more transformations before this "end" if there are any others.
end
#----------------------------Skill Area---------------------------------------
elsif 30 > move && move >= 0
generic(move, player, move, skill, logs)
elsif move >= 20
case move
when 148 #Fruit Of Might
puts "Fruit Work"
count = self.effect.count("148")
c = check(2 + count, 30, skill, 0, player, 4,logs,[false,false,false])
if c[0]
if count == 0
heal(c[1],30,20)
power_up(c[1],[0,0,3,3])
skill_turns(self, 2, 148, "148", 3, true)
elsif count == 1
heal(c[1],50,25)
power_up(c[1],[5,5,0,0])
skill_turns(self, 2, 148, "148", 3, true)
elsif count == 2
heal(c[1],60,30)
power_up(c[1],[5,5,5,5])
skill_turns(self, 2, 148, "148", 3, true)
end
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 149 #Sudden Storm
puts "Sudden Storm"
if player.effect.index("150") != nil
c = check(1, 30, skill, 3, player, 1,logs,[true,false,false])
if c[0]
skill_turns(c[1], 2, 151, "149", 3, true)
c[1].conditions[3] = 2
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end
else
c = check(1, 30, skill, 3, player, 1,logs,[false,false,false])
if c[0]
skill_turns(c[1], 2, 149, "149", 3, true)
c[1].conditions[3] = 2
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end 
end

when 150 #Kill Driver
if player.effect.index("149") != nil
c = check(2, 35, skill, 3, player, 1,logs,[true,false,false])
if c[0]
skill_turns(c[1], 2, 150, "150", 3, true)
k_damage(c[1],30)
c[1].stunned[1] = 2
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end
else
c = check(2, 35, skill, 3, player, 1,logs,[false,false,false])
if c[0]
skill_turns(c[1], 2, 150, "150", 3, true)
k_damage(c[1],15)
c[1].stunned[1] = 2
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end 
end
#------------------Skill Area----------------------------------------

end
end
end
end


#------------------------------------------------------------------------------------------------------------------------
class DrWheelo < Character

def checkType(skill)
  
if self.skillhold == skill
self.attacked[3] = 4
elsif skill < 30
genericType(skill)
else
  
case skill
#1:Ki  2:Strength  3:Power-down 4:Friendly
when 60
self.attacked[3] = 1
when 61
self.attacked[3] = 1
when 62
self.attacked[3] = 1
end
end
end

def rush(name,logs) #Skills come first

# Types: full 0, Ki 1, Strength 2, Power-Down 3, Friendly 4
case name[1]

when 2 # Energy Deflect
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 2, "2", 3, true)
if self.block[1] < 2
self.block[1] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 4 # Sonic Sway
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
#skill_turns(self, 2, 4, "4", 3, true)
if self.block[1] < 1
self.block[0] = 1;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 7 # Strength Block
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 7, "7", 3, true)
if self.block[2] < 2
self.block[2] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end
end
end



def currentEffects #Skills Effecting players over time
len = effecting.length

show = true
c = 0

while (c < len)
  a = self.effecting[c + 2]
  if self.effecting[c+1].health <= 0 || self.health < 0  
    stop = true
else
  stop = false
  end
 
  
case a

when 1..30
genericTurn(a, c)
m = a.to_s

when 145
m = "145"

if self.effecting[c] == 1
power_down(self.effecting[c+1],[10,10,0,0])
end
when 146
m = "146"
if self.effecting[c+1].stunned[0] != 0 || self.effecting[c+1].stunned[1] != 0 || self.effecting[c+1].stunned[2] != 0
power_up(self.effecting[c+1],[0,0,2,0])  
end 

if self.effecting[c+1].attacked[0] == -1
power_up(self.effecting[c+1],[0,0,0,2])
else
power_up(self.effecting[c+1],[0,2,0,0])  
end

if self.effecting[c+1].attacked[4] > self.health
power_up(self.effecting[c+1],[2,0,0,0])  
end

when 10000# Generic Trans.
m = "10000"
if self.energy > 10 && self.transformation[0] && !stop
self.energy -= 10
else
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end

when 10020 # Goku Trans. 1
m = "10020"
if self.energy > 10 && self.transformation[0] && !stop
self.energy -= 10
self.defense += 3
self.transformation[4] += 3
self.transformation[7] += 1
else
self.energy -= 10
self.defense -= self.transformation[4]
self.transformation = [false, "none", 0, 0, 0, 0, false,0]
self.transformation[9] = 0
stop = true
end

end# Case end
effecting[c] -= 1
if (effecting[c] == 0 || stop)
  if show
n = effecting[c + 1].effect.index(m)
if n != nil
effecting[c + 1].effect.delete_at(n)
end
end
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)

len -= 4
else
c += 4
end# If end
end# While
end

def skills(player, skill,logs) #Speed Based Skills
move = self.skillhold[skill]

if skill <= -1
move = -1
elsif skill != 4
move = move.to_i
end

if skill == 4
case move
when true

#Transformation Area
when "10000" # Power-Up
c = check(1,10,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false && c[0]
transformskill([0.25, 0.25, 0.25, 0.25], "10000", 1)
skill_turns(self, 99, 10000, "10000", 3, true) 
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 

elsif self.transformation[0] == true && c[0]
transformskill(0, 0, 3)
end #Add more transformations before this "end" if there are any others.

when "10020" # Geyser Build
c = check(1, 10, skill, 0, player, 4,logs,[false,false,false])
if c[0] && self.transformation[0] == false 
transformskill(0, "10020", 2)
self.transformation[7] = 0
skill_turns(self, 99, 10020, "10020", 3, true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
elsif c[0] && self.transformation[0] == true 
self.transformation[0] = false
self.transformation[6] = false
else
end
end
#----------------------------Skill Area---------------------------------------
elsif 30 > move && move >= 0
generic(move, player, move, skill, logs)
elsif move >= 20
case move
when 145 #Mind Grasp
count = self.effect.count("145")
if count != 3
c = check(1, 30, skill, 3, player, 3,logs,[false,false,false])
if c[0]
c[1].conditions[0] = 2
c[1].stunned[3] = 2
power_up(c[1],[10,10,0,0])
skill_turns(c[1], 2, 145, "145", 3, true)
skill_turns(self, 99, 145, "145", 3, true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end
end

when 146 #Bio Modification
if player.effect.index("146") == nil
c = check(3, 40, skill, 4, player, 4,logs,[false,false,false])
if c[0]
skill_turns(c[1], 99, 146, "146", 3, true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end
end
when 147 #Planet Geyser
c = check(3, 40, skill, 3, player, 1,logs,[false,false,false])

count = 0
if transformation[7] != nil
count = 0
end

if c[0]
a = rand(0..4)
boost = count * 5
k_damage(c[1],boost)
c[1].cooldown[a] += 4
power_down(c[1],[0,0,0.25,0])
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

#------------------Skill Area----------------------------------------

end
end
end
end
#------------------------------------------------------------------------------------------------------------------------
class Dende < Character

def checkType(skill)
  
if self.skillhold == skill
self.attacked[3] = 4
elsif skill < 30
genericType(skill)
else
  
case skill
#1:Ki  2:Strength  3:Power-down 4:Friendly
when 127
self.attacked[3] = 4
when 128
self.attacked[3] = 4
when 129
self.attacked[3] = 3
end
end
end

def rush(name,logs) #Skills come first

# Types: full 0, Ki 1, Strength 2, Power-Down 3, Friendly 4
case name[1]

when 2 # Energy Deflect
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 2, "2", 3, true)
if self.block[1] < 2
self.block[1] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 4 # Sonic Sway
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
#skill_turns(self, 2, 4, "4", 3, true)
if self.block[1] < 1
self.block[0] = 1;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 7 # Strength Block
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 7, "7", 3, true)
if self.block[2] < 2
self.block[2] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end
end
end



def currentEffects #Skills Effecting players over time
len = effecting.length

show = true
c = 0

while (c < len)
  a = self.effecting[c + 2]
  if self.effecting[c+1].health <= 0 || self.health < 0  
    stop = true
else
  stop = false
  end
  
  
case a

when 1..30
genericTurn(a, c)
m = a.to_s

when 127
m = "127"

if !stop
self.effecting[c+1].health += 5
end

when 128
m = "128"
if self.effecting[c+1].effect.index(a.to_s) == nil
  stop = true
  show = false
  end
ck = currentCheck(self.effecting[c+1],4,[false,false])
#0. Afflication 1.Ki 2.Strength 3.Power-Down 4.Friendly 
if !stop && ck
self.effecting[c+1].health += 20
self.effecting[c+1].energy += 15
end

when 129
m = "129"

if self.effecting[c+1].attacked[0] == -1

elsif self.effecting[c+1].attacked[0].kind_of?(Array)
  length = self.effecting[c+1].attacked[0].length - 1
  for i in 0..length
  if self.effecting[c+1].attacked[0][i].controlling_player == self.controlling_player
   self.effecting[c+1].attacked[0][i].health += 30
   self.effecting[c+1].attacked[0][i].energy += 15
  end
  end

   
   elsif self.effecting[c+1].attacked[0].controlling_player == self.controlling_player
   self.effecting[c+1].attacked[0].health += 30
   self.effecting[c+1].attacked[0].energy += 15
   end


when 10000# Generic Trans.
m = "10000"
if self.energy > 10 && self.transformation[0] && !stop
self.energy -= 10
else
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end
end# Case end
effecting[c] -= 1
if (effecting[c] == 0 || stop)
  if show
n = effecting[c + 1].effect.index(m)
if n != nil
effecting[c + 1].effect.delete_at(n)
end
end
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)

len -= 4
else
c += 4
end# If end
end# While
end

def skills(player, skill,logs) #Speed Based Skills
move = self.skillhold[skill]

if skill <= -1
move = -1
elsif skill != 4
move = move.to_i
end

if skill == 4
case move
when true

#Transformation Area
when "10000" # Power-Up
c = check(1,10,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false && c[0]
transformskill([0.25, 0.25, 0.25, 0.25], "10000", 1)
skill_turns(self, 99, 10000, "10000", 3, true) 
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 

elsif self.transformation[0] == true && c[0]
transformskill(0, 0, 3)
end #Add more transformations before this "end" if there are any others.
end
#----------------------------Skill Area---------------------------------------
elsif 30 > move && move >= 0
generic(move, player, move, skill, logs)
elsif move >= 20
case move
when 127 #Dende Basic Healing
c = check(1, 20, skill, 2, player, 4,logs,[false,false,false])
if c[0]
skill_turns(c[1], 99, 127, "127", 3, true)
power_up(c[1],[0,0,3,0])
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 128 #Dende Advance Healing
c = check(1, 30, skill, 3, player, 4,logs,[false,false,false])
if c[0]
skill_turns(c[1], 2, 128, "128", 1, true)
c[1].conditions[0] = 0
c[1].conditions[1] = 0
c[1].conditions[2] = 0
c[1].conditions[3] = 0
c[1].stunned = [0,0,0,0]
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 129 #Quick Recovery
c = check(3, 40, skill, 4, player, 3,logs,[false,false,false])
if c[0]
skill_turns(c[1], 2, 129, "129", 1, false)

else

end

#------------------Skill Area----------------------------------------

end
end
end
end
#------------------------------------------------------------------------------------------------------------------------

class Ginger < Character

def checkType(skill)
  
if self.skillhold == skill
self.attacked[3] = 4
elsif skill < 30
genericType(skill)
else
  
case skill
#1:Ki  2:Strength  3:Power-down 4:Friendly
when 60
self.attacked[3] = 1
when 61
self.attacked[3] = 1
when 62
self.attacked[3] = 1
end

end
end

def rush(name,logs) #Skills come first

# Types: full 0, Ki 1, Strength 2, Power-Down 3, Friendly 4
case name[1]

when 2 # Energy Deflect
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 2, "2", 3, true)
if self.block[1] < 2
self.block[1] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 4 # Sonic Sway
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
#skill_turns(self, 2, 4, "4", 3, true)
if self.block[1] < 1
self.block[0] = 1;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 7 # Strength Block
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 7, "7", 3, true)
if self.block[2] < 2
self.block[2] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end
end
end

def currentEffects #Skills Effecting players over time
len = effecting.length

show = true
c = 0

while (c < len)
  a = self.effecting[c + 2]
  if self.effecting[c+1].health <= 0 || self.health < 0  
    stop = true
else
  stop = false
  end
  if effecting[c+1].effect.index(a.to_s) == nil
  stop = true
  show = false
  end
  
case a

when 1..30
genericTurn(a, c)
m = a.to_s

when 142 # Katana Kogeki
m = "142"

when 143 # Spinning Vortex
m = "143"
ck = currentCheck(self.effecting[c+1],2,[false,false])
#0. Afflication 1.Ki 2.Strength 3.Power-Down 4.Friendly 
if ck && self.effecting[c+1].attacked[0] != 1
self.effecting[c+1].energy -= 10
end

when 144 # Ginger Buster
m = "144"
ck = currentCheck(self.effecting[c+1],1,[false,false])
#0. Afflication 1.Ki 2.Strength 3.Power-Down 4.Friendly 

if self.effecting[c+1].attacked[0] != -1
power_up(self.effecting[c+1],[0,3,0,0])
elsif ck
p_k_damage(self.effecting[c+1],10)
end

when 10000# Generic Trans.
m = "10000"
if self.energy > 10 && self.transformation[0] && !stop
self.energy -= 10
else
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end

when 101
m = "10015"
if self.energy > 10 && self.transformation[0] && !stop
self.energy -= 10
self.health -= 5
else
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end

end# Case end
effecting[c] -= 1
if (effecting[c] == 0 || stop)
if show
n = effecting[c + 1].effect.index(m)
if n != nil
effecting[c + 1].effect.delete_at(n)
end
end
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
len -= 4
else
c += 4
end# If end
end# While
end

def skills(player, skill,logs) #Speed Based Skills
move = self.skillhold[skill]

if skill <= -1
move = -1
elsif skill != 4
move = move.to_i
end

if skill == 4
case move
when true

when "10000" # Power-Up
c = check(1,10,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false && c[0]
transformskill([0.25, 0.25, 0.25, 0.25], "10000", 1)
skill_turns(self, 99, 10000, "10000", 3, true) 
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
elsif self.transformation[0] == true && c[0]
transformskill(0, 0, 3)
end #Add more transformations before this "end" if there are any others.

when "10015" # Super Ginger
c = check(1,10,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false && c[0]
transformskill([0.50, 0.50, 0.50, 0.50], "10015", 1)
skill_turns(self, 99, 10015, "10015", 3, true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end
end
#----------------------------Skill Area---------------------------------------
elsif 30 > move && move >= 0
generic(move, player, move, skill, logs)
elsif move >= 20
case move

when 142 # Katana Kogeki
bk = false
if player.effect.index("144") != nil
bk = true
else
end
if transformation[1] == "10015"
c = check(1, 35, skill, 2, player, 2,logs,[bk,false,false])
else
c = check(1, 35, skill, 3, player, 2,logs,[bk,false,false])  
end
if c[0]
if bk 
p_s_damage(c[1],15)
c[1].block[4] = 2
else
s_damage(c[1],15)
c[1].block[4] = 2
end
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 143 # Spinning Vortex
if transformation[1] == "10015"
c = check(1, 30, skill, 2, player, 2,logs,[false,false,false])
else
c = check(1, 30, skill, 3, player, 2,logs,[false,false,false]) 
end
if c[0]
skill_turns(c[1],2,143,"143",3,true)
if c[1].effect.index("144") != nil
power_down(c[1],[0,0,0,2])
end
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 144 # Ginger Buster
if transformation[1] == "10015"
c = check(2, 40, skill, 3, player, 1,logs,[false,false,false])
else
c = check(2, 40, skill, 4, player, 1,logs,[false,false,false])
end
if c[0]
skill_turns(c[1],3,144,"144",3,true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end
#------------------Skill Area----------------------------------------

end
end
end
end
#------------------------------------------------------------------------------------------------------------------------

class Nicky < Character

def checkType(skill)
  
if self.skillhold == skill
self.attacked[3] = 4
elsif skill < 30
genericType(skill)
else
  
case skill
#1:Ki  2:Strength  3:Power-down 4:Friendly
when 60
self.attacked[3] = 1
when 61
self.attacked[3] = 1
when 62
self.attacked[3] = 1
end
end
end

def rush(name,logs) #Skills come first

# Types: full 0, Ki 1, Strength 2, Power-Down 3, Friendly 4
case name[1]

when 2 # Energy Deflect
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 2, "2", 3, true)
if self.block[1] < 2
self.block[1] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 4 # Sonic Sway
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
#skill_turns(self, 2, 4, "4", 3, true)
if self.block[1] < 1
self.block[0] = 1;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 7 # Strength Block
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 7, "7", 3, true)
if self.block[2] < 2
self.block[2] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end
end
end

def currentEffects #Skills Effecting players over time
len = effecting.length

show = true
c = 0

while (c < len)
  a = self.effecting[c + 2]
  if self.effecting[c+1].health <= 0 || self.health < 0  
    stop = true
else
  stop = false
  end
  if effecting[c+1].effect.index(a.to_s) == nil
  stop = true
  show = false
  end
case a

when 1..30
genericTurn(a, c)
m = a.to_s

when 139 # Katane Kogeki
m = "139"

when 140 # Lozenges Charge
m = "140"
self.stunned = [0,0,0,0]

when 141 # Lozenges Blast
m = "141"

when 10000# Generic Trans.
m = "10000"
if self.energy > 10 && self.transformation[0] && !stop
self.energy -= 10
else
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end

when 101
m = "10014"
if self.energy > 10 && self.transformation[0] && !stop
self.energy -= 10
self.health -= 5
else
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end
end# Case end
effecting[c] -= 1
if (effecting[c] == 0 || stop)
if show
n = effecting[c + 1].effect.index(m)
if n != nil
effecting[c + 1].effect.delete_at(n)
end
end
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)

len -= 4
else
c += 4
end# If end
end# While
end

def skills(player, skill,logs) #Speed Based Skills
move = self.skillhold[skill]

if skill <= -1
move = -1
elsif skill != 4
move = move.to_i
end

if skill == 4
case move
when true

when "10000" # Power-Up
c = check(1,10,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false && c[0]
transformskill([0.25, 0.25, 0.25, 0.25], "10000", 1)
skill_turns(self, 99, 10000, "10000", 3, true) 
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 

elsif self.transformation[0] == true && c[0]
transformskill(0, 0, 3)
end #Add more transformations before this "end" if there are any others.

when "10014" # Super Nicky
c = check(1,10,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false && c[0]
transformskill([0.50, 0.50, 0.50, 0.50], "10014", 1)
skill_turns(self, 99, 10014, "10014", 3, true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end
end
#----------------------------Skill Area---------------------------------------
elsif 30 > move && move >= 0
generic(move, player, move, skill, logs)
elsif move >= 20
case move

when 139 # Katana Kogeki
c = check(1, 35, skill,3, player, 3,logs,[false,false,false])
if c[0]
s_damage(c[1],15)
c[1].stunned[2] = 2
skill_turns(self,99,140,"140",3,true)
power_up(self,[0,0,0,2])
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 140 # Lozenges Charge
c = check(0, 20, skill, 0, player, 4,logs,[false,false,false])
if c[0]
skill_turns(self,99,140,"140",3,true)
power_up(c[1],[0,0,0,2])
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 141 # Lozenges Blast
c = check(2, 35, skill, 3, player, 1,logs,[false,false,false])
if c[0]
count = self.effect.count("140")
boost = count * 5
p_k_damage(c[1],20+ boost)
c[1].stunned[1] = 3
if transformation[1] != "10014"
self.effect.delete("140")
end
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end
#------------------Skill Area----------------------------------------

end
end
end
end
#------------------------------------------------------------------------------------------------------------------------

class Sansho < Character
  
def checkType(skill)

if self.skillhold == skill
self.attacked[3] = 4
elsif skill < 30
genericType(skill)
else
  
case skill

#1:Ki  2:Strength  3:Power-down 4:Friendly
when 136 # Shoulder Ram
self.attacked[3] = 2
when 137 # Spinning Vortex
self.attacked[3] = 3
when 138 # Una Zhu Fire
self.attacked[3] = 1
end
end
end

def rush(name,logs) #Skills come first

# Types: full 0, Ki 1, Strength 2, Power-Down 3, Friendly 4
case name[1]

when 2 # Energy Deflect
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 2, "2", 3, true)
if self.block[1] < 2
self.block[1] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 4 # Sonic Sway
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
#skill_turns(self, 2, 4, "4", 3, true)
if self.block[1] < 1
self.block[0] = 1;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 7 # Strength Block
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 7, "7", 3, true)
if self.block[2] < 2
self.block[2] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end
end
end

def currentEffects #Skills Effecting players over time
len = effecting.length

show = true
c = 0

while (c < len)
  a = self.effecting[c + 2]
  if self.effecting[c+1].health <= 0 || self.health < 0  
    stop = true
else
  stop = false
  end
  if effecting[c+1].effect.index(a.to_s) == nil
  stop = true
  show = false
  end
  
case a

when 1..30
genericTurn(a, c)
m = a.to_s

when 136 # Shoulder Ram
m = "136"
if self.effecting[c+1].attacked[0] != -1
self.effecting[c+1].stunned[0] = 2
end
if self.effecting[c+1].block[0] == 0 && self.effecting[c+1].block[1] == 0 && self.block[0] == 0 && self.stunned[0] == 0 && self.stunned[1] == 0  && !stop
p_k_damage(self.effecting[c+1],5)
end

when 137 # Spinning Vortex
m = "137"

when 138 # Una Zhu Fire
m = "138" 
ck = currentCheck(self.effecting[c+1],1,[false,false])
#0. Afflication 1.Ki 2.Strength 3.Power-Down 4.Friendly 
if ck  && !stop
p_k_damage(self.effecting[c+1],10)
end
if self.effecting[c] == 1 || stop
power_up(self.effecting[c+1],[5,5,5,5])
end

when 10000# Generic Trans.
m = "10000"
if self.energy > 10 && self.transformation[0] && !stop
self.energy -= 10
else
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end

when 101
m = "10013"  
if self.energy > 15 && self.transformation[0] && !stop
self.energy -= 15
self.health -= 5
else
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end

end# Case end

effecting[c] -= 1
if (effecting[c] == 0 || stop)
if show
n = effecting[c + 1].effect.index(m)
if n != nil
effecting[c + 1].effect.delete_at(n)
end
end
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
len -= 4
else
c += 4
end# If end
end# While
end

def skills(player, skill,logs) #Speed Based Skills
move = self.skillhold[skill]

if skill <= -1
move = -1
elsif skill != 4
move = move.to_i
end

if skill == 4
case move
when true

#Transformation Area
when "10000" # Power-Up
c = check(1,10,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false && c[0]
transformskill([0.25, 0.25, 0.25, 0.25], "10000", 1)
skill_turns(self, 99, 10000, "10000", 3, true) 
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 

elsif self.transformation[0] == true && c[0]
transformskill(0, 0, 3)
end

when "10013" # Super Sansho
c = check(1,15,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false && c[0]
transformskill([0.50, 0.50, 0.50, 0.50], "10013", 1)
skill_turns(self, 99, 10013, "10013", 3, true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end

end #Add more transformations before this "end" if there are any others.
#----------------------------Skill Area---------------------------------------
elsif 30 > move && move >= 0
generic(move, player, move, skill, logs)
elsif move >= 20
case move

when 136 # Shoulder Ram
if self.transformation[1] == "10013"
c= check(1, 20, skill, 3, player, 2, logs,[false,false,false])
else
c= check(1, 30, skill, 3, player, 2, logs,[false,false,false])
end
if c[0]
skill_turns(c[1], 3, 136, "136", 2, true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])   
end

when 137 # Spinning Vortex
if self.transformation[1] == "10013"
c = check(1, 20, skill, 4, player, 2,logs,[false,false,false])
else
c = check(1, 30, skill, 4, player, 2,logs,[false,false,false])
end
if c[0]
if self.speed >= c[1].speed
#Finish Cooldown Effect
c[1].conditions[2] = 3
skill_turns(c[1], 2, 137, "137", 3, true)
else
reflect_s(c[1],self,2,2)
skill_turns(c[1], 2, 137, "137", 3, true)
end
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])   
end

when 138 # Una Zhu Fire
if self.transformation[1] == "10013"
c = check(1, 25, skill, 3, player, 1,logs,[false,false,false])
else
c = check(1, 35, skill, 3, player, 1,logs,[false,false,false])
end
if c[0]
power_down(c[1],[5,5,5,5])
if c[1].effect.index("137") != nil
skill_turns(c[1], 3, 138, "138", 3, true)
elsif 
skill_turns(c[1], 4, 138, "138", 3, true)
end
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])   
end

#------------------Skill Area----------------------------------------

end
end
end
end
#------------------------------------------------------------------------------------------------------------------------




#------------------------------------------------------------------------------------------------------------------------
class Medamatcha < Character
  
def checkType(skill)
  

if self.skillhold == skill
self.attacked[3] = 4
elsif skill < 30
genericType(skill)
else
  
case skill
#1:Ki  2:Strength  3:Power-down 4:Friendly
when 162 # Evil Comet
self.attacked[3] = 1
when 163 # Parasetic Meda Clones
self.attacked[3] = 2
when 164 # Parasetic Meda Consumption
self.attacked[3] = 2
when 165 # Revitalization
self.attacked[3] = 2
end
end
end

def rush(name,logs) #Skills come first

# Types: full 0, Ki 1, Strength 2, Power-Down 3, Friendly 4
case name[1]

when 2 # Energy Deflect
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 2, "2", 3, true)
if self.block[1] < 2
self.block[1] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 4 # Sonic Sway
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
#skill_turns(self, 2, 4, "4", 3, true)
if self.block[1] < 1
self.block[0] = 1;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 7 # Strength Block
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 7, "7", 3, true)
if self.block[2] < 2
self.block[2] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end
end
end



def currentEffects #Skills Effecting players over time
len = effecting.length

show = true
c = 0

while (c < len)
  a = self.effecting[c + 2]
  if self.effecting[c+1].health <= 0 || self.health < 0  
    stop = true
else
  stop = false
  end
  if effecting[c+1].effect.index(a.to_s) == nil
  stop = true
  show = false
  end
  
case a

when 1..30
genericTurn(a, c)
m = a.to_s

when 10000# Generic Trans.
m = "10000"
if self.energy > 10 && self.transformation[0] && !stop
self.energy -= 10
else
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end

when 162 # Evil Comet
m = "162"
skill_turns(self.effecting[c+1],99,163,"163",3,true)

when 163 # Parasetic Meda Clone
m = "163"

when 164 # Meda Clone Consumption
m = "164"

when 10000# Generic Trans.
m = "10000"
if self.energy > 10 && self.transformation[0] && !stop
self.energy -= 10
else
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end

when 101
m = "10013"
if self.energy > 15 && self.transformation[0] && !stop
self.energy -= 15
self.health -= 5
else
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end
end

effecting[c] -= 1
if (effecting[c] == 0 || stop)
if show
n = effecting[c + 1].effect.index(m)
if n != nil
effecting[c + 1].effect.delete_at(n)
end
end
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)

len -= 4
else
c += 4
end# If end
end# While
end

def skills(player, skill,logs) #Speed Based Skills
move = self.skillhold[skill]

if skill <= -1
move = -1
elsif skill != 4
move = move.to_i
end

if skill == 4
case move
when true

#Transformation Area
when "10000" # Power-Up
c = check(1,10,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false && c[0]
transformskill([0.25, 0.25, 0.25, 0.25], "10000", 1)
skill_turns(self, 99, 10000, "10000", 3, true) 
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
elsif self.transformation[0] == true && c[0]
transformskill(0, 0, 3)
end

end #Add more transformations before this "end" if there are any others.
#----------------------------Skill Area---------------------------------------
elsif 30 > move && move >= 0
generic(move, player, move, skill, logs)
elsif move >= 20
case move

when 162 # Evil Comet
c = check(1, 30, skill, 3, player, 1,logs,[false,false,false])
if c[0]
l = c[1].length - 1
i = 0
for i in 0..l
skill_turns(c[1][i], 2, 162, "162", 3, true)
k_damage(c[1][i],5)
end
health = [player[0].health,player[1].health,player[2].health]
logs.push(4,move,health,[self.controlling_player.vs,self.info[1]],c[3],c[4])  
else
logs.push(4,move,0,[self.controlling_player.vs,self.info[1]],c[3],c[4])  
end 

when 163 # Parasetic Meda Clones
c = check(0, 20, skill, 0, player, 2,logs,[false,false,false])
if c[0]
skill_turns(c[1], 99, 163, "163", 3, true)
skill_turns(c[1], 99, 163, "163", 3, true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])  
end

when 164 # Meda Clone Consumption
c = check(1, 35, skill, 3, player, 2,logs,[false,false,false])

if c[0]
count = c[1].effect.count("163")
if count >= 2
c[1].energy -= count * 5
self.energy += count * 5
["163","163"].each do |del|
    c[1].effect.delete_at(c[1].effect.index(del))
end
end
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])  
end

when 165 # Revitalization
c = check(3, 50, skill, 4, player, 2,logs,[false,false,false])
if c[0]
l = c[1].length - 1
i = 0
count = 0
for i in 0..l
count += c[1][i].effect.count("163")
c[1][i].effect.delete("163")
end
if count != 0
  
play = self.controlling_player.characters.values
heal(player[0],count * 5 ,0)

if play[0] != self && play[0].health >= 0 
heal(player[0],(count * 5) / 2 ,0)
end

if play[1] != self && play[1].health >= 0 
heal(player[1],(count * 5) / 2 ,0)
end

if play[2] != self && play[2].health >= 0 
heal(player[2],(count * 5) / 2 ,0)
end

health = [player[0].health,player[1].health,player[2].health]
logs.push(4,move,health,[self.controlling_player.vs,self.info[1]],c[3],c[4])  
else
logs.push(4,move,0,[self.controlling_player.vs,self.info[1]],c[3],c[4])  
end
end#IFERROR REMOVE
#------------------Skill Area----------------------------------------

end
end
end
end
#------------------------------------------------------------------------------------------------------------------------




#------------------------------------------------------------------------------------------------------------------------
class Zarbon < Character
  
def checkType(skill)
  

if self.skillhold == skill
self.attacked[3] = 4
elsif skill < 30
genericType(skill)
else
  
case skill
#1:Ki  2:Strength  3:Power-down 4:Friendly
when 130
self.attacked[3] = 1
when 131
self.attacked[3] = 2
when 132
self.attacked[3] = 1
when 133
self.attacked[3] = 1
when 134
self.attacked[3] = 2
when 135
self.attacked[3] = 2
end
end
end
  

def rush(name,logs) #Skills come first

# Types: full 0, Ki 1, Strength 2, Power-Down 3, Friendly 4
case name[1]

when 2 # Energy Defle
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 2, "2", 3, true)
if self.block[1] < 2
self.block[1] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 4 # Sonic Sway
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
#skill_turns(self, 2, 4, "4", 3, true)
if self.block[1] < 1
self.block[0] = 1;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 7 # Strength Block
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 7, "7", 3, true)
if self.block[2] < 2
self.block[2] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end
end
end

def currentEffects #Skills Effecting players over time
len = effecting.length

show = true
c = 0

while (c < len)
  a = self.effecting[c + 2]
  if self.effecting[c+1].health <= 0 || self.health < 0  
    stop = true
else
  stop = false
  end
  if effecting[c+1].effect.index(a.to_s) == nil
  stop = true
  show = false
  end
  
case a

when 1..30
genericTurn(a, c)
m = a.to_s

when 130 # Ruthless Blow
m = "130"
if self.attacked[1] == 130
self.effecting[c] += 1
end

when 131 # Bloody Dance
m = "131"
ck = currentCheck(self.effecting[c+1],2,[false,false])
#0. Afflication 1.Ki 2.Strength 3.Power-Down 4.Friendly 

if ck && !stop
s_damage(self.effecting[c + 1], 10)
end

when 132 # Elegant Blaster!
m = "132"
if self.effecting[c] == 1 && !stop
k_damage(effecting[c + 1], 20)
elsif self.stunned[1] != 0 && self.stunned[0] != 0 && !stop
k_damage(self.effecting[c + 1], 10)
stop = true 
else
end

when 133 # Possibility Cannon
m = "133"

when 134 # Monster Break
m = "134"

when 135 # Piledriver
m = "135"


if self.effecting[c] == 1 && !stop && self.stunned[2] == 0 && self.stunned[0] == 0 && self.effecting[c+1].block[0] == 0 && self.effecting[c+1].block[2] == 0 
p_s_damage(self.effecting[c+1], 30)
else
end


when 10000# Generic Trans.
m = "10000"
if self.energy > 10 && self.transformation[0] && !stop
self.energy -= 10
else
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end

when 101
  m = "10010"
  if self.energy > 15 && self.transformation[0] && !stop
  self.energy -= 20
  else
  self.energy -= 20
  self.strength -= 8
  self.ki -= 8
  self.defense -= 8
  self.transformation = [false, "none", 0, 0, 0, 0,false]
  stop = true
  d = self.skillhold.index("133")
  b = self.skillhold.index("134")
  a = self.skillhold.index("135")
  if a != nil
  self.skillhold[a] = "130"
  end
  if b != nil
  self.skillhold[b] = "131"
  end
  if d != nil
  self.skillhold[d] = "132"
  end
  end
  
end# Case end
effecting[c] -= 1
if (effecting[c] == 0 || stop)
  if show
n = effecting[c + 1].effect.index(m)
if n != nil
effecting[c + 1].effect.delete_at(n)
end
end
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)

len -= 4
else
  c += 4
end# If end
end# While
end

def skills(player, skill,logs) #Speed Based Skills
move = self.skillhold[skill]

if skill <= -1
move = -1
elsif skill != 4
move = move.to_i
end

if skill == 4
case move
when true

when "10000" # Power-Up
c = check(1,10,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false && c[0]
transformskill([0.25, 0.25, 0.25, 0.25], "10000", 1)
skill_turns(self, 99, 10000, "10000", 3, true) 
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
elsif self.transformation[0] == true && c[0]
transformskill(0, 0, 3)
end #Add more transformations before this "end" if there are any others.

when "10010" # Monster Zarbon Trans.
c = check(1, 15, skill, 0, player, 4,logs,[false,false,false])
if self.transformation[0] == false && c[0] 
self.transformation[0] = true
self.transformation[1] = "10010"
self.transformation[6] = true
puts "Transformation: #{self.transformation}"
skill_turns(self, 99, 101, "10010", 3, true)
self.ki += 8
self.defense += 8
self.strength += 8
d = self.skillhold.index("130")
b = self.skillhold.index("131")
a = self.skillhold.index("132")
if d != nil
self.skillhold[d] = "133"
end
if b != nil
self.skillhold[b] = "134"
end
if a != nil
self.skillhold[a] = "135"
end
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
elsif self.transformation[0] == true && c[0]
self.transformation[0] = false

end #Add more transformations before this "end" if there are any others.
end 

elsif 30 > move && move >= 0
generic(move, player, move, skill, logs)
elsif move >= 20
case move

when 130 # Ruthless Blow
c = check(1, 30, skill, 0, player, 1,logs,[false,false,false])
if c[0]
count = self.effect.count("130")
s_damage(c[1],10 + count * 3)
skill_turns(self,1,130,"130",3,true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 131  # Bloody Dance
c = check(2, 30, skill, 3, player, 1,logs,[false,false,false])
if c[0]
skill_turns(c[1],3,131,"131",3,true)
power_down(c[1],[0,0,3,0])
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 132  # Elegant Blaster
c = check(1, 30, skill, 2, player, 1,logs,[false,false,false])
if c[0]
skill_turns(c[1],2,132,"132",3,true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 133  # Possibility Cannon!
c = check(2, 35, skill, 2, player, 1,logs,[false,false,false])
if c[0]
k_damage(c[1],20)
power_down(c[1],[0,2,0,0])
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 134  # Monster Break
c = check(2, 30, skill, 2, player, 1,logs,[false,false,false])
if c[0]
s_damage(c[1],25)
power_down(c[1],[0,0,3,0])
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 135  # Piledriver
c = check(3, 35, skill, 0, player, 1,logs,[false,false,false])
if c[0]
skill_turns(c[1], 2, 135, "135", 3, true)
self.stunned[0] = 2
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end
#------------------Skill Area----------------------------------------

end
end
end
end
#------------------------------------------------------------------------------------------------------------------------




#------------------------------------------------------------------------------------------------------------------------
class GokuZ < Character

def checkType(skill)
  
if self.skillhold == skill
self.attacked[3] = 4
elsif skill < 30
genericType(skill)
else
  
case skill
#1:Ki  2:Strength  3:Power-down 4:Friendly
when 31
self.attacked[3] = 2
when 32
self.attacked[3] = 1
when 33
self.attacked[3] = 1
when 34
self.attacked[3] = 1
when 35
self.attacked[3] = 1
end
end
end


def rush(name,logs)
# Types: full 0, Ki 1, Strength 2, Power-Down 3, Friendly 4
case name[1]


when 2 # Energy Deflect
c = check(1, 20, name[2], 3, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 2, "2", 3, true)
if self.block[1] < 2
self.block[1] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],0,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])  
end

when 4 # Sonic Sway
c = check(1, 20, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
#skill_turns(self, 2, 4, "4", 3, true)
if self.block[1] < 1
self.block[0] = 1;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 7 # Strength Block
c = check(1, 20, name[2], 3, self, 4,logs,[false,false,false])
if c[0]
#skill_turns(self, 2, 7, "7", 3, true)
if self.block[2] < 2
self.block[2] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end
end
end

def currentEffects

len = self.effecting.length

show = true
c = 0

while (c < len)

  a = self.effecting[c + 2]
  if self.effecting[c+1].health <= 0 || self.health < 0
  stop = true
else
  stop = false
  end
  if effecting[c+1].effect.index(a.to_s) == nil
  stop = true
  show = false
  end
  
case a

when 1..30

genericTurn(a, c)
m = a.to_s

when 32 # Spirit Bomb
m = "32"
if self.effecting[c] == 1 && !stop
p_k_damage(self.effecting[c + 1], 30)
self.effecting[c+1].stunned[0] = 2
elsif self.stunned[2] != 0 && self.stunned[0] != 0 && !stop
p_k_damage(effecting[c + 1], 25)
self.effecting[c+1].stunned[0] = 2
stop = true # Forces a skill to end after trigger.
else
end

when 33 # Large Spirit Bomb
m = "33"
if self.effecting[c] == 1 && !stop
p_k_damage(effecting[c + 1], 40)
elsif self.stunned[2] != 0 && self.stunned[1] != 0  && !stop
p_k_damage(effecting[c + 1], 30)
stop = true
else
end

when 10000 # Generic Trans.
m = "10000"
if self.energy > 10 && self.transformation[0] && !stop
self.energy -= 10
else
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end

when 10001 # Goku Trans. 1
m = "10001"

if self.energy > 15 && self.transformation[0] && !stop
self.energy -= 15
self.strength += 4
self.ki += 4

if self.defense != 0
self.defense -= 1
self.transformation[4] += 1
end
self.speed += 4
self.transformation[2] += 4
self.transformation[3] += 4
self.transformation[5] += 4
else
self.energy -= 15
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense += self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0, false]
a = self.skillhold.index("33")
b = self.skillhold.index("35")
if a != nil
self.skillhold[a] = "32"
end
if b != nil
self.skillhold[b] = "34"
end
stop = true
end
end# Case end

self.effecting[c] -= 1
if (self.effecting[c] == 0 || stop)
n = effecting[c + 1].effect.index(m)
if n != nil
self.effecting[c + 1].effect.delete_at(n)
end
self.effecting.delete_at(c)
self.effecting.delete_at(c)
self.effecting.delete_at(c)
if show
self.effecting.delete_at(c)
end
len -= 4
else
c += 4
end# If end
end# While  
end

def skills(player, skill,logs)

puts "logs: #{logs}"
#battlelogs = {"turn" => 0, 1=>[],2=>[],3=>[],4 => [],5=> [],6=> []}
#{Turn Number = [[success,skill,damage,user,target,reflect]]}
#success 0:Success 1.Immunity 2.Stunned 3.Countered 4.Fail
move = self.skillhold[skill]
if skill <= -1
move = -1
elsif skill != 4
move = move.to_i
end
if skill == 4

case move

when "10000" # Power Up
c = check(1, 10, skill, 0, player, 4,logs,[false,false,false])
if c[0] && self.transformation[0] == false
transformskill([0.25, 0.25, 0.25, 0.25], "10000", 1)
skill_turns(self, 99, 10000, "10000", 3, true) 
# First is target(self means you, player means ally or enemy). Second is turns(use 99 long turns).Third is skillID.Fourth is trans name.Fifth is type.
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
elsif c[0] && self.transformation[0] == true 
transformskill(0, 0, 3)
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end

when "10001" # Kaio-Ken
c = check(1, 15, skill, 0, player, 4,logs,[false,false,false])
if c[0] && self.transformation[0] == false 
transformskill(0, "10001", 2)
skill_turns(self, 99, 10001, "10001", 3, true)

a = self.skillhold.index("32")
b = self.skillhold.index("34")
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
if a != nil
self.skillhold[a] = "33"
end
if b != nil
self.skillhold[b] = "35"
end

elsif c[0] && self.transformation[0] == true 
self.transformation[0] = false
self.transformation[6] = false
else
end
end
elsif move <= 30 && move >= 0
generic(move, player, move, skill, logs)
elsif move >= 31
t = true
else
end
  
case move
when true

when 31 # Punishing Attack
if self.transformation[6] == false
c = check(1, 25, skill, 2, player, 2,logs,[true,false,false])
if c[0]
s_damage(c[1], 10)# Target, How much damage.
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
puts logs
#battlelogs = {"turn" => 0, 1=>[],2=>[],3=>[],4 => [],5=> [],6=> []}
#{Turn Number = [[success,skill,damage,vs,user,target,reflect]]}
#success 0:Success 1.Immunity 2.Stunned 3.Countered 4.Fail
#Grab c[1].health for damage
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end
elsif self.transformation[1] == "10001" 
c = check(1, 20, skill, 2, player, 2,logs,[false,false,false])
if c[0]
s_damage(c[1], 10)
power_down(c[1], [2, 2, 0, 0])
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end
end

when 32 # Spirit Bomb
c = check(3, 40, skill, 4, player, 1,logs,[false,false,false])
if c[0]
skill_turns(c[1], 3, 32, "32", 2, true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end

when 33 # Large Spirit Bomb
if self.transformation[1] == "10001"
c = check(3, 40, skill, 5, player, 1,logs,[false,false,false])
if c[0]
skill_turns(c[1], 3, 33, "33", 2, true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end
end

when 34 # Kamahamaha
if player.ki < self.ki
c = check(2, 30, skill, 0, player, 1,logs,[false,true,false])
if c[0]
p_k_damage(c[1], 20)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end
else
c = check(2, 30, skill, 0, player, 1,logs,[false,true,false])
if c[0]
k_damage(c[1],15)
power_down(self,[0,2,0,0])
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end
end

when 35 # Kaioken Kamahamaha
if self.transformation[1] == "10001"
c = check(2, 20, skill, 0, player, 1,logs,[false,false,false])
if c[0]
if c[1].ki < self.ki
p_k_damage(c[1], 20)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
k_damage(c[1], 20)  
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end
end
else

end

end
end
#------------------------------------------------------------------------------------------------------------------------




#------------------------------------------------------------------------------------------------------------------------
class Cooler < Character
  
def checkType(skill)
  
if self.skillhold == skill
self.attacked[3] = 4
elsif skill < 30
genericType(skill)
else
  
case skill
#1:Ki  2:Strength  3:Power-down 4:Friendly
when 123
self.attacked[3] = 4
when 124
self.attacked[3] = 1
when 125
self.attacked[3] = 1
when 126
self.attacked[3] = 1
end
end
end

def rush(name,logs)
# Types: full 0, Ki 1, Strength 2, Power-Down 3, Friendly 4
case name[1]

when 2 # Energy Deflect
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 2, "2", 3, true)
if self.block[1] < 2
self.block[1] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 4 # Sonic Sway
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
#skill_turns(self, 2, 4, "4", 3, true)
if self.block[1] < 1
self.block[0] = 1;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 7 # Strength Block
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 7, "7", 3, true)
if self.block[2] < 2
self.block[2] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end
end
end

def currentEffects
len = effecting.length

show = true
c = 0

while (c < len)
  a = self.effecting[c + 2]
  if self.effecting[c+1].health <= 0 || self.health < 0  
    stop = true
else
  stop = false
  end
  if effecting[c+1].effect.index(a.to_s) == nil
  stop = true
  show = false
  end
  
case a

when 1..30
genericTurn(a, c)
m = a.to_s

when 123 # Nova Chariot
m = "123"

when 124 # Death Laser
m ="124"  
  
when 10000# Generic Trans.
m = "10000"
if self.energy > 10 && self.transformation[0] && !stop
self.energy -= 10
else
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end

when 101 # Cooler Trans. 1
m = "10017"
if self.energy > 15 && self.transformation[0] && !stop
self.energy -= 15
else
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
#self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end
end# Case end
effecting[c] -= 1
if (effecting[c] == 0 || stop)
if show
n = effecting[c + 1].effect.index(m)
if n != nil
effecting[c + 1].effect.delete_at(n)
end
end

effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
len -= 4
else
c += 4
end# If end
end# While
end


def skills(player, skill,logs)
move = self.skillhold[skill]

if skill <= -1
move = -1
elsif skill != 4
move = move.to_i
end

if skill == 4
case move
when true


when "10000" # Power Up
c = check(1,10,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false && c[0]
transformskill([0.25, 0.25, 0.25, 0.25], "10000", 1)
skill_turns(self, 99, 10000, "10000", 3, true) 
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
elsif self.transformation[0] == true && c[0]
transformskill(0, 0, 3)
end #Add more transformations before this "end" if there are any others.

when "10017" # Final Form Cooler
c = check(1,15,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false && c[0]
transformskill([0.5, 0.5, 0.5, 0.5], "10017", 1)
skill_turns(self, 99, 10017, "10017", 3, true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
elsif self.transformation[0] == true && c[0]
transformskill(0, 0, 3)
end #Add more transformations before this "end" if there are any others.
end
elsif 30 > move && move >= 0
generic(move, player, move, skill, logs)
elsif move >= 20
case move

when 123
c = check(0, 30,skill, 3, player, 4,logs,[false,false,false])
if c[0]
self.ki += 3  
bpeffect(player,1)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])

end

when 124
c = check(2, 30, skill, 2, player, 1,logs,[false,false,false])
if c[0]
k_damage(c[1],20)  
if c[1].health <= 15
c[1].health = 0
end
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end

when 125
count = 0
if self.effect.index("125") != nil
count += 5
end
c = check(1, 30, skill, 0, player, 1,logs,[false,false,false])
if c[0]
k_damage(c[1],10+count)  
skill_turns(self, 1, 125, "125", 1, true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end

when 126
c = check(3, 40, skill, 3, player, 1,logs,[false,false,false])
if c[0] && self.effect.index("125") != nil
l = c[1].length - 1
i = 0
for i in 0..l
k_damage(c[1][i],20)
end
health = [player[0].health,player[1].health,player[2].health]
logs.push(4,move,health,[self.controlling_player.vs,self.info[1]],c[3],c[4])  
else
logs.push(4,move,0,[self.controlling_player.vs,self.info[1]],c[3],c[4])  
end

end
end
end
end
#------------------------------------------------------------------------------------------------------------------------




#------------------------------------------------------------------------------------------------------------------------
class Dodoria < Character
  
def checkType(skill)
  
if self.skillhold == skill
self.attacked[3] = 4
elsif skill < 30
genericType(skill)
else
  
case skill
#1:Ki  2:Strength  3:Power-down 4:Friendly
when 119
self.attacked[3] = 2
when 120
self.attacked[3] = 4
when 121
self.attacked[3] = 1
end
end
end

def rush(name,logs)

# Types: full 0, Ki 1, Strength 2, Power-Down 3, Friendly 4
case name[1]
when 2
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 2, "2", 3, true)
if self.block[1] < 2
self.block[1] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 4 # sonic sway
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
#skill_turns(self, 2, 4, "4", 3, true)
if self.block[1] < 1
self.block[0] = 1;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 7
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 7, "7", 3, true)
if self.block[2] < 2
self.block[2] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 120
c = check(2, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
c[1].counter[4] = 1
skill_turns(c[1], 2, 120, "120", 4, true)
pl = self.controlling_player.enemy.values

  if pl[0].attacked[0].kind_of?(Array)
   if pl[0].attacked[0].index(self)
   skill_turns(pl[0],3,120,"120",3,true)
   end
   elsif pl[0].attacked[0] == self 
   skill_turns(pl[0],3,120,"120",3,true)
   end
   if pl[1].attacked[0].kind_of?(Array)
   if pl[1].attacked[0].index(self)
   skill_turns(pl[1],3,120,"120",3,true)
   end
   elsif pl[1].attacked[0] == self
   skill_turns(pl[1],3,120,"120",3,true)
   end
   if pl[2].attacked[0].kind_of?(Array)
   if pl[2].attacked[0].index(self)
   skill_turns(pl[2],3,120,"120",3,true)
   end
   elsif pl[2].attacked[0] == self
   skill_turns(pl[2],3,120,"120",3,true)
   end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end 



end
end

def currentEffects
len = effecting.length

show = true
c = 0

while (c < len)
  a = self.effecting[c + 2]
  if self.effecting[c+1].health <= 0 || self.health < 0  
    stop = true
else
  stop = false
  end
  if effecting[c+1].effect.index(a.to_s) == nil
  stop = true
  show = false
  end
  
case a

when 1..30
genericTurn(a, c)
m = a.to_s

when 119
m = "119"  

when 120
m = "120"  

when 121
m = "121"

when 122
m = "122"  


when 10000# Generic Trans.
m = "10000"
if self.energy > 10 && self.transformation[0] && !stop
self.energy -= 10
else
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end
end# Case end
effecting[c] -= 1
if (effecting[c] == 0 || stop)
if show
n = effecting[c + 1].effect.index(m)
if n != nil
effecting[c + 1].effect.delete_at(n)
end
end
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)

len -= 4
else
  c += 4
end# If end
end# While
end



def skills(player, skill,logs)
move = self.skillhold[skill]

if skill <= -1
move = -1
elsif skill != 4
move = move.to_i
end

if skill == 4
case move
when true

when "10000" # Power-Up
c = check(1,10,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false && c[0]
transformskill([0.25, 0.25, 0.25, 0.25], "10000", 1)
skill_turns(self, 99, 10000, "10000", 3, true) 
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 

elsif self.transformation[0] == true && c[0]
transformskill(0, 0, 3)
end #Add more transformations before this "end" if there are any others.
end

elsif 30 > move && move >= 0
generic(move, player, move, skill, logs)
elsif move >= 20
case move

when 119
c = check(2, 30, skill, 3, player, 2,logs,[false,false,false])

if c[1].effect.index("120") != nil
increase = 10
else
increase = 0
end

if c[0]
if c[1].defense <  self.speed
s_damage(c[1],25 + increase)
c[1].stunned[2] = 2
else
s_damage(c[1],15 + increase)  
c[1].stunned[2] = 2
skill_turns(c[1],2,119,"119",2,true)
end  
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end

when 121
if c[1].effect.index("120") != nil
increase = 10
else
increase = 0
end

if self.health >= 120
c = check(1, 30, skill, 0, player, 1,logs,[false,false,false])
if c[0]

k_damage(c[1],15 + increase)  
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end
elsif self.health >= 71
c = check(2, 30, skill, 0, player, 1,logs,[false,false,false])
if c[0]
k_damage(c[1],25 + increase)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end
elsif self.health  >= 21
c = check(3, 30, skill, 0, player, 1, logs,[false,false,false])  
if c[0]
k_damage(c[1],35 + increase)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end
elsif self.health <= 20
c = check(4, 30, skill, 0, player, 1, logs,[false,false,false])  
if c[0]
k_damage(c[1],45 + increase)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end
end


when 122
c = check(1, 30, skill, 3, player, 2,logs,[false,false,false])
if c[0]
if c[1].health <= 25
c[1].health = 0  
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end

end

end
end
end
end
#------------------------------------------------------------------------------------------------------------------------




#------------------------------------------------------------------------------------------------------------------------
class KidGoku < Character
  
def checkType(skill)
  

if self.skillhold == skill
self.attacked[3] = 4
elsif skill < 30
genericType(skill)
else
  
case skill

when 109
self.attacked[3] = 4
#1:Ki  2:Strength  3:Power-down 4:Friendly
when 110
self.attacked[3] = 4
when 111
self.attacked[3] = 1
when 112
self.attacked[3] = 4
when 113
self.attacked[3] = 2
when 114
self.attacked[3] = 1
end
end
end

def rush(name,logs)

# Types: full 0, Ki 1, Strength 2, Power-Down 3, Friendly 4
case name[1]

when 2 # Energy Deflect
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 2, "2", 3, true)
if self.block[1] < 2
self.block[1] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 4 # Sonic Sway
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
if self.block[1] < 1
self.block[0] = 1;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 7 # Strength Block
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 7, "7", 3, true)
if self.block[2] < 2
self.block[2] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 110
c = check(1, 30, name[2], 3, name[0], 4,logs,[false,false,false])
if c[0]
c[1].counter[4] = 1
skill_turns(c[1], 1, 110, "110", 1, false)
end
end
end

def currentEffects
len = effecting.length

show = true
c = 0

while (c < len)
  a = self.effecting[c + 2]
  if self.effecting[c+1].health <= 0 || self.health < 0  
    stop = true
else
  stop = false
  end
  if effecting[c+1].effect.index(a.to_s) == nil
  stop = true
  show = false
  end
  
case a

when 1..30
genericTurn(a, c)
m = a.to_s

when 109
m = "109"
if self.effecting[c+1].attacked[0] != -1
heal(self.effecting[c+1],15,0)
end

when 110
m = "110"
pl = self.controlling_player.enemy.values 
 if pl[0].attacked[0].kind_of?(Array)
   if pl[0].attacked[0].index(self.effecting[c+1])
   pl[0].stunned[1] = 3
   end
   elsif pl[0].attacked[0] == self.effecting[c+1]
   pl[0].stunned[1] = 3
   end
   if pl[1].attacked[0].kind_of?(Array)
   if pl[1].attacked[0].index(self.effecting[c+1])
   pl[1].stunned[1] = 3
   end
   elsif pl[1].attacked[0] == self.effecting[c+1]
   pl[1].stunned[1] = 3
   end
   if pl[2].attacked[0].kind_of?(Array)
   if pl[2].attacked[0].index(self.effecting[c+1])
   pl[2].stunned[1] = 3
   end
   elsif pl[2].attacked[0] == self.effecting[c+1]
   pl[2].stunned[1] = 3
   end
   
when 70
m = "112"
if self.effecting[c+1].attacked[0] != -1
k_damage(self.effecting[c+1],15)
end

when 112
m = "112"

when 113
m = "113"
if self.effecting[c+1].attacked[0] != -1
k_damage(self.effecting[c+1],25)
end


when 10000# Generic Trans.
m = "10000"
if self.energy > 10 && self.transformation[0] && !stop
self.energy -= 10
else
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end

when 101
m = "10018"
if self.energy > 10 && self.transformation[0] && !stop
self.energy -= 15
else
a = self.skillhold.index("112")
b = self.skillhold.index("113")
d = self.skillhold.index("114")
if a != nil
self.skillhold[a] = "109"
end
if b != nil
self.skillhold[b] = "110"
end
if d != nil
self.skillhold[d] = "111"
end
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end
end# Case end
effecting[c] -= 1
if (effecting[c] == 0 || stop)
if show
n = effecting[c + 1].effect.index(m)
if n != nil
effecting[c + 1].effect.delete_at(n)
end
end
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)

len -= 4
else
c += 4
end# If end
end# While
end



def skills(player, skill,logs)
move = self.skillhold[skill]

if skill <= -1
move = -1
elsif skill != 4
move = move.to_i
end

if skill == 4
case move
when true

when "10000" # Power-Up
c = check(1,10,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false && c[0]
transformskill([0.25, 0.25, 0.25, 0.25], "10000", 1)
skill_turns(self, 99, 10000, "10000", 3, true) 
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 

elsif self.transformation[0] == true  && c[0]
transformskill(0, 0, 3)
end #Add more transformations before this "end" if there are any others.

when "10018" # Oozaru Kid Goku
c = check(2,15,skill,0,player,4,logs,[false,false,false])  
if self.transformation[0] == false  && c[0]
transformskill([0.5, 0.5, 0.5, 0], "10018", 1)
a = self.skillhold.index("109")
b = self.skillhold.index("110")
d = self.skillhold.index("111")
if a != nil
self.skillhold[a] = "112"
end
if b != nil
self.skillhold[b] = "113"
end
if d != nil
self.skillhold[d] = "114"
end
skill_turns(self, 99, 10018, "10018", 3, true)
logs.push(0,move,0,[self.controlling_player.vs,self.info[1]],c[2],self.info[1])
elsif self.transformation[0] == true && c[0]
transformskill(0, 0, 3)
end #Add more transformations before this "end" if there are any others.
end

elsif 30 > move && move >= 0
generic(move, player, move, skill, logs)
elsif move >= 20
case move
when 109
health = [player[0].health,player[1].health,player[2].health]
c = check(2, 30, skill, 3, player, 4,logs,[false,false,false])
if c[0]
i = 0
l = c[1].length - 1
for i in 0..l
skill_turns(c[1][i], 4, 109, "109", 1, true)
c[1][i].reflect = []
c[1][i].counter[7] = 0
c[1][i].defense += 3
end
logs.push(4,move,health,[self.controlling_player.vs,self.info[1]],c[3],c[4])    
else
logs.push(4,move,0,[self.controlling_player.vs,self.info[1]],c[3],c[4]) 
end

when 111
c = check(1, 25, skill, 2, player, 1,logs,[false,false,false])
if c[0]
if self.ki > c[1].ki
p_k_damage(c[1],15)
c[1].speed -= 3
c[1].ki -= 3
else
k_damage(c[1],15)
self.ki += 3  
end
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end

when 112
health = [player[0].health,player[1].health,player[2].health]
c = check(2, 25, skill, 4, player, 4,logs,[false,false,false])
if c[0]
i = 0
l = c[1].length - 1
for i in 0..l
c[1][i].strength += 5
c[1][i].stunned = [0,0,0,0]
c[1][i].conditions[0] = 0
end  
skill_turns(self, 2, 112, "112", 1, true)
logs.push(4,move,health,[self.controlling_player.vs,self.info[1]],c[3],c[4])   
else
logs.push(4,move,0,[self.controlling_player.vs,self.info[1]],c[3],c[4]) 
end

when 114
c = check(3, 35, skill, 2, player, 1,logs,[false,false,false])
if c[0]
if self.effect.index("112") != nil
k_damage(c[1],40)
percent_up(c[1],[0,-0.20,0,-0.20])
else
k_damage(c[1],30)
percent_up(c[1],[0,-0.20,0,-0.15])
end
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end

end
end
end
end
#------------------------------------------------------------------------------------------------------------------------




#------------------------------------------------------------------------------------------------------------------------
class GarlicJr < Character
  
def checkType(skill)
  

if self.skillhold == skill
self.attacked[3] = 4
elsif skill < 30
genericType(skill)
else
  
case skill
#1:Ki  2:Strength  3:Power-down 4:Friendly
when 106 # Mind Break
self.attacked[3] = 3
when 107 # Sealed Light Beam
self.attacked[3] = 3
when 108 # Death Impact
self.attacked[3] = 1
when 115 # Immortality
self.attacked[3] = 4
when 116 # Dead Zone
self.attacked[3] = 1
when 117 # Death Impact
self.attacked[3] = 1
when 118 # Darkness Illusion
self.attacked[3] = 2
end
end
end

def rush(name,logs)

# Types: full 0, Ki 1, Strength 2, Power-Down 3, Friendly 4
case name[1]

when 2 # Energy Deflect
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 2, "2", 3, true)
if self.block[1] < 2
self.block[1] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 4 # Sonic Sway
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
#skill_turns(self, 2, 4, "4", 3, true)
if self.block[1] < 1
self.block[0] = 1;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 118 # Darkness Illusion
c = check(2, 25, name[2], 2, name[0], 2, logs,[false,false,false])
if c[0]
c[1].counter[2] = 2
skill_turns(c[1], 2, 118, "118", 2, true)
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 7 # Strength Block
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 7, "7", 3, true)
if self.block[2] < 2
self.block[2] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end
end
end

def currentEffects
len = effecting.length

show = true
c = 0

while (c < len)
  a = self.effecting[c + 2]
  if self.effecting[c+1].health <= 0 || self.health < 0  
    stop = true
else
  stop = false
  end
  if effecting[c+1].effect.index(a.to_s) == nil
  stop = true
  show = false
  end
  
case a

when 1..30
genericTurn(a, c)
m = a.to_s

when 34 # Dead Zone
m = "116"

when 106 # Mind Break
m = "106"
if stop || self.effecting[c] == 1 
self.effecting[c+1].ki -= 10
self.effecting[c+1].strength -= 10
end

when 107 # Sealed Light Beam
m = "107"  

when 108 # Death Impact
m = "108"  
a_damage(self.effecting[c+1],5)

when 115
m = "115"  
if self.health <= 0 
self.effecting[c] = 1
self.conditions[1] = 1
self.health = 60
stop = true
else
stop = false
end

when 116 # Dead Zone
m = "116"
if self.effecting[c] == 1 
self.effecting[c+1].health = 0
self.effecting[c+1].stunned[3] = 99
self.effecting[c+1].block[3] = 99
end  

when 117 # Death Impact
m = "117"
if self.effecting[c+1].attacked[0] != 0
a_damage(self.effecting[c+1],5)
c[1].stunned[2] = 2
end

when 118 # Darkness Illusion
m = "118"
if self.effecting[c+1].attacked[0] != 0 && self.effecting[c+1].block[0] != 0 && self.effecting[c+1].block[1] != 0
self.block[2] = 2
s_damage(self.effecting[c+1],15)
end

when 10000# Generic Trans.
m = "10000"
if self.energy > 10 && self.transformation[0] && !stop
self.energy -= 10
else
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end

when 101
m = "10016"  
self.energy -= 10
stop = true
self.transformation[1] = "10016" 

end# Case end

effecting[c] -= 1
if (effecting[c] == 0 || stop)
if show
n = effecting[c + 1].effect.index(m)
if n != nil
effecting[c + 1].effect.delete_at(n)
end
end
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)

len -= 4
else
c += 4
end# If end
end# While
end

def skills(player, skill,logs)
move = self.skillhold[skill]

if skill <= -1
move = -1
elsif skill != 4
move = move.to_i
end

if skill == 4
case move
when true

when "10000" # Power-Up
c = check(1,10,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false && c[0]
transformskill([0.25, 0.25, 0.25, 0.25], "10000", 1)
skill_turns(self, 99, 10000, "10000", 3, true) 
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
elsif self.transformation[0] == true && c[0]
transformskill(0, 0, 3)
end

when "10016" #Super Garlic Jr
c = check(1,10,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false && c[0]
transformskill([0.30, 0.30, 0.30, 0.30], "10016", 1)
skill_turns(self, 99, 10016, "10016", 3, true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end
a = self.skillhold.index("106")
b = self.skillhold.index("107")
d = self.skillhold.index("108")
if a != nil
self.skillhold[a] = "116"
end
if b != nil
self.skillhold[b] = "117"
end
if d != nil
self.skillhold[d] = "118"
end

end #Add more transformations before this "end" if there are any others.
end

case move

when 106 # Mind Break
c = check(2, 20, skill, 2, player, 3,logs,[false,false,false])
if c[0]
c[1].stunned[4] = 2
c[1].conditions[0] = 2
skill_turns(c[1],2,106,"106",4,true)
c[1].ki += 10
c[1].strength += 10
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end

when 107 # Sealed Light Beam
c = check(1, 25, skill, 3, player, 3,logs,[false,false,false])
if c[0]
c[1].block[4] = 3
skill_turns(c[1],3,107,"107",4,true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])   
end

when 108 # Death Impact
c = check(1, 25, skill, 2, player, 1,logs,[false,false,false])
if c[0]
k_damage(c[1], 10)
if c[1].attacked[0] != -1
c[1].stunned[2] = 2
if c[1].effect.index("108") == nil 
skill_turns(c[1], 99, 108, "108", 1, true)
end
end
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])   
end

when 115 # Immortality
c = check(3, 35, skill, 0, player, 4,logs,[false,false,false])
if c[0] && self.effect.count("115") == 0
skill_turns(c[1],99,115,"115",1,true)
c[1].conditions[1] = 99
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])   
end    


when 116 # Dead Zone
c = check(4,40,skill,0,player,1,logs,[false,false,false])
count = self.effect.count("116") 
if c[0] && count == 0
l = c[1].length - 1
i = 0
b = self.effecting.index(115)
if  b != nil
self.effecting[b-2] -= 0
end
self.stunned[3] = 99
skill_turns(self,99,34,"116",4,true)
for i in 0..l
skill_turns(c[1][i],6,116,"116",2,true)
end
health = [player[0].health,player[1].health,player[2].health]
logs.push(4,move,health,[self.controlling_player.vs,self.info[1]],c[3],c[4])  
elsif count != 0
self.health = 0
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(4,move,0,[self.controlling_player.vs,self.info[1]],c[3],c[4]) 
end

when 117 # Death Impact
c= check(2, 25, skill, 1, player, 1, logs,[false,false,false])
if c[0]
k_damage(c[1], 20)
if c[1].attacked[0] != -1
c[1].stunned[2] = 2
if c[1].effect.index("117") == nil
skill_turns(c[1], 99, 118, "117", 1, true)
end
end
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])   
end

end
end
end 
#------------------------------------------------------------------------------------------------------------------------




#------------------------------------------------------------------------------------------------------------------------
class KidGohan < Character
  
def checkType(skill)
  

if self.skillhold == skill
self.attacked[3] = 4
elsif skill < 30
genericType(skill)
else
  
case skill

when 36
self.attacked[3] = 4
#1:Ki  2:Strength  3:Power-down 4:Friendly
when 37
self.attacked[3] = 1
when 38
self.attacked[3] = 2
when 39
self.attacked[3] = 4
when 40
self.attacked[3] = 1
when 41
self.attacked[3] = 2
end
end
end

def rush(name,logs)

# Types: full 0, Ki 1, Strength 2, Power-Down 3, Friendly 4

case name[1]
when 2
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 2, "2", 3, true)
if self.block[1] < 2
self.block[1] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 4 # sonic sway
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
#skill_turns(self, 2, 4, "4", 3, true)
if self.block[1] < 1
self.block[0] = 1;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end
when 7
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 7, "7", 3, true)
if self.block[2] < 2
self.block[2] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end
when 38
c = check(1, 20, name[2], 2, name[0], 2,logs,[false,false,false])
if c[0]
if self.transformation[1] == "zKG-t1"
s_damage(name[0],15)
else
s_damage(name[0],20)
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end
end
end

def currentEffects
len = self.effecting.length

show = true
c = 0

while (c < len)
  a = self.effecting[c + 2]
 if self.effecting[c+1].health <= 0 || self.health  < 0
  stop = true
else
  stop = false
  end
  if effecting[c+1].effect.index(a.to_s) == nil
  stop = true
  show = false
  end
  
case a

when 1..30

genericTurn(a, c)
m = a.to_s

when 36 #Hidden Power
m = "36"
ck = currentCheck(self.effecting[c+1],4,[true,false])
#0. Afflication 1.Ki 2.Strength 3.Power-Down 4.Friendly 
if !stop && ck
bpeffect(effecting[c + 1], 1)
end

when 37 #Masenko
m = "37"

when 38 #Rushing Assault
  
when 40 #Mouth Blast
m = "40"

when 10000# Generic Trans.
m = "10000"
if self.transformation[0] == false || self.energy < 10 || stop
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0, false]
stop = true
self.energy -= 10
else
self.energy -= 10
end

when 10003
m = "10003"
if self.transformation[0] == false || stop
self.effecting[c + 1].effect[0] = m
stop = true
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0, false]
e = self.skillhold.index("39")
b = self.skillhold.index("40")
d = self.skillhold.index("41")
if e != nil
self.skillhold[a] = "36"
end
if b != nil
self.skillhold[b] = "37"
end
if d != nil
self.skillhold[b] = "38"
end
self.energy -= 20
else
self.energy -= 20
end

when 102
m = "10004"
if self.transformation[0] == false || self.energy < 15 || stop
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0, false]
stop = true
self.energy -= 15
else
self.energy -= 15
end

end# Case end


self.effecting[c] -= 1
if (self.effecting[c] == 0 || stop)
  if show


n = 0# n = self.effecting[c + 1].effect.index(m)

if n != nil
self.effecting[c + 1].effect.delete_at(n)
end
end
self.effecting.delete_at(c)
self.effecting.delete_at(c)
self.effecting.delete_at(c)
self.effecting.delete_at(c)
len -= 4
else
  c += 4

end# If end
end# While
end

def skills(player, skill,logs)
move = self.skillhold[skill]
if skill <= -1
move = -1
elsif skill != 4
move = move.to_i
end

if skill == 4
case move

when "10000" # Power-Up
c = check(1,10,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false  && c[0]
transformskill([0.25, 0.25, 0.25, 0.25], "10000", 1)
skill_turns(self, 99, 10000, "10000", 3, true) 
elsif self.transformation[0] == true && self.stunned[0] == 0 && c[0]
transformskill(0, 0, 3)
end

when "10003" # Oozaru Kid Gohan
c = check(2,15,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false && c[0]
transformskill([0.6, 0.6, 0.6, 0], "10003", 1)
skill_turns(self, 99, 102, "10003", 3, true)
self.transformation[6] = true
a = self.skillhold.index("36")
b = self.skillhold.index("37")
d = self.skillhold.index("38")
if a != nil
self.skillhold[a] = "39"
end
if b != nil
self.skillhold[b] = "40"
end
if d != nil
self.skillhold[d] = "41"
end
logs.push(0,move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
elsif self.transformation[0] == true && self.stunned[0] == 0 && c[0]
self.transformation[0] = false
self.transformation[6] = false
end


when "10004" # Empowered Gohan
c = check(1,15,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false && c[0]
transformskill([0.5, 0.5, 0.5, 0.5], "10004", 1)
skill_turns(self, 99, 10004, "10004", 3, true)
self.transformation[6] = true
self.transformation[0] = true
elsif self.transformation[0] == true && self.stunned[0] == 0 && c[0]
self.transformation[0] = false
self.transformation[6] = false
end
end

elsif move < 30 && move >= 0
generic(move, player, move, skill, logs)
elsif move >= 30
case move

when 36 # Hidden Power
if self.transformation[6] == false
c = check(0, 20, skill, 3, self, 4,logs,[false,false,false])
if c[0]
skill_turns(c[1], 2, 36, "36", 3, true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end
elsif self.transformation[1] == "10004"
c = check(0, 20, skill, 3, self, 4,logs,[false,false,false])
if c[0]
skill_turns(c[1], 3, 36, "36", 3, true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end
end

when 37 # Masenko
c = check(2, 30, skill, 0, player, 1,logs,[false,false,false])
if c[0]
a = c[1].effect.index("37")
if self.transformation[6] == false
if a == nil
k_damage(c[1], 20)
skill_turns(c[1], 2, 37, "37", 1, true)
else
k_damage(c[1], 25)
skill_turns(c[1], 2, 37, "37", 1, true)
end
elsif self.transformation[1] == "10004"
if a == nil
k_damage(c[1], 25)
skill_turns(c[1], 2, 37, "37", 1, true)
else
k_damage(c[1], 35)
skill_turns(c[1], 2, 37, "37", 1, true)
end
end
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end

when 38 # Rushing Assault

when 39 # Howl
c = check(1, 15, skill, 2, self, 4,logs,[false,false,false])
if c[0]
power_up(self, [5, 5, 0, 0])
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end

when 40 # Mouth Blast
c = check(2, 25, skill, 0, player, 1,logs,[false,false,false])
if c[0]
a = c[1].effect.index("40")
if a == nil
k_damage(c[1], 20)
skill_turns(c[1], 2, 40, "40", 1, true)
else
k_damage(c[1], 35)
skill_turns(c[1], 2, 40, "40", 1, true)
end
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end

when 41 # Oozaru Assault
c = check(2, 25, skill, 2, player, 2,logs,[false,false,false])
if c[0]
s_damage(c[1], 20)
power_down(c[1], [0, 0, 0, 3])
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end

end
end
end
end
#------------------------------------------------------------------------------------------------------------------------




#------------------------------------------------------------------------------------------------------------------------
class KrillinZ < Character
  
def checkType(skill)
  

if self.skillhold == skill
self.attacked[3] = 4
elsif skill < 30
genericType(skill)
else
  
case skill

#1:Ki  2:Strength  3:Power-down 4:Friendly
when 42 # High Velocity Kick
self.attacked[3] = 2
when 43 # Destructo Disk
self.attacked[3] = 1
when 44 # Destructo Disk Barrage
self.attacked[3] = 1
when 45 # Scattering Bullets
self.attacked[3] = 1
end
end
end

def rush(name,logs)
  
case name[1]

when 2 # Energy Deflect
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 2, "2", 3, true)
if self.block[1] < 2
self.block[1] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 4 # Sonic Sway
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
#skill_turns(self, 2, 4, "4", 3, true)
if self.block[1] < 1
self.block[0] = 1;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 7 # Strength Block
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 7, "7", 3, true)
if self.block[2] < 2
self.block[2] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 42 # High Velocity Kick
if self.transformation[1] == "10005"
c = check(1, 25, name[2], 3, name[0], 2,logs,[false,false,false])
if c[0]
if c[1].effect.index("45") != nil
skill_turns(c[1], 2, 42, "42", 1, false)
c[1].counter[1] = 2 
else
c[1].counter[1] = 1  
end
end
else
c = check(1, 15, name[2], 3, name[0], 2,logs,[false,false,false])
if c[0]
if c[1].effect.index("45") != nil
skill_turns(c[1], 2, 42, "42", 1, true)
c[1].counter[1] = 2 
else
c[1].counter[1] = 1  
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

end
end
end

def currentEffects
len = effecting.length

show = true
c = 0

while (c < len)
  a = self.effecting[c + 2]
if self.effecting[c+1].health <= 0 || self.health < 0  
  stop = true
else
  stop = false
  end
  if effecting[c+1].effect.index(a.to_s) == nil
  stop = true
  show = false
  end
  
case a

when 1..30
genericTurn(a, c)
m = a.to_s

when 42 # High Velocity Kick
m = "42"


when 44 # Destructo Disk Barrage
m = "44"
ck = currentCheck(self.effecting[c+1],1,[false,false])
if ck
if self.effecting[c + 1].effect.index("44") != nil
p_k_damage(self.effecting[c + 1], 20)
else
p_k_damage(self.effecting[c + 1], 15)  
end
#0. Afflication 1.Ki 2.Strength 3.Power-Down 4.Friendly 
end

when 45 # Scattering Bullets
m = "45"

when 10000# Generic Trans.
m = "10000"
if self.energy > 10 && self.transformation[0] || !stop
self.energy -= 10
else
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end

when 10005
m = "10005"
if self.transformation[0] == false || self.energy < 15 || stop
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0, false]
a = self.skillhold.index("44")
self.energy -= 15
if a != nil
self.skillhold[a] = "43"
end
stop = true
else
self.energy -= 15
end
end# Case end
self.effecting[c] -= 1
if (effecting[c] == 0 || stop)
if show
n = self.effecting[c + 1].effect.index(m)
if n != nil
self.effecting[c + 1].effect.delete_at(n)
end
end
self.effecting.delete_at(c)
self.effecting.delete_at(c)
self.effecting.delete_at(c)
self.effecting.delete_at(c)
len -= 4
else
c += 4

end# If end
end# While
end

def skills(player, skill,logs)
move = self.skillhold[skill]
if skill <= -1
move = -1
elsif skill != 4
move = move.to_i
end

if skill == 4

case move
when "10000" # Power-Up
c = check(1,10,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false && c[0]
transformskill([0.25, 0.25, 0.25, 0.25], "10000", 1)
skill_turns(self, 99, 10000, "10000", 3, true) 
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
elsif self.transformation[0] == true && self.stunned[0] == 0 && c[0]
transformskill(0, 0, 3)
end

when "10005" # Empowered Krillin
c = check(1,15,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false && c[0]
transformskill([0.5, 0.5, 0.5, 0.5], "10005", 1)
skill_turns(self, 99, 10005, "10005", 3, true)
self.transformation[6] = true
a = self.skillhold.index("43")
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
if a != nil
self.skillhold[a] = "44"
end
elsif self.transformation[0] == true && self.stunned[0] == 0 && c[0] 
self.transformation[0] = false
self.transformation[6] = false
end
end

elsif move < 30 && move >= 0
generic(move, player, move, skill, logs)

elsif move >= 30

case move

when 42 # High Velocity Kick
  
when 43 # Destructo Disk
c = check(1, 30, skill, 2, player, 1,logs,[false,false,false])
if c[0]
if c[1].effect.index("45") != nil
p_k_damage(c[1], 15)
else
p_k_damage(c[1], 10) 
end
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end

when 44 # Destructo Disk Barrage
c = check(2, 25, skill, 2, player, 1,logs,[false,false,false]) 
if c[0] && self.transformation[1] == "10005"
skill_turns(c[1], 2, 44, "44", 1, true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end

when 45 # Scattering Bullets
if self.transformation[0] == false
c = check(2, 25, skill, 2, player, 1,logs,[false,false,false])
if c[0] 
l = c[1].length - 1
i = 0
for i in 0..l
k_damage(c[1][i], 10)
skill_turns(c[1][i], 2, 45, "45", 1, true)
end
health = [player[0].health,player[1].health,player[2].health]
logs.push(4,move,health,[self.controlling_player.vs,self.info[1]],c[3],c[4])  
else
logs.push(4,move,0,[self.controlling_player.vs,self.info[1]],c[3],c[4])  
end
elsif self.transformation[1] == "10005"
c = check(2, 30, skill, 2, player, 1,logs,[false,false,false])
if c[0]
l = c[1].length - 1
i = 0
for i in 0..l
k_damage(c[1][i], 15)
skill_turns(c[1][i], 3, 45, "45", 1, true)
end
health = [player[0].health,player[1].health,player[2].health]
logs.push(4,move,health,[self.controlling_player.vs,self.info[1]],c[3],c[4])  
else
logs.push(4,move,0,[self.controlling_player.vs,self.info[1]],c[3],c[4])    
end
end
end
end

end
end
#------------------------------------------------------------------------------------------------------------------------




#------------------------------------------------------------------------------------------------------------------------
class PiccoloZ < Character

#Deal Damage,Receive Damage,skill condition[]

def checkType(skill)
  

if self.skillhold == skill
self.attacked[3] = 4
elsif skill < 30
genericType(skill)
else
  
case skill

#1:Ki  2:Strength  3:Power-down 4:Friendly
when 46 # Regeneration
self.attacked[3] = 4
when 47 # Special Beam Cannon
self.attacked[3] = 1
when 48 # Sacrifice
self.attacked[3] = 4
end
end
end

def rush(name,logs)

# Types: full 0, Ki 1, Strength 2, Power-Down 3, Friendly 4
case name[1]

when 2 # Energy Deflect
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 2, "2", 3, true)
if self.block[1] < 2
self.block[1] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 4 # Sonic Sway
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
#skill_turns(self, 2, 4, "4", 3, true)
if self.block[1] < 1
self.block[0] = 1;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 7 # Strength Block
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 7, "7", 3, true)
if self.block[2] < 2
self.block[2] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 48 # Sarcifice
c = check(1, 30, name[2], 5, name[0], 4,logs,[false,false,false])
if c[0]
reflect_s(c[1], self, 2,1)
c[1].block[3] = 2
power_up(c[1],[0,2,0,0])
skill_turns(c[1], 2, 48, "48", 3, true)
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end
end
end

def currentEffects
len = effecting.length

show = true
c = 0

while (c < len)
  a = self.effecting[c + 2]
  if self.effecting[c+1].health <= 0 || self.health < 0 
    stop = true
else
  stop = false
  end
  if effecting[c+1].effect.index(a.to_s) == nil
  stop = true
  show = false
  end
  
case a

when 1..30
genericTurn(a, c)
m = a.to_s

when 48 # Sacrifice
m = "48"

when 10000# Generic Trans.
m = "10000"
if self.energy > 10 && self.transformation[0] || !stop
self.energy -= 10
else
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end

end# Case end
effecting[c] -= 1
if (effecting[c] == 0 || stop)
if show
n = effecting[c + 1].effect.index(m)
if n != nil
effecting[c + 1].effect.delete_at(n)
end
end
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)

len -= 4
else
c += 4
end# If end
end# While
end

def skills(player, skill,logs)
move = self.skillhold[skill]
if skill <= -1
move = -1
elsif skill != 4
move = move.to_i
end

if skill == 4
case move
when true

when "10000" # Power-Up
c = check(1,10,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false && c[0]
transformskill([0.25, 0.25, 0.25, 0.25], "10000", 1)
skill_turns(self, 99, 10000, "10000", 3, true) 
elsif self.transformation[0] == true && c[0]
transformskill(0, 0, 3)
end
end

elsif 30 > move && move >= 0
generic(move, player, move, skill, logs)
elsif move >= 20
case move

when 46 # Regeneration
c = check(1, 30, skill, 3, self, 4,logs,[false,false,false])
if c[0]
heal(self,25,0)
power_down(self,[0,0,5,0])
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end

when 47 # Special Beam Cannon
c = check(1, 30, skill, 2, player, 1,logs,[false,false,false])
if c[0]
if c[1].stunned[0] != 0 || c[1].stunned[1] != 0
k_damage(c[1], 15)
else
k_damage(c[1], 30)  
end
a = rand(0..4)
c[1].cooldown[a] += 3
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end


end
end

end
end
#------------------------------------------------------------------------------------------------------------------------




#------------------------------------------------------------------------------------------------------------------------
class YamchaZ < Character
  
def checkType(skill)
  

if self.skillhold == skill
self.attacked[3] = 4
elsif skill < 30
genericType(skill)
else
  
case skill

#1:Ki  2:Strength  3:Power-down 4:Friendly
when 52 # Wolf Fang Fist
self.attacked[3] = 2
when 53 # Spirit Ball
self.attacked[3] = 2
when 54 # Surprise Attack
self.attacked[3] = 1
end
end
end

def rush(name,logs)

# Types: full 0, Ki 1, Strength 2, Power-Down 3, Friendly 4
case name[1]

when 2 # Energy Deflect
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 2, "2", 3, true)
if self.block[1] < 2
self.block[1] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 4 # Sonic Sway
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
#skill_turns(self, 2, 4, "4", 3, true)
if self.block[1] < 1
self.block[0] = 1;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 7 # Strength Block
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 7, "7", 3, true)
if self.block[2] < 2
self.block[2] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end
end
end

def currentEffects
len = effecting.length

show = true
c = 0

while (c < len)
  a = self.effecting[c + 2]
  if self.effecting[c+1].health <= 0 || self.health < 0  
    stop = true
else
  stop = false
  end
  if effecting[c+1].effect.index(a.to_s) == nil
  stop = true
  show = false
  end
  
case a

when 1..30
genericTurn(a, c)
m = a.to_s

when 52 # Wolf Fang Fist
m = "52"
ck = currentCheck(self.effecting[c+1],2,[false,false])
#0. Afflication 1.Ki 2.Strength 3.Power-Down 4.Friendly 
if ck
s_damage(self.effecting[c + 1], 15)
end

when 53 # Surprise Attack
m = "53"


when 54 # Spirit Ball
m = "54"
ck = currentCheck(self.effecting[c+1],1,[false,false])
#0. Afflication 1.Ki 2.Strength 3.Power-Down 4.Friendly 
if ck
k_damage(self.effecting[c + 1], 10)
end


when 10000# Generic Trans.
m = "10000"
if self.energy > 10 && self.transformation[0] && !stop
self.energy -= 10

else
self.transformation[0] = false
self.transformation[1] = "none"
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end
end# Case end
effecting[c] -= 1
if (effecting[c] == 0 || stop)
  if show
n = effecting[c + 1].effect.index(m)
if n != nil
self.effecting[c + 1].effect.delete_at(n)
end
end
self.effecting.delete_at(c)
self.effecting.delete_at(c)
self.effecting.delete_at(c)
self.effecting.delete_at(c)
len -= 4
else
  c += 4
end# If end
end# While
end

def skills(player, skill,logs)
move = self.skillhold[skill]
if skill <= -1
move = -1
elsif skill != 4
move = move.to_i
end

if skill == 4
case move

when "10000" # Generic Trans
c = check(1,10,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false && c[0]
transformskill([0.25,0.25, 0.25, 0.25], "10000", 1)
skill_turns(self, 99, 10000, "10000", 3, true) 
elsif self.transformation[0] == true && self.stunned[0] == 0 && c[0]
transformskill(0, 0, 3)
end

end
elsif move < 20 && move >= 0
generic(move, player, move, skill, logs)
elsif move >= 20
case move

when 52
c = check(2, 30, skill, 3, player, 2,logs,[false,false,false])
if c[0]
if c[1].effect.count("53") == 0
skill_turns(c[1], 3, 52, "52", 1, true)
c[1].defense -= 3
else
skill_turns(c[1], 4, 52, "52", 1, true)
c[1].defense -= 3  
end
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end
when 53
c = check(1, 20, skill, 3, player, 2,logs,[false,false,false])
if c[0]
skill_turns(c[1], 2, 53, "53", 1, true)
c[1].stunned[1] = 2
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end
when 54
c = check(2, 30, skill, 4, player, 1,logs,[false,false,false])
if c[0]
if c[1].effect.count("53") == 0
skill_turns(c[1], 3, 54, "54", 2, true)
c[1].speed -= 3
else
skill_turns(c[1], 4, 54, "54", 2, true)
c[1].speed -= 3
end
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end
end
end


end# Skills

# effecting = [1, 2, 3][turn, who, effect]
end# class
#------------------------------------------------------------------------------------------------------------------------




#------------------------------------------------------------------------------------------------------------------------
class Reccome < Character
  
def checkType(skill)
  

if self.skillhold == skill
self.attacked[3] = 4
elsif skill < 30
genericType(skill)
else
  
case skill

#1:Ki  2:Strength  3:Power-down 4:Friendly
when 85 # Racoome Punch
self.attacked[3] = 2
when 86 # Racoome Grapple
self.attacked[3] = 4
when 87 # Eraser Gun
self.attacked[3] = 1
end
end
end

def rush(name,logs)

# Types: full 0, Ki 1, Strength 2, Power-Down 3, Friendly 4
case name[1]

when 2 # Energy Deflect
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 2, "2", 3, true)
if self.block[1] < 2
self.block[1] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 4 # Sonic Way
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
#skill_turns(self, 2, 4, "4", 3, true)
if self.block[1] < 1
self.block[0] = 1;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 7 # Strength Block
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 7, "7", 3, true)
if self.block[2] < 2
self.block[2] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 86 # Racoome Grapple
c = check(2, 30, name[2], 5, self, 4,logs,[false,false,false])
if c[0]
c[1].counter[4] = 2
skill_turns(c[1], 2, 86, "86", 3, false)
end 

end
end

def currentEffects
len = effecting.length

show = true
c = 0

while (c < len)
  a = self.effecting[c + 2]
  if self.effecting[c+1].health <= 0 || self.health < 0  
    stop = true
else
  stop = false
  end
  if effecting[c+1].effect.index(a.to_s) == nil
  stop = true
  show = false
  end
  
case a

when 1..30
genericTurn(a, c)
m = a.to_s

when 85 # Racoome Punch
m = "85"

when 86 # Racoome Grapple
m = "86"
pl = self.controlling_player.enemy.values
if pl[0].attacked[0].kind_of?(Array)
if pl[0].attacked[0].index(self)
skill_turns(pl[0],2,86,"86",1,true)
end
elsif pl[0].attacked[0] == self 
skill_turns(pl[0],2,86,"86",1,true)
end
if pl[1].attacked[0].kind_of?(Array)
if pl[1].attacked[0].index(self)
pl[1].health -= 10
skill_turns(pl[1],2,86,"86",1,true)
end
elsif pl[1].attacked[0] == self
skill_turns(pl[1],2,86,"86",1,true)
end
if pl[2].attacked[0].kind_of?(Array)
if pl[2].attacked[0].index(self)
skill_turns(pl[2],2,86,"86",1,true)
end
elsif pl[2].attacked[0] == self
skill_turns(pl[2],2,86,"86",1,true)
end


when 87 # Eraser Gun
m = "87"

when 100
m = "10000"
if self.energy > 10 && self.transformation[0] && !stop
self.energy -= 10
else
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end
end# Case end
effecting[c] -= 1
if (effecting[c] == 0 || stop)
  if show
n = effecting[c + 1].effect.index(m)
if n != nil
effecting[c + 1].effect.delete_at(n)
end
end
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)

len -= 4
else
  c += 4
end# If end
end# While
end



def skills(player, skill,logs)
move = self.skillhold[skill]



if skill <= -1
move = -1
elsif skill != 4
move = move.to_i
end

if skill == 4
case move
when true

when "10000" # Power-Up
c = check(1, 10, skill, 0, self, 4,logs,[false,false,false])
if self.transformation[0] == false && c[0]
transformskill([0.25, 0.25, 0.25, 0.25], "10000", 1)
skill_turns(self, 99, 10000, "10000", 3, true) 
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
elsif self.transformation[0] == true && c[0]
transformskill(0, 0, 3)
else 

end #Add more transformations before this "end" if there are any others.

end

elsif 30 > move && move >= 0
generic(move, player, move, skill, logs)
elsif move >= 20
case move
when 85
c = check(1, 30, skill, 2, player, 2,logs,[false,false,false])
if c[0]
if c[1].effect.index("86") == nil
s_damage(c[1],15)
c[1].stunned[2] = 2
skill_turns(c[1], 2, 85, "85", 3, true)
else
s_damage(c[1],30)
c[1].stunned[2] = 2
skill_turns(c[1], 2, 85, "85", 3, true)  
end
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end

when 87
count = self.effect.count("87")
e = 30 + 5 * count
c = check(2, e, skill, 2, player, 1,logs,[false,false,false])
if c[0]
if c[1].effect.index("86") == nil
k_damage(c[1],15)
self.ki += 5
skill_turns(self, 99, 87, "87", 3, true)  
else
k_damage(c[1],30)
self.ki += 5
skill_turns(self, 99, 87, "87", 3, true)  
end
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end
end
else

end


end
end
#------------------------------------------------------------------------------------------------------------------------




#------------------------------------------------------------------------------------------------------------------------
class Jeice < Character

def checkType(skill)
  

if self.skillhold == skill
self.attacked[3] = 4
elsif skill < 30
genericType(skill)
else
  
case skill

#1:Ki  2:Strength  3:Power-down 4:Friendly
when 88 # Red Magma Crasher
self.attacked[3] = 3
when 89 # Crusher Ball
self.attacked[3] = 1
when 90 # Purple Spiral Flash
self.attacked[3] = 1
end
end
end

def rush(name,logs)

# Types: full 0, Ki 1, Strength 2, Power-Down 3, Friendly 4
case name[1]

when 2 # Energy Deflect
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 2, "2", 3, true)
if self.block[1] < 2
self.block[1] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 4 # Sonic Sway
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
#skill_turns(self, 2, 4, "4", 3, true)
if self.block[1] < 1
self.block[0] = 1;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 7 # Strength Block
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 7, "7", 3, true)
if self.block[2] < 2
self.block[2] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 89 # Crusher Ball
if name[0].speed <= self.speed
c = check(1, 30, name[2], 2, name[0], 1,logs,[false,false,false])
if c[0]
k_damage(c[1],10)
if self.effect.index("88") != nil
self.block[2] = 2
end
if c[1].effect.index("G") != nil
c[1].energy -= 10
end
skill_turns(c[1],1,89,"89",3,true)
if c[1].effect.index("91")
skill_turns(c[1],99,"G","G",3,true)  
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

end
end
end

def currentEffects
len = effecting.length

show = true
c = 0

while (c < len)
  a = self.effecting[c + 2]
  if self.effecting[c+1].health <= 0 || self.health < 0  
    stop = true
else
  stop = false
  end
  if effecting[c+1].effect.index(a.to_s) == nil
  stop = true
  show = false
  end
  
case a

when 1..30
genericTurn(a, c)
m = a.to_s

when 88 # Red Magma Crasher
m = "88"

when 89 # Crusher Ball
m = "89"

when "G" # G-Force
m = "G"

when 100
m = "10000"
if self.energy > 10 && self.transformation[0] && !stop
self.energy -= 10
else
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end

end# Case end
effecting[c] -= 1
if (effecting[c] == 0 || stop)
if show
n = effecting[c + 1].effect.index(m)
if n != nil
effecting[c + 1].effect.delete_at(n)
end
end
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
len -= 4
else
c += 4
end# If end
end# While
end

def skills(player, skill,logs)
move = self.skillhold[skill]

if skill <= -1
move = -1
elsif skill != 4
move = move.to_i
end

if skill == 4
case move
when true

when "10000" # Power-Up
c = check(1,10,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false && c[0]
transformskill([0.25, 0.25, 0.25, 0.25], "10000", 1)
skill_turns(self, 99, 10000, "10000", 3, true) 
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 

elsif self.transformation[0] == true && c[0]
transformskill(0, 0, 3)
end #Add more transformations before this "end" if there are any others.
end

elsif 30 > move && move >= 0
generic(move, player, move, skill, logs)
elsif move >= 20
case move

when 88 # Red Magma Crasher
health = [player[0].health,player[1].health,player[2].health]
c = check(1, 20, skill, 2, player, 4,logs,[false,false,false])
if c[0]
i = 0
l = c[1].length - 1
self.ki += 3
self.speed += 3

for i in 0..l
if c[1][i].attacked[1] == "91" 
num = 1
end
if c[1][i] != self
skill_turns(c[1][i], 2, 88, "88", 3, true)
end
end  

if num == 1
skill_turns(self, 3, 88, "88", 3, true)
self.counter = [0, 0, 0, 0, 0, 0, 0, 0]
else
skill_turns(self, 2, 88, "88", 3, true)
end
logs.push(4,move,health,[self.controlling_player.vs,self.info[1]],c[3],c[4])  
else
logs.push(4,move,0,[self.controlling_player.vs,self.info[1]],c[3],c[4]) 
end

when 89 # Crusher Ball
if player.speed > self.speed
c = check(1, 30, skill, 2, player, 1,logs,[false,false,false])
if c[0]
k_damage(c[1],10)
if self.effect.index("88") != nil
self.block[2] == 2
end
c[1].energy = c[1].energy - 10 * c[1].effect.count("G")
skill_turns(c[1],1,89,"89",3,true)
if c[1].effect.index("92") != nil
skill_turns(c[1],99,"G","G",3,true)
end
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end
end

when 90 # Purple Spiral Flash
c = check(2, 40, skill, 3, player, 1,logs,[false,false,false])
if c[0]
i = 0
l = c[1].length - 1
for i in 0..l
d = c[1][i].effect.count("G") * 5 + 10
k_damage(c[1][i],d)
end  
if self.effect.index("88") != nil
characters = self.controlling_player.characters.values
characters[0].ki += 3
characters[1].ki += 3
characters[2].ki += 3
end
health = [player[0].health,player[1].health,player[2].health]
logs.push(4,move,health,[self.controlling_player.vs,self.info[1]],c[3],c[4])   
else
logs.push(4,move,0,[self.controlling_player.vs,self.info[1]],c[3],c[4]) 
end

end
end
end
end
#------------------------------------------------------------------------------------------------------------------------




#------------------------------------------------------------------------------------------------------------------------
class Burter < Character
  
def checkType(skill)
  
if self.skillhold == skill
self.attacked[3] = 4
elsif skill < 30
genericType(skill)
else
  
case skill

#1:Ki  2:Strength  3:Power-down 4:Friendly
when 91 # Blue Hurricane Crasher
self.attacked[3] = 4
when 92 # Mach Punch
self.attacked[3] = 2
when 93 # Purple Comet Crush
self.attacked[3] = 2
end
end
end

def rush(name,logs)

# Types: full 0, Ki 1, Strength 2, Power-Down 3, Friendly 4
case name[1]

when 2 # Energy Deflect
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 2, "2", 3, true)
if self.block[1] < 2
self.block[1] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 4 # Sonic Sway
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
#skill_turns(self, 2, 4, "4", 3, true)
if self.block[1] < 1
self.block[0] = 1;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 7 # Strength Block
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 7, "7", 3, true)
if self.block[2] < 2
self.block[2] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

end
end

def currentEffects
len = effecting.length

show = true
c = 0

while (c < len)
  a = self.effecting[c + 2]
  if self.effecting[c+1].health <= 0 || self.health < 0  
    stop = true
else
  stop = false
  end
  if effecting[c+1].effect.index(a.to_s) == nil
  stop = true
  show = false
  end
  
case a

when 1..30
genericTurn(a, c)
m = a.to_s

when 91 # Blue Hurricane Crasher
m = "91"

when 92 # Mach Punch
m = "92"

when "G" # G-Force
m = "G"

when 10000# Generic Trans.
m = "10000"
if self.energy > 10 && self.transformation[0] && !stop
self.energy -= 10
else
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end
end# Case end
effecting[c] -= 1
if (effecting[c] == 0 || stop)
if show
n = effecting[c + 1].effect.index(m)
if n != nil
effecting[c + 1].effect.delete_at(n)
end
end
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)

len -= 4
else
c += 4
end# If end
end# While
end



def skills(player, skill,logs)
move = self.skillhold[skill]

if skill <= -1
move = -1
elsif skill != 4
move = move.to_i
end

if skill == 4
case move
when true

when "10000" # Power-Up
c = check(1,10,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false && c[0]
transformskill([0.25, 0.25, 0.25, 0.25], "10000", 1)
skill_turns(self, 99, 10000, "10000", 3, true) 
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
elsif self.transformation[0] == true && c[0]
transformskill(0, 0, 3)
end #Add more transformations before this "end" if there are any others.
end

elsif 30 > move && move >= 0
generic(move, player, move, skill, logs)
elsif move >= 20
case move

when 91 # Blue Hurricane Crasher
health = [player[0].health,player[1].health,player[2].health]
c = check(1, 20, skill, 2, player, 4,logs,[false,false,false])
if c[0]
i = 0
l = c[1].length - 1
num = 0
self.strength += 3
self.speed += 3
for i in 0..l
if c[1][i].attacked[1] == "88" 
num = 1
end
if c[1][i] != self
skill_turns(c[1][i], 2, 91, "91", 3, true)
end
end  
if num == 1
skill_turns(self, 2, 91, "91", 3, true)
self.stunned = [0, 0, 0, 0]
else
skill_turns(self, 3, 91, "91", 3, true)  
end
logs.push(4,move,health,[self.controlling_player.vs,self.info[1]],c[3],c[4])    
else
logs.push(4,move,0,[self.controlling_player.vs,self.info[1]],c[3],c[4])
end

when 92 # Mach Punch
c = check(1, 30, skill, 2, player, 2,logs,[false,false,false])
if c[0]
damage = c[1].effect.count("G") * 5 + 15
if c[1].speed > self.speed
s_damage(c[1],damage)  
else
p_s_damage(c[1],damage)
end
if self.effect.index("91")
c[1].stunned[3] = 2
end
if c[1].effect.index("89")
skill_turns(c[1],99,"G","G",3,true)
end
skill_turns(c[1],1,92,"92",3,true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end


when 93 # Purple Comet Crush
c = check(2, 40, skill, 3, player, 1,logs,[false,false,false])
if c[0]
if c[1].effect.index("G") != nil
s_damage(c[1],35)
power_down(c[1],[5,5,5,5])
else
s_damage(c[1],15)  
c[1].speed -= 3
end

if self.effect.index("91") != nil
characters = self.controlling_player.characters.values
characters[0].strength += 3
characters[1].strength += 3
characters[2].strength += 3
end
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end

end
end
end
end
#------------------------------------------------------------------------------------------------------------------------




#------------------------------------------------------------------------------------------------------------------------
class Nappa < Character
  
def checkType(skill)
  

if self.skillhold == skill
self.attacked[3] = 4
elsif skill < 30
genericType(skill)
else
  
case skill

#1:Ki  2:Strength  3:Power-down 4:Friendly
when 70 # Bomber DX
self.attacked[3] = 0
when 71 # Exploding Wave
self.attacked[3] = 0
when 72 # Surging Assault
self.attacked[3] = 2
end
end
end


def rush(name,logs)

# Types: full 0, Ki 1, Strength 2, Power-Down 3, Friendly 4
case name[1]

when 2 # Energy Deflect
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 2, "2", 3, true)
if self.block[1] < 2
self.block[1] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 4 # Sonic Sway
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
#skill_turns(self, 2, 4, "4", 3, true)
if self.block[1] < 1
self.block[0] = 1;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 7 # Strength Block
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 7, "7", 3, true)
if self.block[2] < 2
self.block[2] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end
end
end

def currentEffects
len = effecting.length

show = true
c = 0

while (c < len)
  a = self.effecting[c + 2]
 if self.effecting[c+1].health <= 0 || self.health <= 0  
   stop = true
else
  stop = false
  end
  if effecting[c+1].effect.index(a.to_s) == nil
  stop = true
  show = false
  end
  
case a

when 1..30
genericTurn(a, c)
m = a.to_s

when 71 # Exploding Wave
m = "71"

when 72 # Surging Assault
m = "71"

when 10000# Generic Trans.
m = "10000"
if self.energy > 10 && self.transformation[0] && !stop
self.energy -= 10
else
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end
#moo

when 10007
m = "10007"
if self.energy > 15 && self.transformation[0] && !stop
self.energy -= 15
pl = self.controlling_player.enemy.values

  if pl[0].attacked[0].kind_of?(Array)
   if pl[0].attacked[0].index(self)
   skill_turns(pl[0],99,71,"72",1,true)
   end
   elsif pl[0].attacked[0] == self 
   skill_turns(pl[0],99,71,"72",1,true)
   end
   if pl[1].attacked[0].kind_of?(Array)
   if pl[1].attacked[0].index(self)
    pl[1].health -= 10
   skill_turns(pl[1],99,71,"72",1,true)
   end
   elsif pl[1].attacked[0] == self
   skill_turns(pl[1],99,71,"72",1,true)
   end
   if pl[2].attacked[0].kind_of?(Array)
   if pl[2].attacked[0].index(self)
   skill_turns(pl[2],99,71,"72",1,true)
   end
   elsif pl[2].attacked[0] == self
   skill_turns(pl[2],99,71,"72",1,true)
   end
else
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end

end# Case end
effecting[c] -= 1
if (effecting[c] == 0 || stop)
if show
n = effecting[c + 1].effect.index(m)
if n != nil
effecting[c + 1].effect.delete_at(n)
end
end
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)

len -= 4
else
c += 4
end# If end
end# While
end

def skills(player, skill,logs)
move = self.skillhold[skill]

if skill <= -1
move = -1
elsif skill != 4
move = move.to_i
end

if skill == 4
case move
when true

when "10000" # Power-Up
c = check(1,10,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false  && c[0]
transformskill([0.25, 0.25, 0.25, 0.25], "10000", 1)
skill_turns(self, 99, 10000, "10000", 3, true) 
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
elsif self.transformation[0] == true && self.stunned[0] == 0 && self.stunned[3] == 0 && c[0]
transformskill(0, 0, 3)
end 

when "10007" # Power Amp
c = check(2,15,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false && c[0]
transformskill([0.25,0 , 0, 0.25], "10007", 1)
skill_turns(self, 99, 10007, "10007", 3, true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
elsif self.transformation[0] == true && self.stunned[0] == 0 && self.stunned[3] == 0 && c[0]
transformskill(0, 0, 3)
end 
end

elsif 30 > move && move >= 0
generic(move, player, move, skill, logs)
elsif move >= 20
case move

when 70 # Bomber DX
c = check(2, 35, skill, 2, player, 0,logs,[false,false,false])
if c[0]
c[1].health -= 30
if c[1].effect.index("71")
c[1].stunned[0] = 2
end
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end

when 71 # Exploding Wave
c = check(1, 30, skill, 3, player, 0,logs,[false,false,false])
if c[0]
i = 0
l = c[1].length - 1
for i in 0..l
c[1][i].health -= 10
skill_turns(c[1][i], 2, 71, "71", 3, true)
end
health = [player[0].health,player[1].health,player[2].health]
logs.push(4,move,health,[self.controlling_player.vs,self.info[1]],c[3],c[4])    
else
logs.push(4,move,0,[self.controlling_player.vs,self.info[1]],c[3],c[4])  
end

when 72 # Surging Assault
c = check(1, 20, skill, 2, player, 2,logs,[false,false,false])
if c[0]
s_damage(c[1],15)
skill_turns(c[1], 99, 72, "72", 3, true)
if c[1].effect.index("71")
c[1].stunned[3] = 2
end
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end
end
end


end
end
#------------------------------------------------------------------------------------------------------------------------




#------------------------------------------------------------------------------------------------------------------------
class ScouterVegeta < Character
  
def checkType(skill)
  

if self.skillhold == skill
self.attacked[3] = 4
elsif skill < 30
genericType(skill)
else
  
case skill

#1:Ki  2:Strength  3:Power-down 4:Friendly
when 73 # Galick-Gun
self.attacked[3] = 1
when 74 # Scouter Analysis
self.attacked[3] = 3
when 75 # Aerial Smash
self.attacked[3] = 2
when 76 # Mouth Blast
self.attacked[3] = 1
when 77 # Howl
self.attacked[3] = 4
when 78 # Great Ape Smash
self.attacked[3] = 2
end
end
end


def rush(name,logs)

# Types: full 0, Ki 1, Strength 2, Power-Down 3, Friendly 4
case name[1]

when 2 # Energy Deflect
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 2, "2", 3, true)
if self.block[1] < 2
self.block[1] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 4 # Sonic Sway
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
#skill_turns(self, 2, 4, "4", 3, true)
if self.block[1] < 1
self.block[0] = 1;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 7 # Strength Block
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 7, "7", 3, true)
if self.block[2] < 2
self.block[2] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end
end
end

def currentEffects
len = effecting.length

show = true
c = 0

while (c < len)
  a = self.effecting[c + 2]
  if self.effecting[c+1].health <= 0 || self.health < 0  
    stop = true
else
  stop = false
  end
  if effecting[c+1].effect.index(a.to_s) == nil
  stop = true
  show = false
  end
  
case a

when 1..30
genericTurn(a, c)
m = a.to_s

when 74 # Scouter Analysis
m="74"

when 10000# Generic Trans.
m = "10000"
if self.energy > 10 && self.transformation[0] && !stop
self.energy -= 10
else
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end

when 10008
m = "10008"
if self.energy > 20 && self.transformation[0] && !stop
self.energy -= 20
else
a = self.skillhold.index("76")
b = self.skillhold.index("77")
d = self.skillhold.index("78")
if a != nil
self.skillhold[a] = "73"
end
if b != nil
self.skillhold[b] = "74"
end
if d != nil
self.skillhold[d] = "75"
end
self.energy -= 20
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end

end# Case end
effecting[c] -= 1
if (effecting[c] == 0 || stop)
if show
n = effecting[c + 1].effect.index(m)
if n != nil
effecting[c + 1].effect.delete_at(n)
end
end
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)

len -= 4
else
c += 4
end# If end
end# While
end



def skills(player, skill,logs)
move = self.skillhold[skill]

if skill <= -1
move = -1
elsif skill != 4
move = move.to_i
end

if skill == 4
case move
when true

when "10000" # Power-Up
c = check(1,10,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false  && c[0]
transformskill([0.25, 0.25, 0.25, 0.25], "10000", 1)
skill_turns(self, 99, 10000, "10000", 3, true) 
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 

elsif self.transformation[0] == true && self.stunned[0] == 0 && c[0]
transformskill(0, 0, 3)
end 

when "10008" # Oozaru Vegeta
c = check(1,20,skill,0,player,4,logs,[false,false,false])  
if self.transformation[0] == false && c[0]
transformskill([0.6, 0.6, 0.6, 0], "10008", 1)
skill_turns(self, 99, 10008, "10008", 3, true)
a = self.skillhold.index("73")
b = self.skillhold.index("74")
d = self.skillhold.index("75")
if a != nil
self.skillhold[a] = "76"
end
if b != nil
self.skillhold[b] = "77"
end
if d != nil
self.skillhold[d] = "78"
end
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 

elsif self.transformation[0] == true && self.stunned[0] == 0 && self.stunned[3] == 0 && c[0]
transformation[0] = false
transformation[6] = false
end 
end

elsif 30 > move && move >= 0
generic(move, player, move, skill, logs)
elsif move >= 20
case move

when 73 # Galick-Gun
c = check(2, 30, skill, 0,player, 1,logs,[false,false,false])
if c[0]
if self.ki > c[1].ki
k_damage(c[1],30)
else
k_damage(c[1],15)
end
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end

when 74 # Scouter Analysis
c = check(1, 20, skill, 3, player, 3,logs,[false,false,false])
if c[0]
c[1].stunned[3] = 2
c[1].block[4] = 2
skill_turns(c[1],2,74,"74",3,true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end

when 75 # Aerial Smash
c = check(1, 30, skill, 2, player, 2,logs,[false,false,false])
if c[0]
s_damage(c[1],15)
self.speed += 2
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end

when 76 # Mouth Blast
c = check(2, 25, skill, 0,player, 1,logs,[false,false,false])
if c[0]
if self.ki > c[1].ki
k_damage(c[1],40)
else
k_damage(c[1],20)
end
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end

when 77 # Howl
c = check(1, 10, skill, 3, player, 3,logs,[false,false,false])
if c[0]
c[1].strength += 10
c[1].ki += 10
transformation[2] += 10
transformation[3] += 10
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end

when 78 # Great Ape Smash
c = check(2, 25, skill, 2, player, 2,logs,[false,false,false])
if c[0]
s_damage(c[1],20)
power_down(c[1],[0,0,0,2])
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end

end
end
end
end
#------------------------------------------------------------------------------------------------------------------------




#------------------------------------------------------------------------------------------------------------------------
class Ginyu < Character
  
def checkType(skill)

if self.skillhold == skill
self.attacked[3] = 4
elsif skill < 30
genericType(skill)
else
  
case skill

#1:Ki  2:Strength  3:Power-down 4:Friendly
when 94 # Self Storm
self.attacked[3] = 3
when 95 # Tornado Kick
self.attacked[3] = 4
when 96 # Milky Cannon
self.attacked[3] = 1
end
end
end

def rush(name,logs)

# Types: full 0, Ki 1, Strength 2, Power-Down 3, Friendly 4
case name[1]

when 2 # Energy Deflect
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 2, "2", 3, true)
if self.block[1] < 2
self.block[1] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 4 # Sonic Sway
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
#skill_turns(self, 2, 4, "4", 3, true)
if self.block[1] < 1
self.block[0] = 1;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 7 # Strength Block
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 7, "7", 3, true)
if self.block[2] < 2
self.block[2] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

end
end

def currentEffects
len = effecting.length

show = true
c = 0

while (c < len)
  a = self.effecting[c + 2]
  if self.effecting[c+1].health <= 0 || self.health < 0  
    stop = true
else
  stop = false
  end
  if effecting[c+1].effect.index(a.to_s) == nil
  stop = true
  show = false
  end
  
case a

when 1..30
genericTurn(a, c)
m = a.to_s

when 94 # Self Storm
m = "94"


when 95 # Tornado Kick
m = "95"
ck = currentCheck(self.effecting[c+1],2,[false,false])
#0. Afflication 1.Ki 2.Strength 3.Power-Down 4.Friendly 
if ck
pl = self.controlling_player.enemy.values

   if pl[0].attacked[0] == self.effecting[c+1]
   pl[0].stunned[2] = 3
   skill_turns(pl[0],4,95,"95",1,true)
   end
   if pl[1].attacked[0] == self.effecting[c+1]
   pl[1].stunned[2] = 3
   skill_turns(pl[1],4,95,"95",1,true)
   end
   if pl[2].attacked[0] == self.effecting[c+1]
   pl[2].stunned[2] = 3
   skill_turns(pl[2],4,71,"95",1,true)
   end
end   
when 96
m = "96"

when 10000# Generic Trans.
m = "10000"
if self.energy > 10 && self.transformation[0] && !stop
self.energy -= 10
else
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end

end# Case end
effecting[c] -= 1
if (effecting[c] == 0 || stop)
if show
n = effecting[c + 1].effect.index(m)
if n != nil
effecting[c + 1].effect.delete_at(n)
end
end
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)

len -= 4
else
c += 4
end# If end
end# While
end



def skills(player, skill,logs)
move = self.skillhold[skill]

if skill <= -1
move = -1
elsif skill != 4
move = move.to_i
end

if skill == 4
case move
when true

when "10000" # Power-Up
c = check(1,10,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false && c[0]
transformskill([0.25, 0.25, 0.25, 0.25], "10000", 1)
skill_turns(self, 99, 10000, "10000", 3, true) 
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 

elsif self.transformation[0] == true && c[0]
transformskill(0, 0, 3)
end #Add more transformations before this "end" if there are any others.


when "10011" # Body Switch
c = check(4,50,4,99,player,0,logs,[false,false,false])

if c[0] && c[1].effect.index("94") != nil && health <= 60
a = c[1].controlling_player.characters[c[1].info[0]] 
b = c[1].info[1]
c[1].info[1] = self.info[1] 

self.info[1] = b

c[1].controlling_player.characters[c[1].info[0]] = self.controlling_player.characters['zGy']
self.controlling_player.characters['zGy'] = a
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end 
end

elsif 30 > move && move >= 0
generic(move, player, move, skill, logs)
elsif move >= 20
case move

when 94 # Self Harm
c = check(1, 30, skill, 4, name[0], 3,logs,[false,false,false])
if c[0]
self.health = self.health - self.health / 5
c[1].stunned[3] = 2
c[1].conditions[1] = 2
skill_turns(c[1], 2, 94, "94", 3, true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end

when 95 # Tornado Kick
c = check(2, 30, skill, 4, player, 4,logs,[false,false,false])
if c[0]
skill_turns(c[1], 2, 95, "95", 3, true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end

when 96 # Milky Cannon
c = check(1, 30, skill, 0, player, 1,logs,[false,false,false])
if c[0]
if c[1].effect.index("96") == nil
k_damage(c[1],10)
c[1].energy -= 10
skill_turns(c[1], 2, 96, "96", 1, true)
else
k_damage(c[1],20)
c[1].energy -= 20
skill_turns(c[1], 2, 96, "96", 1, true)  
end
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end

end
end
end
end
#------------------------------------------------------------------------------------------------------------------------




#------------------------------------------------------------------------------------------------------------------------
class Nail < Character
  
def checkType(skill)
  

if self.skillhold == skill
self.attacked[3] = 4
elsif skill < 30
genericType(skill)
else
  
case skill

when 79
self.attacked[3] = 2
#1:Ki  2:Strength  3:Power-down 4:Friendly
when 80
self.attacked[3] = 1
when 81
self.attacked[3] = 4
end
end
end

def rush(name,logs)

# Types: full 0, Ki 1, Strength 2, Power-Down 3, Friendly 4
case name[1]
when 2
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 2, "2", 3, true)
if self.block[1] < 2
self.block[1] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 4 # sonic sway
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
#skill_turns(self, 2, 4, "4", 3, true)
if self.block[1] < 1
self.block[0] = 1;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end
when 7
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 7, "7", 3, true)
if self.block[2] < 2
self.block[2] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end
when 80
c = check(1, 35, name[2], 3, player, 1,logs,[false,false,false])
if c[0]
k_damage(c[1],15)
reflect_s(c[1],self,2,2)
self.block[3] = 1
skill_turns(c[1], 2, 80, "80", 3, true)
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end
end
end

def currentEffects
len = effecting.length
show = true
c = 0

while (c < len)
  a = self.effecting[c + 2]
  if self.effecting[c+1].health <= 0 || self.health < 0  
    stop = true
else
  stop = false
  end
  if effecting[c+1].effect.index(a.to_s) == nil
  stop = true
  show = false
  end
  
case a

when 1..30
genericTurn(a, c)
m = a.to_s

when 79
m = "79"

when 80
m = "80"

when 100
m = "10000"
if self.energy > 10 && self.transformation[0] && !stop
self.energy -= 10
else
  self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end
when 10006
m = "10006"
if stop || self.effecting[c+1].health <= 0
self.effecting[c+1].health += 100
self.effecting[c+1].energy += 50
self.health = 0
stop = true
power_up(self.effecting[c+1],[10,10,10,10])
end
end
effecting[c] -= 1
if (effecting[c] == 0 || stop)
  if show
n = effecting[c + 1].effect.index(m)
if n != nil
effecting[c + 1].effect.delete_at(n)
end
end
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)

len -= 4
else
  c += 4
end# If end
end# While
end

def skills(player, skill,logs)
move = self.skillhold[skill]

if skill <= -1
move = -1
elsif skill != 4
move = move.to_i
end

if skill == 4
case move
when true

when "10000" # Power-Up
c = check(1,10,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false && c[0]
transformskill([0.25, 0.25, 0.25, 0.25], "10000", 1)
skill_turns(self, 99, 10000, "10000", 3, true) 
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 

elsif self.transformation[0] == true && c[0]
transformskill(0, 0, 3)
end

when "10006" # Fuse with Nail
c = check(2,40,skill,0,player,4,logs,[false,false,false])
if transformation[0] == false && player.info[0] == "zPo" && c[0] 
transformation[0] = true
skill_turns(player, 99, 10006, "10006", 3, true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end 
end

elsif 30 > move && move >= 0
generic(move, player, move, skill, logs)
elsif move >= 20
case move

when 79
c = check(1, 30, skill, 2,player, 2,logs,[false,false,false])
if c[0]
s_damage(c[1],10)
c[1].stunned[2] = 2
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end

when 81
c = check(2, 30, skill, 5, player, 4,logs,[false,false,false])
if c[0]
heal(c[1],50,0)
power_down(self,[2,2,-5,0])
self.effect = []
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end
end
end


end
end
#------------------------------------------------------------------------------------------------------------------------




#------------------------------------------------------------------------------------------------------------------------
class TienZ < Character
  
def checkType(skill)
  

if self.skillhold == skill
self.attacked[3] = 4
elsif skill < 30
genericType(skill)
else
  
case skill

when 58
self.attacked[3] = 0
#1:Ki  2:Strength  3:Power-down 4:Friendly
when 59
self.attacked[3] = 1
when 60
self.attacked[3] = 3
end
end
end

def rush(name,logs)

# Types: full 0, Ki 1, Strength 2, Power-Down 3, Friendly 4
case name[1]

when 2 # Energy Deflect
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 2, "2", 3, true)
if self.block[1] < 2
self.block[1] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 4 # Sonic Sway
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
#skill_turns(self, 2, 4, "4", 3, true)
if self.block[1] < 1
self.block[0] = 1;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 7 # Strength Block
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 7, "7", 3, true)
if self.block[2] < 2
self.block[2] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

when 60
c = check(1, 15,name[2],2 , self, 4,logs,[false,false,false])
if c[0]
self.block[3] = 2
skill_turns(self, 99, 60, "60", 3, true)
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])  
end

end
end

def currentEffects
len = effecting.length

show = true
c = 0

while (c < len)
  a = self.effecting[c + 2]
  if self.effecting[c+1].health <= 0 || self.health < 0  
    stop = true
else
  stop = false
  end
  if effecting[c+1].effect.index(a.to_s) == nil
  stop = true
  show = false
  end
  
case a

when 1..30
genericTurn(a, c)
m = a.to_s

when 58
m = "58"

when 59
m = "59"

when 60
m = "60"

when 10000# Generic Trans.
m = "10000"
if self.energy > 10 && self.transformation[0] && !stop
self.energy -= 10
else
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end
end# Case end
effecting[c] -= 1
if (effecting[c] == 0 || stop)
  if show
n = effecting[c + 1].effect.index(m)
if n != nil
effecting[c + 1].effect.delete_at(n)
end
end
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)

len -= 4
else
  c += 4
end# If end
end# While
end



def skills(player, skill,logs)
move = self.skillhold[skill]

if skill <= -1
move = -1
elsif skill != 4
move = move.to_i
end

if skill == 4
case move
when true

when "10000" # Power-Up
c = check(1,10,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false && c[0]
transformskill([0.25, 0.25, 0.25, 0.25], "10000", 1)
skill_turns(self, 99, 10000, "10000", 3, true) 
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 

elsif self.transformation[0] == true && c[0]
transformskill(0, 0, 3)
end #Add more transformations before this "end" if there are any others.
end

elsif 30 > move && move >= 0
generic(move, player, move, skill, logs)
elsif move >= 20
case move

when 58
c = check(3, 50, skill, 4, player, 0,logs,[false,false,false])
if c[0]
a = self.effect.index('60')
if a != nil
boost = self.effect.count('60')
damage = 20 * boost
a_damage(c[1],damage)
self.effect.delete_at(a)
end
c[1].stunned[0] = 3
self.stunned[0] = 2
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])  
end

when 59
c = check(2, 30, skill, 2, player, 0,logs,[false,false,false])
if c[0]
boost = self.effect.count('60')
damage = 10 + 5 * boost
a_damage(c[1],damage)
c[1].conditions[3] = 2
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])  
end


end
end
end
end
#------------------------------------------------------------------------------------------------------------------------




#------------------------------------------------------------------------------------------------------------------------
class Roshi < Character
  
def checkType(skill)
  

if self.skillhold == skill
self.attacked[3] = 4
elsif skill < 30
genericType(skill)
else
  
case skill

when 100
self.attacked[3] = 1
#1:Ki  2:Strength  3:Power-down 4:Friendly
when 101
self.attacked[3] = 3
when 102
self.attacked[3] = 3
when 103
self.attacked[3] = 1
when 104
self.attacked[3] = 2
when 105
self.attacked[3] = 2
end
end
end


def rush(name,logs)

# Types: full 0, Ki 1, Strength 2, Power-Down 3, Friendly 4
case name[1]

when 2 # Energy Deflect
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 2, "2", 3, true)
if self.block[1] < 2
self.block[1] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],0,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end

when 4 # Sonic Sway
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
#skill_turns(self, 2, 4, "4", 3, true)
if self.block[1] < 1
self.block[0] = 1;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])   
end

when 7 # Strength Block
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 7, "7", 3, true)
if self.block[2] < 2
self.block[2] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end
end
end

def currentEffects
len = effecting.length

show = true
c = 0

while (c < len)
  a = self.effecting[c + 2]
  if self.effecting[c+1].health <= 0 || self.health < 0  
    stop = true
else
  stop = false
  end
  if effecting[c+1].effect.index(a.to_s) == nil
  stop = true
  show = false
  end
  
case a

when 1..30
genericTurn(a, c)
m = a.to_s

when 99
m = "102"
ck = currentCheck(self.effecting[c+1],3,[false,false])
#0. Afflication 1.Ki 2.Strength 3.Power-Down 4.Friendly 
if self.effecting[c+1] != self && !stop && ck
self.effecting[c+1].energy -= 15
self.health -= 5
else
self.effecting[c] = 0;
self.effect.delete(m)
sk = self.effecting.index(m) - 2
self.effecting.delete_at(sk)
self.effecting.delete_at(sk)
self.effecting.delete_at(sk)
self.effecting.delete_at(sk)
len -= 4
end

when 101 # Sleepy Boy Technique
m = "101"

when 102 # Evil Containment Wave
m = "102"
ck = currentCheck(self.effecting[c+1],3,[false,false])
#0. Afflication 1.Ki 2.Strength 3.Power-Down 4.Friendly 
if self.effecting[c+1] != self && !stop && ck
self.health -= 5
self.effecting[c+1].energy -= 10
elsif stop  
self.effecting[c] = 0; 
self.effect.delete(m)
sk = self.effecting.index(m) - 2
self.effecting.delete_at(sk)
self.effecting.delete_at(sk)
self.effecting.delete_at(sk)
self.effecting.delete_at(sk)
len -= 4
else
end

when 104 # Max Punch
m = "104"

when 105 # Roshi's Stick
m = "105"

when 10000
m = "10000"
if self.energy > 10 && self.transformation[0] && !stop
self.energy -= 10
else
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end

when 10012
m = "10012"
if self.energy > 15 && self.transformation[0] && !stop
self.energy -= 15
else
self.energy -= 15
self.strength -= 10
self.ki -= 10
self.defense -= 10
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
a = self.skillhold.index("103")
b = self.skillhold.index("104")
d = self.skillhold.index("105")
if a != nil
self.skillhold[a] = "100"
end
if b != nil
self.skillhold[b] = "101"
end
if d != nil
self.skillhold[d] = "102"
end
end

end# Case end
effecting[c] -= 1
if (effecting[c] == 0 || stop)
if show
n = effecting[c + 1].effect.index(m)
if n != nil
effecting[c + 1].effect.delete_at(n)
end
end
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
len -= 4
else
c += 4
end# If end
end# While
end

def skills(player, skill,logs)
move = self.skillhold[skill]

if skill <= -1
move = -1
elsif skill != 4
move = move.to_i
end

if skill == 4
case move
when true

when "10000" # Power-Up
c = check(1, 10, skill, 0, player, 4,logs,[false,false,false])
if self.transformation[0] == false && c[0]
transformskill([0.25, 0.25, 0.25, 0.25], "10000", 1)
skill_turns(self, 99, 50, "10000", 3, true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
elsif self.transformation[0] == true && c[0]
transformskill(0, 0, 3)
else 
  
end #Add more transformations before this "end" if there are any others.

when "10012" # Roshi Trans.
c = check(1, 15, skill, 0, player, 4,logs,[false,false,false])
if self.transformation[0] == false && c[0] && self.effect.index("102") == nil
self.transformation[0] = true
self.transformation[1] = "10012"
self.transformation[6] = true
skill_turns(self, 99, 51, "10012", 3, true)
self.ki += 10
self.defense += 10
self.strength += 10
a = self.skillhold.index("100")
b = self.skillhold.index("101")
d = self.skillhold.index("102")
if a != nil
self.skillhold[a] = "103"
end
if b != nil
self.skillhold[b] = "104"
end
if d != nil
self.skillhold[d] = "105"
end
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
elsif self.transformation[0] == true && c[0]
self.transformation[0] = false
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end #Add more transformations before this "end" if there are any others.
else 
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end

elsif 30 > move && move >= 0
generic(move, player, move, skill, logs)
elsif move >= 20
case move

when 100 # Kamehameha
c = check(1, 35, skill, 2, player, 1,logs,[false,false,false])
if c[0]
k_damage(c[1],15)
c[1].ki -= 3
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else 
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end

when 101 # Sleepy Boy Technique
c = check(1, 30, skill, 3, player, 0,logs,[false,false,false])
if c[0]
c[1].stunned[0] = 2
skill_turns(c[1], 2, 101, "101", 1, true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else 
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end

when 102 # Evil Containment Wave
if player.effect.index("102") == nil
c = check(2, 30, skill, 2, player, 3,logs,[false,false,false])
if c[0]

if c[1].effect.index("101") != nil
self.defense += 5
skill_turns(c[1], 99, 99, "102", 1, true)
skill_turns(self, 99, 102, "102", 1, true)
c[1].transformation[0] = false
else
skill_turns(c[1], 99, 102, "102", 1, true)
skill_turns(self, 99, 102, "102", 1, true)
end
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end
else 
c = check(0, 0, skill, 0, player, 3,logs,[false,false,false])
if c[0]
a = self.effecting.index(c[1]) - 1
self.effecting.delete_at(a)
self.effecting.delete_at(a)
self.effecting.delete_at(a)
self.effecting.delete_at(a)
self.effecting.delete_at(a)
self.effecting.delete_at(a)
self.effecting.delete_at(a)
self.effecting.delete_at(a)
self.effect.delete("102")
c[1].effect.delete("102")
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end
end

when 103 # Max Kamehameha
c = check(3, 40, skill, 4, player, 1,logs,[false,false,false])
if c[0]
p_k_damage(c[1],35)
self.transformation[0] = false
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end

when 104 # Max Punch
c = check(1, 20, skill, 3, player, 1,logs,[false,false,false])
if c[0]
s_damage(c[1],15)
c[1].stunned[3] = 2
skill_turns(c[1], 3, 104, "104", 1, true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end

when 105 # Roshi's Stick
c = check(2, 25, skill, 3, player, 1,logs,[false,false,false])
if c[0] && self.effect.count("105") != 2
s_damage(c[1],20)
c[1].conditions[0] = 2
skill_turns(c[1], 2, 105, "105", 1, true)  
skill_turns(self, 99, 105, "105", 1, true)  
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end
end
else 

end
end
end
#------------------------------------------------------------------------------------------------------------------------




#------------------------------------------------------------------------------------------------------------------------
class Cui < Character
  
def checkType(skill)
  

if self.skillhold == skill
self.attacked[3] = 4
elsif skill < 30
genericType(skill)
else
  
case skill

when 97
self.attacked[3] = 2
#1:Ki  2:Strength  3:Power-down 4:Friendly
when 98
self.attacked[3] = 3
when 99
self.attacked[3] = 1
end
end
end


def rush(name,logs)

# Types: full 0, Ki 1, Strength 2, Power-Down 3, Friendly 4
case name[1]
when 2
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 2, "2", 3, true)
if self.block[1] < 2
self.block[1] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],0,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end

when 4 # sonic sway
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
#skill_turns(self, 2, 4, "4", 3, true)
if self.block[1] < 1
self.block[0] = 1;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],0,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end
when 7
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 7, "7", 3, true)
if self.block[2] < 2
self.block[2] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],0,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end
end
end

def currentEffects
len = effecting.length

show = true
c = 0

while (c < len)
  a = self.effecting[c + 2]
  if self.effecting[c+1].health <= 0 || self.health < 0  
    stop = true
else
  stop = false
  end
  if effecting[c+1].effect.index(a.to_s) == nil
  stop = true
  show = false
  end
  
case a

when 1..30
genericTurn(a, c)
m = a.to_s

when 97
m = "97"

when 98
m = "98"

when 10000# Generic Trans.
m = "10000"
if self.energy > 10 && self.transformation[0] && !stop
self.energy -= 10
else
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end
end# Case end
effecting[c] -= 1
if (effecting[c] == 0 || stop)
  if show
n = effecting[c + 1].effect.index(m)
if n != nil
effecting[c + 1].effect.delete_at(n)
end
end
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)

len -= 4
else
  c += 4
end# If end
end# While
end



def skills(player, skill,logs)
move = self.skillhold[skill]

if skill <= -1
move = -1
elsif skill != 4
move = move.to_i
end

if skill == 4
case move
when true

when "10000" # Power-Up
c = check(1,10,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false && c[0]
transformskill([0.25, 0.25, 0.25, 0.25], "10000", 1)
skill_turns(self, 99, 10000, "10000", 3, true) 
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 

elsif self.transformation[0] == true && c[0]
transformskill(0, 0, 3)
end #Add more transformations before this "end" if there are any others.
end

elsif 30 > move && move >= 0
generic(move, player, move, skill, logs)
elsif move >= 20
case move
when 97
c = check(0, 30, skill, 3, player, 2,logs,[false,false,false])
if c[0]
c[1].current_defense = 0
c[1].block[4] = 3
skill_turns(c[1],2,97,"97",3,true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end
when 98
c = check(1, 30, skill, 4, player, 3,logs,[false,false,false])
if c[0]
c[1].conditions[0] = 2
skill_turns(c[1],2,98,"98",3,true)
self.ki += 5
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end
when 99
c = check(2, 30, skill, 0, player, 1,logs,[false,false,false])
if c[0]
if self.ki > c[1].defense
k_damage(c[1],20)
c[1].defense -= 5
else
k_damage(c[1],15)
c[1].defense -= 3
end
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end
end
end
end
end
#------------------------------------------------------------------------------------------------------------------------




#------------------------------------------------------------------------------------------------------------------------
class YajirobeZ < Character
  
def checkType(skill)
  

if self.skillhold == skill
self.attacked[3] = 4
elsif skill < 30
genericType(skill)
else
  
case skill
#1:Ki  2:Strength  3:Power-down 4:Friendly
when 64
self.attacked[3] = 2
when 65
self.attacked[3] = 4
when 66
self.attacked[3] = 4
end
end
end

def rush(name,logs)

# Types: full 0, Ki 1, Strength 2, Power-Down 3, Friendly 4
case name[1]

when 2 #Energy Deflect
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 2, "2", 3, true)
if self.block[1] < 2
self.block[1] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],0,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end

when 4 # Sonic Sway
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
#skill_turns(self, 2, 4, "4", 3, true)
if self.block[1] < 1
self.block[0] = 1;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],0,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end

when 7 # Strength Block
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 7, "7", 3, true)
if self.block[2] < 2
self.block[2] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],0,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end

when 65
c = check(2, 30, name[2], 3, name[0], 4,logs,[false,false,false])
if c[0]
self.block[1] = 2
c[1].block[1] = 2
skill_turns(self, 2, 65, "65", 3, true)
skill_turns(c[1], 2, 65, "65", 3, true)
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],0,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end
end
end

def currentEffects
len = effecting.length

show = true
c = 0

while (c < len)
  a = self.effecting[c + 2]
  if self.effecting[c+1].health <= 0 || self.health < 0  
    stop = true
else
  stop = false
  end
  if effecting[c+1].effect.index(a.to_s) == nil
  stop = true
  show = false
  end
  
case a

when 1..30
genericTurn(a, c)
m = a.to_s

when 64
m = "64"

when 65
m = "65"

when 10000# Generic Trans.
m = "10000"
if self.energy > 10 && self.transformation[0] && !stop
self.energy -= 10
else
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end

end# Case end
effecting[c] -= 1
if (effecting[c] == 0 || stop)
if show
n = effecting[c + 1].effect.index(m)
if n != nil
effecting[c + 1].effect.delete_at(n)
end
end
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)

len -= 4
else
  c += 4
end# If end
end# While
end



def skills(player, skill,logs)
move = self.skillhold[skill]

if skill <= -1
move = -1
elsif skill != 4
move = move.to_i
end

if skill == 4
case move
when true

when "10000" # Power-Up
c = check(1,10,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false && c[0]
transformskill([0.25, 0.25, 0.25, 0.25], "10000", 1)
skill_turns(self, 99, 10000, "10000", 3, true) 
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
elsif self.transformation[0] == true && self.stunned[0] == 0 && self.stunned[3] == 0 && c[0]
transformskill(0, 0, 3)
end #Add more transformations before this "end" if there are any others.
end

elsif 30 > move && move >= 0
generic(move, player, move, skill, logs)
elsif move >= 20
case move
when 64
c = check(1, 30, skill, 0, player, 2,logs,[false,false,false])
if c[0]
s_damage(c[1],15)
c[1].defense -= 2
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end
when 65

when 66
n = self.effect.count("66") + 1
c = check(2, 40, skill, 0+n, player, 4,logs,[false,false,false])
if c[0]
recover(c[1],0.25,0.25)
skill_turns(self, 99, 66, "66", 3, true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end
end
end


end
end
#------------------------------------------------------------------------------------------------------------------------




#------------------------------------------------------------------------------------------------------------------------
class ChiaotzuZ < Character
  
def checkType(skill)
  

if self.skillhold == skill
self.attacked[3] = 4
elsif skill < 30
genericType(skill)
else
  
case skill

when 61
self.attacked[3] = 3
#1:Ki  2:Strength  3:Power-down 4:Friendly
when 62
self.attacked[3] = 3
when 63
self.attacked[3] = 3
end



end
end

def rush(name,logs)

# Types: full 0, Ki 1, Strength 2, Power-Down 3, Friendly 4
case name[1]
when 2
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 2, "2", 3, true)
if self.block[1] < 2
self.block[1] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],0,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end

when 4 # sonic sway
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
#skill_turns(self, 2, 4, "4", 3, true)
if self.block[1] < 1
self.block[0] = 1;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],0,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end
when 7
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 7, "7", 3, true)
if self.block[2] < 2
self.block[2] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],0,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end
end
end

def currentEffects
len = effecting.length

show = true
c = 0

while (c < len)
  a = self.effecting[c + 2]
  if self.effecting[c+1].health <= 0 || self.health < 0  
    stop = true
else
  stop = false
  end
  if effecting[c+1].effect.index(a.to_s) == nil
  stop = true
  show = false
  end
  
case a

when 1..30
genericTurn(a, c)
m = a.to_s
when 61
m = "61"

when 62
m = "62"

when 63
m = "63"

when 10000# Generic Trans
m = "10000"
if self.energy > 10 && self.transformation[0] && !stop
self.energy -= 10
else
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end
end# Case end
effecting[c] -= 1
if (effecting[c] == 0 || stop)
if show
n = effecting[c + 1].effect.index(m)
if n != nil
effecting[c + 1].effect.delete_at(n)
end
end
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)

len -= 4
else
  c += 4
end# If end
end# While
end



def skills(player, skill,logs)
move = self.skillhold[skill]

if skill <= -1
move = -1
elsif skill != 4
move = move.to_i
end

if skill == 4
case move
when true

when "10000" # Power-Up
c = check(1,10,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false && c[0]
transformskill([0.25, 0.25, 0.25, 0.25], "10000", 1)
skill_turns(self, 99, 10000, "10000", 3, true) 
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 

elsif self.transformation[0] == true && c[0]
transformskill(0, 0, 3)
end #Add more transformations before this "end" if there are any others.
end

elsif 30 > move && move >= 0
generic(move, player, move, skill, logs)
elsif move >= 20
case move
when 61
c = check(1, 20, skill, 3, player, 3,logs,[false,false,false])
if c[0]
power_down(c[1],[3,3,3,3])
c[1].stunned[3] = 2
skill_turns(c[1], 2, 61, "61", 3, true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end
when 62
c = check(1, 30, skill, 2, player, 3,logs,[false,false,false])
if c[0]
c[1].defense -= 5
c[1].stunned[2] = 2
bpeffect(c[1],-1)
skill_turns(c[1], 2, 62, "62", 3, true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end
when 63
c = check(2, 50, skill, 5, player, 3,logs,[false,false,false])
if c[0]
reflect_s(c[1], "Ally", 3,1)
skill_turns(c[1], 3, 63, "63", 3, false)
end
end
end


end
end
#------------------------------------------------------------------------------------------------------------------------




#------------------------------------------------------------------------------------------------------------------------
class KingKai < Character
  
def checkType(skill)
  

if self.skillhold == skill
self.attacked[3] = 4
elsif skill < 30
genericType(skill)
else
  
case skill

when 67
self.attacked[3] = 4
#1:Ki  2:Strength  3:Power-down 4:Friendly
when 68
self.attacked[3] = 4
when 69
self.attacked[3] = 3
end
end
end


def rush(name,logs)

# Types: full 0, Ki 1, Strength 2, Power-Down 3, Friendly 4
case name[1]
when 2
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 2, "2", 3, true)
if self.block[1] < 2
self.block[1] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],0,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 

end

when 4 # sonic sway
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
#skill_turns(self, 2, 4, "4", 3, true)
if self.block[1] < 1
self.block[0] = 1;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],0,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end
when 7
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 7, "7", 3, true)
if self.block[2] < 2
self.block[2] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],0,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end
when 69
c = check(2, 40, name[2], 4, name[0], 3,logs,[false,false,false])
if c[0]
  l = c[1].length - 1
  i = 0
#skill_turns(c[1][i], 2, 69, "69", 3, false)
for i in 0..l
percent_down(c[1][i],[0.20,0,0,0])
c[1][i].energy -= 15
end

play = self.controlling_player.characters.values
self.block[3] = 2
if play[0] != self && play[0].block[4] != 0 && play[0].health > 0
player[0].block[3] = 2
end

if play[1] != self && play[1].block[4] >= 0  && play[1].health > 0
player[1].block[3] = 2
end

if play[2] != self && play[2].block[4] >= 0  && play[2].health > 0
player[2].block[3] = 2
end

end    
end
end

def currentEffects
len = effecting.length

show = true
c = 0

while (c < len)
  a = self.effecting[c + 2]
  if self.effecting[c+1].health <= 0 || self.health < 0  
    stop = true
else
  stop = false
  end

  
case a

when 1..30
genericTurn(a, c)
m = a.to_s

when 67
m = "67"
  if effecting[c+1].effect.index(a.to_s) == nil
  stop = true
  show = false
  end
self.effecting[c+1].counter[0] = 0
self.effecting[c+1].counter[1] = 0
self.effecting[c+1].counter[2] = 0
self.effecting[c+1].counter[3] = 0

when 68
m = "68"
  if effecting[c+1].effect.index(a.to_s) == nil
  stop = true
  show = false
  end
self.effecting[c+1].stunned = [0,0,0,0]
when 69
m = "69"
puts "69: in skill"
if self.effecting[c+1].attacked[0] == -1 || !stop

elsif self.effecting[c+1].attacked[0].kind_of?(Array)
  length = self.effecting[c+1].attacked[0].length - 1
  count = 0
  puts "Length: #{length}"
  for i in 0..length
  puts "I: #{i}"
  if self.effecting[c+1].attacked[0][i].controlling_player == self.controlling_player
    puts "AOE: "
   self.effecting[c+1].attacked[0][i].energy += 15
   self.effecting[c+1].attacked[0][i].block[1] = 2
   count += 1
   
  end
  end
  if count != 0
  percent_down(self.effecting[c+1],[0.20,0,0,0])
  end
   elsif self.effecting[c+1].attacked[0].controlling_player == self.controlling_player
    puts "Single: "
   self.effecting[c+1].attacked[0].energy += 15
   self.effecting[c+1].attacked[0].block[1] = 2
    percent_down(self.effecting[c+1],[0.20,0,0,0])
   end
when 10000# Generic Trans.
m = "10000"
if self.energy > 10 && self.transformation[0] && !stop
self.energy -= 10
else
  self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end
end# Case end
effecting[c] -= 1
if (effecting[c] == 0 || stop)
  if show
n = effecting[c + 1].effect.index(m)
if n != nil
effecting[c + 1].effect.delete_at(n)
end
end
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)

len -= 4
else
  c += 4
end# If end
end# While
end



def skills(player, skill,logs)
move = self.skillhold[skill]

if skill <= -1
move = -1
elsif skill != 4
move = move.to_i
end

if skill == 4
case move
when true

when "10000" # Power-Up
c = check(1,10,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false && c[0] 
transformskill([0.25, 0.25, 0.25, 0.25], "10000", 1)
skill_turns(self, 99, 10000, "10000", 3, true) 
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
 
elsif self.transformation[0] == true && c[0] 
transformskill(0, 0, 3)
end #Add more transformations before this "end" if there are any others.
end

elsif 30 > move && move >= 0
generic(move, player, move, skill, logs)
elsif move >= 20
case move
when 67
c = check(1, 30, skill, 2, player, 4,logs,[false,false,false])
if c[0]
percent_up(c[1],[0.20,0,0.20,0])
skill_turns(c[1], 2, 67, "67", 3, true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end
when 68
c = check(1, 30, skill, 2, player, 4,logs,[false,false,false])
if c[0]
percent_up(c[1],[0,0.20,0,0.20])
skill_turns(c[1], 2, 68, "68", 3, true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end 


end
end


end
end
#------------------------------------------------------------------------------------------------------------------------




#------------------------------------------------------------------------------------------------------------------------
class Guldo < Character
  
def checkType(skill)
  

if self.skillhold == skill
self.attacked[3] = 4
elsif skill < 30
genericType(skill)
else
  
case skill

when 82
self.attacked[3] = 3
#1:Ki  2:Strength  3:Power-down 4:Friendly
when 83
self.attacked[3] = 2
when 84
self.attacked[3] = 1
end
end
end

def rush(name,logs)

# Types: full 0, Ki 1, Strength 2, Power-Down 3, Friendly 4
case name[1]

when 2 # Energy Deflect
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 2, "2", 3, true)
if self.block[1] < 2
self.block[1] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],0,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end

when 4 # Sonic Sway
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
#skill_turns(self, 2, 4, "4", 3, true)
if self.block[1] < 1
self.block[0] = 1;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],0,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end

when 7 # Strength Block
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 7, "7", 3, true)
if self.block[2] < 2
self.block[2] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],0,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end
end
end

def currentEffects
len = effecting.length

show = true
c = 0

while (c < len)
  a = self.effecting[c + 2]
  if self.effecting[c+1].health <= 0 || self.health < 0  
    stop = true
else
  stop = false
  end
  if effecting[c+1].effect.index(a.to_s) == nil
  stop = true
  show = false
  end
  
case a

when 1..30
genericTurn(a, c)
m = a.to_s

when 82
m = "82"

when 83 
m = "83"
when 84
m = "84"

when 10000# Generic Trans.
m = "10000"
if self.energy > 10 && self.transformation[0] && !stop
self.energy -= 10
else
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end
end# Case end
effecting[c] -= 1
if (effecting[c] == 0 || stop)
if show
n = effecting[c+1].effect.index(m)
if n != nil
effecting[c+1].effect.delete_at(n)
end
end
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)

len -= 4
else
  c += 4
end# If end
end# While
end



def skills(player, skill,logs)
move = self.skillhold[skill]

if skill <= -1
move = -1
elsif skill != 4
move = move.to_i
end

if skill == 4
case move
when true

when "10000" # Power-Up
c = check(1,10,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false && c[0]
transformskill([0.25, 0.25, 0.25, 0.25], "10000", 1)
skill_turns(self, 99, 10000, "10000", 3, true) 
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
elsif self.transformation[0] == true && c[0]
transformskill(0, 0, 3)

end #Add more transformations before this "end" if there are any others.
end

elsif 30 > move && move >= 0
generic(move, player, move, skill, logs)
elsif move >= 20
case move

when 82
c = check(1, 30, skill, 3, player, 3,logs,[false,false,false])
if c[0] 
l = c[1].length - 1
i = 0
for i in 0..l
effects = c[1][i].effect.index("84")
if effects == nil
c[1][i].energy -= 10
c[1][i].defense -= 3
skill_turns(c[1][i], 2, 82, "82", 3, true)
else
c[1][i].energy -= 20
c[1][i].defense -= 3
skill_turns(c[1][i], 2, 82, "82", 3, true)  
end
end
health = [player[0].health,player[1].health,player[2].health]
logs.push(4,move,health,[self.controlling_player.vs,self.info[1]],c[3],c[4])    
else
logs.push(4,move,0,[self.controlling_player.vs,self.info[1]],c[3],c[4]) 
end

when 83
c = check(3, 40, skill, 2, player, 2,logs,[false,false,false])
if c[0]
l = c[1].length - 1
i = 0
for i in 0..l
if c[1][i].effect.index("82") != nil
s_damage(c[1][i],20)
c[1][i].energy -= 20
elsif c[1][i].effect.index("84") != nil
s_damage(c[1][i],20)
c[1][i].stunned[0] = 2
skill_turns(c[1][i], 2, 83, "83", 3, true)
else
s_damage(c[1][i],20)
end
end
health = [player[0].health,player[1].health,player[2].health]
logs.push(4,move,health,[self.controlling_player.vs,self.info[1]],c[3],c[4])   
else
logs.push(4,move,0,[self.controlling_player.vs,self.info[1]],c[3],c[4]) 
end

when 84
health = [player[0].health,player[1].health,player[2].health]
c = check(2, 30, skill, 3, player, 1,logs,[false,false,false])
i = 0
if c[0]
l = c[1].length - 1
for i in 0..l
effects = c[1][i].effect.index("82")
if effects == nil
c[1][i].stunned[3] = 2
skill_turns(c[1][i], 2, 84, "84", 3, true)
else
c[1][i].stunned[3] = 2
c[1][i].stunned[1] = 2
skill_turns(c[1][i], 2, 84, "84", 3, true)  
end
end
health = [player[0].health,player[1].health,player[2].health]
logs.push(4,move,health,[self.controlling_player.vs,self.info[1]],c[3],c[4])   
else
logs.push(4,move,0,[self.controlling_player.vs,self.info[1]],c[3],c[4]) 
end
end
end

end
end
#------------------------------------------------------------------------------------------------------------------------




#------------------------------------------------------------------------------------------------------------------------
class Raditz < Character
  
def checkType(skill)
  

if self.skillhold == skill
self.attacked[3] = 4
elsif skill < 30
genericType(skill)
else
  
case skill

#1:Ki  2:Strength  3:Power-down 4:Friendly
when 49 # Tuesday Assault
self.attacked[3] = 2
when 50 # Double Sunday 
self.attacked[3] = 1
when 51 # Scouter Analysis
self.attacked[3] = 4
end
end
end

def rush(name,logs)

# Types: full 0, Ki 1, Strength 2, Power-Down 3, Friendly 4
case name[1]

when 2 # Energy Deflect
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 2, "2", 3, true)
if self.block[1] < 2
self.block[1] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],0,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end

when 4 # Sonic Sway
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
#skill_turns(self, 2, 4, "4", 3, true)
if self.block[1] < 1
self.block[0] = 1;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],0,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end

when 7 # Strength Block
c = check(1, 30, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 7, "7", 3, true)
if self.block[2] < 2
self.block[2] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],0,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end
end
end

def currentEffects
len = effecting.length

show = true
c = 0

while (c < len)
  a = self.effecting[c + 2]
  if self.effecting[c+1].health <= 0 || self.health < 0
  stop = true
  end
  if effecting[c+1].effect.index(a.to_s) == nil
  stop = true
  show = false
  end
  
case a

when 1..30
genericTurn(a, c)
m = a.to_s

when 49 # Tuesday Assault
m = "49"

when 50 # Double Sunday
m = "50"
ck = currentCheck(self.effecting[c+1],1,[false,false])
#0. Afflication 1.Ki 2.Strength 3.Power-Down 4.Friendly 
if !stop && ck
p_k_damage(self.effecting[c+1],10)
end

when 51
m = "51"

when 10000# Generic Trans.
m = "10000"
if self.energy > 10 && self.transformation[0] && !stop
self.energy -= 10
else
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end
end# Case end
effecting[c] -= 1
if (effecting[c] == 0 || stop)
if show
n = effecting[c + 1].effect.index(m)
if n != nil
effecting[c + 1].effect.delete_at(n)
end
end
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)

len -= 4
else
c += 4
end# If end
end# While
end

def skills(player, skill,logs)
move = self.skillhold[skill]

if skill <= -1
move = -1
elsif skill != 4
move = move.to_i
end

if skill == 4
case move
when true

when "10000" # Power-Up
c = check(1,10,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false && self.energy > 10 && c[0] 
transformskill([0.25, 0.25, 0.25, 0.25], "10000", 1)
skill_turns(self, 99, 10000, "10000", 3, true) 
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
elsif self.transformation[0] == true && c[0]
transformskill(0, 0, 3)
end 

end #end Transformation

elsif 30 > move && move >= 0
generic(move, player, move, skill, logs)
elsif move >= 20

case move #This unique skills 

when 49 # Tuesday Assault

ignore = false
if self.effect.index("51") != nil
ignore = true
end
c = check(1,35,skill,2,player,2,logs,[false,ignore,ignore])
if c[0]
find = c[1].effect.index("50")
if find == nil
s_damage(c[1],15)
c[1].ki -= 2
skill_turns(c[1],2,49,"49",2, true)
else
s_damage(c[1],25)
c[1].ki -= 4
skill_turns(c[1],2,49,"49",2, true)
end
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end

when 50 # Double Sunday
ignore = false
if self.effect.index("51") != nil
ignore = true
end
c = check(2,35,skill,3,player,1,logs,[false,ignore,ignore])
if c[0]
find = c[1].effect.index("49")
if find == nil
skill_turns(c[1],3,50,"50",3,true)
else
k_damage(player, 30)
skill_turns(c[1],4,50,"50",3,true)
end
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end

when 51 # Scouter Analysis
c = check(1,25,skill,3,player,4,logs,[false,true,true])
if c[0]
l = c[1].length - 1
i = 0
skill_turns(c[1],3,51,"51",2, true)
for i in 0..l
if c[1][i] != self
c[1][i].energy += 10
end
end
health = [player[0].health,player[1].health,player[2].health]
logs.push(4,move,health,[self.controlling_player.vs,self.info[1]],c[3],c[4])   
else
logs.push(4,move,0,[self.controlling_player.vs,self.info[1]],c[3],c[4]) 
end
end
end
end
end
#------------------------------------------------------------------------------------------------------------------------




#------------------------------------------------------------------------------------------------------------------------
class Saibamen < Character
  
def checkType(skill)
  
if self.skillhold == skill
self.attacked[3] = 4
elsif skill < 30
genericType(skill)
else
  
case skill

#1:Ki  2:Strength  3:Power-down 4:Friendly
when 55 # Saibamen Grab
self.attacked[3] = 2
when 56 # Acid
self.attacked[3] = 0
when 57 # Self Destruct
self.attacked[3] = 0
end
end
end

def rush(name,logs)

# Types: full 0, Ki 1, Strength 2, Power-Down 3, Friendly 4
case name[1]

when 2 # Energy Deflect
c = check(1, 20, name[2], 3, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 2, "2", 3, true)
if self.block[1] < 2
self.block[1] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],0,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end

when 4 # Sonic Sway
c = check(1, 20, name[2], 4, self, 4,logs,[false,false,false])
if c[0]
#skill_turns(self, 2, 4, "4", 3, true)
if self.block[1] < 1
self.block[0] = 1;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],0,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end

when 7 # Strength Block
c = check(1, 20, name[2], 3, self, 4,logs,[false,false,false])
if c[0]
skill_turns(self, 2, 7, "7", 3, true)
if self.block[2] < 2
self.block[2] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],0,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 

end
end
end

def currentEffects
len = effecting.length

show = true
c = 0

while (c < len)
  a = self.effecting[c + 2]
  if self.effecting[c+1].health <= 0 || self.health <= 0
  stop = true
else
  stop = false
  end
  if effecting[c+1].effect.index(a.to_s) == nil
  stop = true
  show = false
  end
  
case a

when 1..30
genericTurn(a, c)
m = a.to_s

when 55 #Saibaman Grab
m = "55"
t = self.effecting[c+1]
if self.effecting[c+1].attacked[2] != -1
t.cooldown[t.attacked[2]] += 2
end
if t.attacked[4] > self.health
damage = t.attacked[4] - self.health 
self.effecting[c+1].health -= damage
end


when 56 #Acid
m = "56"
self.effecting[c+1].health -= 3

when 57 #Self Destruct
m = "57"
if self.effecting[c] == 1
t = self.effecting[c+1]
if t.effect.index("55") != nil
t.health -= (t.health * 0.75).ceil
else
t.health -= (t.health * 0.50).ceil
end
end



when 10000# Generic Trans.
m = "10000"
if self.energy > 10 && self.transformation[0] && !stop
self.energy -= 10
else
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0,false]
stop = true
end

when 10009
m = "10009"
self.effecting[c+1].defense += 1
self.health += 5

end# Case end
effecting[c] -= 1
if (effecting[c] == 0 || stop)
if show
n = effecting[c + 1].effect.index(m)
if n != nil
effecting[c + 1].effect.delete_at(n)
end
end
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)
effecting.delete_at(c)

len -= 4
else
c += 4
end# If end
end# While
end

def skills(player, skill,logs)
move = self.skillhold[skill]

if skill <= -1
move = -1
elsif skill != 4
move = move.to_i
end

if skill == 4
case move
when true

when "10000" # Power-Up
c = check(1,10,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false  && c[0]
transformskill([0.25, 0.25, 0.25, 0.25], "10000", 1)
skill_turns(self, 99, 10000, "10000", 3, true) 
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 

elsif self.transformation[0] == true && c[0]
transformskill(0, 0, 3)
end #Add more transformations before this "end" if there are any others.

when "10009" # Plant Seed
c = check(2,40,4,3,self,4,logs,[false,false,false])
if c[0]
skill_turns(player, 99, 10009, "10009", 3, true)
transformation[6] = true
transformation[0] = true
transformation[1] = "10009"
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
end
end
elsif 30 > move && move >= 0
generic(move, player, move, skill, logs)
elsif move >= 20
case move

when 55 # Saibamen Grab
if self.transformation[1] == "10009"
c = check(1, 30, skill, 3, player, 2,logs,[false,false,false])
if c[0]
skill_turns(c[1], 3, 55, "55", 3, true)
self.transformation[9] = self.health
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],move,0,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end
else
c = check(1, 30, skill, 2, player, 2,logs,[false,false,false])
if c[0]
skill_turns(c[1], 2, 55, "55", 3, true)
self.transformation[9] = self.health
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],move,0,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end
end

when 56 # Acid
#Glitched
if self.transformation[1] == "10009"
c = check(1, 30, skill, 2, player, 3,logs,[false,false,false])
if c[0] 
l = c[1].length - 1
i = 0
for i in 0..l
c[1][i].defense -= 3
skill_turns(c[1][i],99,56,"56",3,true)
end
health = [player[0].health,player[1].health,player[2].health]
logs.push(4,move,health,[self.controlling_player.vs,self.info[1]],c[3],c[4])  
else
logs.push(4,move,0,[self.controlling_player.vs,self.info[1]],c[3],c[4])  
end
else
c = check(0, 30, skill, 2, player, 3,logs,[false,false,false])

if c[0]
c[1].defense -= 2
skill_turns(player,99,56,"56",3,true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],move,0,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
end
end

when 57 #Self Destruct
if self.transformation[1] == "10009"
c = check(4, 40, skill, 99, player, 2,logs,[false,false,false])
if c[0] 
skill_turns(player,2,57,"57",3,false)
end 
else
c = check(4, 40, skill, 99, player, 2,logs,[false,false,false])
if c[0]
skill_turns(player,3,57,"57",3,false)
end 
end
end
end

end
end