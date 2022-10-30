type Category = {
    _id: string;
    title: string;
    categoryType: string;
    description: string;
  };


const countCategories = (objArr: Category[]|null)  => {
    const categoriesObj = {
        inflowCategories: 0,
        outflowCategories: 0
    }

    objArr?.reduce((prevValue, currentObj) => {
        switch(currentObj.categoryType.toLowerCase().trim()) {
            case "inflow":
                categoriesObj.inflowCategories += 1
                return prevValue
            case "outflow":
                categoriesObj.outflowCategories += 1
                return prevValue
            default:
                return prevValue
        }
    }, categoriesObj)
    return categoriesObj

}

export default countCategories