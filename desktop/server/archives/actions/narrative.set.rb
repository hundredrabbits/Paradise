#!/bin/env ruby
# encoding: utf-8

require_relative "_toolkit.rb"

class ActionSet

  include Action
  
  def initialize q = nil

    super

    @name = "Set"
    @verb = "Setting"
    @docs = "Directly write attributes for a owned vessel, the set command is meant to be used with programs and casted as spells."
    @examples = ["<b>set</b> is_locked true <comment>You have locked the yard.</comment>"]

  end

  def act params = ""

    parts = params.split(" ")
    flags = ["is_locked","is_hidden","is_silent","is_tunnel"]

    flag  = parts.first
    value = parts.last.to_sym

    if parts.length != 2            then return @host.answer(self,:error,"#{params} is not a valid setting","You can learn about the setting command by typing <action data-action='help with narrative'>help with narrative</action>.") end
    if !flags.include?(flag)        then return @host.answer(self,:error,"#{flag} is not a valid flag. ","You can learn about the setting command by typing <action data-action='help with narrative'>help with narrative</action>.") end
    if @host.owner != $player_id    then return @host.answer(self,:error,"#{topic} do not own #{@host}.") end

    if flag.like("is_locked") then return set_locked(value) end
    if flag.like("is_hidden") then return set_hidden(value) end
    if flag.like("is_silent") then return set_silent(value) end
    if flag.like("is_tunnel") then return set_tunnel(value) end

    return @host.answer(self,:error,"Unknown attribute #{flag}.")
    
  end

  def set_locked val

    if @host.owner != $player_id then return @host.answer(self,:error,"The #{@host.name} is not owned by #{topic.downcase}.") end

    @host.set_silent(val == :true ? true : false)

    return @host.answer(self,:modal,val == :true ? "#{topic} locked #{@host}." : "#{topic} unlocked #{@host}.")
    
  end

  def set_hidden val

    if @host.is_locked then return @host.answer(self,:error,"The #{@host.name} is locked.") end

    @host.set_silent(val == :true ? true : false)

    return @host.answer(self,:modal,val == :true ? "#{topic} concealed #{@host}." : "#{topic} revealed #{@host}.")
    
  end

  def set_silent val

    if @host.is_locked then return @host.answer(self,:error,"The #{@host.name} is locked.") end

    @host.set_silent(val == :true ? true : false)

    return @host.answer(self,:modal,val == :true ? "#{topic} silenced #{@host}." : "#{topic} unsilenced #{@host}.")
    
  end

  def set_tunnel val

    if @host.is_locked then return @host.answer(self,:error,"The #{@host.name} is locked.") end

    @host.set_silent(val == :true ? true : false)

    return @host.answer(self,:modal,val == :true ? "#{topic} tunneled #{@host}." : "#{topic} untunneled #{@host}.")
    
  end

end