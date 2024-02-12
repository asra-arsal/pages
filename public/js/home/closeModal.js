const closeModal = (id) => {
    const overlay = document.getElementById('overlay');
    const modal = document.getElementById(`modal-${id}`);

    overlay.classList.add('hidden');
    modal.classList.add('hidden');

    const headingApp = document.getElementById('modal-heading-app');
    const typeInput = document.getElementById('app-type');
    const nameInput = document.getElementById('app-name');
    const linkInput = document.getElementById('app-link');

    headingApp.innerText = '';
    typeInput.value = '';
    nameInput.value = '';
    linkInput.value = '';
};
