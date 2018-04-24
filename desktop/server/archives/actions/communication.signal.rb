#!/bin/env ruby
# encoding: utf-8

require_relative "_toolkit.rb"

class ActionSignal

  include Action
  
  def initialize q = nil

    super

    @name = "Signal"
    @verb = "Signaling"
    @docs = "Broadcast your current visible parent vessel."
    @examples = ["<b>signal</b> <comment>The black cat signals the yard.</comment>"]

  end

  def act params = ""

    if @host.parent.is_hidden then return @host.answer(self,:error,"The #{@host.parent} is hidden.") end

    return @host.act("say","#{@host.parent.id}")
    
  end

end