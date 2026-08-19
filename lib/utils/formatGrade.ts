export const GRADE_MAP: Record<string, string> = {
  first_prep: "الصف الأول الإعدادي",
  second_prep: "الصف الثاني الإعدادي",
  third_prep: "الصف الثالث الإعدادي",
  first_sec: "الصف الأول الثانوي",
  first_secondary: "الصف الأول الثانوي",
  second_sec: "الصف الثاني الثانوي",
  second_secondary: "الصف الثاني الثانوي",
  third_sec: "الصف الثالث الثانوي",
  third_secondary: "الصف الثالث الثانوي",
};

/**
 * Formats raw grade keys into readable Arabic grade labels.
 * Fallbacks gracefully to the provided string if unmapped.
 */
export function formatGrade(grade?: string): string {
  if (!grade) return "غير محدد";
  return GRADE_MAP[grade] ?? grade;
}

/**
 * Formats course price into readable Arabic format.
 */
export function formatPrice(price?: number): string {
  if (price === undefined || price === null || price <= 0) {
    return "مجاني";
  }
  return `${price} ج.م`;
}
