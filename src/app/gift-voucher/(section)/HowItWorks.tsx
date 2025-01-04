const HowItWorks = ({ }) => {
  return (
    <div className="custom-scrollbar flex w-full max-w-[1300px] items-center gap-[1.2rem]">
      <div className="flex h-full w-full flex-col items-center justify-center gap-12 px-4 py-10">
        <h1 className="w-fit text-center font-oswald text-6xl sm:text-8xl">
          How It Works
        </h1>
        <div className="flex w-full max-w-[900px] flex-col gap-4">
          <div className="flex flex-col gap-4 border-b border-b-[#282828] py-2">
            <h1 className="font-bold">1. Choose Your Amount</h1>
            <p>
              Select a voucher value that suits your occasion, whether it&apos;s
              a small treat or a grand celebration.
            </p>
          </div>
          <div className="flex flex-col gap-4 border-b border-b-[#282828] py-2">
            <h1 className="font-bold">2. Personalize Your Gift</h1>
            <p>Add a personal message to make your gift extra special.</p>
          </div>
          <div className="flex flex-col gap-4 border-b border-b-[#282828] py-2">
            <h1 className="font-bold">3. Send or Receive</h1>
            <p>
              Choose to send the voucher directly to the recipient via email or
              print it for a personal handover.
            </p>
          </div>
          <div className="flex flex-col gap-4 border-b border-b-[#282828] py-2">
            <h1 className="font-bold">4. Dine at Bavette</h1>
            <p>
              Your recipient can visit Bavette and use the voucher to enjoy
              their choice of delicious steaks and more!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
