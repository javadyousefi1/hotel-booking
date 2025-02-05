import SignupForm from '@/components/auth/SignupForm';
import TypographyH2 from '@/components/ui/TypographyH2';
import Link from 'next/link';

const Page = () => {
  return (
    <section>
      <TypographyH2 title="Signup" />
      <SignupForm />
      <Link href="/login">
        <p className="text-primary underline text-center mt-3 text-sm">
          already you have account ? login
        </p>
      </Link>
    </section>
  );
};

export default Page;
