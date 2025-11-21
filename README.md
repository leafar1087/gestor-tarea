# Gestor de Tareas

Una aplicación simple de gestión de tareas construida con Flask.

## Características

- Crear, leer, actualizar y eliminar tareas (CRUD).
- Almacenamiento local en archivo JSON (`tareas.json`).
- Interfaz web amigable.

## Requisitos

- Python 3.x
- `pip` (Gestor de paquetes de Python)

## Instalación

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/leafar1087/gestor-tarea.git
    cd gestor-tarea
    ```

2.  **Crear y activar un entorno virtual:**

    ```bash
    python3 -m venv venv
    source venv/bin/activate  # En macOS/Linux
    # venv\Scripts\activate  # En Windows
    ```

3.  **Instalar dependencias:**

    ```bash
    pip install -r requirements.txt
    ```

    > **Nota:** Si usas Python 3.14 en macOS ARM64, `psycopg2-binary` puede causar problemas. Está comentado en `requirements.txt` por defecto para permitir la ejecución local con almacenamiento JSON.

## Uso

1.  **Ejecutar la aplicación:**

    ```bash
    python3 app.py
    ```

2.  **Abrir en el navegador:**
    Visita `http://127.0.0.1:5001` en tu navegador web.

## Estructura del Proyecto

- `app.py`: Archivo principal de la aplicación Flask.
- `tareas.json`: Archivo de base de datos local (se crea automáticamente).
- `templates/`: Plantillas HTML.
- `static/`: Archivos estáticos (CSS, JS).
