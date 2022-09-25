import React from 'react';

const weatherBox = ({ weather }) => {
    /* console.log('웨더 정보 잘 들어 오고 있냐?', weather); */
    // 디스트럭터링 { weather} 들고 온다.

    return (
        <div className="weather-box">
            <div>{'도시 :' + weather?.name}</div>
            <h2>
                {'온도 : ' + weather?.main.temp}℃ / {((weather?.main.temp * 9) / 5 + 32).toFixed(2)}℉
            </h2>
            <h3>{'날씨 :' + weather?.weather[0].description}</h3>
        </div>
    );
};
// 웨더 정보에 있는 main 안에 있는 데이터들을 가지고 보여주는 작업을 한다.
export default weatherBox;
/* 
    에러가 나는 이유
    초기값을 null 이라는 값을 줬기 때문에
    그래서 && 연산자를 사용해서 에러가 뜨지 않게끔 한다.
    weather?.name 삼항연산자 처럼 사용해서 엔드 연산자를 사용한다
*/
