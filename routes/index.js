const express = require('express');
const router = express.Router();
const json = require("../public/data/taskData.json");
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
var forceSsl = require('force-ssl-heroku');

var app = express();
router.use(forceSsl);

// Welcome Page
router.get("/", (req, res) => res.sendFile("index.html"));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

router.get('/submittask', ensureAuthenticated, (req, res) => res.render('submt'));

router.get('/forgotpassword', (req, res) => res.render('passReset'));

router.get("/dashboard/tasks/:num", ensureAuthenticated, function (req, res, next) {
  let taskNum = Number(req.params.num);
  if (Number.isInteger(taskNum) && taskNum >= 1 && taskNum <= 10) {
    res.render("task_page", json[taskNum - 1]);
  } else {
    res.render("not_found");
  }
});

// HomeBoard
router.get('/homeboard', ensureAuthenticated, function (req, res) {

  res.render('home', { user: req.user });


})

module.exports = router;
