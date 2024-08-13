import Button from "./Button";

const ShowList = ({ countryList, setCountryList }) => {
  const deleteCountryHandler = (name) => {
    const removedCountryList = countryList.filter(
      (country) => country.name !== name
    );
    setCountryList(removedCountryList);
    removedCountryList.length === 0
      ? window.localStorage.removeItem("olympics")
      : window.localStorage.setItem(
          "olympics",
          JSON.stringify(removedCountryList)
        );
  };


  if (countryList.length > 0) {
    return (
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
          {countryList
            .sort((a, b) => b.bronze - a.bronze)
            .sort((a, b) => b.silver - a.silver)
            .sort((a, b) => b.gold - a.gold)
            .map((country) => {
              return (
                <tr key={country.name}>
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
    );
  } else {
    return <h2>아직 추가된 국가가 없습니다. 메달을 추적하세요!</h2>;
  }
};

export default ShowList;
