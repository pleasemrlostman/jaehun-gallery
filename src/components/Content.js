import { dbService, storageService } from "fbase";
import React, { useState } from "react";

const Content = ({ value, userObj }) => {
    const [nowContentText, setNowContentText] = useState(value.text);
    const [changeTextStatus, setChangeTextStatus] = useState(false);

    const deleteContent = async () => {
        const ok = window.confirm("정말로 삭제하시겠습니까?");
        if (ok) {
            dbService.doc(`contents/${value.id}`).delete();
            if (value.attachmentUrl !== "") {
                await storageService.refFromURL(value.attachmentUrl).delete();
            }
        }
    };
    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setNowContentText(value);
    };

    const toggleTextStatus = () => {
        setChangeTextStatus((prev) => !prev);
    };

    const changeText = (e) => {
        e.preventDefault();
        dbService.doc(`contents/${value.id}`).update({ text: nowContentText });
        setChangeTextStatus((prev) => !prev);
    };

    return (
        <div className="border border-blue-500 flex flex-col p-4 rounded-xl mb-4">
            <div className="mb-3 flex items-center text-xs justify-between">
                <span className="ml-1">
                    작성자:&nbsp;{value.writerNickname}
                </span>
                {userObj.uid === value.userId ? (
                    <div className="flex gap-1">
                        <button onClick={toggleTextStatus}>수정</button>
                        <button onClick={deleteContent}>삭제</button>
                    </div>
                ) : null}
            </div>
            {value.attachmentUrl ? (
                <div>
                    <img
                        className="w-full mb-4 rounded-2xl"
                        src={value.attachmentUrl}
                    />
                </div>
            ) : null}
            {changeTextStatus ? (
                <form
                    onSubmit={changeText}
                    className="flex border-black-500 border w-full mb-3"
                >
                    <input
                        className="p-3 w-10/12"
                        onChange={onChange}
                        type="text"
                        value={nowContentText}
                    />
                    <input className="p-3 w-2/12 text-xs" type="submit" />
                </form>
            ) : (
                <div className="mb-2">{value.text}</div>
            )}
            <div className="text-xs text-right">{value.writedDate}</div>
        </div>
    );
};

export default Content;
