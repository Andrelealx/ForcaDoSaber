import "server-only";

import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-constants";
import { prisma } from "@/lib/prisma";

const DEFAULT_SESSION_TTL_DAYS = 7;
const SESSION_TTL_DAYS = Number(process.env.SESSION_TTL_DAYS ?? DEFAULT_SESSION_TTL_DAYS);

export type AuthAdmin = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "EDITOR";
};

function getSessionExpiresAt() {
  const safeDays = Number.isFinite(SESSION_TTL_DAYS) && SESSION_TTL_DAYS > 0 ? SESSION_TTL_DAYS : DEFAULT_SESSION_TTL_DAYS;
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + safeDays);
  return expiresAt;
}

async function setSessionCookie(token: string, expiresAt: Date) {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
}

async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export async function createAdminSession(userId: string) {
  const token = crypto.randomBytes(48).toString("hex");
  const expiresAt = getSessionExpiresAt();

  await prisma.session.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  });

  await setSessionCookie(token, expiresAt);
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (token) {
    await prisma.session.deleteMany({ where: { token } });
  }

  await clearSessionCookie();
}

export async function getCurrentAdmin(): Promise<AuthAdmin | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!session) {
    await clearSessionCookie();
    return null;
  }

  if (session.expiresAt <= new Date() || !session.user.isActive) {
    await prisma.session.deleteMany({ where: { token } });
    await clearSessionCookie();
    return null;
  }

  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    role: session.user.role,
  };
}

export async function requireAdmin() {
  const user = await getCurrentAdmin();
  if (!user) {
    redirect("/admin/login");
  }
  return user;
}

export async function loginAdmin(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail || !password.trim()) {
    return { ok: false as const, error: "Informe e-mail e senha." };
  }

  const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (!user || !user.isActive) {
    return { ok: false as const, error: "Credenciais inválidas." };
  }

  const validPassword = await bcrypt.compare(password, user.passwordHash);
  if (!validPassword) {
    return { ok: false as const, error: "Credenciais inválidas." };
  }

  await createAdminSession(user.id);
  return { ok: true as const };
}

export async function requireApiAdmin() {
  const user = await getCurrentAdmin();
  if (!user) {
    return null;
  }
  return user;
}
