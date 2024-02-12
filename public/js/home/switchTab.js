const switchTab = async (tabID) => {
    const tabs = document.querySelectorAll('.tab');

    for (let i = 0; i < tabs.length; i++) {
        const tab = tabs[i];
        tab.classList.add('hidden');
        if (tab.id === tabID) tab.classList.remove('hidden');
    }

    const switches = document.querySelectorAll('.switch');

    for (let i = 0; i < switches.length; i++) {
        const switche = switches[i];
        switche.classList.remove('active');
        if (switche.getAttribute('data-switch-id') === tabID) switche.classList.add('active');
    }

    const settingsButton = document.getElementById('settings-button');
    settingsButton.setAttribute('onclick', `orderItems('${tabID}')`);
};
