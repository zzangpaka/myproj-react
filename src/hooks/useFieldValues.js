import { useCallback, useState } from 'react';

function useFieldValues(initialValues) {
  const [fieldValues, setFieldValues] = useState(initialValues);

  // 함수 객체를 생성할 때, 의존성이 걸린 값의 변경시에만 함수를 재생성
  const handleFieldChange = useCallback((e) => {
    const { name, value } = e.target;
    setFieldValues((prevFieldValues) => {
      return {
        ...prevFieldValues,
        [name]: value,
      };
    });
  }, []);

  const clearFieldValues = useCallback(() => {
    setFieldValues(initialValues);
  }, []);

  return {
    fieldValues,
    handleFieldChange,
    clearFieldValues,
    setFieldValues,
  };
}

export default useFieldValues;