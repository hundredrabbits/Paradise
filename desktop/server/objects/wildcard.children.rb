#!/bin/env ruby
# encoding: utf-8

require_relative "wildcard.rb"

class WildcardChildren

  include Wildcard

  def initialize host = nil, value = nil

    super

    @docs = "Display children vessels. Its purpose is to access the current vessel's inventory."
    @options = ["count","random"]

  end

  def to_s

    if @value.like("count") then return @host.children.length.to_s end
      
    if @host.children.length < 1 then return "" end

    if @value.like("random") then return @host.children.sample.name end
    if @value.like("list") then return list end

    return ""

  end

  def list

    html = ""

    @host.children.each do |vessel|
      owner = vessel.owner != 0 ? ", by the #{vessel.creator}" : ""
      html += "<li><action data-action='cast the #{vessel.attr} #{vessel.name}'>#{vessel.attr.capitalize} #{vessel.name.capitalize}</action>#{owner}</li>"
    end

    return "<ul class='basic'>#{html}</ul>"

  end

end
