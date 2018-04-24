#!/bin/env ruby
# encoding: utf-8

class Program

  attr_accessor :host
  attr_accessor :raw
  attr_accessor :action
  attr_accessor :params

  def initialize host, raw = nil

    @host = host
    @raw = raw.to_s
    @action = @raw.split(" ").first.to_s.strip
    @params = @raw.gsub(@action,"").strip

  end

  def to_s

    return @raw

  end

  def type

    if action.like("warp") then return "warp " end
    if action.like("create") then return "machine " end
    if action.like("say") then return "speaker " end
    return "generic"

  end

  def render

    return @raw.wildcards(@host)

  end

  def is_valid

    if @raw.length > 60 then return false end
    return @host.can(@action)

  end

end
