import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <Link to="/register">
        <button>Register page</button>
      </Link>
    </div>
  );
}

export default App;
