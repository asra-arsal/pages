const deleteLink = async () => {
    const idInput = document.getElementById('delete-app-id');

    const app = { id: idInput.value };

    const resp = await fetch('/api/v1/app/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(app),
    });
    const { success, error } = await resp.json();

    if (!success) return console.error(error);

    return (window.location = '/');
};
