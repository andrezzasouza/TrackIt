import { useState } from 'react';
import { DayButtonStyle } from '../assets/styles/LogInSignUp';

export default function DayButton({
  index,
  day,
  selectedDays,
  setSelectedDays
}) {
  const [marked, setMarked] = useState(false);

  function selectDay(indexNum) {
    function repeated(number) {
      if (number === indexNum) {
        return true;
      }
    }
    setMarked(!marked);
    const alreadySelected = selectedDays.find(repeated);
    if (alreadySelected !== undefined) {
      const removeSelection = selectedDays.filter((days) => days !== index);
      setSelectedDays(removeSelection);
    } else {
      setSelectedDays([...selectedDays, index]);
    }
  }

  return (
    <DayButtonStyle
      clicked={selectedDays.length === 0 && marked ? setMarked(false) : marked}
      index={index}
      onClick={() => selectDay(index)}
      type="button"
    >
      {day}
    </DayButtonStyle>
  );
}
