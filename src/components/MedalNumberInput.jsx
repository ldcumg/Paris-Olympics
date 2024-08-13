const MedalNumberInput = ({ medalName, numberOfMedal, setValue }) => {
  return (
    <span className="inputArea">
      <label>{medalName}</label>
      <input
        type="number"
        value={numberOfMedal}
        onChange={(event) => setValue(event.target.value)}
        onFocus={(event) => Number(event.target.value) || setValue("")}
        onBlur={(event) => event.target.value || setValue(0)}
        min={0}
      />
    </span>
  );
};

export default MedalNumberInput;
