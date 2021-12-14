export const size = {
  xxs: "319px",
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px',
}
const device = {
    xxs: `(min-width: ${size.xxs})`,
    xs: `(min-width: ${size.xs})`,
    sm: `(min-width: ${size.sm})`,
    md: `(min-width: ${size.md})`,
    lg: `(min-width: ${size.lg})`,
    xl: `(min-width: ${size.xl})`,
    xxl: `(min-width: ${size.xxl})`,
};
export const getAnyMedia = (size) => {
  return `(min-width: ${size}px)`;
}
export default device;