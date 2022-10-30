type Savings = {
    _id: string;
    amount: number;
    time: string;
  };
  

const calculateSavings = (objArr: Savings[]|null): number => {
    const total = objArr?.reduce((prevValue, currentObj) => {
        return prevValue + currentObj.amount
    },0)

    return total? total: 0
}

export default calculateSavings