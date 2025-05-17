import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Định dạng ngày tháng theo chuẩn Việt Nam
 * @param dateString Chuỗi ngày tháng (có thể là string, number hoặc Date object)
 * @param includeTime Có bao gồm giờ phút hay không (mặc định là false)
 * @returns Chuỗi ngày tháng đã được định dạng
 */
export function formatDate(
  dateString: string | number | Date, 
  includeTime: boolean = false
): string {
  const date = new Date(dateString)
  
  // Kiểm tra nếu ngày không hợp lệ
  if (isNaN(date.getTime())) {
    return 'Ngày không hợp lệ'
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  if (includeTime) {
    options.hour = '2-digit'
    options.minute = '2-digit'
  }

  return date.toLocaleDateString('vi-VN', options)
}

export function isValidDate(date: any): date is Date {
  return date instanceof Date && !isNaN(date.getTime())
}