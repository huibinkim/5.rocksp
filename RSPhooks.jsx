import React, { useState, useRef, useEffect, memo } from "react";
//클래스 경우 -> constructor -> render -> ref -> componentDidMout ->
// (setState/props) 바뀔때 -> shouldComponentUpdate(true)-> render -> componentDidUpdate
//부모가 나를 없앴을 때 -> componentWillUnmount -> 소멸

const rspCoords = {
  //가위바위보 좌표
  바위: "0px",
  가위: "-142px",
  보: "-284px",
};
const scores = {
  //점수
  가위: 1,
  바위: 0,
  보: -1,
};
const comChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function (v) {
    return v[1] === imgCoord;
  })[0];
}; //img 좌표 찍는 함수

const RSP = memo(() => {
  const [result, setResult] = useState("");
  const [imgCoord, setImgCoord] = useState(rspCoords.바위);
  const [score, setScore] = useState(0);
  const interval = useRef();

  //useLayoutEffect() >>> useEffect와 거의 동일하나, 화면 바뀌기 전에 감지한다.
  //componentDidMout, componentDidUpdate 역할 (1대1 대응은 아님)
  useEffect(() => {
    interval.current = setInterval(changeHand, 100);
    return () => {
      //componentWillUnmount 역할
      clearInterval(interval.current);
    }; //함수형 컴포넌트를 사용하면 함수 전체가 렌더링이 되기에 매번 setInterval이 실행되고 clearInterval을 한다.
    //이는 그냥 setTimeout을 하는 것과 동일하다.
  }, [imgCoord]); //[]안의 코드가 바뀔때마다 useEffect 안의 내용이 계속 실행됨. 따라서 이는 componentDidUpdate 역할과 동일
  //[] 가 closure 문제를 해결해줌
  const changeHand = () => {
    if (imgCoord === rspCoords.바위) {
      setImgCoord(rspCoords.가위);
    } else if (imgCoord === rspCoords.가위) {
      setImgCoord(rspCoords.보);
    } else if (imgCoord === rspCoords.보) {
      setImgCoord(rspCoords.바위);
    }
  };
  const onClickBtn = (choice) => () => {
    clearInterval(interval.current); //움직이는 이미지 멈추고 점수 계산
    const myScore = scores[choice];
    const cpuScore = scores[comChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      setResult("비겼습니다.");
    } else if ([-1, 2].includes(diff)) {
      setResult("이겼습니다.");
      setScore((prevScore) => {
        prevScore + 1;
      });
    } else {
      setResult("졌습니다.");
      setScore((prevScore) => {
        prevScore - 1;
      });
    }
    setTimeout(() => {
      //2초 결과확인 시간 후에
      interval.current = setInterval(changeHand, 100); //다시 손움직이기
    }, 2000);
  };
  return (
    <>
      <div
        id="com"
        style={{
          background: `url(http://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
        }}
      />
      <div>
        <button id="rock" className="btn" onClick={onClickBtn("바위")}>
          바위
        </button>
        <button id="scissor" className="btn" onClick={onClickBtn("가위")}>
          가위
        </button>
        <button id="paper" className="btn" onClick={onClickBtn("보")}>
          보
        </button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  );
});

export default RSP;
