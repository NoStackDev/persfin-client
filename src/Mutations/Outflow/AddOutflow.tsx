import axios from "axios";
import { Record } from "pocketbase";
import { useMutation, useQueryClient } from "react-query";
import pb from "../../lib/pocketbase";
import { BudgetItemType, BudgetType } from "../../TypeDefs";
import { UpdateBudget } from "../Budget";

const AddOutflow = async (
  title: string,
  amount: number,
  budget: BudgetType | Record | null,
  item: BudgetItemType,
  category: string,
  description: string
) => {
  console.log({ title, amount, budget, item, category, description });
  try {
    if (budget) {
      // const updateBudgetMutation = UpdateBudget();
      const budgetItem = budget.items.map((obj: BudgetItemType) => {
        if (obj.id !== item.id) return obj;
        obj.balance = obj.balance - amount;
        return obj;
      });
      // updateBudgetMutation.mutate({
      //   budgetId: budget.id,
      //   title: budget.title,
      //   total: budget.total,
      //   balance: budget.balance - amount,
      //   description: budget.description,
      //   items: JSON.stringify(budget.items),
      // });
      console.log({
        budgetId: budget.id,
        title: budget.title,
        total: budget.total,
        balance: budget.balance - amount,
        description: budget.description,
        items: budget.items,
      });
    }
    // return pb.collection("outflows").create({
    //   title,
    //   amount,
    //   budget,
    //   item,
    //   category,
    //   description,
    //   user: pb.authStore.model?.id,
    // });
  } catch (err: any) {
    console.log(err.message);
  }
};

type Args = {
  title: string;
  amount: number;
  item: BudgetItemType;
  description: string;
  category: string;
  budget: BudgetType | Record | null;
};

const CreateOutflow = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      title,
      amount,
      budget,
      item,
      description,
      category,
    }: Args) => AddOutflow(title, amount, budget, item, category, description),
    onSuccess: () => {
      queryClient.invalidateQueries("outflows");
      queryClient.invalidateQueries("budgets");
    },
  });
};

export default CreateOutflow;
