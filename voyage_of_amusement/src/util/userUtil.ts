export const summarizeUserInfo = (summary) => {
    
    // Group the data based on Source_Type
const groupedData = summary.reduce((acc, item) => {
    const sourceType = item.Source_Type[0]; // Taking the first element as Source_Type
    if (!acc[sourceType]) {
      acc[sourceType] = [];
    }
    acc[sourceType].push(item);
    return acc;
  }, {});
  console.log(groupedData)
      const attraction = groupedData.Att ?? []
      const show = groupedData.Shw ?? []
      const shop = groupedData.sto ?? []
      const payment =  groupedData.payment ?? []
    return {
    attraction: attraction,
      show: show,
      shop: shop,
      payment: payment
    }
  }
