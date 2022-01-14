function CharacterRegion() {
  const OPTIONS = [
    { value: null, name: '--------' },
    { value: 'Seoul', name: '서울' },
    { value: 'Busan', name: '부산' },
    { value: 'Daegu', name: '대구' },
    { value: 'Incheon', name: '인천' },
    { value: 'Gwangju', name: '광주' },
    { value: 'Daejeon', name: '대전' },
    { value: 'Ulsan', name: '울산' },
    { value: 'Sejong', name: '세종' },
    { value: 'Gyeonggi', name: '경기도' },
    { value: 'Gangwon', name: '강원도' },
    { value: 'Chungbuk', name: '충청북도' },
    { value: 'Chungnam', name: '충청남도' },
    { value: 'Jeonbuk', name: '전라북도' },
    { value: 'Jeonnam', name: '전라남도' },
    { value: 'Gyeongbuk', name: '경상북도' },
    { value: 'Gyeongnam', name: '경상남도' },
    { value: 'Jeju', name: '제주도' },
  ];

  const SelectBox = (props) => {
    return (
      <select>
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    );
  };
  return <SelectBox options={OPTIONS}></SelectBox>;
}

export default CharacterRegion;
