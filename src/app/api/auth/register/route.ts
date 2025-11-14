import bcrypt from 'bcrypt';
import { prisma } from '@/lib/db'; // Import your database connection or ORM here
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Obtener todos los usuarios de la base de datos
        const users = await prisma.user.findMany();

        // Excluir la contraseña de los resultados antes de devolverla
        const usersWithoutPassword = users.map(user => {
            const { password, ...userWithoutPassword } = user;  // Excluye la contraseña
            return userWithoutPassword;
        });

        // Responder con los usuarios
        return NextResponse.json({ users: usersWithoutPassword });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Unable to fetch users." }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const data = await request.json();
    const { username, email, password, confirmPassword } = data;

    // Basic validation
    if (!username || !email || !password || !confirmPassword) {
        return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }
    if (password !== confirmPassword) {
        return NextResponse.json({ error: "Passwords do not match." }, { status: 400 });
    }

    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists." }, { status: 400 });
        }

        // Hash the password before storing it
        const saltRounds = process.env.BCRYPT_SALT_ROUNDS || 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });
        const { password: _, ...user } = newUser; // Exclude password from response
        return NextResponse.json({ message: "User registered successfully.", user }, { status: 201 });

    } catch (error) {
        // Bcrypt error handling (though unlikely, we catch it just in case)
        if (error instanceof Error && error.message.includes('bcrypt')) {
            console.error("Bcrypt error:", error);
            return NextResponse.json({ error: "Error processing password encryption. Please try again." }, { status: 500 });
        }
        console.error("Error registering user:", error);
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}
