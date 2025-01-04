"use client";

import TableBookingForm from "@/app/table-booking/(section)/TableBookingForm";

const TableBooking = ({}) => {
  return (
    <div className="flex h-full w-full max-w-[1300px] items-center justify-center gap-[1.2rem] py-12">
      <TableBookingForm />
    </div>
  );
};

export default TableBooking;
