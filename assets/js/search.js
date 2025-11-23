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
      var results = document.getElementById('results');
      var activeIndex = -1;

      function runSearch() {
        var query = input.value.trim();
        results.innerHTML = '';
        activeIndex = -1;

        if (query.length === 0) {
          results.classList.remove('show');
          return;
        }

        var matches = idx.search(query);

        if (matches.length === 0) {
          results.innerHTML = '<li>No results found.</li>';
        } else {
          matches.forEach(function(match) {
            var item = data.find(function(d) { return d.url === match.ref; });
            var li = document.createElement('li');
            li.innerHTML = '<a href="' + item.url + '">' + item.title + '</a>';
            results.appendChild(li);
          });
        }

        results.classList.add('show');

      }

      input.addEventListener('input', runSearch);

      input.addEventListener('keydown', function(e) {
        var items = results.getElementsByTagName('li');

        if (e.key === 'ArrowDown' || e.keyCode === 40) {
          e.preventDefault();
          if (items.length === 0) return;
          activeIndex = (activeIndex + 1) % items.length;
          updateActive(items);
        }

        if (e.key === 'ArrowUp' || e.keyCode === 38) {
          e.preventDefault();
          if (items.length === 0) return;
          activeIndex = (activeIndex - 1 + items.length) % items.length;
          updateActive(items);
        }

        if (e.key === 'Enter' || e.keyCode === 13) {
          if (activeIndex >= 0 && items[activeIndex]) {
            var link = items[activeIndex].querySelector('a');
            if (link) {
              window.location.href = link.href;
            }
          }
        }
      });

      function updateActive(items) {
        for (var i = 0; i < items.length; i++) {
          items[i].classList.remove('active');
        }
        if (activeIndex >= 0 && items[activeIndex]) {
          items[activeIndex].classList.add('active');
        }
      }

      var clearButton = document.getElementById('clear-button');

        // Show/hide clear button based on input
        input.addEventListener('input', function() {
        if (input.value.trim().length > 0) {
            clearButton.style.display = 'block';
        } else {
            clearButton.style.display = 'none';
            results.classList.remove('show');

        }
        });

        // Clear input and results
        clearButton.addEventListener('click', function() {
        input.value = '';
        clearButton.style.display = 'none';
        results.innerHTML = '';
        results.classList.remove('show');
        activeIndex = -1;
        });

    });
