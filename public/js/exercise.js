var exerciseObj = {};

$(document).ready(function () {
  $('#exercise-list li a').on('click', function () {
    var exerciseType = $(this).text();
    $('#dropdownMenuButton').text(exerciseType);
    // alert(txt);
    exerciseObj.type = `${exerciseType}`;
  });
});

function getExerciseInfo() {
  return new Promise((resolve, reject) => {
    exerciseObj.name = $('#NameInput')[0].value;
    exerciseObj.weights = $('#WeightsInput')[0].value;
    exerciseObj.sets = $('#SetsInput')[0].value;
    exerciseObj.reps = $('#RepsInput')[0].value;
    exerciseObj.duration = $('#DurationInput')[0].value;
    console.log(exerciseObj);
    resolve('Created exercise object');
  });
}

async function handleAddExercise() {
  await getExerciseInfo();
  const response = await fetch('/exercise', {
    method: 'POST',
    body: JSON.stringify({
      type: exerciseObj.type,
      name: exerciseObj.name,
      weights: exerciseObj.weights,
      sets: exerciseObj.sets,
      reps: exerciseObj.reps,
      duration: exerciseObj.duration,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    console.log('Successfully created a new exercise');
  } else {
    console.log('Failed to create a new exercise');
  }
}

$('#complete-btn').on('click', handleAddExercise);
