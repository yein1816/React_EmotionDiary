import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import MyButton from "./MyButton"
import DiaryItem from './DiaryItem'

// 시간 분류 리스트
const sortOptionList = [
    {
        value: 'lastest',
        name: '최신순'
    },
    {
        value: 'oldest',
        name: '오래된 순'
    }
]

// 감정 분류 리스트
const filterOptionList = [
    {
        value: 'all',
        name: '전부'
    },
    {
        value: 'good',
        name: '좋은 감정'
    },
    {
        value: 'bad',
        name: '안좋은 감정'
    },
]

//select 박스에 메뉴 보여지게 하는 함수
//React.memo란 데이터가 변하지 않는이상 렌더링을 안하게 memoization 해주는 함수
const ControlMenu = React.memo(({ value, onChange, optionList }) => {
    // it이 가리키는건 optionList 의 첫번째 객체(첫번째가 먼저 기본값으로 보이게),
    // idx는 key 값 (명칭은 맘대로 해도 됨, map 쓰일 때, key값은 꼭 필요함!!)
    return (
        <select
            className="ControlMenu"
            value={value}
            onChange={(e) => onChange(e.target.value)}>
            {optionList.map((it, idx) =>
                <option
                    value={it.value}
                    key={idx}>{it.name}
                </option>
            )}
        </select>
    )
});


const DiaryList = ({ diaryList }) => {
    // 새 일기 쓰기 클릭 시 다른 페이지로 이동하기 위해서 선언
    const navigate = useNavigate();

    // 정렬 (최신순, 오래된 순 , 초기값은 최신순으로)
    const [sortType, setSortType] = useState("lastest");

    // 감정 필터하기위한 함수
    const [filter, setFilter] = useState("all");

    // 최신순, 오래된 순  정렬 시 나오는 리스트 구분을 주기 위해 쓴 함수
    const getProcessedDiaryList = () => {

        // 감정 비교 함수
        const filterCallBack = (item) => {
            if (filter === "good") {
                return parseInt(item.emotion) <= 3;
            } else {
                return parseInt(item.emotion) > 3;
            }
        }
        // 순서 비교 함수
        const compare = (a, b) => {
            if (sortType === "lastest") {
                return parseInt(b.date) - parseInt(a.date);  //parseInts는 형변환하는 함수
            } else {
                return parseInt(a.date) - parseInt(b.date);
            }
        }
        const copyList = JSON.parse(JSON.stringify(diaryList))
        // JSON.stringify 이란 diaryList 배열에 넣은 값을 고대로 복사해서 문자화 한다 => "[]"  배열자체를 문자화함.
        // 그걸 JSON.parse 해서 다시 배열로 만듬. 결론 배열 copy 이고, 그 값을 copyList에 담는다.
        // 이걸 왜 했냐, 배열을 건드리는 작업을 안하기 위해서.. (좀 더 이해가 필요함.)

        const filterList =
            filter === "all" ?
                copyList :
                copyList.filter((it) => filterCallBack(it));
        const sortedList = filterList.sort(compare);
        return sortedList;

    }
    return (
        <div className="DiaryList">
            <div className="menu_wrapper">
                <div className="left_col">
                    <ControlMenu
                        value={sortType}
                        onChange={setSortType}
                        optionList={sortOptionList}
                    />
                    <ControlMenu
                        value={filter}
                        onChange={setFilter}
                        optionList={filterOptionList}
                    />
                </div>
                <div className="right_col">
                    <MyButton
                        type={"positive"}
                        text={"새 일기 쓰기"}
                        onClick={() => navigate("/new")}
                    />
                </div>
            </div>

            {getProcessedDiaryList().map((it) => (
                <DiaryItem key={it.id} {...it} />
            ))}
        </div>
    )

}

DiaryList.defaultProps = {
    diaryList: [],
}

export default DiaryList;