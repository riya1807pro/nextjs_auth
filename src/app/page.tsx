import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500">
     <Link href="/signup">Visit SignUp Page</Link>
     <Link href="/profile">Visit profile Page</Link>
    </div>
  );
}
