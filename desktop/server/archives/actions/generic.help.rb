#!/bin/env ruby
# encoding: utf-8

require_relative "_toolkit.rb"

class ActionHelp

  include Action
  
  def initialize q = nil

    super

    @name = "Help"
    @docs = "List commands."

  end

  def act params = ""

    target = params.split(" ").last.to_s

    if target.like("spells")        then return help_spells end

    return help_default

  end

  def help_default

    html = "<h4>You are calling the vessel help line.</h4><p>Hello #{@host}, thank you for contacting the <vessel data-action='warp to 1'>Vessel Help Line</vessel>.</p> <p>Paradise is a multiplayer playground exploring the limits of thingspace and conceptspace. You can learn more about the project on the <a href='http://wiki.xxiivv.com/Paradise' target='_blank'>wiki</a>. </p><p>The size of Paradise is currently of #{$nataniev.vessels[:paradise].corpse.parade.length} vessels.</p>"

    html += topics

    return html

  end

  def topics

    html = ""

    # Actions
    html += "<code>"
    @host.actions.each do |cat,actions|
      if cat == :generic then next end      
      actions.each do |action|
        action = action.new
        action.examples.each do |example|
          html += "#{example}\n"
        end
      end
      html += "\n"
    end
    html += "</code>"

    # Widlcards
    html += "<p>Wildcards are dynamic text to be used in notes and programs to create responsive narratives.</p>"
    html += "<code>"
    [WildcardTime,WildcardRandom,WildcardVessel,WildcardChildren,WildcardSiblings].each do |wildcard|
      name = wildcard.name.sub('Wildcard','')
      wildcard.new.options.each do |option|
        html += "((<b>#{name.downcase}</b> #{option})) <comment>#{wildcard.new(@host,option)}</comment>\n"
      end
    end
    html += "</code>"

    # Spells

    html += "<p>The spellbook lists all known spells across paradise, to be used with the cast command.</p>"
    html += "<code>"
    $nataniev.vessels[:paradise].corpse.parade.each do |vessel|
      if !vessel.has_program then next end
      if !vessel.is_locked then next end
      if !vessel.has_attr then next end
      if !vessel.name.like("spell") then next end

      owner = vessel.owner != 0 ? ", by the #{vessel.creator}" : ""
      html += "<action data-action='cast the #{vessel.attr} #{vessel.name}'>#{vessel.attr.capitalize}</action>#{owner} <comment>#{vessel.program}</comment>\n"
    end
    html += "</code>"

    return html

  end

end