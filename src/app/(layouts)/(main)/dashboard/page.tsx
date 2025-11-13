'use client'
import { signOut } from "next-auth/react"

const DashboardPage = () => {
    return (
        <div className='text-white h-dvh w-full gap-10 flex justify-center items-center'>
            <h1 className='text-4xl'>Dashboard</h1>
            <button
                onClick={() => signOut()}
                className='bg-white text-black px-4 py-2 cursor-pointer rounded-md'>
                LogOut
            </button>
        </div>
    )
}

export default DashboardPage