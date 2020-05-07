import React from "react";

export const require = (value) => {
    if (value) return undefined;
    return 'This place can\'t be empty'
};

export const maximumLenght = (maxLenght) => (value) => {
    if (value.length > maxLenght) return `Maximum lenght ${maxLenght} symbols`;
    return undefined
};