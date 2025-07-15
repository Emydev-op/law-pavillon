export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="w-screen h-screen bg-white-02 flex">
        <section className="hidden lg:flex h-full w-[43%] items-center justify-center bg-[url(/bgicon.png)] bg-contain bg-fixed bg-clip-padding">
          <div className="-ml-[20%]">
            <span className="bg-primary text-white-04 py-[5px] px-3 rounded-smd font-medium text-xs tracking-basic">
              LOGO
            </span>
            <h3 className="text-black-01 text-3xl xl:text-4xl font-bold mt-1.5">
              App Name
            </h3>
          </div>
        </section>
        <section className="flex-1 grid place-content-center overflow-x-hidden py-[30px] ">
          <div className="mx-auto text-center mb-4 lg:hidden">
            <span className="bg-primary text-white-04 py-[5px] px-2.5 rounded-smd font-medium text-[10px] tracking-basic">
              LOGO
            </span>
            <h3 className="text-black-01 text-2xl font-bold mt-1.5">
              App Name
            </h3>
          </div>
          <div className="overflow-y-scroll w-full scrollbar-none">
            <main className="bg-white rounded-[10px] w-full lg:w-[31.125rem] text-wrap px-9 py-[30px]">
              {children}
            </main>
          </div>
        </section>
      </main>
    </>
  );
}
