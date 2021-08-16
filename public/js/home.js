var createWorkoutBtn = document.querySelector('.create-wo-btn');

// var date = new Date().toLocaleDateString();
// console.log(date);

// var newDate = [date.getMonth(), date.getDay(), date.getYear()];
// console.log(newDate.join('-'));

async function handleCreateWorkout() {
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
  }
}

createWorkoutBtn.addEventListener('click', handleCreateWorkout);
