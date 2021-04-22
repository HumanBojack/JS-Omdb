let searchButton = document.querySelector("input[type='submit']");
const APIKEY = "";

const fetchOMDb = (title) => { // First one will use the api and second one will use the file (with harry potter as title)
	// return fetch(`http://www.omdbapi.com/?apikey=${APIKEY}&s=${title}&type=movie`) //t= for movie, s= for search, also be carefull with spaces
	// 	.then(data => data.json())
	// 	.catch(error => console.error(error));

	return fetch(`search.json`)
		.then(data => data.json())
		.catch(error => console.error(error));
}

function onLearnMoreClick(event){
	event.preventDefault();
	console.log(this.id);
}

async function updateList() {
	let list = document.getElementById("movies_list");
	let searchInput = document.getElementById("movie_search");
	let result = await fetchOMDb(searchInput.value);
	
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