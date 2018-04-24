#!/bin/env ruby
# encoding: utf-8

require_relative "wildcard.rb"

class WildcardParadise

  include Wildcard

  def initialize host = nil, value = nil

    super

    @docs = "Displays paradise core layouts."
    @options = ["paradoxes"]

  end

  def to_s

    if @value.like("paradoxes") then return paradoxes end
    if @value.like("spells") then return spells end
    if @value.like("glossary") then return glossary end
    if @value.like("tunnels") then return tunnels end

    return "?"

  end

  def paradoxes

    html = ""

    $nataniev.vessels[:paradise].corpse.parade.each do |vessel|
      if !vessel.is_paradox then next end
      if !vessel.is_locked then next end
      if vessel.is_hidden then next end
      if vessel.id < 1 then next end
      if vessel.rating < 50 then next end

      owner = vessel.owner != 0 ? ", by the #{vessel.creator}" : ""
      html += "<li><action data-action='warp to #{vessel.id}'>#{vessel.attr.capitalize} #{vessel.name.capitalize}</action>#{owner}</li>"
    end

    return "<ul class='basic'>#{html}</ul>"

  end

  def spells

    html = ""

    $nataniev.vessels[:paradise].corpse.parade.each do |vessel|
      if !vessel.has_program then next end
      if !vessel.is_locked then next end
      if !vessel.has_attr then next end
      if !vessel.name.like("spell") then next end

      owner = vessel.owner != 0 ? ", by the #{vessel.creator}" : ""
      html += "<li><action data-action='cast the #{vessel.attr} #{vessel.name}'>#{vessel.attr.capitalize} #{vessel.name.capitalize}</action>#{owner}</li>"
    end

    return "<ul class='basic'>#{html}</ul>"

  end

  def tunnels

    html = ""

    $nataniev.vessels[:paradise].corpse.parade.each do |vessel|
      if vessel.is_hidden then next end
      if !vessel.has_note then next end
      if !vessel.is_locked then next end
      if !vessel.note.include?("train station") then next end
      if vessel.id == @host.parent.id then next end

      owner = vessel.owner != 0 ? ", by the #{vessel.creator}" : ""
      html += "<li><action data-action='warp to the #{vessel.attr} #{vessel.name}'>#{vessel.attr.capitalize} #{vessel.name.capitalize}</action>#{owner}</li>"
    end

    return "<ul class='basic'>#{html}</ul>"

  end

  def glossary

    g = {}

    g[:general] = {}
    g[:general]["a vessel"] = "is a pocket of conceptspace with an attribute and a name, able to traverse Paradise."
    g[:general]["a paradox"] = "is impossible space folded onto itself, and stems to universes. "
    g[:general]["a tunnel"] = "is a vessel or action type accessible across all space. Cast and Warp are tuneling actions, allowing ghosts to traverse vast distances instantly. A tuneling vessel will be accessible through notes across distances."
    g[:general]["a signal"] = "is the broadcasting of a warp id."

    # g["the parade"] = "is another name for all of Paradise's activity."
    # g["the haven"] = "is a tutorial region with various documentation vessels."
    
    g[:void] = {}
    g[:void]["the void"] = "is generic unbuilt vessel space, any warp id that is yet unused."
    g[:void]["the ultravoid"] = "is the hyptothesized vessel space of negative warp id."

    # g["cyan mass"] = "is the sum of the cyan faction vessels."
    # g["red spawn"] = "is the sum of the red faction vessels."


    g[:fashion] = {}
    g[:fashion]["thingspace"] = "is a type of vessels with eucledian and real-world attributes. Often the default simplistic mindset of new players."
    g[:fashion]["conceptspace"] = "is a type of vessels with non-spacial attributes, or hard to visualize attributes. It has been suggested that the Parade is a research project exploring the limits of conceptspace."
    g[:fashion]["illegalspace"] = "is a type of vessels with non-paradise attributes, often the result of exploits. A vessel with a number for a name, for instance."
    
  
    html = ""    
    g.each do |cat,terms|
      html += "<h4>#{cat}</h4>"
      html += "<ul class='basic' style='margin-bottom:30px'>"
      terms.each do |term,definition|
        html += "<li><b>#{term.capitalize}</b>, #{definition}</li>"
      end
      html += "</ul>"
      
    end
    return html

  end

end
