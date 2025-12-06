export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="bg-[url(/images/background4.jpg)] bg-no-repeat bg-cover bg-center min-h-screen flex justify-center items-center">
                {children}
            </div>
        </>
    );
}