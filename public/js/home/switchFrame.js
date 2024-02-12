const switchFrame = (id, name, link) => {
    const frame = document.getElementById('app-frame');

    frame.setAttribute('src', link);
    frame.setAttribute('title', name);

    const apps = document.querySelectorAll('.app');

    for (let i = 0; i < apps.length; i++) {
        const app = apps[i];

        app.classList.remove('active');

        if (app.id === `app-${id}`) app.classList.add('active');
    }
};
