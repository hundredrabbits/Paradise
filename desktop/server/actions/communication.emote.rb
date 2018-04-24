#!/bin/env ruby
# encoding: utf-8

require_relative "_toolkit.rb"

class ActionEmote

  include Action
  
  def initialize q = nil

    super

    @name = "Emote"
    @verb = "Emoting"
    @docs = "Add an emote message into the global dialog."
    @examples = ["<b>emote</b> waves <comment>A black cat waves.</comment>"]

  end

  def act params = ""

    return @host.act("say","me #{params}")

  end

end