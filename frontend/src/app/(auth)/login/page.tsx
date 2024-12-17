import LoginForm from "@/components/auth/LoginForm";
import TypographyH2 from "@/components/ui/TypographyH2";

const Page = () => {
    return (<section>
        <TypographyH2 title="Login"/>
        <LoginForm />
    </section>);
}

export default Page;