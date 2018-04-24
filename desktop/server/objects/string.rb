#!/bin/env ruby
# encoding: utf-8

class String

  def wildcards host

    text = self
    text.scan(/(?:\(\()([\w\W]*?)(?=\)\))/).each do |str,details|
      key = str.split(" ").first
      value = str.sub("#{key} ","").strip
      if Kernel.const_defined?("Wildcard#{key.capitalize}")
        wc = Object.const_get("Wildcard#{key.capitalize}").new(host,value)
        text = text.gsub("((#{str}))",wc.to_s)
      else
        text = text.gsub(str,"Error:#{key}.")
      end
    end
    return text

  end

  def remove_articles

    text = " #{self} "
    text = " #{text} ".gsub(" into "," ")
    text = " #{text} ".gsub(" some "," ")
    text = " #{text} ".gsub(" the "," ")
    text = " #{text} ".gsub(" one "," ")
    text = " #{text} ".gsub(" two "," ")
    text = " #{text} ".gsub(" a "," ")
    text = " #{text} ".gsub(" an "," ")
    text = " #{text} ".gsub(" to "," ")
    text = " #{text} ".gsub(" in "," ")
    return text.strip

  end

end