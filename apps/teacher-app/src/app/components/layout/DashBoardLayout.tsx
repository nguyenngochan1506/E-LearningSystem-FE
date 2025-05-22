import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

type Props = {
  children: ReactNode;
};

export default function DashBoardLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 px-6 py-8">
        <div className="w-3/4 mx-auto">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
