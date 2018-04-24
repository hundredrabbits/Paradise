#!/bin/env ruby
# encoding: utf-8

class VesselVoid

  include Vessel
  # include VesselToolkit

  attr_accessor :unde
  attr_accessor :note
  attr_accessor :parent
  attr_accessor :owner

  attr_accessor :is_locked
  attr_accessor :is_hidden
  attr_accessor :is_silent
  attr_accessor :is_tunnel

  def initialize content = nil

    super

    @name = "Void"
    @note = ""
    @owner = 0

    @is_locked = true
    @is_hidden = true
    @is_silent = true
    @is_tunnel = true

  end

  def to_s ; return "Void" end

  def act action_name, params = nil

    return "The void cannot act."

  end

  def parent

    return VesselVoid.new

  end

  def is_paradox

    return true

  end

  def creator ; return VesselVoid.new end
  def rating ; return 0 end
  def depth ; return 0 end
  def stem ; return VesselVoid.new end
  def has_program ; return false end
  def has_note ; return true end

  def note ; return "You find yourself in the void. A pocket of unused and immutable vessel space. " end

  def guides ; return ["Sector is unmonitored by service vessels.","The void is unstable, vessels created here my be moved or destroyed."] end


end