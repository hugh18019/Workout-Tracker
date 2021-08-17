async function getWorkoutStats() {
  const response = await fetch('/stat/lastSeven', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    console.log('Successfully retrieved workout stats');
  } else {
    console.log('Failed to retrieve workout stats');
  }
}

getWorkoutStats();
