import React from "react";
import 'react-quill/dist/quill.snow.css';
import "../globals.css";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
          {children}
      </body>
    </html>
  )
}
