import React from "react";
import "../globals.css";
import 'quill/dist/quill.snow.css';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
          {children}
      </body>
    </html>
  )
}
