#!/bin/env ruby
# encoding: utf-8

require_relative "_toolkit.rb"

class ActionCast

  include Action
  
  def initialize q = nil

    super

    @name = "Cast"
    @docs = "Use a vessel program's from anywhere. By default, the spell will be cast onto the current active vessel, casting can also target a visible vessel."
    @verb = "Casting"
    @examples = ["<b>cast</b> the vanish spell <comment>You are invisible.</comment>","<b>cast</b> the vanish spell <b>on</b> the purple bat"]

  end

  def act params = ""

    return params.include?(" on ") ? cast_proxy(params.split(" on ").first,params.split(" on ").last) : cast_default(params)

  end

  def cast_default spell_name

    spell = @host.find_distant(spell_name)

    if !spell                             then return @host.answer(self,:error,"This spell is unknown.") end
    if !spell.program.is_valid            then return @host.answer(self,:error,"#{spell} is not a valid spell.") end
    if spell.program.action.like("cast")  then return @host.answer(self,:error,"Cannot cast a casting program.") end
     
    return @host.act(spell.program.action,spell.program.params.wildcards(@host))

  end

  def cast_proxy spell_name, target_name

    spell = @host.find_distant(spell_name)
    target = @host.find_visible(target_name)

    if !spell                             then return @host.answer(self,:error,"This spell is unknown.") end
    if !spell.program.is_valid            then return @host.answer(self,:error,"#{spell} is not a valid spell.") end
    if !target                            then return @host.answer(self,:error,"The target vessel is not valid.") end
    if  spell.program.action.like("cast") then return @host.answer(self,:error,"Cannot cast a casting program.") end

    return target.act(spell.program.action,spell.program.params.wildcards(target))

  end

end