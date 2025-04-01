NESC Compliance Monitoring System
The NESC Compliance Monitoring System is a full-stack web application designed to visualize violations of the National Electrical Safety Code (NESC). The system consists of a FastAPI backend and a React frontend, allowing users to monitor compliance issues in an interactive way. The application fetches NESC violation data from a FastAPI backend, displays violations on an interactive map using Leaflet.js, and supports real-time updates for compliance monitoring.

Tech Stack
The backend is built using FastAPI, a high-performance web framework, and uses SQLite to store violations data. Additionally, CORS Middleware is used to handle cross-origin requests. The frontend is developed using React.js, with Leaflet.js and React-Leaflet providing the interactive map functionality.

Project Structure
The project is organized into two main directories: backend/, which contains the FastAPI application (main.py for the API, fetch_data.py for data processing, and requirements.txt for dependencies), and frontend/, which contains the React app (App.js for the main component, Map.js for rendering the Leaflet map, and public/ for static assets).

Setup & Installation
To set up the backend, navigate to the backend/ directory and install dependencies using pip install -r requirements.txt. Start the FastAPI server with uvicorn main:app --reload, making the API available at http://127.0.0.1:8000. You can test the API by accessing http://127.0.0.1:8000/violations.

For the frontend, navigate to frontend/myapp/, install dependencies using npm install, and start the development server with npm start. The frontend will be accessible at http://localhost:3000.

Deployment
To deploy the backend, push the latest changes to GitHub and deploy it on Render. After deployment, update the API_URL in the frontend to match the backend’s deployed URL, such as "https://apis-project-9nac.onrender.com/violations". To deploy the frontend, push the changes to GitHub and deploy the React app on Render. The frontend will then be accessible at https://apifrontend-e05x.onrender.com.

Troubleshooting
If you encounter a CORS Policy Error, ensure that the FastAPI CORS settings include the deployed frontend URL. Update the middleware configuration to:

python
Copy
Edit
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://apifrontend-e05x.onrender.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
After making changes, commit and redeploy the backend.

Future Improvements
Planned enhancements include WebSocket support for real-time violation updates, authentication for authorized users, and machine learning predictions for violation risks.

Contributors
👨🏾‍💻 Isaiah Alfred – Developer
📧 Contact: isaiahalfred416@gmail.com
