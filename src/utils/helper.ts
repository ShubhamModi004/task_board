export const debounce = (func: (arg: string) => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return (arg: string) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(arg), delay);
  };
};

export const capitalizeFirstLetter = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
