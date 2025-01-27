import Menu from "@/app/menu/Menu";
import MenuMobile from "./MenuMobile";
import Navbar from "@/components/Navbar";

export default function MenuPage() {
    return (
        <section className="w-full flex flex-col justify-start items-center bg-menubackground">
            <div className="hidden md:flex w-full justify-center">
                <Navbar position="static" />
            </div>
            <div className="hidden w-full justify-center items-center md:flex">
                <Menu />
            </div>
            <div className="flex w-full justify-center items-center md:hidden">
                <MenuMobile />
            </div>
        </section>
    );
}
