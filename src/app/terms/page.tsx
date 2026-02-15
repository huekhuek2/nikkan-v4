export default function TermsPage() {
    return (
        <main className="min-h-screen bg-black text-white p-8">
            <div className="max-w-3xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold mb-8">이용약관</h1>
                <section className="space-y-4">
                    <p className="text-zinc-400">
                        본 약관은 NIKKAN(이하 "사이트")이 제공하는 모든 서비스의 이용조건 및 절차, 이용자와 사이트의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.
                    </p>
                    <h2 className="text-xl font-semibold">제1조 (목적)</h2>
                    <p className="text-zinc-400">
                        이 약관은 이용자가 사이트가 제공하는 서비스를 이용함에 있어 사이트와 이용자 간의 권리, 의무 및 책임사항을 규정합니다.
                    </p>
                    <h2 className="text-xl font-semibold">제2조 (개인정보의 보호)</h2>
                    <p className="text-zinc-400">
                        사이트는 관련 법령이 정하는 바에 따라 이용자의 개인정보를 보호하기 위해 노력합니다.
                    </p>
                    {/* Add more standard terms as needed */}
                </section>
            </div>
        </main>
    );
}
