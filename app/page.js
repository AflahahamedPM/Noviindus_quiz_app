import Login from "../components/login/index.jsx";
import { LoginProvider } from "../providers/LoginProvider.js";

export default function Home() {
  return (
    <section className="max-h-screen">
      <LoginProvider>
        <Login />
      </LoginProvider>
    </section>
  );
}
