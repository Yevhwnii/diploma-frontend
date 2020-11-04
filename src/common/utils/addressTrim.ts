export const trimAddress = (address: string) => {
  const result = address.replace(' ', '+');
  return result;
};
