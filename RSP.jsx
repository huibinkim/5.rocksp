import React, { Component } from "react";
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
};
class RSP extends Component {
  state = {
    result: "",
    imgCoord: rspCoords.바위,
    score: 0,
  };
  interval;

  componentDidMount() {
    //컴포넌트가 첫 렌더링된 후 - > 비동기 요청을 많이한다.
    //가위바위보 이미지 보여주기
    this.interval = setInterval(this.changeHand, 100);
  }
  componentDidUpdate() {
    //리렌더링 후
  }
  componentWillUnmount() {
    //컴포넌트가 제거되기 직전, 비동기 요청 정리를 많이 한다.
    clearInterval(this.interval);
  }
  changeHand = () => {
    //손바꾸기
    const { imgCoord } = this.state;
    // console.log("fsf", this.state.imgCoord, rspCoords.가위);
    if (imgCoord === rspCoords.바위) {
      this.setState({
        imgCoord: rspCoords.가위,
      });
    } else if (imgCoord === rspCoords.가위) {
      this.setState({
        imgCoord: rspCoords.보,
      });
    } else if (imgCoord === rspCoords.보) {
      this.setState({
        imgCoord: rspCoords.바위,
      });
    }
  };
  onClickBtn = (choice) => () => {
    //가위바위보 버튼 클릭하면
    const { imgCoord } = this.state;
    clearInterval(this.interval); //움직이는 이미지 멈추고 점수 계산
    const myScore = scores[choice];
    const cpuScore = scores[comChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      this.setState({
        result: "비겼습니다.",
      });
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: "이겼습니다.",
          score: prevState.score + 1,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          result: "졌습니다.",
          score: prevState.score - 1,
        };
      });
    }
    setTimeout(() => {
      //2초 결과확인 시간 후에
      this.interval = setInterval(this.changeHand, 100); //다시 손움직이기
    }, 2000);
  };
  render() {
    const { result, score, imgCoord } = this.state;

    return (
      <>
        <div
          id="com"
          style={{
            background: `url(http://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
          }}
        />
        <div>
          <button id="rock" className="btn" onClick={this.onClickBtn("바위")}>
            바위
          </button>
          <button
            id="scissor"
            className="btn"
            onClick={this.onClickBtn("가위")}
          >
            가위
          </button>
          <button id="paper" className="btn" onClick={this.onClickBtn("보")}>
            보
          </button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    );
  }
}

export default RSP;
