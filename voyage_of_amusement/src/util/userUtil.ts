export const summarizeUserInfo = (summary) => {
    const parking = summary.parking ?? []
    const show = summary.show ?? []
    const shop = summary.shop ?? []
    const payment =  summary.payment ?? []
    return {
      parking: parking,
      show: show,
      shop: shop,
      payment: payment
    }
  }
