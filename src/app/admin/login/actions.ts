"use server";

import { redirect } from "next/navigation";
import { loginAdmin } from "@/lib/admin-auth";

export type LoginFormState = {
  error?: string;
};

export async function loginAction(
  _prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const nextPath = String(formData.get("next") ?? "/admin");

  const result = await loginAdmin(email, password);

  if (!result.ok) {
    return { error: result.error };
  }

  redirect(nextPath.startsWith("/admin") ? nextPath : "/admin");
}
