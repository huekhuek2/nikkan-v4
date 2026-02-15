export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-black text-white p-8">
            <div className="max-w-3xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold mb-8">개인정보처리방침</h1>
                <section className="space-y-4">
                    <p className="text-zinc-400">
                        NIKKAN(이하 "사이트")은 통신비밀보호법, 전기통신사업법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 정보통신서비스제공자가 준수하여야 할 관련 법령상의 개인정보보호 규정을 준수하며, 관련 법령에 의거한 개인정보처리방침을 정하여 이용자 권익 보호에 최선을 다하고 있습니다.
                    </p>
                    <h2 className="text-xl font-semibold">1. 수집하는 개인정보의 항목</h2>
                    <p className="text-zinc-400">
                        사이트는 회원가입, 상담, 서비스 신청 등등을 위해 아래와 같은 개인정보를 수집하고 있습니다.
                        <br />
                        - 수집항목 : 이메일, 접속 로그, 쿠키, 접속 IP 정보
                    </p>
                    <h2 className="text-xl font-semibold">2. 개인정보의 수집 및 이용목적</h2>
                    <p className="text-zinc-400">
                        사이트는 수집한 개인정보를 다음의 목적을 위해 활용합니다.
                        <br />
                        - 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산
                    </p>
                    {/* Add more standard privacy policy text as needed */}
                </section>
            </div>
        </main>
    );
}
