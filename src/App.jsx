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
        <section id="scoreList">
          <ShowList
            key={countryList}
            countryList={countryList}
            setCountryList={setCountryList}
          />
        </section>
      </main>
    </>
  );
};

export default App;
