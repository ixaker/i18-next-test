import "../globals.css";
import LocalSwitcher from "./ui/LocalSwitcher";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LocalSwitcher />
        {children}
      </body>
    </html>
  );
}
