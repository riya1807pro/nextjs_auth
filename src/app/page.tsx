import Link from "next/link";

export default function Home() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-black dark:text-white px-4" style={{ marginTop: "-10px" }}>
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Welcome</h1>

      <div className="space-y-4 w-full max-w-xs">
        <Link
          href="/Signup"
          className="block w-full text-center py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition"
        >
          Visit Signup Page
        </Link>

        <Link
          href="/Profile"
          className="block w-full text-center py-2 rounded bg-green-600 hover:bg-green-700 text-white transition"
        >
          Visit Profile Page
        </Link>
        <Link
          href="/ForgetPassword"
          className="block w-full text-center py-2 rounded bg-green-600 hover:bg-green-700 text-white transition"
        >
          Visit forgetting password Page
        </Link>
      </div>
    </div>
  );
}
