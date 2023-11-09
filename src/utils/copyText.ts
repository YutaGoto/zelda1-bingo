export const copyText = (text: string | number) => {
  navigator.clipboard.writeText(text);
};
