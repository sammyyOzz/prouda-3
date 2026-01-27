import './globals.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import logoYellow from "@/app/images/logo-yellow.png";
import logoWhite from "@/app/images/logo-white.png";

export const metadata = {
  title: "Prouda Tutors: Become an online tutor",
  description: "Prouda: Kickstart, grow and thrive in your tutoring business!",
  keywords: ["prouda", "tutors", "tutoring", "online", "aspiring", "tutor"],
  robots: {
    index: true,  
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Recommended additional metadata
  metadataBase: new URL('https://proudatutors.com'), // Important for canonical URLs
  alternates: {
    canonical: '/', // Recommended for avoiding duplicate content
  },
  openGraph: {
    title: "Prouda Tutors: Become an online tutor",
    description: "Prouda: Kickstart, grow and thrive in your tutoring business!",
    type: 'website',
    // Add your actual Open Graph image URL
    images: [logoYellow.src], 
  },
  twitter: {
    card: 'summary_large_image',
    title: "Prouda Tutors: Become an online tutor",
    description: "Prouda: Kickstart, grow and thrive in your tutoring business!",
    // Add your Twitter image URL
    images: [logoWhite.src],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className='pt-16'>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}