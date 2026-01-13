
export const hoursCut = () => {
  return new Date().toISOString().split("T")[0];
};
