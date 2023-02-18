import { useMemo, useState } from "react";

import quickActions from "./quickActionBarConfig";
import QuickActionCard from "./Components/QuickActionCard";
import {
  useSavingsQuery,
  useInflowsQuery,
  useOutlflowsQuery,
  useBudgetsQuery,
} from "../../Queries";
import { calculateBalance, calculateSavings } from "./helper";

import "./QuickActionBar.style.scss";
import {
  CreateBudget,
  CreateInflow,
  CreateOutflow,
  CreateSavings,
} from "../../Mutations";
import {
  ModalBudgetForm,
  ModalInflowForm,
  ModalOutflowForm,
  ModalSavingsForm,
} from "../Modal";
import Spinner from "../Spinner";
import { UseMutationResult } from "react-query";

type Props = {};

const QuickActionBar = (props: Props) => {
  const [selectedFormId, setSelectedFormId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  // queries
  const { data: savingsData } = useSavingsQuery();
  const { data: inflowsData } = useInflowsQuery();
  const { data: outflowsData } = useOutlflowsQuery();
  const { data: budgetsData } = useBudgetsQuery();

  // mutations
  const mutations: Record<
    number,
    UseMutationResult<any, unknown, any, unknown>
  > = {
    1: CreateSavings(),
    2: CreateInflow(),
    3: CreateOutflow(),
    4: CreateBudget(),
  };

  const balance = useMemo(() => {
    const balanceCalc = calculateBalance(
      savingsData,
      inflowsData,
      outflowsData
    );
    localStorage.setItem("balance", balanceCalc.toString());
    return balanceCalc;
  }, [savingsData, inflowsData, outflowsData]);

  const savingsTotal = useMemo(() => {
    const savingsCalc = calculateSavings(savingsData);
    localStorage.setItem("savings", savingsCalc.toString());
    return savingsCalc;
  }, [savingsData]);

  const getAmount = (title: string) => {
    switch (title.toLowerCase().trim()) {
      case "balance":
        return balance;
      case "savings":
        return savingsTotal;
      case "inflow":
        return inflowsData;
      case "outflow":
        return outflowsData;
      case "budgets":
        return budgetsData?.filter((budget) => !budget.exhausted).length;
      default:
        return 0;
    }
  };

  const renderModal = () => {
    if (showModal) {
      switch (selectedFormId) {
        case 1:
          return (
            <ModalSavingsForm
              mutation={mutations[1]}
              setShowModal={setShowModal}
            />
          );
        case 2:
          return (
            <ModalInflowForm
              mutation={mutations[2]}
              setShowModal={setShowModal}
            />
          );
        case 3:
          return (
            <ModalOutflowForm
              mutation={mutations[3]}
              setShowModal={setShowModal}
            />
          );
        case 4:
          return (
            <ModalBudgetForm
              mutation={mutations[4]}
              setShowModal={setShowModal}
            />
          );
      }
    }
    return null;
  };

  return (
    <>
      <section className="quick-action-bar">
        <div className="carousel-container">
          <div className="carousel">
            <QuickActionCard
              icon="account_balance_wallet"
              title="Balance"
              showCurrency={true}
              amount={getAmount("balance")}
              hasBtn={false}
              btnText={null}
              setSelectedFormId={setSelectedFormId}
              id={0}
              hasFixedDateFilter={false}
              setShowModal={setShowModal}
            />
            <QuickActionCard
              icon="savings"
              title="Savings"
              showCurrency={true}
              amount={getAmount("savings")}
              hasBtn={true}
              btnText={"Add Savings"}
              setSelectedFormId={setSelectedFormId}
              id={1}
              hasFixedDateFilter={false}
              setShowModal={setShowModal}
            />
            <QuickActionCard
              icon="south"
              title="Inflow"
              showCurrency={true}
              amount={getAmount("inflow")}
              hasBtn={true}
              btnText={"Add Inflow"}
              setSelectedFormId={setSelectedFormId}
              id={2}
              hasFixedDateFilter={true}
              setShowModal={setShowModal}
            />
            <QuickActionCard
              icon="north"
              title="Outflow"
              showCurrency={true}
              amount={getAmount("outflow")}
              hasBtn={true}
              btnText={"Add Outflow"}
              setSelectedFormId={setSelectedFormId}
              id={3}
              hasFixedDateFilter={true}
              setShowModal={setShowModal}
            />
            <QuickActionCard
              icon="pie_chart"
              title="Budgets"
              showCurrency={false}
              amount={getAmount("budgets")}
              hasBtn={true}
              btnText={"Create Budget"}
              setSelectedFormId={setSelectedFormId}
              id={4}
              hasFixedDateFilter={false}
              setShowModal={setShowModal}
            />
          </div>
        </div>
      </section>

      {renderModal()}

      <Spinner
        mutation={selectedFormId ? mutations[selectedFormId] : null}
        loadingMessage={
          "adding " + quickActions[selectedFormId ? selectedFormId : 0]["title"]
        }
        successMessage={
          "added " + quickActions[selectedFormId ? selectedFormId : 0]["title"]
        }
        failMessage={
          "failed to added " +
          quickActions[selectedFormId ? selectedFormId : 0]["title"]
        }
      />
    </>
  );
};

export default QuickActionBar;
