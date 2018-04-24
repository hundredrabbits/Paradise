#!/bin/env ruby
# encoding: utf-8

require_relative "_toolkit.rb"

class ActionWarp

  include Action
  
  def initialize q = nil

    super

    @name = "Warp"
    @verb = "Warping"
    @docs = "Enter a distant vessel by either its name, or its warp id. The vessel must be visible."
    @examples = ["<b>warp</b> to the library <comment>You entered the library.</comment>","<b>warp</b> to 1 <comment>You entered the library.</comment>"]

  end

  def act params = ""

    target_id = params.split(" ").last.to_i

    if target_id < 0                          then return @host.answer(self,:error,"#{topic} are not allowed to warp in negative nullspace.") end

    target = @host.find_distant(target_id.to_s)
    prev = @host.parent

    if @host.is_locked                        then return @host.answer(self,:error,"#{@host} is locked.") end
    if !target || target_id == 0              then return @host.answer(self,:error,"#{topic} may not warp into nullspace.") end
    if target && target.is_hidden             then return @host.answer(self,:error,"#{target} cannot be warped into.") end
    if target && target.id == @host.parent.id then return @host.answer(self,:error,"#{topic} already in #{target}.") end
      
    @host.set_unde(target_id)

    return @host.answer(self,:modal,"#{topic} left the #{prev} and warped to the #{target}.")

  end

end