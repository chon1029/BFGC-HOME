
import PageLayout from '@/components/layout/PageLayout';
import LoginForm from '@/components/forms/LoginForm';

export default function LoginPage() {
  return (
    <PageLayout breadcrumbs={[]}>
      {/* Immersive Background Section */}
      <div className="relative min-h-[80vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">

        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transform scale-105"
          style={{ backgroundImage: "url('/images/herosection/worship.jpg')" }}
        />

        {/* Overlay for better contrast */}
        <div className="absolute inset-0 z-10 bg-slate-900/60 backdrop-blur-[2px]" />

        {/* Content */}
        <div className="relative z-20 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 shadow-sm">
              교회 멤버십
            </h1>
            <p className="text-slate-200 shadow-sm">
              예배와 선교에 헌신된 우리와 함께 예배하고 교제하세요
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </PageLayout>
  );
}
