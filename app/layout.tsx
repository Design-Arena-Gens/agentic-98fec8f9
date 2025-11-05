import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal AI Agent System',
  description: 'Multi-agent legal AI using LangChain & LangGraph with safety.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
