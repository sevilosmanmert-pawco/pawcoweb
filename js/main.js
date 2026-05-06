document.addEventListener('DOMContentLoaded', () => {
    // Banner Kapatma
    const closeBtn = document.querySelector('.close-banner');
    const banner = document.querySelector('.top-banner');

    closeBtn.addEventListener('click', () => {
        banner.style.display = 'none';
    });

    // Sidebar Menü Geçişleri (Örnek)
    const sidebarItems = document.querySelectorAll('.mega-sidebar li');
    sidebarItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            sidebarItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
});