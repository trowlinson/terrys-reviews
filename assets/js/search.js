fetch('/search.json')
    .then(function(response) { return response.json(); })
    .then(function(data) {
      var idx = lunr(function () {
        this.field('title');
        this.field('content');
        this.ref('url');

        data.forEach(function(doc) {
          this.add(doc);
        }, this);
      });

      var input = document.getElementById('search-input');
      var button = document.getElementById('search-button');
      var results = document.getElementById('results');

      function runSearch() {
        var query = input.value.trim();
        results.innerHTML = '';

        if (query.length === 0) {
          results.innerHTML = '<li>Please enter a search term.</li>';
          return;
        }

        var matches = idx.search(query);

        if (matches.length === 0) {
          results.innerHTML = '<li>No results found.</li>';
        } else {
          matches.forEach(function(match) {
            var item = data.find(function(d) { return d.url === match.ref; });
            results.innerHTML += '<li><a href="' + item.url + '">' + item.title + '</a></li>';
          });
        }
      }

      // Trigger search on button click
      button.addEventListener('click', runSearch);

      // Trigger search on Enter key
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
          runSearch();
        }
      });
    });


