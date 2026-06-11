// Danh sách từ khóa SQL / user nguy hiểm
export const forbiddenWords: string[] = [
  "insert",
  "update",
  "delete",
  "create",
  "drop",
  "alter",
  "truncate",
  "exec",
  "union",
  "select",
  "root",
];

// Hàm sanitize input (loại bỏ ký tự nguy hiểm và khoảng trắng thừa)
export function sanitizeInput(input: string): string {
  if (!input) return "";
  return input
    .replace(/['";\-\\/*]+/g, "") // bỏ ký tự đặc biệt nguy hiểm
    .replace(/\s+/g, " ") // gộp nhiều space thành 1
    .trim(); // bỏ space đầu/cuối
}