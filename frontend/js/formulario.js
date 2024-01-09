window.onload = async () => {
    let query = new URLSearchParams(location.search);
    const movieId = query.get('movie');

    try {
        const response = await fetch(`http://localhost:3031/api/movies/${movieId}`);
        const movieData = await response.json();
        
        document.querySelector('#title').value = movieData.data.title || '';
        document.querySelector('#rating').value = parseFloat(movieData.data.rating) || 0;
        document.querySelector('#awards').value = movieData.data.awards || 0;
        document.querySelector('#release_date').value = (movieData.data.release_date) ? new Date(movieData.data.release_date).toISOString().split('T')[0] : '';
        document.querySelector('#length').value = movieData.data.length || 0;

        document.querySelector('.formulario').addEventListener('submit', async (event) => {
            event.preventDefault();

            const updatedData = {
                title: document.querySelector('#title').value,
                rating: parseFloat(document.querySelector('#rating').value),
                awards: parseInt(document.querySelector('#awards').value),
                release_date: document.querySelector('#release_date').value,
                length: parseInt(document.querySelector('#length').value)
            };

            try {
                const updateResponse = await fetch(`http://localhost:3031/api/movies/update/${movieId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedData)
                });

                if (updateResponse.ok) {
                    
                } else {
                    console.log('Error al actualizar datos');
                }
            } catch (error) {
                console.error('Hubo un problema al actualizar los datos:', error);
            }
        });

        document.querySelector('#deleteButton').addEventListener('click', async () => {
            try {
                
                const deleteResponse = await fetch(`http://localhost:3031/api/movies/delete/${movieId}`, {
                    method: 'DELETE'
                });

                if (deleteResponse.ok) {
                    confirm('Desea eliminar esta pelicula?');
                    alert('¡Película eliminada correctamente!');
                } else {
                    console.log('Error al eliminar la película');
                }
            } catch (error) {
                console.error('Hubo un problema al eliminar la película:', error);
            }
        });

        document.querySelector('#createButton').addEventListener('click', async (event) => {
            event.preventDefault()
            event.target.disabled = true;
            const title = document.querySelector('#title').value;
            const rating = parseFloat(document.querySelector('#rating').value);
            const awards = parseInt(document.querySelector('#awards').value);
            const release_date = document.querySelector('#release_date').value;
            const length = parseInt(document.querySelector('#length').value);



            const newData = {
                title,
                rating,
                awards,
                release_date,
                length
            };

            try {
                const createResponse = await fetch(`http://localhost:3031/api/movies/create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newData)
                });

                if (createResponse.ok) {
                    alert('¡Nueva película creada correctamente!');
                } else {
                    console.log('Error al crear la nueva película');
                }
            } catch (error) {
                console.error('Hubo un problema al crear la nueva película:', error);
            }
        });

    } catch (error) {
        console.log(error);
    }
}
