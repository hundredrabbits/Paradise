#!/bin/env ruby
# encoding: utf-8

module Wildcard

  attr_accessor :value
  attr_accessor :docs
  attr_accessor :options

  def initialize host = nil,value = nil

    @host = host
    @value = value
    @docs = "Missing"
    @options = []

  end

  def to_s

    return @value

  end

end
