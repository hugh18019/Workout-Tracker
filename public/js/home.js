var createWorkoutBtn = document.querySelector('.create-wo-btn');

// var date = new Date().toLocaleDateString();
// console.log(date);

// var newDate = [date.getMonth(), date.getDay(), date.getYear()];
// console.log(newDate.join('-'));

async function deactivatePrevWorkout() {
  const response = await fetch('/workout', {
    method: 'PUT',
    body: JSON.stringify({
      isCurrent: true,
    }),
    headers: { 'Content-Type': 'applicaiton/json' },
  });
  if (response.ok) {
    console.log('Successfully updated the current status of a workout');
  } else {
    alert('Failed to update the current status of a workout');
    return;
  }
}

async function handleCreateWorkout() {
  await deactivatePrevWorkout();

  const response = await fetch('/workout', {
    method: 'POST',
    body: JSON.stringify({
      date: `${new Date().toLocaleDateString()}`,
      isCurrent: true,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    console.log('Successfully added a new workout');
    document.location.replace('/exercise');
  } else {
    alert('Failed to add a new workout');
    return;
  }
}

createWorkoutBtn.addEventListener('click', handleCreateWorkout);
