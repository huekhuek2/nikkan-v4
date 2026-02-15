
import { signIn, signOut } from "@/auth"
import { LogIn, LogOut } from "lucide-react"

export function LoginButton({ session }: { session: any }) {
    if (session) {
        return (
            <form
                action={async () => {
                    "use server"
                    await signOut()
                }}
            >
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors" type="submit">
                    <LogOut className="w-4 h-4" />
                    로그아웃
                </button>
            </form>
        )
    }
    return (
        <form
            action={async () => {
                "use server"
                await signIn("google")
            }}
        >
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors" type="submit">
                <LogIn className="w-4 h-4" />
                로그인
            </button>
        </form>
    )
}
