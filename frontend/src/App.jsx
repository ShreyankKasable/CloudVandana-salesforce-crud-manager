import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";

const App = () => {
  const isAuthenticated = new URLSearchParams(window.location.search).get("auth") === "success";

  return isAuthenticated ? <Dashboard /> : <Login />;
};

export default App;
