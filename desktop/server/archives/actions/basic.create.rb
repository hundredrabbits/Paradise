#!/bin/env ruby
# encoding: utf-8

require_relative "_toolkit.rb"

class ActionCreate

  include Action
  
  def initialize q = nil

    super

    @name = "Create"
    @verb = "Creating"
    @docs = "Create a new vessel at your current location. Vessel names and attributes must include less than 14 characters and be unique. "
    @examples = ["<b>create</b> a black cat <comment>You see a black cat.</comment>"]

  end

  def act params = ""

    parts = params.remove_articles.split(" ")
    name = parts.last
    attr = parts.length > 1 ? parts[parts.length-2] : ""

    new_vessel = Teapot.new({"NAME" => name.downcase,"ATTR" => attr.downcase,"CODE" => "0000-#{@host.unde.to_s.prepend('0',5)}-#{@host.id.to_s.prepend('0',5)}-#{Timestamp.new}"})

    validity_check, validity_errors = new_vessel.is_valid

    if !validity_check              then return @host.answer(self,:error,"#{validity_errors.first}") end
    if !new_vessel.is_unique        then return @host.answer(self,:error,"Another #{new_vessel} vessel already exists.") end

    $nataniev.vessels[:paradise].corpse.paradise.append(new_vessel.encode)

    return @host.answer(self,:modal,"#{topic} created the #{new_vessel}.")

  end

end