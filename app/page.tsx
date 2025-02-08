import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-[#2A1E5C]">
      <Image
      src="/logo.png"
      width={416}
      height={229}
      alt="Picture of the author"
    />
      <p className="mt-10 text-white text-7xl text-center font-[family-name:var(--font-jersey10)]">a alinhar os pixeis ...</p>
    </div>
  );
}
