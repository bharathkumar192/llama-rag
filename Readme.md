# Gweek Talks 2024 - Oracle

## Overview
Overview / title section

## Tech Stack
- **Backend:** Flask, Python
- **Frontend:** React, JavaScript
- **Database:** SQLite (for feedback storage)

## Prerequisites
- **Python 3.x**
- **Node.js and npm**

## Backend Setup

1. **Navigate to the Backend Directory:**
    ```bash
    cd gweek_talks/backend
    ```

2. **Create a Virtual Environment:**
    ```bash
    python -m venv venv
    ```

3. **Activate the Virtual Environment:**
    - **Windows:**
        ```bash
        venv\Scripts\activate
        ```
    - **MacOS/Linux:**
        ```bash
        source venv/bin/activate
        ```

4. **Install Backend Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

5. **Configure the Backend:**
    - **Model Configurations:** Edit `constants.py` if any changes are needed for model configurations.
    - **Prompt Templates:** Edit `prompt_template_utils.py` for any changes in the prompt templates.

6. **Start the Flask Server:**
    ```bash
    python app.py
    ```

## Frontend Setup

1. **Navigate to the Frontend Directory:**
    ```bash
    cd gweek_talks/frontend
    ```

2. **Install Frontend Dependencies:**
    ```bash
    npm install
    ```

3. **Run the Frontend Application:**
    ```bash
    npm start
    ```

## File Structure

- **Backend Directory (`*/backend`):**
    - `requirements.txt`: Lists all backend dependencies.
    - `constants.py`: Contains model configurations and other constants.
    - `prompt_template_utils.py`: Contains prompt templates.
    - `app.py`: Main file to start the Flask server.

- **Frontend Directory (`*/frontend`):**
    - `package.json`: Lists all frontend dependencies.
    - Contains various React components for different functionalities.

## Running the Application

1. **Start the Backend Server:**
    - Open a terminal and navigate to the backend directory.
    - Run `python app.py` to start the Flask server.

2. **Start the Frontend Server:**
    - Open another terminal and navigate to the frontend directory.
    - Run `npm start` to start the React application.

3. **Access the Application:**
    - Open your web browser and go to `http://localhost:3000` to access the frontend.
    - The backend server should be running on `http://127.0.0.1:5000`.

## Making Changes

- **Backend:**
    - Update `constants.py` for any model configurations.
    - Modify `prompt_template_utils.py` for any prompt changes.
    - Any backend logic changes can be done in `app.py`.

- **Frontend:**
    - Each page or functionality is contained within its own component.
    - Make changes to the respective component files as needed.








**NGROK_AUTH_TOKEN have to inserted in app.py's main method if you need the website on a static URL.**
