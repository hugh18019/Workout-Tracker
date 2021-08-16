var createWorkoutBtn = document.querySelector('.create-wo-btn');

async function handleCreateWorkout() {
  const response = await fetch('/workout', {
    method: 'POST',
    body: JSON.stringify({
      date: `${new Date().toLocaleString()}`,
    }),
  });
  if (response.ok) {
  }
  document.location.replace('/exercise');
}

createWorkoutBtn.addEventListener('click', handleCreateWorkout);
