import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Agent d'Importation de Produits",
  description: "Importez facilement des produits depuis Alibaba et AliExpress vers votre boutique Shopify",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-gray-100 py-6 mt-12">
          <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
            <p>© {new Date().getFullYear()} Agent d'Importation de Produits. Tous droits réservés.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
