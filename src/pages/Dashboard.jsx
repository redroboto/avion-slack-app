import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <div>
        <h1>This is from the dashboard page</h1>
        <Link to="channels"> Channels </Link>
        <Link to="messages"> Messages </Link>
      </div>

      <div>
        <Outlet />
      </div>
    </>
  );
}
