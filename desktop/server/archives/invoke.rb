#!/bin/env ruby
# encoding: utf-8

$nataniev.require("corpse","http")

$nataniev.vessels[:paradise].path = File.expand_path(File.join(File.dirname(__FILE__), "/"))
$nataniev.vessels[:paradise].install(:custom,:serve,CorpseHttp.new)

corpse = $nataniev.vessels[:paradise].corpse

def corpse.build

  @host = $nataniev.vessels[:paradise]

  add_meta("description","Multiplayer Interactive Fiction Multiverse")
  add_meta("keywords","paradise maeve")
  add_meta("viewport","width=device-width, initial-scale=1, maximum-scale=1")
  add_meta("apple-mobile-web-app-capable","yes")
  add_meta("apple-touch-fullscreen","yes")
  add_meta("apple-mobile-web-app-status-bar-style","black-translucent")

  add_link("reset.css",:lobby)
  add_link("font.input_mono.css",:lobby)
  add_link("font.lora.css",:lobby)
  add_link("style.fonts.css")
  add_link("style.main.css")

  add_script("core/jquery.js",:lobby)
  add_script("jquery.main.js")

end

def corpse.query q = nil

  load_folder("#{@host.path}/objects/*")
  load_folder("#{@host.path}/vessels/*")
  load_folder("#{@host.path}/actions/*")

  @forum           = Memory_Array.new("forum",@host.path)
  @paradise        = Memory_Array.new("paradise",@host.path)
  @parade          = @paradise.to_a("teapot")

  id = 0
  @parade.each do |vessel|
    vessel.id = id
    id += 1
  end

  parts = q.gsub("+"," ").strip.split(" ")
  player_id = parts.first.to_i

  @action = parts[1] ? parts[1] : "look"
  @params = parts.join(" ").sub(player_id.to_s,"").sub(@action,"").strip

  if player_id < 1 then return @body = select_random_vessel end

  @player = @parade[player_id]
  @title   = "Paradise ∴ #{@player}"

  @body = "<bg></bg><view>#{@player.act(@action,@params)}</view><div class='terminal'><input placeholder='What would you like to do?'/></div>"
  
end

def corpse.select_random_vessel

  candidates = []
  @parade.each do |vessel|
    if vessel.rating > 0 then next end
    candidates.push(vessel)
  end
  return "<meta http-equiv='refresh' content='0; url=/#{candidates.length > 0 ? candidates[rand(candidates.length)].id : rand($parade.length)}'/>"

end

def corpse.paradise ; return @paradise; end
def corpse.parade; return @parade; end
def corpse.player; return @player; end
def corpse.forum ; return @forum; end
