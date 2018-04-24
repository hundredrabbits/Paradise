#!/bin/env ruby
# encoding: utf-8

require_relative "_toolkit.rb"

class ActionSay

  include Action
  
  def initialize q = nil

    super

    @name = "Say"
    @verb = "Saying"
    @docs = "Add a message into the global dialog."
    @examples = ["<b>say</b> hello <comment>A black cat said hello.</comment>"]

  end

  def act params = ""

    new_comment = Comment.new
    new_comment.inject(@host,params)

    is_valid, error = new_comment.is_valid

    if !is_valid                    then return @host.answer(self,:error,error) end
    if @host.parent.is_silent       then return @host.answer(self,:error,"The #{@host.parent} is a silent vessel, #{topic.downcase} may not talk in here.") end
    if new_comment.is_repeated      then return @host.answer(self,:error,"#{topic} just said that.") end

    $nataniev.vessels[:paradise].corpse.forum.append(new_comment.to_code)

    return @host.answer(self,:modal,new_comment.feedback)
    
  end

end