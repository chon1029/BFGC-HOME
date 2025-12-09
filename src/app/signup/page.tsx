import PageLayout from '@/components/layout/PageLayout'
import SignUpForm from '@/components/forms/SignUpForm'
import Image from 'next/image'

export default function SignUpPage() {
  return (
    <PageLayout breadcrumbs={[]}>
      {/* Immersive Background Section */}
      <div className="relative min-h-[80vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">

        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/herosection/worship.jpg"
            alt="Worship Background"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white mb-2 drop-shadow-lg">
              새 가족 환영합니다
            </h1>
            <p className="text-slate-200 shadow-sm">
              부다페스트한인선교교회의 온라인 멤버십 가입
            </p>
          </div>
          <SignUpForm />
        </div>
      </div>
    </PageLayout>
  )
}
