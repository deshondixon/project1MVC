export async function removeCard(e) {
  const card = e.target.closest('.col-lg-4');
  if (!card) return;

  const currentCardName = card.querySelector('.card-title').textContent;

  try {
    const response = await fetch(
      `http://localhost:3306/api/destination/delete/${currentCardName}`,
      {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ name: currentCardName }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete card: ${response.statusText}`);
    }

    card.remove();

    const cardContainer = document.getElementById('cardContainer');
    cardContainer.classList.remove('row');
    setTimeout(() => {
      cardContainer.classList.add('row');
    }, 0);
  } catch (error) {
    console.error('Error deleting card:', error);
  }
}
