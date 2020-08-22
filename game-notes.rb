Immunities # Type 1 is Ki, Type 2 is Strength, Type 3 is Power Down, Type 4 is Friendly
Stuns # Type 1 is Full, Type 2 is Ki, Type 3 is Strength, Type 4 is Power Down, Type 5 is Friendly.
Character: # [c+1]. 
SkillID: # [c+2].
Skill_Turns: # (how many turns, skillID, JS SkillID, type, true means show, false means invisible)
Functioning Properly: # c = check().
Skills That Ignore Speed: # Put them below this function: def rush(name,logs)
Skills Animations That Are AOE:
logs.push(4,move,health,[self.controlling_player.vs,self.info[1]],c[3],c[4])
else
logs.push(4,move,0,[self.controlling_player.vs,self.info[1]],c[3],c[4])
Skills Animations That Are Normal:
logs.push(4,move,health,[self.controlling_player.vs,self.info[1]],c[3],c[4])
else
logs.push(4,move,0,[self.controlling_player.vs,self.info[1]],c[3],c[4])
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
logs.push(c[3],move,self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
end

TO CHECK SKILLS FOR BLOCKS: if stop && self.stunned[0] == 0 && self.stunned[1] == 0 && self.effecting[c+1].block[0] == 0 && self.effecting[c+1].block[1] == 0
if stop && self.stunned[0] == 0 # Not being stunned or isn't dead.
&& self.stunned[0] == 0 # Full stunned
&& self.stunned[1] == 0 # Ki stunned
&& self.stunned[2] == 0 # Strength stunned
&& self.stunned[3] == 0 # Power-Down stunned
&& self.stunned[4] == 0 # Friendly stunned
&& self.effecting[c+1].block[0] == 0 # Full block
&& self.effecting[c+1].block[1] == 0 # Ki block
&& self.effecting[c+1].block[2] == 0 # Strength block
&& self.effecting[c+1].block[3] == 0 # Powerdown block
&& self.effecting[c+1].block[4] == 0 # Friendly, Powerup, Transformation block.


# c[1] = player
# true = invisible
# false = not invisible


- Character Test {
class Generic < Character

# Animation effects for skills and characters. Skills come first.
def rush(name,logs)

# Skills being used.
case name[1]

# Checks if the skill is functioning properly. After Check (BP, Energy, Skill, Cooldown, Target, Type, Animations.)
# Type 1 is Full, Type 2 is Ki, Type 3 is Strength, Type 4 is Power Down, Type 5 is Friendly.
when 128
c = check(1, 20, name[2], 4, self, 4,logs,[false,false,false])

# True/False for if this skills effect has occured.
if c[0]

# This area is for effects that lasts for multiple turns.
skill_turns(self, 2, 2, "2", 3, true)

# This area is for the characters invulnerability.
if self.block[1] < 2
self.block[1] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

# Generic skill effects.
when 2
c = check(1, 20, name[2], 4, self, 4,logs,[false,false,false])

# True/False for if this skills effect has occured.
if c[0]
skill_turns(self, 2, 2, "2", 3, true)
if self.block[1] < 2
self.block[1] = 2;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

# Generic skill effects.
when 4
c = check(1, 20, name[2], 4, self, 4,logs,[false,false,false])

# True/False for if this skills effect has occured.
if c[0]
#skill_turns(self, 2, 4, "4", 3, true)
if self.block[1] < 1
self.block[0] = 1;
end
logs.push(0,name[1],c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])
else
logs.push(c[3],name[1],self.health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1])    
end

# Generic skill effects.
when 7
c = check(1, 20, name[2], 4, self, 4,logs,[false,false,false])

# True/False for if this skills effect has occured.
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


# Skills Effecting players over time
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

when 60
m = "60"

when 100
m = "bge-t"
if self.energy > 10 && self.transformation[0] && !stop
self.energy -= 10
else
self.strength -= self.transformation[2]
self.ki -= self.transformation[3]
self.defense -= self.transformation[4]
self.speed -= self.transformation[5]
self.transformation = [false, "none", 0, 0, 0, 0]
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
when "bge-t" #Power-Up
c = check(1,10,skill,0,player,4,logs,[false,false,false])
if self.transformation[0] == false && c[0]
transformskill([0.25, 0.25, 0.25, 0.25], "bge-t", 1)
skill_turns(self, 99, 100, "bge-t", 3, true)
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
c = check(3, 50, skill, 3, player, 1,logs,[false,false,false])
if c[0]
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else


end
when 59
c = check(2, 30, skill, 2, player, 1,logs,[false,false,false])
if c[0]
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else

end
when 60
c = check(1, 20, skill, 0, player, 1,logs,[false,false,false])
if c[0]
skill_turns(c[1], 99, 60, "60", 1, true)
logs.push(0,move,c[1].health,[self.controlling_player.vs,self.info[1]],c[2],c[1].info[1]) 
else
end
end
end
end
end 
    
}