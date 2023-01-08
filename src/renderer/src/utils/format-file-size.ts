/**
 * 格式化文件大小, 输出成带单位的字符串
 * @param size 文件大小
 * @param pointLength 精确到的小数点数
 * @param units 单位数组
 * @returns
 */
export const formatFileSize = (
  size: number,
  pointLength = 2,
  units = ['B', 'K', 'M', 'G', 'TB'],
) => {
  let unit: string;

  while ((unit = units.shift()!) && size > 1024) {
    size = size / 1024;
  }

  return (
    (unit === 'B' ? size : size.toFixed(pointLength === undefined ? 2 : pointLength)) +
    unit
  );
};
