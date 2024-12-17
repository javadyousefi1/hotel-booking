import LoginForm from "@/components/auth/LoginForm";
import TypographyH2 from "@/components/ui/TypographyH2";
import Link from "next/link";

const Page = () => {
    return (<section>
        <TypographyH2 title="Login" />
        <LoginForm />
        <Link href="/signup">
            <p className="text-primary underline text-center mt-3 text-sm">
                you did not have account ? signup
            </p>
        </Link>
    </section>);
}

export default Page;