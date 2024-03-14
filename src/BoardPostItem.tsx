export const BoardPostItem = ({
    author,
    subject,
    createdDate,
}: {
    author: string;
    subject: string;
    createdDate: string;
}) => {
    return (
        <div className='grid grid-cols-1 gap-5'>
            <div style={{ borderBottom: "2.5px solid #E8F2FE" }} className=''>
                <div className='flex justify-between px-4 py-10'>
                    <div style={{ width: "100%" }} className='flex flex-col'>
                        <div className='flex items-center justify-between '>
                            <h1 className='text-2xl font-bold tracking-wide'>{subject}</h1>
                            <div>
                                <h1 className='text-l font-medium'>{author}</h1>
                            </div>
                        </div>
                        <p className='font-light tracking-wide'>{createdDate}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
