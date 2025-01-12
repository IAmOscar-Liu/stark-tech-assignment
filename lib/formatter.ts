export function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}

export class CustomDate {
  private date: Date;

  constructor(initialDate?: Date | string) {
    if (typeof initialDate === "string") {
      const [year, month, day] = initialDate.split(/[/-]/).map(Number);
      this.date = new Date(year, month - 1, day); // Months are zero-based
    } else {
      this.date = initialDate ?? new Date();
    }
  }

  adjustDate({
    year = 0,
    month = 0,
    day = 0,
  }: {
    year?: number;
    month?: number;
    day?: number;
  }) {
    const currentYear = this.date.getFullYear();
    const currentMonth = this.date.getMonth();
    const currentDay = this.date.getDate();

    this.date.setFullYear(currentYear + year);
    this.date.setMonth(currentMonth + month);
    this.date.setDate(currentDay + day);

    return this;
  }

  getDate() {
    return this.date;
  }

  getFormatedDate(splitter?: string) {
    const year = this.date.getFullYear();
    const month = String(this.date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(this.date.getDate()).padStart(2, "0");
    return `${year}${splitter ?? "-"}${month}${splitter ?? "-"}${day}`;
  }
}
