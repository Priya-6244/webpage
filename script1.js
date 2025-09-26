// Sample movie dataset
const movies = [
  { id: 1, title: "Spider-Man", genre: "Action", language: "English" },
  { id: 2, title: "Inception", genre: "Action", language: "English" },
  { id: 3, title: "Parasite", genre: "Thriller", language: "Korean" },
  { id: 4, title: "3 Idiots", genre: "Comedy", language: "Hindi" },
  { id: 5, title: "Life is Beautiful", genre: "Drama", language: "Italian" },
  { id: 6, title: "Avengers", genre: "Action", language: "English" },
  { id: 7, title: "The Host", genre: "Thriller", language: "Korean" }
];

// Function to fill movie dropdown
function loadMovieOptions() {
  const select = document.getElementById('movieSelect');
  movies.forEach(movie => {
    const option = document.createElement('option');
    option.value = movie.id;
    option.textContent = `${movie.title} (${movie.language})`;
    select.appendChild(option);
  });
}

// Function to recommend movies based on selected movie
function recommendMovies(selectedId) {
  const selectedMovie = movies.find(m => m.id === parseInt(selectedId));
  if (!selectedMovie) return [];

  // Simple similarity: same genre or same language
  let recommendations = movies.filter(m =>
    m.id !== selectedMovie.id &&
    (m.genre === selectedMovie.genre || m.language === selectedMovie.language)
  );

  return recommendations.slice(0, 3);
}

// Display recommendations in UI
function displayRecommendations() {
  const select = document.getElementById('movieSelect');
  const recommendationsDiv = document.getElementById('recommendations');
  const selectedId = select.value;

  const recs = recommendMovies(selectedId);
  recommendationsDiv.innerHTML = '';

  if (recs.length === 0) {
    recommendationsDiv.textContent = 'No recommendations found.';
    return;
  }

  recs.forEach(movie => {
    const div = document.createElement('div');
    div.className = 'recommendation-item';
    div.textContent = `${movie.title} (${movie.genre}, ${movie.language})`;
    recommendationsDiv.appendChild(div);
  });
}

// Initialize dropdown and add event listener
window.onload = function() {
  loadMovieOptions();
  document.getElementById('movieSelect').addEventListener('change', displayRecommendations);

  // Load recommendations for the first movie in list by default
  document.getElementById('movieSelect').value = movies[0].id;
  displayRecommendations();
};
