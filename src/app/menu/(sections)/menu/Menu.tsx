"use client";
import MenuItem from "@/app/menu/(sections)/menu/MenuItem";
import Search from "@/app/menu/(sections)/menu/Search";
import { Button } from "@/components/ui/button";
import { useRestaurant } from "@/context/RestaurantContext";
import { getFilteredMenuItems } from "@/lib/menu-item-filter";
import { cn } from "@/lib/utils";
import { ChevronLeft, FileText } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import MenuItemMobile from "./MenuItemMobile";
import debounce from "lodash.debounce";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

const Menu = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const { sortedMenu } = useRestaurant();
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const { menuCategory } = useRestaurant();

  const fixedElementHeight = 150; // Adjust this value to match the height of your fixed element
  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [existCategory, setExistCategory] = useState<string[]>([])

  const handleScrollToCategory = (categoryId: string) => {
    const categoryElement = document.getElementById(categoryId);
    if (categoryElement) {
      const elementPosition =
        categoryElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - fixedElementHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "instant",
      });
      setCurrentCategory(categoryId);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const updateCurrentCategory = debounce(() => {
    let foundCategory = null;
    menuCategory?.forEach((item) => {
      const categoryElement = document.getElementById(item._id);
      if (categoryElement) {
        const rect = categoryElement.getBoundingClientRect();
        if (
          rect.top <= fixedElementHeight &&
          rect.bottom >= fixedElementHeight
        ) {
          foundCategory = item._id;
        }
      }
    });
    if (foundCategory) {
      setCurrentCategory(foundCategory);
    }
  }, 100); // Adjust the delay as needed

  useEffect(() => {
    const handleScroll = () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      updateCurrentCategory();
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuCategory, updateCurrentCategory]);

  useEffect(() => {
    if (currentCategory && buttonRefs.current[currentCategory]) {
      buttonRefs.current[currentCategory].scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "center",
      });
    }
  }, [currentCategory]);

  const lastCategory = sortedMenu?.[sortedMenu.length - 1];
  const lastCategoryItemsCount = lastCategory?.items.length ?? 0;

  useEffect(() => {
    const updatedCategories: string[] = [];
    sortedMenu?.forEach((data) => {

      if (data?.items?.find((item) => item.extras)?.extras?.availability?.days && data?.items?.find((item) => item.extras)?.extras?.menuItemOrderType) {
        const categoryexist = data.items.find(
          (Item) =>

            Item?.extras?.availability?.days.includes(
              format(Date.now(), "EEEE").toLowerCase()
            )
            &&
            (Item?.extras?.menuItemOrderType === "both" ||
              Item?.extras?.menuItemOrderType === "takeaway")
        )?._idCategory;

        if (categoryexist && !updatedCategories.includes(categoryexist)) {
          updatedCategories.push(categoryexist);
        }
      } else if (data?.items?.find((item) => item.extras)?.extras?.availability?.days) {
        const categoryexist = data.items.find(
          (Item) =>

            Item?.extras?.availability?.days.includes(
              format(Date.now(), "EEEE").toLowerCase()
            )
        )?._idCategory;
        if (categoryexist && !updatedCategories.includes(categoryexist)) {
          updatedCategories.push(categoryexist);
        }
      } else if (data?.items?.find((item) => item.extras)?.extras?.menuItemOrderType) {
        const categoryexist = data.items.find(
          (Item) =>

          (Item?.extras?.menuItemOrderType === "both" ||
            Item?.extras?.menuItemOrderType === "takeaway")
        )?._idCategory;

        if (categoryexist && !updatedCategories.includes(categoryexist)) {
          updatedCategories.push(categoryexist);
        }
      } else {
        const categoryexist = data.items.find(
          (Item) =>
            Item
        )?._idCategory;

        if (categoryexist && !updatedCategories.includes(categoryexist)) {
          updatedCategories.push(categoryexist);
        }
      }
    });

    setExistCategory(updatedCategories);
  }, [sortedMenu]);
  return (
    <section className="flex h-full w-full items-center justify-center">
      <div className="flex h-full w-full max-w-[1300px] flex-col gap-4 px-2 py-[2.5rem] pb-28 md:gap-[2rem]">
        <div className="fixed left-0 top-0 z-50 flex w-full flex-col gap-4 bg-background pb-2 pt-3 md:sticky md:gap-2 md:pt-2">
          <div className="flex w-full items-center justify-between gap-4">
            <div className="flex w-full gap-2 pr-4 md:pr-0">
              <div
                className="flex items-center justify-center md:hidden bg-white"
                onClick={() => router.back()}
              >
                <ChevronLeft className="text-black" />
              </div>
              <Search query={query} setQuery={setQuery} />
            </div>
            <Button
              className="hidden items-center gap-2 font-semibold text-white md:flex px-6 py-6"
              asChild
            >
              <Link href="/pdf/dine-in-menu.pdf" target="_blank">
                <FileText />
                Download Menu
              </Link>
            </Button>
          </div>
          <div
            ref={containerRef}
            className="hidden-scrollbar flex w-full max-w-[1300px] items-center gap-[0.4rem] overflow-x-scroll whitespace-nowrap"
          >
            {menuCategory?.map((item) => {
              return (
                <button
                  key={item._id}
                  ref={(el) => {
                    buttonRefs.current[item._id] = el;
                  }}
                  className={cn(
                    "w-fit border-b-2 border-b-transparent bg-primary px-6 py-4 font-semibold transition-all duration-300 ease-in-out md:bg-transparent text-black",
                    currentCategory === item._id &&
                    "bg-[#02264E] md:border-b-black",
                    existCategory.find((categoryid) => categoryid === item._id) !== item._id && "w-0 border-0 px-0 py-0 hidden"
                  )}
                  onClick={() => handleScrollToCategory(item._id)}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
        {sortedMenu &&
          getFilteredMenuItems({
            data: sortedMenu,
            query,
          }).map((data) => {
            return (
              <section
                key={data._id}
                id={data._id}
                className={cn(
                  "flex w-full mt-6 flex-col gap-2 lg:mt-0"
                  ,
                  data._id !== existCategory.find((categoryid) => categoryid === data._id) && "hidden mt-0 w-0 gap-0"
                )}
              >
                <h1
                  id={data._id}
                  className={cn(
                    data._id === currentCategory &&
                    "sticky top-[150px] z-40 w-full bg-[#f8f8f8] py-3 lg:static lg:top-0",
                    "font-sans text-xl font-bold tracking-[0.00938em] text-black",
                    data._id !== existCategory.find((categoryid) => categoryid === data._id) && "w-0 h-0 p-0 tracking-[0px]"
                  )}
                >
                  {
                    data._id === existCategory.find((categoryid) => categoryid === data._id) &&
                    data.categoryName
                  }
                </h1>
                <div className="hidden h-full w-full grid-cols-1 gap-4 md:grid lg:grid-cols-2">
                  {data.items.map((item) => {
                    if (
                      item.extras?.availability?.days.includes(format(Date.now(), "EEEE").toLowerCase()) &&
                      (item.extras?.menuItemOrderType === "both" || item.extras?.menuItemOrderType === "takeaway")) {
                      return <MenuItem key={item._id} id={item._id} />;
                    } else if (item.extras?.availability?.days.includes(format(Date.now(), "EEEE").toLowerCase())) {
                      return <MenuItem key={item._id} id={item._id} />;
                    } else if ((item.extras?.menuItemOrderType === "both" || item.extras?.menuItemOrderType === "takeaway")) {
                      return <MenuItem key={item._id} id={item._id} />;
                    } else if (!item.extras?.menuItemOrderType) {
                      return <MenuItem key={item._id} id={item._id} />;
                    } else if (!item.extras?.availability?.days) {
                      return <MenuItem key={item._id} id={item._id} />;
                    } else if (!item.extras?.menuItemOrderType && !item.extras?.availability?.days) {
                      return <MenuItem key={item._id} id={item._id} />;
                    } else {
                      return null;
                    }
                  })}
                </div>
                <div className="grid h-full w-full grid-cols-1 gap-4 md:hidden lg:grid-cols-2">
                  {data.items.map((item) => {
                    if (
                      item.extras?.availability?.days.includes(format(Date.now(), "EEEE").toLowerCase()) &&
                      (item.extras?.menuItemOrderType === "both" || item.extras?.menuItemOrderType === "takeaway")) {
                      return <MenuItemMobile key={item._id} id={item._id} />;
                    } else if (item.extras?.availability?.days.includes(format(Date.now(), "EEEE").toLowerCase())) {
                      return <MenuItemMobile key={item._id} id={item._id} />;
                    } else if ((item.extras?.menuItemOrderType === "both" || item.extras?.menuItemOrderType === "takeaway")) {
                      return <MenuItemMobile key={item._id} id={item._id} />;
                    } else if (!item.extras?.menuItemOrderType) {
                      return <MenuItemMobile key={item._id} id={item._id} />;
                    } else if (!item.extras?.availability?.days) {
                      return <MenuItemMobile key={item._id} id={item._id} />;
                    } else if (!item.extras?.menuItemOrderType && !item.extras?.availability?.days) {
                      return <MenuItemMobile key={item._id} id={item._id} />;
                    } else {
                      return null;
                    }
                  })}
                </div>
              </section>
            );
          })}
        {sortedMenu && (
          <>
            {lastCategoryItemsCount < 3 && (
              <div className="block h-[50vh] w-full md:hidden"></div>
            )}
            {lastCategoryItemsCount < 6 && (
              <div className="hidden h-[50vh] w-full md:block"></div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Menu;
