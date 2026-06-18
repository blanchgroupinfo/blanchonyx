/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";
import { AuthProvider } from "@/hooks/AuthContext";

const router = getRouter();

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
