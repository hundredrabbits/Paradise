#!/bin/env ruby
# encoding: utf-8

$nataniev.require("corpse","http")

class ActionQuery

  include Action

  def initialize q = nil

    super

    @name = "Query"
    @docs = "Deliver the Paradise API."

  end

  def act q = nil
    
    load_folder("#{@host.path}/objects/*")
    load_folder("#{@host.path}/vessels/*")
    load_folder("#{@host.path}/actions/*")

    $nataniev.vessels[:paradise].corpse.forum = Memory_Array.new("forum",@host.path)

    a = []
    Memory_Array.new("forum",@host.path).to_a.reverse[0,10].each do |message|
      a.push({:time => message["TIMESTAMP"], :host => message["HOST"], :from => message["FROM"], :text => message["MESSAGE"]})
    end

    return a.to_json

  end

end