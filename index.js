document.addEventListener('DOMContentLoaded', () => {
    // 1. Funcionalidad del Modal de Emergencia (Apertura/Cierre)
    const modal = document.getElementById('emergencia-modal');
    const closeButton = document.querySelector('.close-button');

    // Cierra el modal al hacer clic en (x)
    closeButton.onclick = function() {
        modal.style.display = "none";
    }

    // Cierra el modal si el usuario hace clic fuera de él
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // 2. Animación Fade-In con Intersection Observer (Se mantiene para elementos fuera de GSAP)
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% del elemento visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opcional: dejar de observar una vez que se ha animado
                // observer.unobserve(entry.target); 
            } else {
                // Si quieres que la animación se repita al salir del viewport
                // entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    // Selecciona todos los elementos con la clase 'fade-in' para observar
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // 4. Funcionalidad de Búsqueda
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const domain = window.location.hostname; // Obtiene el dominio actual del sitio

    function performSearch() {
        const query = searchInput.value.trim();

        if (query) {
            // Construye una URL de búsqueda de Google con el operador "site:"
            // Esto simula una búsqueda en el sitio.
            const googleSearchURL = `https://www.google.com/search?q=${encodeURIComponent(query)}+site:${domain}`;
            window.open(googleSearchURL, '_blank'); // Abre la búsqueda en una nueva pestaña
        } else {
            // Opcional: Mostrar un mensaje si el campo está vacío
            alert('Por favor, ingresa un término de búsqueda.');
        }
    }

    // Activar búsqueda con el botón
    searchButton.addEventListener('click', performSearch);

    // Activar búsqueda con la tecla Enter en el campo de texto
    searchInput.addEventListener('keypress', function(event) {
        // Número 13 es la tecla Enter
        if (event.key === 'Enter') {
            event.preventDefault(); // Evita el envío del formulario si estuviera en uno
            performSearch();
        }
    });

    // 3. Efectos de Transición para Botones (Ya manejados por CSS, pero se puede añadir JS si se necesita lógica extra)
    // Ejemplo:
    const transitionElements = document.querySelectorAll('.transition-effect');
    transitionElements.forEach(element => {
        element.addEventListener('click', () => {
            element.style.opacity = '0.7';
            setTimeout(() => {
                element.style.opacity = '1';
            }, 300);
        });
    });

    // Implementación de animaciones con GSAP:
    // **Estas animaciones se activan solo si la librería GSAP está cargada.**
    if (typeof gsap !== 'undefined') {
        // Animación del logo (baja desde arriba)
        gsap.from(".logo", { duration: 1, y: -50, opacity: 0, ease: "power2.out" });
        
        // Animación del texto de bienvenida (entra desde la izquierda)
        gsap.from(".hero-text", { duration: 1, x: -100, opacity: 0, delay: 0.5 });
    }
});