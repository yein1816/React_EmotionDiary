import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from '../App';

import MyHeader from './../components/MyHeader';
import MyButton from './../components/MyButton';
import DiaryList from './../components/DiaryList';

const Home = () => {
    const diaryList = useContext(DiaryStateContext);

    const [data, setData] = useState([]);
    const [curDate, setCurDate] = useState(new Date());

    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `감정 일기장`;
    }, [])

    //변화감지 Hook 
    useEffect(() => {
        if (diaryList.length >= 1) {

            const firstDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                1
            ).getTime();

            const lastDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth() + 1,
                1
            ).getTime();

            setData(diaryList.filter(
                (it) => firstDay <= it.date && it.date < lastDay))
        }
    }, [diaryList, curDate])

    //월 증가 함수 (미래)
    const inCreaseMonth = () => {
        setCurDate(
            new Date(
                curDate.getFullYear(),
                curDate.getMonth() + 1,
                curDate.getDate()
            )
        )
    }

    // 월 감소 함수 (과거)
    const deCreaseMonth = () => {
        setCurDate(
            new Date(
                curDate.getFullYear(),
                curDate.getMonth() - 1,
                curDate.getDate()
            )
        )
    }

    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`
    return (
        <div>
            <MyHeader
                headText={headText}
                leftChild={
                    <MyButton
                        text={'<'} onClick={deCreaseMonth}
                    />}
                rightChild={
                    <MyButton
                        text={'>'}
                        onClick={inCreaseMonth}
                    />}
            />
            <DiaryList diaryList={data} />
        </div>
    )
}

export default Home;