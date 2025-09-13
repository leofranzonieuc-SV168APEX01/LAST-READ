 import "./globals.css";
 import AuthProvider from "../components/auth";


 export default function RootLayout({ children }) {
   return (
     <html lang="fr">
       <body>
         <AuthProvider>

           <main>{children}</main>
         </AuthProvider>
       </body>
     </html>
   );
 }
