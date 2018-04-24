#!/bin/env ruby
# encoding: utf-8

require_relative "_toolkit.rb"

class ActionDrop

  include Action
  
  def initialize q = nil

    super

    @name = "Drop"
    @verb = "Droping"
    @docs = "Move a child vessel into the parent vessel."
    @examples = ["<b>drop</b> the scissor <comment>You see the scissor.</comment>"]

  end

  def act params = ""

    target = @host.find_child(params)

    if !target                      then return @host.answer(self,:error,"Cannot find the target vessel.") end
    if target.is_locked             then return @host.answer(self,:error,"#{target} is locked.") end

    target.set_unde(@host.unde)

    return @host.answer(self,:modal,"#{topic} dropped the #{target}.")
    
  end

end