
export class StringUtils {
  static onlyNumbers(value?: string): string {
    return value?.replace(/\D/g, '') ?? ''
  }

  static convertToString(value: unknown): string {
    return String(value)
  }

  static convertStringToDouble(value: string): number {
    return Number(value.replace(/[^\d.]/g, ''))
  }

  static convertToMoney(
    value: number,
    showSymbol = true,
    locale = 'pt-BR',
    options: Omit<Intl.NumberFormatOptions, 'style'> = {
      currency: 'BRL'
    }
  ): string {
    if (showSymbol)
      return new Intl.NumberFormat(locale, {
        ...options,
        style: 'currency',
        maximumFractionDigits: 4,
        minimumFractionDigits: 4
      }).format(value ?? 0)
    return new Intl.NumberFormat(locale, {
      ...options,
      style: 'currency',
      maximumFractionDigits: 4,
      minimumFractionDigits: 4
    }).format(value ?? 0)
  }

  static convertToMoneyTwoDigits(
    value: number,
    showSymbol = true,
    locale = 'pt-BR',
    options: Omit<Intl.NumberFormatOptions, 'style'> = {
      currency: 'BRL'
    }
  ): string {
    if (showSymbol)
      return new Intl.NumberFormat(locale, {
        ...options,
        style: 'currency',
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
      }).format(value ?? 0)
    return new Intl.NumberFormat(locale, {
      ...options,
      style: 'currency',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    }).format(value ?? 0)
  }
}
