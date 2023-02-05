import React, { useEffect, useReducer, useRef } from 'react';

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';


//COMPONENTS

//리듀서 상태관리
const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case 'EDIT': {
      newState = state.map((it) => it.id === action.data.id ? { ...action.data } : it)
      break;
    }
    default:
      return state;
  }
  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();


// const dummyData = [
//   {
//     id: 1,
//     emotion: 1,
//     content: "Today's my Diary",
//     date: 1665143794528,
//   }
// ];

function App() {

  useEffect(() => {
    //localStorage 문법은 키값과 데이터값을 선언해야한다. 
    //localStorage는 문자열로 반환된다. (값을 숫자,배열로 넣어도 )
    // localStorage.setItem("item1", 10);
    // localStorage.setItem("item2", "20");
    // localStorage.setItem("item3", JSON.stringify({ value: 30 }));

    // const item1 = localStorage.getItem("item1");
    // const item2 = JSON.parse(localStorage.getItem("item2"));
    // const item3 = JSON.parse(localStorage.getItem("item3"));
    // console.log({ item1, item2, item3 });

    const localData = localStorage.getItem("diary");

    //localStorage에 데이터가 있을 때 if문을 탄다.
    if (localData) {

      //직렬화 되어 있었던 배열을 복원을 시켜줘야한다.
      const diaryList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );
      if (diaryList.length >= 1) {
        dataId.current = parseInt(diaryList[0].id) + 1;
        dispatch({ type: 'INIT', data: diaryList });
      }
    }
  }, [])

  const [data, dispatch] = useReducer(reducer, []);

  //console.log(new Date().getTime());

  //더미리스트 아이디값이 1~5니까 그 뒤 숫자인 6으로 초기값 정함.(새일기 쓰고 저장하면 아이디값은 6부터 시작)
  const dataId = useRef(0);

  //CREATE(생성)
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion
      },
    });
    dataId.current += 1;
  }

  //REMOVE(삭제)
  const onRemove = (targetId) => {
    dispatch({
      type: 'REMOVE',
      targetId
    });
  };

  //EDIT(수정)
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: 'EDIT',
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onRemove, onEdit }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/new' element={<New />} />
              <Route path='/edit/:id' element={<Edit />} />
              <Route path='/diary/:id' element={<Diary />} />
            </Routes>
            {/* <a href='/new'>New로 이동</a> */}
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;



// const env = process.env;
// env.PUBLIC_URL = env.PUBLIC_URL || "";
// <img src={process.env.PUBLIC_URL + `/assets/emotion1.png`} />