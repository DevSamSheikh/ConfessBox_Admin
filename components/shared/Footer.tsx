import {
  LandingFooter,
  LandingFooterColumn,
  LandingFooterLink,
} from '@/components/landing';
import Image from 'next/image';
import Link from 'next/link';

export const Footer = ({ className }: { className?: string }) => {
  return (
    <LandingFooter
      className={className}
      title="ConfessBox_Admin"
      description="A simpler way to manage your money"
      withBackground
      withBackgroundGlow={false}
      variant="primary"
      backgroundGlowVariant="primary"
      withBackgroundGradient
      logoComponent={
        <div className="flex items-center text-primary-900 dark:text-primary-100 gap-3">
          <Image
            src="/static/images/logo.png"
            alt="ConfessBox_Admin logo"
            width={200}
            height={200}
            className="h-8 w-8 rounded-full"
          />
          {'ConfessBox_Admin '}
        </div>
      }
    >
      {/* Footer links removed - pages deleted for starter template */}
    </LandingFooter>
  );
};

export default Footer;
