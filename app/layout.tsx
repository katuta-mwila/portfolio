import { EZFormProvider } from "@/components/EasyForm/Form/EZFormProvider";
import Navigation from "@/layout/navigation/navigation";
import '../styles/base.css';
import "react-multi-carousel/lib/styles.css";
import { NavigationProvider } from "@/layout/navigation/navigationcontext/navigationcontext";
import {Open_Sans} from 'next/font/google'

const openSans = Open_Sans({
  subsets: ["latin"],
})

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${openSans.className}`}>
      <body className="nav-type-fixed">
        <NavigationProvider>
          <EZFormProvider>
            <header className="w-full z-2000 pointer-events-none">
              <Navigation/>
            </header>
            <main className="theme-primary">
              {children}
            </main>
          </EZFormProvider>
        </NavigationProvider>
      </body>
    </html>
  )
}
