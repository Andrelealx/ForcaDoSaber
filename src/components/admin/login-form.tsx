"use client";

import { useActionState } from "react";
import { loginAction, type LoginFormState } from "@/app/admin/login/actions";
import { SubmitButton } from "@/components/admin/submit-button";

const initialState: LoginFormState = {};

type LoginFormProps = {
  nextPath: string;
};

export function LoginForm({ nextPath }: LoginFormProps) {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="mt-8 space-y-4">
      <input type="hidden" name="next" value={nextPath} />

      <label className="block text-sm">
        <span className="mb-2 block text-brand-beige/85">E-mail</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="username"
          className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none transition-colors focus:border-brand-gold/65"
        />
      </label>

      <label className="block text-sm">
        <span className="mb-2 block text-brand-beige/85">Senha</span>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none transition-colors focus:border-brand-gold/65"
        />
      </label>

      {state.error ? <p className="text-sm text-red-200">{state.error}</p> : null}

      <SubmitButton label="Entrar" pendingLabel="Validando acesso..." className="w-full" />
    </form>
  );
}
