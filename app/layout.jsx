import { Outfit, Ovo, Sigmar_One } from 'next/font/google';
import './globals.css';
import { DarkModeProvider } from './context/DarkModeContext';

const outfit = Outfit({
  subsets: ['latin'],
});

const ovo = Ovo({
  subsets: ['latin'],
  weight: ['400'],
});
const sigmar_one = Sigmar_One({
  subsets: ['latin'],
  weight: ['400'],
});

export const metadata = {
  title: 'Portfolio - Gagan',
  description: '',
  icons: './favicon.ico',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='scroll-smooth'>
      <body
        className={`${outfit.className} ${ovo.className} ${sigmar_one.className} antialiased leading-8 dark:bg-darkTheme dark:text-white`}
      >
        <DarkModeProvider>{children}</DarkModeProvider>
      </body>
    </html>
  );
}
