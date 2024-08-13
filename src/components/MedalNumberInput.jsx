const MedalNumberInput = ({
  objKey,
  medalName,
  medalNumber,
  medalNumberChange,
  setMedalNumber,
}) => {
  return (
    <span className="inputArea">
      <label>{medalName}</label>
      <input
        type="number"
        name={objKey}
        value={medalNumber[objKey]}
        onChange={(event) => medalNumberChange(event)}
        onFocus={(event) =>
          Number(event.target.value) ||
          setMedalNumber((prev) => {
            return { ...prev, [objKey]: "" };
          })
        }
        onBlur={(event) =>
          event.target.value ||
          setMedalNumber((prev) => {
            return { ...prev, [objKey]: 0 };
          })
        }
        min={0}
      />
    </span>
  );
};

export default MedalNumberInput;
