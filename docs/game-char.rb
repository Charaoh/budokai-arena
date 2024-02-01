when 89
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




when 89

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