require 'data_mapper'
require 'bcrypt'

  class User
    include DataMapper::Resource
    include BCrypt
    
    property :id, Serial
    property :email, String, :unique => true, :format => :email_address, :required => true
    property :username, String, :unique => true, :length => 2..16, :format => /^[0-9a-zA-Z]*$/, :required => true
    property :password, BCryptHash, :length => 6..256, :required => true 
    property :created_at, DateTime
    property :updated_at, DateTime
    property :confirmed_email, Boolean, :default => false
    property :confirmed_email_sent_time, DateTime, :default => DateTime.now
    property :confirmation_code, String
    property :last_page_name, String, :default => "Home"
    property :last_page_link, String, :default => "/"
    property :banned, Boolean, :default => false
    property :avater, String, :default => "/ava/ava1.png"
    property :country, String, :default => "United States"
    property :gender, String, :default => "N/A"
    property :birthday, String, :default => "N/A"
    property :ip_address, String, :default => ""
    property :position, String, :default => "none" 
    
    #Forum
    property :signature, String, :default => "", :length => 0..250
    property :group, String, :default => "Member"
    property :staff, Boolean, :default => false
    property :post_count, Integer, :default => 0
    property :forum_rank, String, :default => "", :length => 0..50
    property :last_visit, DateTime
    property :game_visit, DateTime
    
    #Game Information
    property :power_level, Integer, :default => 0
    property :rank, String, :default => "D"
    property :promotion, String, :default => "[0,0,0,0]"
    property :wins, Integer, :default => 0
    property :losses, Integer, :default => 0
    property :streak, Integer, :default => 0
    property :clan, String, :default => "none"
    property :average, Integer, :default => 0
    property :nextLevel, Integer, :default => 0
    property :last_game, Integer, :default => 0
    property :high_streak, Integer, :default => 0
    property :quest, Text, :default => '{"current":[false,false,false],"complete":[false,false,false],"conditions":[],"date":"2016-01-14 00:13:30 +0000"}'
    property :money, Integer, :default => 50000
    property :percent, Integer, :default => 0
    
    #In-Game
    property :team, String, :default => '["zGu","zKn","zYa"]'
    property :skill, Text, :default => '{"s1":["31","32","34","4","10001"],"s2":["42","43","45","4","10005"],"s3":["52","53","54","4","10000"]}'
    property :items, Text, :lazy => false, :default => '{"c1": 3,"item":"c1"}'
    property :unlockskills , Text, :lazy => false, :default => '{"1":0,"1":0,"4":0,"6":0,"7":0,"8":0,"31":0,"32":0,"34":0,"36":0,"37":0,"38":0,"42":0,"43":0,"45":0,"46":0,"47":0,"48":0,"52":0,"53":0,"54":0,"58":0,"59":0,"60":0,"61":0,"62":0,"63":0,"64":0,"65":0,"66":0,"67":0,"68":0,"69":0,"10000":0,"10005":0,"10001":0,"10003":0}'
    property :stats, Text, :lazy => false, :default => '{"zGu": [1,0,0],"zKG": [1,0,0],"zKn": [1,0,0],"zPo": [1,0,0], "zYa": [1,0,0],"zTn": [1,0,0],"zYe": [1,0,0], "zCu": [1,0,0], "zKk": [1,0,0]}'
    property :unlockcharacters, Text, :lazy => false,  :default => '{"zGu": 1,"zYa": 1,"zKn":1,"zPo":1,"zKG":1,"zTn":1,"zYe":1,"zCu":1,"zKk":1}'
    property :extras, Text, :default => '{}'
    property :kili, Integer, :default => 0
    #stats [mn_hp 0,mn_ep 1,mn_s 2,mn_k 3,mn_d 4,extra_s 5,extra_k 6,extra_d 7,Level 8,Experience 9 ,points 10,points total 11]
    
    has n, :posts, :constraint => :destroy
    has n, :friendships, :child_key => [ :source_id ] , :constraint => :destroy
    has n, :friends, self, :through => :friendships, :via => :target , :constraint => :destroy

    has n, :messages, :constraint => :destroy
    has n, :forumposts, :constraint => :destroy
    has n, :forumcomments, :constraint => :destroy
    has n, :members, :constraint => :destroy
    has n, :battlelogs, :constraint => :destroy
    
    
   
    def authenticate(attempted_password)
      if self.password == attempted_password
        true
      else
        false
      end
    end
    
    def username= new_username
    super new_username.downcase.delete(" ")
    end
    
  end

class Post
  include DataMapper::Resource
  
  property :id, Serial
  property :title, String, :required => true
  property :body, Text, :required => true
  property :image, String, :required => true , :default => "/images/post1.png"
  property :created_at, DateTime
  property :updated_time, DateTime

  belongs_to :user
end


class Friendship
  include DataMapper::Resource
  
  property :status, String, :default => ""
  
  belongs_to :source, 'User', :key => true
  belongs_to :target, 'User', :key => true
end

class Message
  include DataMapper::Resource
  
  property :id, Serial
  property :read, Boolean, :default => false
  property :title, String, :required => true, :length => 1..50
  property :created_at, DateTime
  property :otherbody, Text, :default => ""
  property :body, Text, :required => true, :length => 1..3000
  
  belongs_to :from_user, 'User'
  belongs_to :to_user, 'User'
end

class Category
  include DataMapper::Resource

  has n, :forums, :constraint => :destroy 
  
  property :id,  Serial
  property :name, String, :required => true
  property :staff, Boolean, :default => false
  property :rank, Integer, :default => 0
  
end

class Forum
  include DataMapper::Resource

  property :id, Serial
  property :incategory, String, :default => ""
  property :title, String, :required => true
  property :url, String, :default => "", :unique => true
  property :author, String, :required => true
  property :body, Text, :required => true
  property :created_at, DateTime
  property :updated_at, DateTime
  property :updated_by, String, :default => "No One"
  property :avater, String, :default => "/ava/ava1.jpg"
  property :post_count, Integer, :default => 0
  property :topics, Integer, :default => 0
  property :staff, Boolean, :default => false
  property :rank, Integer, :default => 0
  
  belongs_to :category
  has n,:forumposts, :order => :updated_at.desc , :constraint => :destroy 
  
end

class Forumpost
  include DataMapper::Resource

  property :id, Serial
  property :incategory, String, :default => ""
  property :inforum, String, :default => ""
  property :url, String, :default => ""
  property :author, String, :required => true
  property :body, Text, :required => true, :lazy => false, :length => 100..5000
  property :title, String, :required => true, :lazy => false, :length => 1..75
  property :created_at, DateTime
  property :updated_at, DateTime
  property :updated_by, String, :default => ""
  property :views, Integer, :default => 0
  property :comments, Integer, :default => 0
  property :announcements, Boolean, :default => false
  property :sticky, Boolean, :default => false
  property :locked, Boolean, :default => false
  property :staff, Boolean, :default => false
  

  has n, :forumcomments, :constraint => :destroy 
   belongs_to :forum
   belongs_to :user

end

class Forumcomment
  include DataMapper::Resource
  
  property :id, Serial
  property :author, String, :required => true
  property :body, Text, :required => true, :length => 0..5000
  property :url, String, :default => ""
  property :current, Integer, :default => 0
  property :staff, Boolean, :default => false
  property :created_at, DateTime
  property :updated_at, DateTime
  
  belongs_to :user
  belongs_to :forumpost
end

class GameModel 
  include DataMapper::Resource
  property :id, Serial
  property :ended, Boolean

end

class Battlelog
include DataMapper::Resource
  property :id, Serial
  property :vs, String, :default => ""
  property :winner, String
  property :created_at, DateTime
  property :gameInfo, Text,:default => ""

  belongs_to :user
end

class Statics
 include DataMapper::Resource
  property :id, Serial
  property :info, Text, :default => '{}'
  #{"zGu"=> [Win,Losses,Average,Used]}
  #{"zGu,zPo,No"} => [Win,Losses,Average,Used]}
end

class Planet
  
 include DataMapper::Resource
   property :id, Serial
   property :created_at, DateTime
   property :updated_at, DateTime
   property :avater, Text, :default => '/ava/box.png'
   property :description, Text, :default => ""
   property :name, String , :length => 2..18, :format => /^[0-9a-zA-Z]*$/, :required => true,:unique => true
   property :power_level, Integer, :default => 0
   property :money, Integer, :default => 0
   property :rank, Integer, :default => 1
   property :wins, Integer, :default => 0
   property :losses, Integer, :default => 0
   property :average, Integer, :default => 0
   property :extras, Text, :default => '{"extra":[],"defense":[]}'
   property :owner, String, :default => "" , :required => true
   property :invite, String, :default => "Invite-Only"
   property :members_limit, Integer, :default => 20
   property :health,Integer, :default => 100
   property :max_health,Integer, :default => 100
   property :main_planet, String, :default => ""
   property :reputation, Integer, :default => 0
   property :members_count, Integer, :default => 0
   property :lowest_rank, Integer,:default => 0
   property :lowest_streak, Integer,:default => 0
   property :lowest_average, Integer,:default => 0
   property :defense, DateTime
   property :alliances_count, Integer, :default => 0
   property :langauge, String, :default => "English"
   
 
   has n, :alliances, :child_key => [ :source_id ] , :constraint => :destroy
   has n, :members, :child_key => [ :source_id ], :constraint => :destroy
   has n, :sides, self, :through => :alliances, :via => :target  , :constraint => :destroy
   has n, :users, self, :through => :members, :via => :target, :constraint => :destroy
end

class Alliance
  include DataMapper::Resource
  
  property :status, String, :default => ""
  
  belongs_to :source, 'Planet', :key => true
  belongs_to :target, 'Planet', :key => true
  
end

class Member
  include DataMapper::Resource
  
  property :status, String, :default => ""
  property :planet_id, Integer, :default => 0
  property :created_at, DateTime
  
  belongs_to :source, 'Planet', :key => true
  belongs_to :target, 'User', :key => true

end

class Leaderboards
  include DataMapper::Resource
  property :id, Serial
  property :users, Text, :default => ""
  property :dragonverse, Text, :default => ""
  
end











