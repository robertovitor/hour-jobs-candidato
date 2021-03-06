import React, { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';
import Reinput from 'reinput';
import { useField } from '@unform/core';

function Input({ name, onChangeText, rawValue, ...rest }) {
  const inputRef = useRef(null);

  const {
    fieldName,
    registerField,
    defaultValue,
    error,
    clearError,
  } = useField(name);

  const handleOnChange = useCallback(
    text => {
      if (inputRef.current) inputRef.current.value = text;
      if (onChangeText) onChangeText(text);
    },
    [onChangeText],
  );

  useEffect(() => {
    inputRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      clearValue(ref) {
        ref.value = '';
        ref.clear();
      },
      setValue(ref, value) {
        ref.setNativeProps({ text: value });
        inputRef.current.value = value;
      },
      getValue(ref) {
        return rawValue || ref.value;
      },
    });
  }, [fieldName, rawValue, registerField]);

  return (
    <Reinput
      ref={inputRef}
      defaultValue={defaultValue}
      onChangeText={handleOnChange}
      onFocus={clearError}
      error={error}
      {...rest}
    />
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  onChangeText: PropTypes.func,
  rawValue: PropTypes.string,
};

Input.defaultProps = {
  rawValue: '',
  onChangeText: () => {},
};

export default Input;
