import React from 'react';
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const DiaryItem = ({ id, emotion, content, date }) => {

    //작성한 날짜 값을 갖고오는 년월일로 나오게 하기위해 parseInt 형변환 함수 이용.
    const strDate = new Date(parseInt(date)).toLocaleDateString();

    const navigate = useNavigate();

    //각 일기 선택 시 일기 상세페이지로 이동하는 함수
    const goDtail = () => {
        navigate(`/diary/${id}`)
    }

    // 각 일기 선택 시 일시 수정페이지 이동하는 함수
    const goEdit = () => {
        navigate(`/edit/${id}`)
    }

    return (
        <div className="DiaryItem">
            <div
                onClick={goDtail}
                className={
                    ["emotion_img_wrapper",
                        `emotion_img_wrapper_${emotion}`].join(" ")
                }>
                <img src=
                    {process.env.PUBLIC_URL + `assets/emotion${emotion}.png`}
                />
            </div>
            <div className="info_wrapper">
                <div className="diary_date">
                    {strDate}
                </div>
                <div className="diary_content_preview">
                    {content.slice(0, 25)}
                </div>
            </div>
            <div className="btn_wrapper">
                <MyButton
                    text={"수정하기"}
                    onClick={goEdit}
                />
            </div>
        </div>
    )
}

export default React.memo(DiaryItem);