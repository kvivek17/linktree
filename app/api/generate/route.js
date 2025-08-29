import clientPromise from "@/lib/mongo";


export async function POST(request){
const body = await request.json()
console.log(body);
const client = await clientPromise;
const db = client.db("ProfileTree")
const collection = db.collection("link")

const doc = await collection.findOne({handle:body.handle})
if(doc){
return Response.json({success:false,error:true, message:"Handle already exist"})
}
const result =await collection.insertOne(body)


return Response.json({success:true,error:false, message:"data recieved" ,result:result})

}