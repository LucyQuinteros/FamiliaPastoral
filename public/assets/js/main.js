/**
* Main.js - Lógica del menú robusta para Astro
*/

(function() {
  "use strict";

  // Función principal que conecta el botón
  function initMobileNav() {
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
    const navList = document.querySelector('.nav-list');
    const body = document.querySelector('body');

    // Si no encuentra el botón, salimos para evitar errores
    if (!mobileNavToggleBtn) return;

    // LIMPIEZA: Primero removemos cualquier listener viejo para no tener duplicados
    // Esto es clave para que no falle al segundo intento
    const newBtn = mobileNavToggleBtn.cloneNode(true);
    mobileNavToggleBtn.parentNode.replaceChild(newBtn, mobileNavToggleBtn);
    
    // Función del toggle
    function toggleMenu(e) {
      if(e) e.preventDefault(); // Prevenir comportamientos extraños
      
      console.log("Click en menú detectado");

      // 1. Body
      body.classList.toggle('mobile-nav-active');

      // 2. Lista
      if (navList) {
        navList.classList.toggle('mobile-active');
      }

      // 3. Icono
      const icon = newBtn.querySelector('i');
      if (icon) {
        if (navList && navList.classList.contains('mobile-active')) {
          icon.classList.remove('bi-list');
          icon.classList.add('bi-x');
        } else {
          icon.classList.remove('bi-x');
          icon.classList.add('bi-list');
        }
      }
    }

    // Conectar el nuevo botón "limpio"
    newBtn.addEventListener('click', toggleMenu);

    // Cerrar menú al hacer click en enlaces
    document.querySelectorAll('.nav-list a').forEach(link => {
      link.addEventListener('click', () => {
        if (document.querySelector('.mobile-active')) {
          toggleMenu(); 
        }
      });
    });
  }

  // EJECUCIÓN:
  // 1. Al cargar la página normal
  document.addEventListener('DOMContentLoaded', initMobileNav);

  // 2. IMPORTANTE: Al navegar en Astro (View Transitions)
  document.addEventListener('astro:page-load', initMobileNav);

})();