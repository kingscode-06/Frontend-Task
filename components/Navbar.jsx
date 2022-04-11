import Image from "next/image";

export default function Navbar({ user }) {
  return (
    <div className="px-8 py-5 flex justify-between align-middle text-white bg-neutral-900 fixed w-full z-10">
      <div className="text-4xl font-bold">Edvora</div>
      <div className="flex items-center">
        <div className="mx-4 text-lg font-semibold">
          {user?.name || "Username"}
        </div>
        <div className="mx-2 rounded-full bg-neutral-700 h-10 w-10">
          <Image
            src={user?.profile_key || "https://picsum.photos/200"}
            alt="profile"
            height={40}
            width={40}
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
