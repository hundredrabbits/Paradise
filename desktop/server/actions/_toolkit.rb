#!/bin/env ruby
# encoding: utf-8

module Action

  attr_accessor :verb

  attr_accessor :params
  attr_accessor :target
  attr_accessor :examples
  
  def topic

    return $player_id == @host.id ? "You" : "The #{@host.name}"

  end

end