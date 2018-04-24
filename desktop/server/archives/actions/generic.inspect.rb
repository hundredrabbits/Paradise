#!/bin/env ruby
# encoding: utf-8

require_relative "_toolkit.rb"

class ActionInspect

  include Action
  
  def initialize q = nil

    super

    @name = "Inspect"
    @docs = "Get a visible vessel id."
    @verb = "Inspecting"
    @target = :visible

  end

  def act params = ""

    target = @host.find_visible(params)

    if !target then target = @host.parent end

    html = "<h3>the #{target}</h3>"
    html += "<p><b>The #{target}</b>, owned by the <i>#{target.creator}</i>, has the warp id #{target.id}, and a vessel rating of #{target.rating}. The #{target.name} is currently #{target.depth} levels deep within the #{target.stem} paradox.</p>"

    if target.has_note
      html += "<p><b>Note: </b><i>#{target.note}</i></p>"
    end
    if target.has_program
      html += "<code>#{target.program}</code>"
    end

    # TODO
    if @host.siblings.length > 0
      html += "<h3>Siblings</h3>"
      html += "<ul class='basic' style='margin-bottom:30px'>"
      @host.siblings.each do |vessel|
        html += "<li><action data-action='enter the #{vessel}'>#{vessel}</action></li>"
      end
      html += "</ul>"
    end

    html += "</table>"

    return html
    
  end

end
