import MenuItems from "./MenuItems";

const page = async (props: {
    params: Promise<{
        menuid: string;
    }>;
}) => {
    const params = await props.params;

    if (params.menuid) {
        return <MenuItems id={params.menuid} />;
    }
    return <div>Menu ID not provided</div>;
};

export default page;
