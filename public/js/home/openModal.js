const openModal = (type) => {
    const overlay = document.getElementById('overlay');
    const modal = document.getElementById('modal-create');

    overlay.classList.remove('hidden');
    modal.classList.remove('hidden');

    const headingApp = document.getElementById('modal-heading-app');
    const typeInput = document.getElementById('app-type');

    headingApp.innerText = type === 'facebook' ? 'Facebook' : 'Twitter';
    typeInput.value = type;
};
