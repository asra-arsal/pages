const editItems = () => {
    const deleteButtons = document.querySelectorAll('.app-delete');
    const editButtons = document.querySelectorAll('.app-edit');

    for (let i = 0; i < deleteButtons.length; i++) {
        const button = deleteButtons[i];

        const attrs = button.getAttribute('onclick').startsWith('openDeleteModal')
            ? button.getAttribute('onclick').replace('openDeleteModal', 'openEditModal')
            : button.getAttribute('onclick').replace('openEditModal', 'openDeleteModal');
        button.setAttribute('onclick', attrs);

        const buttonIcon = document.querySelector(`button[onclick="${attrs}"] i`);
        buttonIcon.classList.toggle('fa-trash-can');
        buttonIcon.classList.toggle('fa-pen-to-square');

        button.classList.toggle('app-delete');
        button.classList.toggle('app-edit');
    }

    for (let i = 0; i < editButtons.length; i++) {
        const button = editButtons[i];

        const attrs = button.getAttribute('onclick').startsWith('openDeleteModal')
            ? button.getAttribute('onclick').replace('openDeleteModal', 'openEditModal')
            : button.getAttribute('onclick').replace('openEditModal', 'openDeleteModal');
        button.setAttribute('onclick', attrs);

        const buttonIcon = document.querySelector(`button[onclick="${attrs}"] i`);
        buttonIcon.classList.toggle('fa-trash-can');
        buttonIcon.classList.toggle('fa-pen-to-square');

        button.classList.toggle('app-delete');
        button.classList.toggle('app-edit');
    }

    const editButton = document.getElementById('edit-button');
    editButton.classList.toggle('active');
    // editButton.setAttribute('onclick', 'saveItems()');

    const editButtonIcon = document.querySelector('#edit-button i');
    editButtonIcon.classList.toggle('fa-pen-to-square');
    editButtonIcon.classList.toggle('fa-floppy-disk');
};
