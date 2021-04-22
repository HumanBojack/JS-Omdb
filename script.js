let searchButton = document.querySelector("input[type='submit']");
const APIKEY = "";
let popup = document.getElementById("movie-popup");
let closeBtn = document.getElementById("close_btn");

const fetchOMDbSearch = (title) => { // First one will use the api and second one will use the file (with harry potter as title)
	return fetch(`http://www.omdbapi.com/?apikey=${APIKEY}&s=${title}&type=movie`) //t= for movie, s= for search
		.then(data => data.json())
		.catch(error => console.error(error));

	// return fetch(`search.json`)
	// 	.then(data => data.json())
	// 	.catch(error => console.error(error));
}

const fetchOMDbMovie = (id) => {
	return fetch(`http://www.omdbapi.com/?apikey=${APIKEY}&i=${id}`)
		.then(data => data.json())
		.catch(error => console.error(error));
}

async function onLearnMoreClick(event) {
	event.preventDefault();
	let popup = document.getElementById("movie-popup");
	popup.style.display = "block";
	let movie = await fetchOMDbMovie(this.id);
	let poster = document.getElementById("popup-poster");
	let title = document.getElementById("popup-title");
	let plot = document.getElementById("popup-plot");
	let date = document.getElementById("popup-date");
	let genres = document.getElementById("popup-genres");
	let ratings = document.getElementById("popup-ratings");

	poster.src = movie.Poster
	title.innerHTML = `${movie.Title} <span id="close_btn">&times;</span>`;
	plot.innerHTML = movie.Plot;
	date.innerHTML = movie.Released;
	genres.innerHTML = movie.Genre;
	if (movie.Ratings && movie.Ratings.length >= 1){
		ratings.innerHTML = `${movie.Ratings[0].Source} : ${movie.Ratings[0].Value}`
	}

	let closeBtn = document.getElementById("close_btn");
	closeBtn.addEventListener("click", function(){
		popup.style.display = "none";
	})
}

async function updateList() {
	let list = document.getElementById("movies_list");
	let searchInput = document.getElementById("movie_search");
	let result = await fetchOMDbSearch(encodeURIComponent(searchInput.value));
	
	list.innerHTML = "";
	result.Search.forEach(movie => {
		list.innerHTML +=
		`<div class="movie">
			<img src="${movie.Poster}" alt="" class="poster">
			<p class="text-white h3">${movie.Title}</p>
			<p class="text-white">Release date: ${movie.Year}</p>
			<a href="" class="btn btn-primary" id="${movie.imdbID}">Learn more</a>
		</div>`;
	})

	let buttons = list.querySelectorAll(".btn");
	buttons.forEach(button => {
		button.addEventListener("click", onLearnMoreClick);
	})

}

searchButton.addEventListener("click", updateList);
closeBtn.addEventListener("click", function(){
	popup.style.display = "none";
})

window.addEventListener("click", function(event){
	if (event.target == popup){
		popup.style.display = "none";
	}
})