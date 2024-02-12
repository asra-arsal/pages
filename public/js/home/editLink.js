const editLink = async () => {
    const idInput = document.getElementById('edit-app-id');
    const nameInput = document.getElementById('edit-app-name');
    const linkInput = document.getElementById('edit-app-link');

    const app = { id: idInput.value, name: nameInput.value, link: linkInput.value };

    const resp = await fetch('/api/v1/app/edit', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(app),
    });
    const { success, error } = await resp.json();

    if (!success) return console.error(error);

    const theApp = document.getElementById(`app-${app.id}`);
    const appName = document.querySelector(`#app-${app.id} .app-name`);
    const appLink = document.querySelector(`#app-${app.id} .app-link`);
    const appEdit = document.querySelector(`#app-${app.id} .app-edit`);

    appName.innerText = app.name;
    appLink.innerText = app.link;
    theApp.setAttribute('onclick', `switchFrame('${app.id}', '${app.name}', '${app.link}')`);
    appEdit.setAttribute('onclick', `openEditModal('${app.id}', '${app.name}', '${app.link}')`);

    closeModal('edit');
};
