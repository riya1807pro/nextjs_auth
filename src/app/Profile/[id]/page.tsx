/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function ProfilePage({ params } :any) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      <h1 className="text-3xl font-bold mb-6">Profile Page</h1>
      <span className="text-sm sm:text-base text-yellow-300">
        id: {await params.id}
      </span>
    </div>
  );
}
