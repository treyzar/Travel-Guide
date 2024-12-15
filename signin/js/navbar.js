class Navbar {
  constructor(navbarToggleId, navbarMenuId) {
    this.navbarToggle = document.getElementById(navbarToggleId);
    this.navbarMenu = document.getElementById(navbarMenuId);

    if (this.navbarToggle && this.navbarMenu) {
      this.navbarToggle.addEventListener("click", this.toggleMenu.bind(this));
    } else {
      console.error("Один из элементов не найден");
    }
  }

  toggleMenu() {
    this.navbarMenu.classList.toggle("active");
  }
}
const navbar = new Navbar("navbarToggle", "navbarMenu");
