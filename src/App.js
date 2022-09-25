import { useEffect, useState } from 'react';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import ClipLoader from 'react-spinners/ClipLoader';
// react spinner 구글에 검색 후 가져옴
import 'bootstrap/dist/css/bootstrap.min.css';
// 부트스트랩 버튼 css 가져오기 , 내 꺼 보다 위에 링크 연결

import './App.css';
import { Container } from 'react-bootstrap';

function App() {
    // 1. 앱이 실행이 되자마자 현재 위치 기반의 날씨가 보인다.
    // 2. 지금 현재 도시와 섭씨, 화씨, 날씨 상태 정보가 나온다.
    // 3. 밑에 버튼이 5개 있다. (현재 1개의 위치, 다른 도시 4개의 위치)
    // 4. 버튼을 누를 때 마다 해당되는 도시별 날씨가 보여진다.
    // 5. 현재위치 버튼을 누르면 다시 현재 위치 기반의 날씨정보를 보여준다.
    // 6. 데이터를 들고오는 동안 로딩 스피너가 돌아간다.
    // 로딩 스피너 = 데이터가 도착하기 전 유저들에게 보여준다는 의미
    // 유저들에게 기다린다는 암묵적인 의사표시

    const [weather, setWeather] = useState(null);
    // 데이터가 왔을 때 weather에다가 값을 넣어줘야 한다. 초기값을 null 준다

    const [city, setCity] = useState('');
    // 초기값을 모르니 빈 공간으로 둔다
    // 시티정보를 바꾸려면 setCity 라는 걸로 스테이트를 바꿔야 한다. 변수로 바꿀 수 없다.

    const [loading, setLoading] = useState(false);
    // 로딩스피너를 false값을 주고 데이터를 도착하기전에만 트루값을 준다.

    const [apiError, setApiError] = useState('');

    const cities = ['Seoul', 'Incheon', 'Busan', 'Gangneung'];
    // 배열로 묶어서 작업하는 것이 효율적이다. 하나하나 일일히 적는 거 보단 배열로 하는 게 관리하기가 편하다.

    const API_KEY = '6559acbf056453652491cd449f68a81e';

    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            // console.log('현재 위도 경도는??', lat, lon);
            getWeatherByCurrentLocation(lat, lon);
        });
        // 위도, 경도를 함수안에 넣음
        // api주소 함수를 위도 경도 함수안에 넣음
    };

    const getWeatherByCurrentLocation = async (lat, lon) => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
            setLoading(true);
            let response = await fetch(url);
            let data = await response.json();
            // console.log('데이터는...?', data);
            setWeather(data);
            // 날씨 데이터를 담는 그릇
            setLoading(false);
        } catch (err) {
            setApiError(err.massage);
            setLoading(true);
        }
    };

    const getWeatherByCity = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6559acbf056453652491cd449f68a81e&units=metric`;
            setLoading(true);
            let response = await fetch(url);
            let data = await response.json();
            setWeather(data);
            setLoading(false);
        } catch (err) {
            setApiError(err.massage);
            setLoading(true);
        }
    };

    useEffect(() => {
        if (city === '') {
            setLoading(true);
            getCurrentLocation();
        } else {
            setLoading(true);
            getWeatherByCity();
        }
    }, [city]);
    // city 값에 따라서 getWeatherByCurrentLocation(현재위치)를 보여줄 건지, getWeatherByCity(선택한 위치)를 보여줄 건지
    // 정보 받아서 움직이는 애 , 로딩이 있음.
    // 디테일을 위해 setLoading(true) 넣어준다.
    /*
    - 유즈이펙트
        UI 가 처음에 그려졌을 때, 배열에 값이 있다면 값이 바뀔 때 마다 호출이 된다.
        앱 실행이 되면 처음에 써놨던 첫번째 유즈 이펙트가 실행이 된다.
        그 뒤에 또 두번째 유즈 이펙트가 실행이 된다.
        getWeatherByCity 실행이 된다. city 기준으로 웨더를 가지고 오는데 초기값이 아무것도 없는 빈값이다.
        웨더를 가지고 오는 건 처음엔 성공을 하지만 두번째에서 성공을 못한다 왜냐 값이 없어서 빈값이라서.
        아무것도 없어서 에러가 발생이 한다.
    - 해결점은 유즈이펙트를 두 번 부르면 안된다.
    앱이 실행이 됐을 때 처음에 먼저 만든 유즈이펙트가 실행이 되고 두번짼 실행이 되면 안된다.
    그래서 우리가 할 일은 하나로 합쳐줘야 된다. 유즈이펙트가 '하나'만 실행을 시키기 위해서
    중요한 건 상황에 맞춰야 한다.
  */
    const handleCityChange = (city) => {
        if (city === 'current') {
            setCity('');
        } else {
            setCity(city);
        }
    };
    /* 
        매개변수로 들어오는 값이 current라는 문자열이면,
        도시 클릭을 했을 때 setCity에 값이 들어가있는 상태 그 값을 다시 없애면 current정보로 들어온다.
        그게 아닐 때 city 넣어주면 된다.
        앱에서 만든 것을 자식(button)에 넘겨준다
    */
    return (
        <Container className="vh-100">
            {loading ? (
                <div className="container">
                    <ClipLoader color="#FF0000" loading={loading} size={250} />
                </div>
            ) : !apiError ? (
                <div className="container">
                    <WeatherBox weather={weather} />
                    {/* weather={weather} 프롭스로 보내준다 */}
                    <WeatherButton cities={cities} selectCity={city} handleCityChange={handleCityChange} />
                    {/* setCity 함수를 프롭스로 보내준다. handleCityChange 함수도 프롭스로 보내준다*/}
                </div>
            ) : (
                <div className="container">
                    <h2>{apiError}</h2>
                </div>
            )}
        </Container>
    );
}

export default App;
/* 
    프로젝트 시작할 땐 처음엔 차근차근 들어가야 한다.
    이거하다가 저거하다가 하면 헷갈려서 꼬이게 됨.
    어느정도의 순서를 짜놓고 시작하는 것이 좋음
*/
/* 
    ** 리엑트에서 중요한 부분
        app.js (부모)
    WeatherBox(자식) -사이에 연결고리가 없다- WeatherButton ( 자식 )
1.  부모입장에서는 뭐든 넘겨줄 수 있지만, 자식입장에서는 부모한테 아무것도 줄 수 없다.
2.  일반적인 코드상에서 부모 -> 자식으론 데이터를 옮길 수 있지만 반대로 자식 -> 부모는 옮길 수 없다.
3.  앱(부모) 에다가 필요한 모든 스테이트 함수 를 다 가지고 있는다. -> 자식들이 필요로 할 때마다 던져준다. 위치정보나 이런 것들을
4.  자식은 업데이트를 하기는 하는데 함수도 앱이(부모) 미리 만들어 가지고 날씨 정보 업데이트 라는 함수, -> WeatherButton 프롭스로 넘겨준다
5.  자식들은 앱(부모) 넘겨주는 걸로만 가공작업을 하고 -> 나중에 앱이 그 정보들을 받아다가 다시 다른 자식한테 넘겨준다. 
    -쉽게 말하면 총괄하고 있는 앱(부모) 정보를 다 줘야 된다. 왜냐? 웨더박스나 웨터버튼 즉 자식이 앱으로 뭔가 올려줄 수 없다.
  ************ 해결책은 App.js앱(부모)가 모든 정보를 가지고 있고 그걸 필요한다면 자식한테 던져주고 -> 자식들은 그걸 받아서 업데이트만 해주는 걸로 해야 한다.
*/
