var createWorkoutBtn = document.querySelector('.create-wo-btn');

function handleCreateWorkout() {
  document.location.replace('/exercise');
}

createWorkoutBtn.addEventListener('click', handleCreateWorkout);
