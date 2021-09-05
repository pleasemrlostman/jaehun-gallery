import Content from "components/Content";
import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Home = ({ userObj }) => {
    const [contents, setContents] = useState([]);
    const [contentText, setContentText] = useState("");
    const [writer, setWriter] = useState("");
    const [attachment, setAttachment] = useState("");
    const [writeModal, setWriteModal] = useState(false);
    const today = {
        todayYear: new Date().getFullYear(),
        todayMonth: new Date().getMonth() + 1,
        todayDay: new Date().getDate(),
        todayHours:
            new Date().getHours() < 10
                ? "0" + new Date().getHours()
                : new Date().getHours(),
        todayMinutes:
            new Date().getMinutes() < 10
                ? "0" + new Date().getMinutes()
                : new Date().getMinutes(),
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        let attachmentUrl = "";
        if (attachment !== "") {
            const attachmentRef = storageService
                .ref()
                .child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(
                attachment,
                "data_url"
            );
            attachmentUrl = await response.ref.getDownloadURL();
        }
        if (contentText !== "" && writer !== "") {
            await dbService.collection("contents").add({
                text: contentText,
                writedDate: `${today.todayYear}년 ${today.todayMonth}월 ${today.todayDay}일 ${today.todayHours}시 ${today.todayMinutes}분`,
                createdDate: Date.now(),
                writerNickname: writer,
                userId: userObj.uid,
                attachmentUrl,
            });
            setContentText("");
            setWriter("");
            setAttachment("");
        } else {
            if (writer === "" && contentText === "") {
                alert("닉네임과 저에게 하고싶은 말을 작성해주세요");
            } else if (writer === "") {
                alert("닉네임를 입력해 주세요");
            } else if (contentText === "") {
                alert("저에게 하고싶은 말을 작성해주세요");
            }
        }
        setWriteModal((prev) => !prev);
    };
    const writeContentText = (e) => {
        const {
            target: { value },
        } = e;
        setContentText(value);
    };
    const setWriterName = (e) => {
        const {
            target: { value },
        } = e;
        setWriter(value);
    };
    const onFileChange = (e) => {
        const {
            target: { files },
        } = e;

        const theFile = files[0];
        const reader = new FileReader();
        reader.readAsDataURL(theFile);

        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: { result },
            } = finishedEvent;
            setAttachment(result);
        };
    };

    const clearAttachment = () => {
        setAttachment("");
    };

    const changeWriteModal = () => {
        setWriteModal((prev) => !prev);
    };

    useEffect(() => {
        dbService
            .collection("contents")
            .orderBy("createdDate", "desc")
            .onSnapshot((snapshot) => {
                const contentsObj = snapshot.docs.map((value) => ({
                    id: value.id,
                    ...value.data(),
                }));
                setContents(contentsObj);
            });
    }, []);

    return (
        <>
            {writeModal && (
                <div className="w-full flex items-end fixed bottom-0 left-0 p-4 bg-black bg-opacity-80 h-full">
                    <div className="bg-white">
                        {attachment === "" ? null : (
                            <div className="flex items-center justify-center p-4">
                                <img className="w-6/12" src={attachment} />
                            </div>
                        )}
                        <div className="w-full">
                            <input
                                onChange={onFileChange}
                                className="pl-3 w-9/12"
                                type="file"
                                accept="image/*"
                            />
                            <button
                                className="w-3/12 p-3 text-white bg-red-600"
                                onClick={clearAttachment}
                            >
                                삭제
                            </button>
                        </div>

                        <form
                            onSubmit={onSubmit}
                            className="w-full flex flex-col"
                        >
                            <div className="w-full flex flex-col">
                                <div className="">
                                    <input
                                        onChange={setWriterName}
                                        value={writer}
                                        placeholder="닉네임"
                                        className="w-3/12 p-3 border"
                                    />
                                    <input
                                        onChange={writeContentText}
                                        value={contentText}
                                        className="border w-9/12 p-3 rounded"
                                        type="text"
                                        placeholder="나에게 하고싶은 말 작성해"
                                    />
                                </div>
                                <div className="flex items-center justify-center">
                                    <input
                                        className="w-6/12 p-3  text-white bg-blue-600"
                                        type="submit"
                                        value="작성하기"
                                    />
                                    <div
                                        onClick={changeWriteModal}
                                        className="w-6/12 p-3 text-center bg-gray-400 text-white"
                                    >
                                        취소하기
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <div className="p-4 pb-16 pt-16">
                {contents.map((value, id) => {
                    return <Content key={id} value={value} userObj={userObj} />;
                })}
            </div>
            {writeModal ? null : (
                <div
                    className="fixed bottom-0 left-0 w-full p-5 bg-blue-600 text-white text-center"
                    onClick={changeWriteModal}
                >
                    한마디 남기기
                </div>
            )}
        </>
    );
};

export default Home;
