// import { useState, useEffect } from "react";

// type UseLocalStorageHook = (key: string, defaultValue: string) => [string, React.Dispatch<React.SetStateAction<string>>]

// function getStorageValue(key: string, defaultValue: string) {
//   const saved = localStorage.getItem(key);
//   const initial = JSON.parse(saved);
//   return initial || defaultValue;
// }

// const useLocalStorage: UseLocalStorageHook = (key, defaultValue) => {
//   const [value, setValue] = useState(() => {
//     return getStorageValue(key, defaultValue);
//   });

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(value));
//   }, [key, value]);

//   return [value, setValue];
// };

export default {}