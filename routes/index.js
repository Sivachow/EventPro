const homeRoute = require('./home');
const loginRoutes = require("./auth/login");
const logoutRoutes = require("./auth/logout");
const signupRoutes = require("./auth/signup");
const dashboardRoute = require("./dashboard");
const profileRoute = require("./profile");
const tournamentRoute = require("./tournament");
const clubMemRoute = require("./admin/clubMemb");
const tournMembRoute = require("./admin/tournMemb");

module.exports = {
  homeRoute,
  loginRoutes,
  logoutRoutes,
  signupRoutes,
  dashboardRoute,
  profileRoute,
  tournamentRoute,
  clubMemRoute,
  tournMembRoute
};
