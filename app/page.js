import Login from "../components/login/index.jsx";
import { LoginProvider } from "../providers/LoginProvider.js";

export default function Home() {
  return (
    <div className="max-h-screen">
      <LoginProvider>
        <Login />
      </LoginProvider>
    </div>
  );
}
