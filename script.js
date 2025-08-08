const API_KEY = "3cd339c457a14b18bc1c60a2ddb8d429"; // from TMDb
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchTopMovies() {
  let res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
  let data = await res.json();
  displayMovies(data.results.slice(0, 50));
}

function displayMovies(movies) {
  const container = document.getElementById("movieList");
  container.innerHTML = "";
  movies.forEach(movie => {
    let movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    movieCard.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <a href="movie.html?id=${movie.id}">View Details</a>
    `;
    container.appendChild(movieCard);
  });
}

async function searchMovies() {
  const query = document.getElementById("searchInput").value;
  let res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  let data = await res.json();
  displayMovies(data.results);
}

async function fetchMovieDetails() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) return;

  let res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
  let movie = await res.json();

  document.getElementById("movieDetails").innerHTML = `
    <h1>${movie.title}</h1>
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
    <p>${movie.overview}</p>
    <p><strong>Release Date:</strong> ${movie.release_date}</p>
    <p><strong>Rating:</strong> ${movie.vote_average} / 10</p>
    <a href="https://example.com/downloads/${movie.id}.pdf" target="_blank">📥 Download PDF</a>
  `;
}

// Page detection
if (document.body.contains(document.getElementById("movieList"))) {
  fetchTopMovies();
}
if (document.body.contains(document.getElementById("movieDetails"))) {
  fetchMovieDetails();
}
