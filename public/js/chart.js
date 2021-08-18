// const db = require('../models');

let workouts = [];
let exercises = [];
let myChart;

function populateChart() {
  const reversed = workouts.slice().reverse();
  const reversedExercises = exercises.slice().reverse();
  let sum = 0;

  const labels = reversed.map((t) => {
    const date = new Date(t.date);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  });

  console.log('reversed', reversed);
  console.log('lables', labels);
  console.log('reversedExercises', reversedExercises);

  // create incremental values for chart
  const data = reversedExercises.map((t) => {
    if (t.duration) {
      sum += parseInt(t.duration);
      return sum;
    }
  });
  // const data = [20, 65, 85, 105];

  console.log('data', data);

  // remove old chart if it exists
  if (myChart) {
    myChart.destroy();
  }

  const ctx = document.getElementById('my-chart').getContext('2d');

  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Workout Duration In Minutes',
          fill: true,
          backgroundColor: '#6666ff',
          data,
        },
      ],
    },
  });
}

async function displayWorkouts() {
  const response = await fetch('/chart/lastExercises', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    const data = await response.json();
    workouts = data.lastWorkout;
    exercises = data.exercises;

    populateChart();
    // document.location.replace('chart');
  }
}

displayWorkouts();
// await getExercises();
// console.log(exercises);
