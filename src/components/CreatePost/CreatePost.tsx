/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type UserInput = {
    text: string;
    title: string;
};

const CreatePost = () => {
    const [isTitle, setTitle] = useState<string>("");
    const [valueHtml, setValueHtml] = useState<UserInput>({
        text: "",
        title: "",
    });

    const handleEditorChange = (value: string) => {
        setValueHtml({
            ...valueHtml,
            title: isTitle,
            text: value,
        });
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.target.value);
        setValueHtml({
            ...valueHtml,
            title: isTitle,
            text: valueHtml.text,
        });
    };

    console.log(valueHtml);
    return (
        <>
            <div className='mt-20'></div>
            <div
                style={{ border: "2px solid #E8F2FE", borderRadius: "10px", marginTop: "10px" }}
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
                        value={valueHtml.text}
                        formats={formats}
                        modules={modules}
                        theme='snow'
                    />
                </div>
            </div>
        </>
    );
};

const modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
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
