#!/bin/env ruby
# encoding: utf-8

require_relative "_toolkit.rb"

class ActionTake

  include Action
  
  def initialize q = nil

    super

    @name = "Take"
    @verb = "Taking"
    @docs = "Move a visible vessel into a child vessel."
    @examples = ["<b>take</b> the scissor <comment>You carry the scissor.</comment>"]

  end

  def act params = ""

    target = @host.find_visible(params)

    if !target                      then return @host.answer(self,:error,"Cannot find the target vessel.") end
    if target.is_locked             then return @host.answer(self,:error,"#{target} is locked.") end

    target.set_unde(@host.id)

    return @host.answer(self,:modal,"#{topic} took the #{target}.")
    
  end

end