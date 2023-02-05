import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import DiaryEditor from "../components/DiaryEditor";
import { DiaryStateContext } from './../App'

const Edit = () => {

    const [originData, setOriginData] = useState();
    const navigate = useNavigate();
    const { id } = useParams();

    const diaryList = useContext(DiaryStateContext);

    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `감정 일기장 - ${id}번 일기 수정`;
    }, [])

    useEffect(() => {
        if (diaryList.length >= 1) {
            const targetDiary = diaryList.find(
                (it) => parseInt(it.id) === parseInt(id)
            )
            console.log(targetDiary);

            if (targetDiary) {   //없는 id값을 입력 시  home 으로 가게하고, 뒤로 못가게 설정
                setOriginData(targetDiary);
            } else {
                alert("없는 일기 입니다.")
                navigate('/', { replace: true })
            }
        }
    }, [id, diaryList]);
    return (
        <div>
            {originData && <DiaryEditor isEdit={true} originData={originData} />}
        </div>
    )
}

export default Edit;

//const [searchParams, setSeachParams] = useSearchParams();

    // const id = searchParams.get('id');
    // console.log(`id : `, id);

    // const mode = searchParams.get('mode');
    // console.log(`mode : `, mode);

    // <button onClick={() => { setSeachParams({ who: "yen" }) }}>qs 바꾸기</button>
    // <button onClick={() => { navigate('/home') }}>home(메인으로가기)</button>
    // <button onClick={() => { navigate(-1) }}>뒤로가기</button>