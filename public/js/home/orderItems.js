let apps;

const orderItems = async (type) => {
    const modalHeading = document.querySelector('#modal-re-order .modal-heading .modal-heading-type');

    modalHeading.innerText = type;

    const overlay = document.getElementById('overlay');
    const modal = document.getElementById('modal-re-order');

    overlay.classList.remove('hidden');
    modal.classList.remove('hidden');

    const resp = await fetch(`/api/v1/app/get/${type}`);
    const { data, error } = await resp.json();

    if (error) return console.error(error);

    apps = data.apps;

    renderApps(apps);
};

const renderApps = (apps) => {
    let articles = '';

    // prettier-ignore
    for (let i = 0; i < apps.length; i++) {
        const app = apps[i];

        const article = `
            <article class="re-order-app">
                <!-- THE BUTTONS -->
                <section class="re-order-app-buttons">
                    <button onclick="moveOrderUp(${i})">
                        <i class="fa-regular fa-square-caret-up"></i>
                    </button>
                    <button onclick="moveOrderDown(${i})">
                        <i class="fa-regular fa-square-caret-down"></i>
                    </button>
                </section>

                <!-- THE CONTENT -->
                <section class="re-order-app-content">
                    <h3 class="re-order-app-content-name">${app.name}</h3>
                </section>
            </article>
        `;

        articles += article;
    }

    document.querySelector('.modal-apps').innerHTML = articles;
};

const array_move = (arr, old_index, new_index) => {
    if (new_index >= arr.length) {
        let k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
};

const moveOrderUp = (t) => {
    if (t > 0) {
        const articles = array_move(apps, t, t - 1);
        renderApps(articles);
    }
};

const moveOrderDown = (t) => {
    if (t < apps.length - 1) {
        const articles = array_move(apps, t, t + 1);
        renderApps(articles);
    }
};

const saveAppOrder = async (type) => {
    let orderedApps = [];

    for (let i = 0; i < apps.length; i++) {
        const app = apps[i];

        orderedApps.push({ id: app.id, priority: i });
    }

    const resp = await fetch('/api/v1/app/edit/order', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apps: orderedApps }),
    });
    const { success, error } = await resp.json();

    if (!success) return console.error(error);

    return (window.location.href = '/');
};
