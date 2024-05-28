import { createCard } from './createCard.js';

export async function addCard(e) {
  e.preventDefault();
  const form = document.getElementById('inputForm');
  const name = form.name.value;
  const location = form.location.value;
  const description = form.description.value;

  try {
    const response = await fetch(
      `http://localhost:3306/api/destination/add/${name}`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ name, location, description }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch photo');
    }

    const data = await response.json();

    const card = createCard({
      name: data.name,
      location: data.location,
      photo: data.squareUrl,
      description: data.description,
    });

    const cardContainer = document.getElementById('cardContainer');
    cardContainer.appendChild(card);

    form.reset();

    document.getElementById('heading').classList.add('d-none');
    document.getElementById('title').classList.remove('d-none');
  } catch (error) {
    console.error('Error fetching photo from backend:', error);
  }
}
