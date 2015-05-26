'use strict';

/**
 * Get the current year
 */
var year = exports.year = require('year');

/**
 * Get the current month
 */
var month = exports.month = require('month');

/**
 * Get the current month day
 */
var day = exports.day = require('month-day');

/**
 * Get the current date: `2015/01/01`
 */
exports.today = function () {
  return month('MMMM') + ' ' + day('DD') + ', ' +  year();
};
