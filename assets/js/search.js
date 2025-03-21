document.addEventListener("DOMContentLoaded", function () {
	const searchInput = document.getElementById("query");

	searchInput.addEventListener("input", function () {
		const query = searchInput.value.toLowerCase();

		if (query.length < 2) return;

		fetch('assets/js/search_data.json')
			.then(response => response.json())
			.then(data => {
				const results = data.filter(item => 
					item.title.toLowerCase().includes(query) || 
					item.content.toLowerCase().includes(query)
				);

				displayResults(results);
			});
	});

	function displayResults(results) {
		let resultsContainer = document.getElementById("search-results");
		if (!resultsContainer) {
			resultsContainer = document.createElement("div");
			resultsContainer.id = "search-results";
			document.getElementById("sidebar").appendChild(resultsContainer);
		}

		resultsContainer.innerHTML = "";
		results.forEach(item => {
			const div = document.createElement("div");
			div.innerHTML = `<a href="${item.url}"><strong>${item.title}</strong></a>`;
			resultsContainer.appendChild(div);
		});
	}
});
