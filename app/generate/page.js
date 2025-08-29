"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useRouter } from "next/navigation";

const Generate = () => {
  const router = useRouter();
  const [links, setlinks] = useState([{ link: "", linktext: "" }]);
  const [handle, sethandle] = useState("");
  const [picture, setpicture] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const value = params.get("handle");
    if (value) sethandle(value);
  }, []);

  const savelink = async () => {
    const raw = JSON.stringify({ links, picture, handle });

    const r = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: raw,
    });

    const result = await r.json();
    if (result.success) {
      toast.success(result.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });

      sethandle("");
      setlinks([{ link: "", linktext: "" }]);
      setpicture("");
      router.push(`/${handle}`);
    } else {
      toast.error(result.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handlechange = (index, link, linktext) => {
    setlinks((initialLinks) =>
      initialLinks.map((item, i) => (i === index ? { link, linktext } : item))
    );
  };

  const addlink = () => {
    setlinks([...links, { link: "", linktext: "" }]);
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-blue-300 min-h-screen grid grid-cols-2 text-gray-800">
        <div className="flex justify-center items-center flex-col gap-4">
          <div className="flex flex-col gap-5">
            <h1 className="font-bold text-3xl mt-15">Create your ProfileTree</h1>

            <div className="item">
              <h1 className="font-bold">Step 1: Claim your handle</h1>
              <div className="mx-4">
                <input
                  value={handle}
                  onChange={(e) => sethandle(e.target.value)}
                  className="bg-white px-4 py-2 rounded-lg mx-2 my-2"
                  type="text"
                  placeholder="choose a handle"
                />
              </div>
            </div>

            <div className="item">
              <h1 className="font-bold">Step 2: Add Links</h1>
              {links.map((item, index) => (
                <div key={index} className="mx-4">
                  <input
                    value={item.link}
                    onChange={(e) =>
                      handlechange(index, e.target.value, item.linktext)
                    }
                    className="bg-white px-4 py-2 mx-2 my-2 rounded-lg focus:outline-blue-900"
                    type="text"
                    placeholder="Enter link"
                  />
                  <input
                    value={item.linktext}
                    onChange={(e) =>
                      handlechange(index, item.link, e.target.value)
                    }
                    className="bg-white px-4 py-2 mx-2 my-2 rounded-lg focus:outline-blue-900"
                    type="text"
                    placeholder="Enter link text"
                  />
                </div>
              ))}

              <button
                className="bg-blue-600 text-white font-bold py-2 px-5 rounded-full"
                onClick={addlink}
              >
                Add links
              </button>
            </div>

            <div className="item">
              <h1 className="font-bold">Step 3: Add picture and finalize</h1>
              <div className="mx-4">
                <input
                  value={picture}
                  onChange={(e) => setpicture(e.target.value)}
                  className="bg-white px-4 py-2 mx-2 my-2 rounded-lg"
                  type="text"
                  placeholder="enter picture link"
                />
              </div>
              <div className="flex justify-center mt-5">
                <button
                  disabled={
                    picture === "" || handle === "" || links[0].linktext === ""
                  }
                  onClick={savelink}
                  className="disabled:bg-amber-100 bg-blue-600 text-white font-bold py-2 px-5 rounded-full"
                >
                  Create your ProfileTree
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-screen flex justify-center items-center">
          <img
            className="w-full max-w-lg h-fit object-contain rounded-2xl shadow-lg"
            src="/generate.jpg"
            alt="Generated"
          />
        </div>
      </div>
    </>
  );
};

export default Generate;
