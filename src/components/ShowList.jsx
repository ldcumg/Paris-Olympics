import Button from "./Button";
import { v4 as uuid } from "uuid";

const ShowList = ({ countryList, setCountryList }) => {
  const deleteCountryHandler = (name) => {
    if (confirm("정말 삭제하겠습니까?")) {
      const removedCountryList = countryList.filter(
        (country) => country.name !== name
      );
      setCountryList(removedCountryList);
      removedCountryList.length === 0
        ? window.localStorage.removeItem("olympics")
        : window.localStorage.setItem(
            "olympics",
            JSON.stringify(removedCountryList)
          ),
        alert("국가가 삭제되었습니다.");
    } else {
      alert("삭제를 취소하였습니다.");
    }
  };

  countryList.sort((a, b) => {
    if (b.gold !== a.gold) return b.gold - a.gold;
    if (b.silver !== a.silver) return b.silver - a.silver;
    return b.bronze - a.bronze;
  });

  if (countryList.length > 0) {
    return (
      <section id="scoreList">
        <table>
          <thead>
            <tr>
              <th>순위</th>
              <th>국가명</th>
              <th>금메달</th>
              <th>은메달</th>
              <th>동메달</th>
              <th id="action">액션</th>
            </tr>
          </thead>
          <tbody>
            {countryList.map((country) => {
              return (
                <tr key={uuid()}>
                  <td>{countryList.indexOf(country) + 1}</td>
                  <td>{country.name}</td>
                  <td>{country.gold}</td>
                  <td>{country.silver}</td>
                  <td>{country.bronze}</td>
                  <td>
                    <Button
                      color={"red"}
                      onClick={() => deleteCountryHandler(country.name)}
                    >
                      삭제
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    );
  } else {
    return <h2>아직 추가된 국가가 없습니다. 메달을 추적하세요!</h2>;
  }
};

export default ShowList;
