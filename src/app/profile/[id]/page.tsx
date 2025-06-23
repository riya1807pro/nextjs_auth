export default async function ProfilePage({params}: any) {
return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
        <h1 className="flex p-4 m-4 justify-center items-center" >Profile Page</h1>
       <span className="text-2px text-yellow-300">id: {await params.id}</span>
    </div>
)
}