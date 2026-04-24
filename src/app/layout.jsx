import '../styles/index.css';
import '../styles/landing.css';
import '../styles/components.css';

export const metadata = {
  title: 'VoteVerse India',
  description: 'VoteVerse India is an interactive election education platform designed to empower and inform citizens about the democratic process.',
  keywords: 'India, election, voting, EVM, democracy, polling booth, voter registration',
};

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `window._env_ = {
              VITE_GOOGLE_MAPS_API_KEY: "${process.env.VITE_GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}",
              VITE_FIREBASE_API_KEY: "${process.env.VITE_FIREBASE_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY || ''}",
              VITE_FIREBASE_AUTH_DOMAIN: "${process.env.VITE_FIREBASE_AUTH_DOMAIN || process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || ''}",
              VITE_FIREBASE_PROJECT_ID: "${process.env.VITE_FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || ''}",
              VITE_FIREBASE_STORAGE_BUCKET: "${process.env.VITE_FIREBASE_STORAGE_BUCKET || process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || ''}",
              VITE_FIREBASE_MESSAGING_SENDER_ID: "${process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || ''}",
              VITE_FIREBASE_APP_ID: "${process.env.VITE_FIREBASE_APP_ID || process.env.NEXT_PUBLIC_FIREBASE_APP_ID || ''}",
            };`
          }}
        />
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
}
