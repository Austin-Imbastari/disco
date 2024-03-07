/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
    const navigate = useNavigate();
    const [isTitle, setTitle] = useState<string>("");
    const [valueHtml, setValueHtml] = useState<string>("");

    const handleEditorChange = (value: string) => {
        setValueHtml(value);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setTitle(value);
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isTitle.length <= 0 && valueHtml.length <= 0) {
            alert("You must enter a post!");
            return;
        }

        const objToSubmit = {
            subject: isTitle,
            text: valueHtml,
            boardId: 1,
            userId: 1,
        };

        console.log(objToSubmit);

        // fetch post
        const response = await fetch("https://disco-app-7sxty.ondigitalocean.app/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(objToSubmit),
        });

        try {
            const data = await response.json();
            const postId = data.id;
            navigate(`/post/${postId}`);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className='mt-20'></div>
            <div
                style={{ border: "2.5px solid #E8F2FE", borderRadius: "10px", marginTop: "10px" }}
                className='container mx-auto px-8 py-8'
            >
                <div className=''>
                    <h1 className='mb-2 font-bold text-xl'>Title</h1>
                    <textarea
                        onChange={handleTitleChange}
                        style={{ resize: "none", outline: "none" }}
                        className='block mb-4 p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border h-10'
                        value={isTitle}
                    ></textarea>
                </div>
                <div>
                    <ReactQuill
                        onChange={handleEditorChange}
                        value={valueHtml}
                        formats={formats}
                        modules={modules}
                        theme='snow'
                    />
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className='container mt-1 mx-auto px-8 relative h-16'>
                            <div className='absolute bottom-0 right-0 '>
                                <button className='bg-mint text-black px-2 py-2 rounded-md border-solid border-2 border-azure hover:bg-azure tracking-wide transition-colors duration-200'>
                                    Submit Post
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
        [{ size: [] }],
        ["bold", "code-block", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
        ["link", "image", "video"],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
};

const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
];

export default CreatePost;
