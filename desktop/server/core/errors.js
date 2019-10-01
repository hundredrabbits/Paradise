'use strict'

const Error = require('./error')
const pluralize = require('pluralize')

// TODO: Add errors for WildcardLISP

const errors = {
  NOTARGET: function (params, type = 'visible', name = null) {
    const target = this.remove_articles(params)
    return new Error('err_NOTARGET', `<p>There is no ${type} vessel "${target}".${name ? ` ${errors.LEARN(name)}` : ''}</p>`)
  },

  NOPARAM: function (name) {
    return new Error('err_NOPARAM', `<p>The ${name} action requires more information. ${errors.LEARN(name)}</p>`)
  },

  NOVALID: function (name, learn = true, help_text = '') {
    return new Error('err_NOVALID', `<p>Invalid use of the "${name}" action. ${help_text ? help_text + ' ' : ''}${learn ? errors.LEARN(name) : ''}</p>`)
  },

  UNKNOWN: function (target = null, usage = 'action', learn = true) {
    return new Error('err_UNKNOWN', `<p>Unknown ${usage}${target ? ` '${target}'` : ''}${learn ? `, to see a list of available ${pluralize(usage)}, type "<action data='learn'>learn</action>"` : ''}.</p>`)
  },

  LEARN: function (name) {
    return new Error('err_LEARN', `For more details on how to ${name}, type "<action data='learn to ${name}'>learn to ${name}</action>".`)
  },

  NOPROGRAM: function (target, usage = 'program') {
    return new Error('err_NOPROGRAM', `<p>The ${target} is not a ${usage}.</p>`)
  },

  NOCHANGE: function (text = `<p>Nothing changed.</p>`) {
    return new Error('err_NOCHANGE', text)
  }
}

module.exports = errors
