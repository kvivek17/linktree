'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';  
export default function Home() {
  const router = useRouter();
  const [text, settext] = useState("")
  const create =()=>{
  
router.push(`/generate?handle=${text}`)
  }
  return (
    <>
      <main>
        <section className="bg-blue-300 min-h-[100vh] grid grid-cols-2">
          <div className="  flex flex-col justify-center items-center ml-[10vw]">
            <h1 className="text-5xl  text-white font-bold">Everthing you are,In one simple  Link in Bio.</h1>
            <p className="text-blue-950">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt repudiandae sequi sit sapiente iste non, suscipit dolorem similique temporibus, asperiores, facere fugiat? Magnam veritatis earum accusantium voluptas dignissimos amet atque.</p>
        <div className="flex mr-[7vw] items-center  gap-5 mt-8 ">
          <input value={text} onChange={(e)=>settext(e.target.value)} className="bg-white p-2 rounded-lg focus:outline-blue-500" type="text" placeholder="enter handle" />
          <button onClick={()=>{create()}} className="bg-blue-700 text-white font-bold p-2.5 rounded-full">Claim your ProfileTree</button>
        </div>
          </div>
          <div className=" flex flex-col justify-center items-center mr-[10vw]" >
            <img src="/social.png" alt="" />

          </div>
        </section>
        <section className="bg-blue-600 min-h-[100vh]">

        </section>
      </main>
    </>
  );
}
