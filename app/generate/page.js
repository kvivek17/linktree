"use client"
import {react,useState} from 'react'
  import { ToastContainer, toast } from 'react-toastify';
  import { Bounce } from 'react-toastify';
  import { useRouter, useSearchParams } from 'next/navigation';

const Generate = () => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const [links, setlinks] = useState([{link:"",linktext:""}])
  // const [linktxt, setlinktxt] = useState("")
  const [handle, sethandle] = useState(searchParams.get("handle"))
  const [picture, setpicture] = useState("")

  const savelink = async()=>{
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "links":links,
  "picture":picture,
  "handle":handle
});
console.log(raw);

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};



const r = await fetch("/api/generate", requestOptions)
const result = await r.json()
if(result.success){
toast.success(result.message, {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Bounce,
});
 
sethandle("")
setlinks([{ link: "", linktext: "" }])

setpicture("")
router.push(`/${handle}`)
}
else{
  toast.error(result.message, {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Bounce,
});
 
}
  }

const handlechange = (index,link,linktext)=>{
setlinks((initialLinks)=>{
 return initialLinks.map((item,i)=>{
    if(i===index){
      return{link,linktext}
    }
    else{
      return item
    }
})
})
}

const addlink = ()=>{  
setlinks(links.concat([{link:"",linktext:""}]))
}
  return (
    <>
    <ToastContainer/>
   <div className='bg-blue-300 min-h-screen grid grid-cols-2 text-gray-800'>

  <div className=' flex justify-center items-center flex-col gap-4'>
   <div className='flex flex-col gap-5'>
   <h1 className='font-bold text-3xl mt-15 '>Create your ProfileTree</h1> 
<div className='item'>
        
    <h1 className='font-bold  2xl'>step 1: Claim your handle</h1>
    <div className='mx-4'>
    <input value={handle || ""} onChange={(e)=>{sethandle(e.target.value)}} className='bg-white px-4 py-2 rounded-lg mx-2 my-2  ' type="text" placeholder='choose a handle' />
    </div>
      </div>
      <div className='item'>
    <h1 className='font-bold  2xl'>step 2:Add Links</h1>
    {links && links.map((item,index)=>{
      return   <div key={index} className='mx-4'>
    <input value={item.link || ""} onChange={(e)=>{handlechange(index,e.target.value,item.linktext)}} className='bg-white px-4 py-2 mx-2 my-2 rounded-lg focus:outline-blue-900 ' type="text" placeholder='Enter link' />
    <input value={item.linktext || ""} onChange={(e)=>{handlechange(index,item.link,e.target.value,)}} className='bg-white px-4 py-2 mx-2 my-2 rounded-lg focus:outline-blue-900 ' type="text" placeholder='Enter link text' />
    </div>
      
    })}
   
    <button className='bg-blue-600 text-white font-bold py-2 px-5 rounded-full ' onClick={()=>addlink()}>Add links</button>
   </div>
  <div className='item'>
      <h1 className='font-bold  2xl'>step 3:Add picture and finalize</h1>
    <div className="mx-4">
            <input value={picture || ""}  onChange={(e)=>{setpicture(e.target.value)}} className='bg-white px-4 py-2 mx-2 my-2 rounded-lg ' type="text" placeholder='enter link picture' />

   </div>
    <div className='flex  justify-center mt-5'>
      <button disabled={picture ==""|| handle =="" || links[0].linktext ==""} onClick={()=>{savelink()}} className= ' disabled:bg-amber-100 bg-blue-600 text-white font-bold py-2 px-5 rounded-full '>Create your profileTree</button>
    </div>
        </div>
   </div>
  </div>
  <div className='w-full h-screen flex justify-center items-center'>
    <img 
      className="w-full max-w-lg h-fit object-contain rounded-2xl shadow-lg"

      src="/generate.jpg" 
      alt="Generated"
    />
  </div>
</div>
</>

  )
}

export default Generate