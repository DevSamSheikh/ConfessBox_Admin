import { CustomLink } from '@/components/shared/Link';
import { Button } from '@/components/shared/ui/button';

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Starter Page
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          This is a clean starter template. Ready to build your application!
        </p>
        <div className="space-y-2 text-sm text-gray-500 dark:text-gray-500">
          <p>✅ Next.js 15.5.9 with App Router</p>
          <p>✅ TypeScript configured</p>
          <p>✅ Tailwind CSS styling</p>
          <p>✅ Theme system ready</p>
          <p>✅ Component library available</p>
        </div>

        <div className="mt-10 flex items-center justify-center">
          <Button asChild variant="primary" className="rounded-full">
            <CustomLink href="/dashboard">Open dashboard</CustomLink>
          </Button>
        </div>
      </div>
    </div>
  );
}
