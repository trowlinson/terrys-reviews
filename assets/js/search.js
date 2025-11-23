<script>
  // Fetch the JSON index
  fetch('/search.json')
    .then(response => response.json())
    .then(data => {
      // Build Lunr index
      var idx = lunr(function () {
        this.field('title');
        this.field('content');
        this.ref('url');

        data.forEach(function (doc) {
          this.add(doc);
        }, this);
      });

      // Hook up search input
      var input = document.getElementById('search-input');
      var results = document.getElementById('results');

      input.addEventListener('input', function () {
        var query = input.value;
        var matches = idx.search(query);

        results.innerHTML = '';
        matches.forEach(function (match) {
          var item = data.find(d => d.url === match.ref);
          results.innerHTML += `<li><a href="${item.url}">${item.title}</a></li>`;
        });
      });
    });
</script>