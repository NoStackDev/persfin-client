
type Transaction = {
    _id: string;
    title: string;
    amount: number;
    category: {
      _id: string;
      title: string;
      categoryType: string;
    };
    budget: string;
    description: string;
    receiptImage: string[];
    time: string;
    createdAt: Date;
  };

  const calculateFilteredAmount = (objArr: Transaction[]|null) => {
    if (objArr && objArr.length > 0) {
            const total = objArr.reduce((prevValue, currentObj)=> {
              return prevValue + currentObj.amount
            }, 0)
            return total
          }
    else return 0
  }

  export default calculateFilteredAmount