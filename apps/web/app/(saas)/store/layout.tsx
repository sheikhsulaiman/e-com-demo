import { Navbar } from "../../../modules/saas/cart/Navbar";
import type { PropsWithChildren } from "react";

export default function StoreLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}