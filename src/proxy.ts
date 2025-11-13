import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
    const token = await getToken({ req: request });
    const pathname = request.nextUrl.pathname;

    // 🚫 Si hay sesión y va a login o register → al dashboard
    if (token && (pathname.startsWith("/login") || pathname.startsWith("/register"))) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // 🚫 Si hay sesión y está en la raíz "/" → al dashboard
    if (token && pathname === "/") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // 🔐 Si NO hay sesión y quiere entrar al dashboard → al login
    if (!token && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Si nada aplica → pasar
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/dashboard/:path*",
        "/login",
        "/register",
    ],
};
