export const convertLocalizeDate =  (date: Date) => {
    const reg = localStorage.getItem("Region")
    const currentDate = new Date(date)
    if (reg && reg == "FA") {
      return new Intl.DateTimeFormat("fa-IR").format(currentDate)
    } else {
      return currentDate.toLocaleDateString()
    }
  
  };
  