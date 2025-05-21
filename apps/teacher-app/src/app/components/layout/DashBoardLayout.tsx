import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface DashBoardLayoutProps {
  children: ReactNode;
}

const DashBoardLayout = ({ children }: DashBoardLayoutProps) => {
  return (
    <div>
      <Header />
      <main className="flex-grow m-auto p-4 container">{children}</main>
      <Footer />
    </div>
  );
};

export default DashBoardLayout;
