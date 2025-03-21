document.addEventListener("DOMContentLoaded", function () {
	const form = document.getElementById("search-form");
	const input = document.getElementById("query");

	form.addEventListener("submit", function (e) {
		e.preventDefault(); // ⛔️ prevent the default form submit
		const query = input.value.toLowerCase().trim();
		if (query.length < 2) return;

		runSearch(query);
	});

	input.addEventListener("input", function () {
		const query = input.value.toLowerCase().trim();
		if (query.length >= 2) {
			runSearch(query);
		}
	});

	function runSearch(query) {
		fetch('assets/js/search_data.json')
			.then(response => response.json())
			.then(data => {
				const results = data.filter(item =>
					item.title.toLowerCase().includes(query) ||
					item.content.toLowerCase().includes(query)
				);
				displayResults(results);
			})
			.catch(error => console.error("Search failed:", error));
	}

	function displayResults(results) {
		let container = document.getElementById("search-results");
		if (!container) {
			container = document.createElement("div");
			container.id = "search-results";
			document.getElementById("sidebar").appendChild(container);
		}

		container.innerHTML = "";

		if (results.length === 0) {
			container.innerHTML = "<p>No results found.</p>";
			return;
		}

		results.forEach(item => {
			const div = document.createElement("div");
			div.innerHTML = `<a href="${item.url}"><strong>${item.title}</strong></a>`;
			container.appendChild(div);
		});
	}
});
