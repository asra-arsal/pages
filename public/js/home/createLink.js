const createLink = async () => {
    const typeInput = document.getElementById('app-type');
    const nameInput = document.getElementById('app-name');
    const linkInput = document.getElementById('app-link');

    const app = {
        type: typeInput.value,
        name: nameInput.value,
        link: linkInput.value,
    };

    const resp = await fetch('/api/v1/app/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(app),
    });
    const { success, error } = await resp.json();

    if (!success) return console.error(error);

    return (window.location = '/');
};
