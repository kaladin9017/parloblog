document.addEventListener("DOMContentLoaded", function () {
    const mobileMenu = document.getElementById("mobile-menu");
    const menuButton = document.getElementById("mobile-menu-button");
    const closeButton = document.getElementById("mobile-menu-button-close");

    if (menuButton && mobileMenu && closeButton) {
        // Open Mobile Menu
        menuButton.addEventListener("click", () => {
            mobileMenu.classList.add("-open");
            document.body.classList.add("mobile-menu-open");
        });

        // Close Mobile Menu
        closeButton.addEventListener("click", () => {
            mobileMenu.classList.remove("-open");
            document.body.classList.remove("mobile-menu-open");
        });
    } else {
        console.error("Menu elements not found");
    }
});