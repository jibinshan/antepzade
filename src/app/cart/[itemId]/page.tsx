import MenuItems from "./MenuItems";

const page = async (props: {
    params: Promise<{
        itemId: string;
    }>;
}) => {
    const params = await props.params;
    if (params.itemId) {
        return <MenuItems itemId={params.itemId} />;
    }
    return <div>Menu ID not provided</div>;
};

export default page;
