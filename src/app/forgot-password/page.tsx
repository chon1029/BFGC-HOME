import PageLayout from '@/components/layout/PageLayout'
import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm'
import Image from 'next/image'

export default function ForgotPasswordPage() {
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
        <div className="relative z-10 w-full max-w-md mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2 drop-shadow-lg">
              비밀번호 찾기
            </h1>
            <p className="text-slate-200 shadow-sm">
              계정 정보를 잊으셨나요?
            </p>
          </div>
          <ForgotPasswordForm />
        </div>
      </div>
    </PageLayout>
  )
}
