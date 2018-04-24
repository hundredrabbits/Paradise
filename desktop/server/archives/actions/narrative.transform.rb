#!/bin/env ruby
# encoding: utf-8

require_relative "_toolkit.rb"

class ActionTransform

  include Action
  
  def initialize q = nil

    super

    @name = "Transform"
    @verb = "Transforming"
    @docs = "Change your current vessel name and attribute."
    @examples = ["<b>transform</b> into a red bat <comment>You are a red bat.</comment>"]

  end

  def act params = ""

    parts = params.remove_articles.split(" ")
    name = parts.last
    attr = parts.length > 1 ? parts[parts.length-2] : nil

    @host.name = name
    @host.attr = attr

    validity_check, validity_errors = @host.is_valid

    if !validity_check              then return @host.answer(self,:error,"#{validity_errors.first}") end
    if !@host.is_unique             then return @host.answer(self,:error,"Another #{@host} already exists.") end
    if @host.is_locked              then return @host.answer(self,:error,"#{@host} is locked.") end

    @host.save

    return @host.answer(self,:modal,"#{topic} transformed into the #{@host}.")
    
  end

end