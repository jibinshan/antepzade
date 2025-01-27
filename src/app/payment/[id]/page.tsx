import Payment from "@/app/payment/[id]/Payment";
import { redirect } from "next/navigation";

const page = async (props: {
    params: Promise<{
        id: string;
    }>;
}) => {
    const params = await props.params;
    if (!params?.id) return redirect("/checkout");
    return (
        <main className="flex h-full min-h-screen w-full items-center justify-center">
            <Payment _id={params.id} />
        </main>
    );
};

export default page;
