from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
import os
import json
from datetime import datetime

# Archivo para guardar las tareas
TAREAS_FILE = 'tareas.json'

# Lista simple para almacenar tareas (en producción usarías una base de datos)
tareas = []

def cargar_tareas():
    """Cargar tareas desde el archivo JSON"""
    global tareas
    try:
        if os.path.exists(TAREAS_FILE):
            with open(TAREAS_FILE, 'r', encoding='utf-8') as f:
                tareas = json.load(f)
        else:
            tareas = []
    except (json.JSONDecodeError, FileNotFoundError):
        tareas = []

def guardar_tareas():
    """Guardar tareas en el archivo JSON"""
    try:
        with open(TAREAS_FILE, 'w', encoding='utf-8') as f:
            json.dump(tareas, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print(f"Error al guardar tareas: {e}")

def create_app():
    """Función factory para crear la aplicación Flask"""
    app = Flask(__name__)
    
    # Configuración básica
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    app.config['DEBUG'] = True
    
    @app.route('/')
    def index():
        """Página principal que muestra todas las tareas"""
        return render_template('index.html', tareas=tareas)
    
    @app.route('/agregar', methods=['POST'])
    def agregar_tarea():
        """Agregar una nueva tarea"""
        titulo = request.form.get('titulo')
        descripcion = request.form.get('descripcion', '')
        
        if titulo:
            nueva_tarea = {
                'id': len(tareas) + 1,
                'titulo': titulo,
                'descripcion': descripcion,
                'completada': False,
                'fecha_creacion': datetime.now().isoformat(),
                'fecha_modificacion': datetime.now().isoformat()
            }
            tareas.append(nueva_tarea)
            guardar_tareas()  # Guardar automáticamente
            flash('Tarea agregada exitosamente', 'success')
        else:
            flash('El título de la tarea es obligatorio', 'error')
        
        return redirect(url_for('index'))
    
    @app.route('/completar/<int:tarea_id>')
    def completar_tarea(tarea_id):
        """Marcar una tarea como completada"""
        for tarea in tareas:
            if tarea['id'] == tarea_id:
                tarea['completada'] = True
                tarea['fecha_modificacion'] = datetime.now().isoformat()
                guardar_tareas()  # Guardar automáticamente
                flash('Tarea marcada como completada', 'success')
                break
        return redirect(url_for('index'))
    
    @app.route('/eliminar/<int:tarea_id>')
    def eliminar_tarea(tarea_id):
        """Eliminar una tarea"""
        global tareas
        tareas = [tarea for tarea in tareas if tarea['id'] != tarea_id]
        guardar_tareas()  # Guardar automáticamente
        flash('Tarea eliminada', 'info')
        return redirect(url_for('index'))
    
    @app.route('/api/tareas')
    def api_tareas():
        """API endpoint para obtener todas las tareas en formato JSON"""
        return jsonify(tareas)
    
    @app.errorhandler(404)
    def not_found(error):
        """Manejo de errores 404"""
        return render_template('404.html'), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        """Manejo de errores 500"""
        return render_template('500.html'), 500
    
    return app

if __name__ == '__main__':
    # Cargar tareas al iniciar la aplicación
    cargar_tareas()
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5001)
