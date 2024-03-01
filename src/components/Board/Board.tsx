import React from "react";

const Board = () => {
    return (
        <>
            <div
                style={{ border: "2px solid #E9F7E6", borderRadius: "10px", marginTop: "50px" }}
                className='container mx-auto px-8 py-8'
            >
                <div className='grid grid-cols-1 gap-5'>
                    <div style={{ borderBottom: "2px solid #E8F2FE" }} className=''>
                        <div className='flex justify-between px-4 py-10'>
                            <div style={{ width: "100%" }} className='flex flex-col'>
                                <div className='flex items-center justify-between '>
                                    <h1 className='text-2xl font-bold tracking-wide'>JAVASCRIPT</h1>
                                    <div>
                                        <h1 className='text-l font-medium'>Future Hendrix</h1>
                                    </div>
                                </div>
                                <p className='font-light tracking-wide'>April 15, 2024 </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-1 gap-5'>
                    <div style={{ borderBottom: "2px solid #E8F2FE" }} className=''>
                        <div className='flex justify-between px-4 py-10'>
                            <div style={{ width: "100%" }} className='flex flex-col'>
                                <div className='flex items-center justify-between '>
                                    <h1 className='text-2xl font-bold tracking-wide'>JAVASCRIPT</h1>
                                    <div>
                                        <h1 className='text-l font-medium'>Future Hendrix</h1>
                                    </div>
                                </div>
                                <p className='font-light tracking-wide'>April 15, 2024 </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-1 gap-5'>
                    <div style={{ borderBottom: "2px solid #E8F2FE" }} className=''>
                        <div className='flex justify-between px-4 py-10'>
                            <div style={{ width: "100%" }} className='flex flex-col'>
                                <div className='flex items-center justify-between '>
                                    <h1 className='text-2xl font-bold tracking-wide'>JAVASCRIPT</h1>
                                    <div>
                                        <h1 className='text-l font-medium'>Future Hendrix</h1>
                                    </div>
                                </div>
                                <p className='font-light tracking-wide'>April 15, 2024 </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-1 gap-5'>
                    <div style={{ borderBottom: "2px solid #E8F2FE" }} className=''>
                        <div className='flex justify-between px-4 py-10'>
                            <div style={{ width: "100%" }} className='flex flex-col'>
                                <div className='flex items-center justify-between '>
                                    <h1 className='text-2xl font-bold tracking-wide'>JAVASCRIPT</h1>
                                    <div>
                                        <h1 className='text-l font-medium'>Future Hendrix</h1>
                                    </div>
                                </div>
                                <p className='font-light tracking-wide'>April 15, 2024 </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Board;

// CSS Helper
// style={{ border: "2px solid red" }}

// Dynamic create post

// import React from "react";
// const PostGrid = ({ posts }) => {
//   return (
//     <div className="grid grid-cols-3 gap-4">
//       {posts.map((post, index) => (
//         <div key={index} className="bg-gray-200 p-4">
//           {post.title}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PostGrid;
