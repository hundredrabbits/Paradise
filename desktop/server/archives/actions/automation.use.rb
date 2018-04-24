#!/bin/env ruby
# encoding: utf-8

require_relative "_toolkit.rb"

class ActionUse

  include Action
  
  def initialize q = nil

    super

    @name = "Use"
    @verb = "Using"
    @docs = "Add an automation program to a vessel, making it available to the use command."
    @examples = ["<b>use</b> the coffee machine <comment>You created a coffee.</comment>"]

  end

  def act params = ""

    target = @host.find_visible(params)
    
    if !target                      then return @host.answer(self,:error,"#{topic} do not see the #{params}.") end
    if !target.has_program          then return @host.answer(self,:error,"The #{target} does not have a program.") end
    if !target.program.is_valid     then return @host.answer(self,:error,"The #{target}'s program is invalid.") end

    answer = @host.act(target.program.action,target.program.params.wildcards(@host))
    
    return answer
    
  end

end