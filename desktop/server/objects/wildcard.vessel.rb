#!/bin/env ruby
# encoding: utf-8

require_relative "wildcard.rb"

class WildcardVessel

  include Wildcard

  def initialize host = nil, value = nil

    super

    @docs = "Displays current vessel or parent vessel details."
    @options = ["id","name","parent id","parent name","stem id","stem name","random id","random name"]

  end

  def to_s

    target_name = @value.split(" ").first
    target = @host
    if target_name.like("parent") then target = @host.parent end
    if target_name.like("stem") then target = @host.stem end
    if target_name.like("random") then target = @host.find_random end

    target_detail = @value.split(" ").last

    if target_detail.like("id") && !target.is_hidden then return target.id.to_s end
    if target_detail.like("stem") then return target.stem end
    if target_detail.like("name") then return target.name end
    
    return "?"

  end

end
