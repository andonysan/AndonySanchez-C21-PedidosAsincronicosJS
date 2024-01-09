window.onload = async () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  const linkDelete = document.createElement("a");
  app.appendChild( linkDelete)
  app.appendChild(container);

  try {
    const response = await fetch('http://localhost:3031/api/movies');
    const { meta, data } = await response.json();

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (favorites.length === 0) {
      const message = document.createElement("p");
      message.textContent = "Aún no existen películas favoritas";
      message.setAttribute('class','emptyMessage')
      container.appendChild(message);
      return;
    }else{
      
      linkDelete.textContent = "Eliminar favoritas"
      linkDelete.className ="deleteFavorites"
      linkDelete.addEventListener("click", function (){
        localStorage.clear()
        location.reload()
        })   
    }

    data.forEach((movie) => {
      if (favorites.includes(movie.id.toString())) {
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

        const removeButton = document.createElement("i");
        removeButton.setAttribute('class', 'fa-solid fa-trash trashButton');
        removeButton.setAttribute('data-movie-id', movie.id);
        removeButton.addEventListener('click', removeFromFavorites);

        container.appendChild(card);
        card.appendChild(h1);
        card.appendChild(p);
        if (movie.genre !== null) {
          const genero = document.createElement("p");
          genero.textContent = `Género: ${movie.genre.name}`;
          card.appendChild(genero);
        }
        card.appendChild(duracion);
        card.appendChild(link);
        card.appendChild(removeButton);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

function removeFromFavorites(event) {
  const movieId = event.target.dataset.movieId;
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  favorites = favorites.filter((id) => id !== movieId);

  localStorage.setItem('favorites', JSON.stringify(favorites));
  location.reload();
}