const toggleSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('sidebar-toggle');

    const toggleIcon = document.querySelector('#sidebar-toggle i');

    sidebar.classList.toggle('active');
    toggle.classList.toggle('active');
    toggleIcon.classList.toggle('fa-bars');
    toggleIcon.classList.toggle('fa-x');
};
