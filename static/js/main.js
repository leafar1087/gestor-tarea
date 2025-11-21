// JavaScript personalizado para el Gestor de Tareas

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tooltips de Bootstrap
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Auto-hide alerts después de 5 segundos
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(function(alert) {
        setTimeout(function() {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }, 5000);
    });

    // Confirmación para eliminar tareas
    const deleteLinks = document.querySelectorAll('a[href*="eliminar"]');
    deleteLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            if (!confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
                e.preventDefault();
            }
        });
    });

    // Animación de entrada para las tarjetas
    const cards = document.querySelectorAll('.card');
    cards.forEach(function(card, index) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(function() {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Validación del formulario
    const form = document.querySelector('form[action*="agregar_tarea"]');
    if (form) {
        form.addEventListener('submit', function(e) {
            const titulo = document.getElementById('titulo');
            if (!titulo.value.trim()) {
                e.preventDefault();
                titulo.focus();
                titulo.classList.add('is-invalid');
                
                // Mostrar mensaje de error
                showAlert('El título de la tarea es obligatorio', 'danger');
            }
        });
    }

    // Limpiar validación cuando el usuario empiece a escribir
    const tituloInput = document.getElementById('titulo');
    if (tituloInput) {
        tituloInput.addEventListener('input', function() {
            this.classList.remove('is-invalid');
        });
    }

    // Función para mostrar alertas dinámicas
    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        const container = document.querySelector('.container');
        container.insertBefore(alertDiv, container.firstChild);
        
        // Auto-hide después de 5 segundos
        setTimeout(function() {
            const bsAlert = new bootstrap.Alert(alertDiv);
            bsAlert.close();
        }, 5000);
    }

    // Contador de caracteres para el título
    const tituloField = document.getElementById('titulo');
    if (tituloField) {
        const maxLength = 100;
        const counter = document.createElement('small');
        counter.className = 'text-muted';
        counter.style.display = 'block';
        counter.style.marginTop = '5px';
        
        tituloField.parentNode.appendChild(counter);
        
        tituloField.addEventListener('input', function() {
            const remaining = maxLength - this.value.length;
            counter.textContent = `${remaining} caracteres restantes`;
            
            if (remaining < 10) {
                counter.className = 'text-warning';
            } else {
                counter.className = 'text-muted';
            }
        });
    }

    // Efecto de hover para las tarjetas de tareas
    const taskCards = document.querySelectorAll('.card');
    taskCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Smooth scroll para enlaces internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Las estadísticas se calculan correctamente desde el servidor Flask
    // No necesitamos actualizar los contadores con JavaScript

    // Función para hacer peticiones AJAX (para futuras funcionalidades)
    function makeRequest(url, method = 'GET', data = null) {
        return fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: data ? JSON.stringify(data) : null
        })
        .then(response => response.json())
        .catch(error => {
            console.error('Error:', error);
            showAlert('Error en la petición', 'danger');
        });
    }

    // Exponer funciones globalmente para uso futuro
    window.GestorTareas = {
        showAlert: showAlert,
        makeRequest: makeRequest
    };
});
