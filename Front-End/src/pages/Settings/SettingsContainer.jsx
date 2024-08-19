import { Outlet } from "react-router-dom";
import { Nav } from "./components/Nav";
import { ErrorProvider, useErrorComponent } from "../../context/error.context";

export function SettingsContainer() {
  return (
    <>
      <Nav />
      <ErrorProvider>
        <Outlet />
      </ErrorProvider>
    </>
  );
}
