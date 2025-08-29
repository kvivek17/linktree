import Link from "next/link";
import clientPromise from "@/lib/mongo";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
    const handle = params.handle;

    const client = await clientPromise;
    const db = await client.db("ProfileTree")
    const collection = await db.collection("link")
    const item = await collection.findOne({handle:handle})
    if(!item){
        return notFound()
    }
    


//     const item = {
//   "_id": {
//     "$oid": "685af31d4b457894dbc8829a"
//   },
//   "links": [
//     {
//       "link": "www.facebook.com",
//       "linktext": "Facebook"
//     },
//     {
//       "link": "www.instagram.com",
//       "linktext": "Instagram"
//     },
//     {
//       "link": "www.google.com",
//       "linktext": "Google"
//     }
//   ],
//   "picture": "wolf",
//   "handle": "lupin"
// }
    return (
  <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-200 flex justify-center items-center p-4">
    {item && (
      <div className="flex flex-col items-center bg-white/40 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-md">
        <img
          className="rounded-full border-4 border-white shadow-lg w-28 h-28 object-cover mb-4"
          src="/social.png"
          alt="Profile"
        />
        <span className="text-2xl font-bold text-gray-800">@{item.handle}</span>

        <div className="mt-6 w-full space-y-4">
          {item.links.map((i, index) => (
            <a
              href={`https://${i.link}`}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white text-center text-lg font-semibold text-purple-800 hover:text-white hover:bg-purple-800 transition-all duration-300 rounded-2xl py-3 shadow-md hover:shadow-xl"
            >
              {i.linktext}
            </a>
          ))}
        </div>
      </div>
    )}
  </div>
);


}