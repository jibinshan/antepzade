"use client";
import { Icons } from "@/components/Icon";
import { Button } from "@/components/ui/button";
import { DebouncedInput } from "@/components/ui/debounced-input";

const SearchInput = ({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (query: string) => void;
}) => {
  const handleInputChange = (value: string | number) => {
    setQuery(value as string);
  };

  return (
    <div className="flex h-12 w-full items-center gap-[1.25rem] border-[1px] border-white bg-transparent px-[1.5rem] py-2 sm:min-w-[400px] md:h-auto md:w-fit md:min-w-[600px]">
      <DebouncedInput
        value={query}
        onChange={handleInputChange}
        placeholder="Search Your Perfect Dish"
        className="border-none bg-transparent px-0 py-0 text-[1rem] leading-[20%] text-[#9B948A] placeholder:leading-[20%] placeholder:text-[#9B948A] focus:outline-none focus-visible:ring-0 focus-visible:ring-primary focus-visible:ring-offset-0"
      />
      {/* <Icons.search className="text-primary" /> */}
      {/* {query && ( */}
      <Button
        variant="ghost"
        onClick={() => setQuery("")}
        className="h-fit w-fit rounded-full bg-slate-800/50 p-2 text-white hover:bg-slate-800/80 hover:text-white"
      >
        <Icons.close className="size-4" />
      </Button>
      {/* )} */}
    </div>
  );
};

export default SearchInput;
