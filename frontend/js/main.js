window.onload = async () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  try {
    const response = await fetch('http://localhost:3031/api/movies')
    const { meta, data } = await response.json();

    

    data.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      const link = document.createElement("a");
      link.textContent = "ver mas";
      link.setAttribute('href', `formulario.html?movie=${movie.id}`);
      link.classList.add('ver-mas-button');

      const favoriteButton = document.createElement("i");
      
      favoriteButton.setAttribute('class', 'fa fa-regular fa-star');
      favoriteButton.setAttribute('data-movie-id', movie.id);

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);
      card.appendChild(link);
      card.appendChild(favoriteButton);

      favoriteButton.addEventListener('click', (event) => {
        favoriteButton.setAttribute('class','fa fa-solid fa-star')
        const movieId = event.target.dataset.movieId;
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        if (!favorites.includes(movieId)) {
          favorites.push(movieId);
          localStorage.setItem('favorites', JSON.stringify(favorites));
          
          location.reload()
        } else {
          alert('Esta película ya está en tus favoritos');
        }
      });
    });

    // Verifica si hay películas favoritas y muestra el botón si es así
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesButton = document.getElementById("favoritesButton");

    if (favorites.length > 0) {
      favoritesButton.style.display = "block";
      favoritesButton.addEventListener("click", () => {
        window.location.href = "favoritas.html";

      });
    }
    
  } catch (error) {
    console.log(error);
  }
};
