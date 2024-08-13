import { useState } from "react";
import MedalNumberInput from "./MedalNumberInput";
import Button from "./Button";

const InputArea = ({ countryList, setCountryList }) => {
  const [name, setName] = useState("");
  const [gold, setGold] = useState(0);
  const [silver, setSilver] = useState(0);
  const [bronze, setBronze] = useState(0);

  const enteredCountry = {
    name: name,
    gold: gold,
    silver: silver,
    bronze: bronze,
  };

  const medals = [
    { medalName: "금메달", numberOfMedal: gold, setValue: setGold },
    { medalName: "은메달", numberOfMedal: silver, setValue: setSilver },
    { medalName: "동메달", numberOfMedal: bronze, setValue: setBronze },
  ];

  const resetInput = () => {
    setName("");
    setGold(0);
    setSilver(0);
    setBronze(0);
  };

  const addCountryHandler = (target) => {
    !name
      ? alert("국가명을 입력해주세요.")
      : countryList.some((country) => country.name === target)
      ? alert("이미 등록된 국가입니다 업데이트버튼을 눌러주세요.")
      : (setCountryList([...countryList, enteredCountry]),
        window.localStorage.setItem(
          "olympics",
          JSON.stringify([...countryList, enteredCountry])
        ),
        resetInput(),
        alert("국가가 추가되었습니다."));
  };

  const updateHandler = (target) => {
    if (countryList.some((country) => country.name === target)) {
      const deduplication = countryList.filter(
        (country) => country.name !== enteredCountry.name
      );
      setCountryList([...deduplication, enteredCountry]);
      window.localStorage.setItem(
        "olympics",
        JSON.stringify([...deduplication, enteredCountry])
      );
      resetInput();
      alert("업데이트 되었습니다.");
    } else {
      alert("해당국가가 없습니다 추가버튼을 눌러주세요.");
    }
  };

  return (
    <article id="Input">
      <span className="inputArea">
        <label>국가명</label>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="국가입력"
        />
      </span>
      {medals.map((medal) => {
        return (
          <MedalNumberInput
            key={medal.medalName}
            medalName={medal.medalName}
            numberOfMedal={medal.numberOfMedal}
            setValue={medal.setValue}
          />
        );
      })}
      <span id="btn">
        <Button color={"green"} onClick={() => addCountryHandler(name)}>
          추가
        </Button>
        <Button color={"blue"} onClick={() => updateHandler(name)}>
          업데이트
        </Button>
      </span>
    </article>
  );
};

export default InputArea;
