import { useState } from "react";
import MedalNumberInput from "./MedalNumberInput";
import Button from "./Button";

const InputArea = ({ countryList, setCountryList }) => {
  const [name, setName] = useState("");
  const [medalNumber, setMedalNumber] = useState({
    gold: 0,
    silver: 0,
    bronze: 0,
  });

  const medalNumberChange = (event) => {
    const { name, value } = event.target;
    setMedalNumber((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const enteredCountry = {
    name: name,
    gold: medalNumber.gold,
    silver: medalNumber.silver,
    bronze: medalNumber.bronze,
  };

  const medals = [
    { medalName: "금메달", numberOfMedal: medalNumber.gold, objKey: "gold" },
    {
      medalName: "은메달",
      numberOfMedal: medalNumber.silver,
      objKey: "silver",
    },
    {
      medalName: "동메달",
      numberOfMedal: medalNumber.bronze,
      objKey: "bronze",
    },
  ];

  const resetInput = () => {
    setName("");
    setMedalNumber({
      gold: 0,
      silver: 0,
      bronze: 0,
    });
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
      return;
    } else {
      alert("해당국가가 없습니다 추가버튼을 눌러주세요.");
      return;
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
            key={medal.objKey}
            objKey={medal.objKey}
            medalName={medal.medalName}
            medalNumber={medalNumber}
            medalNumberChange={medalNumberChange}
            setMedalNumber={setMedalNumber}
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
