import { getServerSession } from "next-auth"
import Link from "next/link"
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route"

export const Navbar = async () => {
    const session = await getServerSession(authOptions);
    console.log(session);

    return (
        <nav className="flex justify-between bg-zinc-950 text-white px-24 py-5 items-center">
            <h1>NextAuth</h1>
            <ul className="flex gap-10">
                {
                    !session?.user ? (
                        <>
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>
                                <Link href="/login">Login</Link>
                            </li>
                            <li>
                                <Link href="/register">Register</Link>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link href="/dashboard">Dashboard</Link>
                        </li>
                    )
                }
            </ul>
            {session?.user && <h1 className="text-white">Hola {session?.user?.username}</h1>}
        </nav>
    )
}
