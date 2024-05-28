export function createCard({ id, name, location, photo, description }) {
  const card = document.createElement('div');
  card.classList.add('col-lg-4', 'gy-3');
  card.dataset.id = id;
  card.innerHTML = `
    <div class="card w-100 h-100">
        <img class="card-img-top h-100" src="${photo}" alt="photo" style="object-fit: cover;">
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">${location}</p>
            <p class="card-text">${description}</p>
            <div class="col">
                <button type="button" class="btn btn-warning editCard">Edit</button>
                <button type="button" class="btn btn-danger removeCard">Remove</button>
            </div>
        </div>
    </div>
  `;
  return card;
}
