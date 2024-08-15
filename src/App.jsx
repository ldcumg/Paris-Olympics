import { useState } from "react";
import ShowList from "./components/ShowList";
import InputArea from "./components/InputArea";

const App = () => {
  const [countryList, setCountryList] = useState(
    JSON.parse(window.localStorage.getItem("olympics")) ?? []
  );

  return (
    <>
      <header>
        <h1>2024 파리 올림픽</h1>
      </header>
      <main>
        <InputArea countryList={countryList} setCountryList={setCountryList} />
        <ShowList countryList={countryList} setCountryList={setCountryList} />
      </main>
    </>
  );
};

export default App;
