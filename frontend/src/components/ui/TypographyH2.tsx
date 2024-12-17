const TypographyH2: React.FC<{ title: string }> = ({ title }) => {
    return (<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center mb-3">
        {title}
    </h2>);
}

export default TypographyH2;