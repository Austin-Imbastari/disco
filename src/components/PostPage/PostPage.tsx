import React from "react";

const PostPage = () => {
    /// Fetch the post
    return (
        <>
            <div className='mt-20'></div>
            <div
                style={{ border: "2px solid #E8F2FE", borderRadius: "10px", marginTop: "10px" }}
                className='container mx-auto px-8 py-8'
            >
                <div className=''>
                    <h1 className='mb-1 font-bold text-xl'>What is Javascript</h1>
                    <h4>April 15, 2024</h4>

                    <div className='mt-5'>
                        <p className='leading-8 '>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda fugiat magni nesciunt
                            est molestias quam maiores excepturi tenetur in ipsum totam a enim neque, harum officia
                            corrupti perspiciatis inventore alias labore placeat eius. Ipsam accusamus reiciendis quidem
                            nesciunt inventore incidunt eveniet. A vero iste explicabo voluptate voluptas tempore
                            ratione sequi omnis atque pariatur corrupti quod rem eum nisi, expedita error. Dolores quia
                            est facere iusto aut iure dignissimos at, laudantium officia velit accusantium culpa
                            perferendis quidem ab nobis eius, optio iste placeat. Sunt nam error minus voluptatum culpa,
                            eum praesentium illo odio obcaecati quidem, animi eligendi vel doloremque suscipit dolorem?
                        </p>
                    </div>

                    <div className='mt-10 flex justify-center'>
                        <div className='w-1/2 flex flex-col justify-center items-center'>
                            <textarea
                                style={{ resize: "none", outline: "none" }}
                                className='block mb-4 p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border h-40'
                                placeholder='Add a comment here... '
                            ></textarea>
                            <form>
                                <div className='container mt-1 mx-auto px-8  h-16'>
                                    <div className=' '>
                                        <button className='bg-mint text-black px-2 py-2 rounded-md border-solid border-2 border-azure hover:bg-azure tracking-wide transition-colors duration-200'>
                                            Comment
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostPage;
