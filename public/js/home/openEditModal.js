const openEditModal = (id, name, link) => {
    const idInput = document.getElementById('edit-app-id');
    const nameInput = document.getElementById('edit-app-name');
    const linkInput = document.getElementById('edit-app-link');

    idInput.value = id;
    nameInput.value = name;
    linkInput.value = link;

    const overlay = document.getElementById('overlay');
    const modal = document.getElementById('modal-edit');

    overlay.classList.remove('hidden');
    modal.classList.remove('hidden');
};
