#!/bin/env ruby
# encoding: utf-8

require_relative "_toolkit.rb"

class ActionProgram

  include Action
  
  def initialize q = nil

    super

    @name = "Program"
    @verb = "Programming"
    @docs = "Add an automation program to a vessel, making it available to the use command. A program cannot exceed 60 characters in length."
    @examples = ["<b>program</b> create a coffee"]

  end

  def act params = ""

    target = @host.parent
    program = Program.new(@host,params)
    
    if target.is_locked == true     then return @host.answer(self,:error,"The #{target} is locked.") end
    if !program.is_valid            then return @host.answer(self,:error,"The program is not valid.","You can learn about valid programs in the <action data-action='help'>programming guide</action>.") end

    target.set_program(params)

    return @host.answer(self,:modal,"#{topic} updated the #{target}'s program.")

  end

end