import { type ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="app-container">
      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;
