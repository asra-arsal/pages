const openDeleteModal = (id, name, link) => {
    const idInput = document.getElementById('delete-app-id');
    const nameInput = document.getElementById('delete-app-name');
    const linkInput = document.getElementById('delete-app-link');

    idInput.value = id;
    nameInput.value = name;
    linkInput.value = link;

    const overlay = document.getElementById('overlay');
    const modal = document.getElementById('modal-delete');

    overlay.classList.remove('hidden');
    modal.classList.remove('hidden');
};
