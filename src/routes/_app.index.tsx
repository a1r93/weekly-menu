import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/contexts/auth";
import logo from "../logo.svg";

export const Route = createFileRoute("/_app/")({
  component: HomePage,
});

function HomePage() {
  const { user } = useAuth();

  return (
    <div className="text-center">
      <header className="h-full flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
        <img
          alt="logo"
          className="h-[40vmin] pointer-events-none animate-[spin_20s_linear_infinite]"
          src={logo}
        />
        <h1>Welcome, {user?.email}!</h1>
        <p>
          Edit <code>src/routes/index.tsx</code> and save to reload.
        </p>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://reactjs.org"
          rel="noopener noreferrer"
          target="_blank"
        >
          Learn React
        </a>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://tanstack.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Learn TanStack
        </a>
      </header>
    </div>
  );
}
