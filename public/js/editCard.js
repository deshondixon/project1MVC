export async function editCard(e) {
  const card = e.target.closest('.col-lg-4');
  if (!card) return;

  const currentCardName = card.querySelector('.card-title').innerText;
  const newName = prompt(
    'Enter the new name of the destination',
    currentCardName
  );
  if (!newName) return;

  const currentLocation = card.querySelector(
    '.card-text:nth-of-type(1)'
  ).innerText;
  const newLocation = prompt('Enter the new location', currentLocation);
  if (!newLocation) return;

  const currentDescription = card.querySelector(
    '.card-text:nth-of-type(2)'
  ).innerText;
  const newDescription = prompt(
    'Enter the new description',
    currentDescription
  );
  if (!newDescription) return;

  try {
    const response = await fetch(
      `http://localhost:3306/api/destination/edit/${currentCardName}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ newName, newLocation, newDescription }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update card: ${response.statusText}`);
    }

    const data = await response.json();

    card.querySelector('.card-title').innerText = newName;
    card.querySelector('.card-text:nth-of-type(1)').innerText = newLocation;
    card.querySelector('.card-text:nth-of-type(2)').innerText = newDescription;

    if (data.squareUrl) {
      card.querySelector('.card-img-top').src = data.squareUrl;
    }
  } catch (error) {
    console.error('Error updating card:', error);
  }
}
