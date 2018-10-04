const express = require('express');
const route = express.Router();
const User = require('../models/user-model');
const passport = require('passport');

route.use(passport.initialize());
route.use(passport.session());

route.get('/api/user', (req,res) => {
  console.log(req.session);
  if(!req.session.passport) {
    console.log('User not found');
    res.json(null);
  } else {
    User.findById(req.session.passport.user)
    .then((user) => {
      console.log(user);
      res.json(user);
    });
  }
});

route.post('/add', (req, res) => {
  //console.log(req.body);
  const workout = req.body.workout;
  User.findByIdAndUpdate(req.body.id,
    {$push: {workouts: workout}},
    {safe: true, upsert: true},
    function(err, model) {
    }
  );
});

route.get('/api/data', (req, res) => {
//  console.log(req.session);
  var workouts = [];
  User.findById(req.session.passport.user).then((user) => {
    var data = {
      time: [],
      strength: {
        conditioning: 0,
        gymnastics: 0,
        muscularStrength: 0,
        muscularEndurance: 0,
        mobility: 0
      },
      weakness:{
        conditioning: 0,
        gymnastics: 0,
        muscularStrength: 0,
        muscularEndurance: 0,
        mobility: 0
      },
      goal: {
        nutrition: 0,
        sleep: 0,
        mindset: 0
      },
      trainingBalance: [
        { x: 1, y: 0, label: "Conditioning" },
        { x: 2, y: 0, label: "Strength" },
        { x: 3, y: 0, label: "Gymnastics" }
      ],
      backSquat: [],
      frontSquat: [],
      clean: [],
      snatch: [],
      jerk: []
    };
    user.workouts.forEach(function(workout) {
      //console.log(workout);
      //---------GET TIME DATA--------------//
      var i;
      for(i = 0; i < data.time.length; i++) {
        if(data.time[i].hour == workout.time){
          data.time[i].points += 1;
          if(workout.feel == "Fit"){
            data.time[i].val += 2;
          } else if(workout.feel == "Strong") {
            data.time[i].val += 1;
          } else if(workout.feel == "Tired"){
            data.time[i].val -= 1;
          } else if(workout.feel == "Weak") {
            data.time[i].val -= 2;
          }
          break;
        }
      }
      if(i == data.time.length) {
        var timeData = {
          hour: workout.time,
          val: 0,
          points: 1,
          average: 0
        }
        if(workout.feel == "Fit"){
          timeData.val = timeData.val + 2;
        } else if(workout.feel == "Strong") {
          timeData.val = timeData.val + 1;
        } else if(workout.feel == "Tired"){
          timeData.val = timeData.val - 1;
        } else if(workout.feel == "Weak") {
          timeData.val  = timeData.val - 2;
        }
        data.time.push(timeData);
      }
      data.time.forEach(function(time) {
        time.average = time.val/time.points;
      });
      //---------GET STRENGTH DATA-------//
      if(workout.strength == "Conditioning"){
        data.strength.conditioning += 1;
      } else if(workout.strength == "Gymnastics") {
        data.strength.gymnastics += 1;
      } else if (workout.strength == "Muscular Strength") {
        data.strength.muscularStrength += 1;
      } else if(workout.strength == "Muscular Endurance") {
        data.strength.muscularEndurance += 1;
      } else if(workout.strength == "Mobility") {
        data.strength.mobility += 1;
      }
      //----------GET WEAKNESS DATA------------//
      if(workout.weakness == "Conditioning"){
        data.weakness.conditioning += 1;
      } else if(workout.weakness == "Gymnastics") {
        data.weakness.gymnastics += 1;
      } else if (workout.weakness == "Muscular Strength") {
        data.weakness.muscularStrength += 1;
      } else if(workout.weakness == "Muscular Endurance") {
        data.weakness.muscularEndurance += 1;
      } else if(workout.weakness == "Mobility") {
        data.weakness.mobility += 1;
      }
      //-------------GET GOAL DATA-------------//
      if(workout.goal == "Nutrition") {
        data.goal.nutrition += 1;
      } else if(workout.goal == "Sleep") {
        data.goal.sleep += 1;
      } else if(workout.goal = "Mindset") {
        data.goal.mindset += 1;
      }
      //----------GET TRAINING BALANCE DATA------------//
      if(workout.didMetcon == "true") {
        data.trainingBalance[0].y++;
      }
      if(workout.didStrength == "true") {
        data.trainingBalance[1].y++;
      }
      if(workout.didGymnastics == "true") {
        data.trainingBalance[2].y++;
      }

      //-----------GET ANY PERSONAL BEST-------------//
      if(workout.lift == "Back Squat"){
        data.backSquat.push({date: workout.date, weight: parseInt(workout.weight)});
      } else if(workout.lift == 'Front Squat'){
        data.frontSquat.push({date: workout.date, weight: parseInt(workout.weight)});
      } else if(workout.lift == 'Clean'){
        data.clean.push({date: workout.date, weight: parseInt(workout.weight)});
      } else if(workout.lift == 'Snatch'){
        data.snatch.push({date: workout.date, weight: parseInt(workout.weight)});
      } else if(workout.lift == 'Jerk'){
        data.jerk.push({date: workout.date, weight: parseInt(workout.weight)});
      }
    });
    res.json(data);
  });
});

module.exports = route;
