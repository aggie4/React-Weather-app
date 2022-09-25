import React from 'react';
import { Button } from 'react-bootstrap';
// 부트스트랩에서 복사 한 것

const WeatherButton = ({ cities, selectCity, handleCityChange }) => {
    // console.log('도시정보 잘 들어옵니까?', cities);
    return (
        <div>
            <Button variant={`${selectCity === '' ? 'outline-warning' : 'warning'}`} onClick={() => handleCityChange('current')}>
                {/* 버튼을 눌렀을 때 함수를 사용, 
                콜백함수로 사용 눌렀을 때 작동을 하기 때문에 콜백함수로 사용. 
                앱에서 만들어서 받아서 쓰기만 하기 때문에
                */}
                Current Location
            </Button>{' '}
            {cities.map((item, index) => (
                <Button variant={`${selectCity === item ? 'outline-warning' : 'warning'}`} key={index} onClick={() => handleCityChange(item)}>
                    {item}
                </Button>
            ))}
        </div>
    );
};
/* 
    리엑트 쓸 때 배열 함수가 많이 사용 된다.
    map() = 배열 안에 있는 아이템들을 차례대로 들고온다. 아이탬별로 안에 있는 내용들을 하나하나 생성을 해준다
*/
export default WeatherButton;
