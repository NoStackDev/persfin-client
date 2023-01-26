import React, { useMemo, useState } from "react";

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
import Modal from "../Modal";
import Spinner from "../Spinner";
import { UseMutationResult } from "react-query";

type Props = {};

const QuickActionBar = (props: Props) => {
  const [showMainModal, setShowMainModal] = useState<boolean>(false);
  const [selectedFormId, setSelectedFormId] = useState<number | null>(null);

  // queries
  const {
    isLoading: isLoadingSavingsData,
    isSuccess: isSuccessSavingsData,
    data: savingsData,
  } = useSavingsQuery();

  const {
    isLoading: isLoadingInflowsData,
    isSuccess: isSuccessInflowsData,
    data: inflowsData,
  } = useInflowsQuery();

  const {
    isLoading: isLoadingOutflowsData,
    isSuccess: isSuccessOutflowsData,
    data: outflowsData,
  } = useOutlflowsQuery();

  const {
    isLoading: isLoadingBudgetsData,
    isSuccess: isSuccessBudgetsData,
    data: budgetsData,
  } = useBudgetsQuery();

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
    return calculateBalance(savingsData, inflowsData, outflowsData);
  }, [savingsData, inflowsData, outflowsData]);

  const savingsTotal = useMemo(() => {
    return calculateSavings(savingsData);
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
        return budgetsData?.length;
      default:
        return 0;
    }
  };

  return (
    <>
      <section className="quick-action-bar">
        <div className="carousel-container">
          <div className="carousel">
            {quickActions.map((quickAction, index) => {
              return (
                <QuickActionCard
                  id={quickAction.id}
                  icon={quickAction.icon}
                  title={quickAction.title}
                  showCurrency={quickAction.showCurrency}
                  amount={getAmount(quickAction.title)}
                  hasBtn={quickAction.hasBtn}
                  btnText={quickAction.btnText}
                  setSelectedFormId={setSelectedFormId}
                  hasFixedDateFilter={quickAction.hasFixedDateFilter}
                  setShowMainModal={setShowMainModal}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      </section>

      {showMainModal ? (
        <Modal
          quickActionId={selectedFormId}
          setShowMainModal={setShowMainModal}
          mutation={selectedFormId ? mutations[selectedFormId] : null}
        />
      ) : null}

      <Spinner
        mutation={selectedFormId ? mutations[selectedFormId] : null}
        message={
          "adding " + quickActions[selectedFormId ? selectedFormId : 0]["title"]
        }
      />
    </>
  );
};

export default QuickActionBar;
