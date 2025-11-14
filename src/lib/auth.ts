import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { Session } from "next-auth";

export async function getSession(): Promise<Session | null> {
    try {
        return await getServerSession(authOptions);
    } catch (error) {
        // Handle specific NextAuth errors
        if (error instanceof Error) {
            if (error.name === 'JWEDecryptionFailed') {
                console.warn("JWT decryption failed - likely due to incognito mode or corrupted session");
                return null;
            }
            if (error.message.includes('decryption operation failed')) {
                console.warn("Session decryption failed - returning null session");
                return null;
            }
        }
        console.error("Unexpected error getting session:", error);
        return null;
    }
}
