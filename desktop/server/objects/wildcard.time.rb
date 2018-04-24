#!/bin/env ruby
# encoding: utf-8

require_relative "wildcard.rb"

class WildcardTime

  include Wildcard

  def initialize host = nil, value = nil

    super

    @docs = "The wildcard will be replaced by various time data. The Paradise time is using <a href='http://wiki.xxiivv.com/Desamber'>Desamber</a> time."
    @options = ["date","year","month","day","clock","above","below"]

  end

  def to_s

    d = Desamber.new

    if @value.like("date")  then return d.to_s end
    if @value.like("year")  then return d.y.to_s end
    if @value.like("month") then return d.m.to_s end
    if @value.like("day")   then return d.d.to_s end
    if @value.like("clock") then return d.clock.to_s end
    if @value.like("above") then return d.above.to_s end
    if @value.like("below") then return d.below.to_s end

    return "error"

  end

end
