import Link from "next/link"
import { getSession } from "@/lib/auth"

const navbarArrayNoAuth = [
    { name: 'Home', path: '/' },
    { name: 'Login', path: '/login' },
    { name: 'Register', path: '/register' },
];

export const Navbar = async () => {
    const session = await getSession();
    console.log(session);

    return (
        <nav className="flex justify-between w-full fixed bg-zinc-950 text-white px-24 py-5 items-center">
            <h1>NextAuth</h1>
            <ul className="flex gap-10">
                {
                    !session?.user ? (
                        <>
                            {navbarArrayNoAuth.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.path}>{link.name}</Link>
                                </li>
                            ))}
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
