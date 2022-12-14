import React, { useState } from "react";
import ModalContainer from "../ModalContainer";
import ModalBudgetItemForm from "./Components/ModalBudgetItemForm.component";
import { UseMutationResult } from "react-query";
import "./ModalBudgetForm.style.scss";

import { BudgetItemType, BudgetType, CategoryType } from "../../../../TypeDefs";

type Props = {
  setShowMainModal: React.Dispatch<React.SetStateAction<boolean>>;
  mutation: UseMutationResult<any, unknown, any, unknown>;
  prefillData?: BudgetType | CategoryType | null;
};

const ModalBudgetForm = ({
  setShowMainModal,
  mutation,
  prefillData,
}: Props) => {
  const [title, setTitle] = useState<string>(prefillData?.title || "");
  const [description, setDescription] = useState<string>(
    prefillData?.description || ""
  );
  const [items, setItems] = useState<BudgetItemType[]>(
    prefillData ? (prefillData as BudgetType).items : []
  );
  const [editItem, setEditItem] = useState<BudgetItemType | null>(null);
  const [showBudgetItemModal, setShowBudgetItemModal] =
    useState<boolean>(false);

  const userId = "636ac4a250bbc5afa6004a8c";

  const handleItemAddition = (item: BudgetItemType) => {
    if (editItem) {
      setItems(
        items.map((obj) => {
          if (obj._id === item._id) {
            obj.title = item.title;
            obj.amount = item.amount;
            obj.balance = item.amount - editItem.amount + editItem.balance;
            obj.category = item.category;
            obj.description = item.description;

            return obj;
          }
          return obj;
        })
      );
      setEditItem(null);
      return;
    }
    setItems([...items, item]);
  };

  const handleItemDelete = (itemId: string | undefined) => {
    setItems(items.filter((itemObj) => itemObj._id !== itemId));
  };

  const handleItemEdit = (item: BudgetItemType) => {
    setEditItem(item);
    setShowBudgetItemModal(!showBudgetItemModal);
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (prefillData) {
      mutation.mutate({
        budgetId: prefillData._id,
        title,
        total: items.reduce((prev, curr) => prev + curr.amount, 0),
        balance: items.reduce((prev, curr) => {
          const prefillDataItem = (prefillData as BudgetType).items.find(
            (obj) => obj._id === curr._id
          );
          return (
            prev +
            curr.amount -
            (prefillDataItem?.amount || 0) +
            (prefillDataItem?.balance || 0)
          );
        }, 0),
        description,
        items: items.map((item) => {
          const prefillDataItem = (prefillData as BudgetType).items.find(
            (obj) => obj._id === item._id
          );
          const { _id, ...others } = item;
          return {
            ...others,
            balance:
              item.amount -
              (prefillDataItem?.amount || 0) +
              (prefillDataItem?.balance || 0),
          };
        }),
      });
      setShowMainModal(false);
      return;
    }

    mutation.mutate({
      userId,
      title,
      total: items.reduce((prev, curr) => prev + curr.amount, 0),
      items: items.map((obj) => {
        const { _id, ...others } = obj;
        return { ...others };
      }),
      description,
    });
    setShowMainModal(false);
  };

  return (
    <div id="modal-budget-form">
      <form>
        <h2>Budget</h2>
        <div className="form-body">
          <div className="title">
            <label htmlFor="title-input">Title</label>
            <input
              type="text"
              id="title-input"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="budget-items">
            <label htmlFor="">Item(s)</label>
            <div className="budget-items-container">
              {items.map((item) => {
                return (
                  <div className="item" key={item._id}>
                    <span
                      className="material-icons"
                      onClick={() => handleItemDelete(item._id)}
                    >
                      remove
                    </span>
                    <div
                      className="title-amount"
                      onClick={() => handleItemEdit({ ...item })}
                    >
                      <div className="item-title">{item.title}</div>
                      <div className="amount">{item.amount}</div>
                    </div>
                  </div>
                );
              })}

              <div
                className="add-item"
                onClick={() => setShowBudgetItemModal(!showBudgetItemModal)}
              >
                + add item
              </div>
            </div>
          </div>
          <div className="description">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description-text-area"
              rows={2}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>
          </div>
        </div>
        <button type="submit" onClick={(e) => onSubmit(e)}>
          {prefillData ? "Update" : "Add Budget"}
        </button>
      </form>
      {showBudgetItemModal ? (
        <div className="budget-item-modal">
          <ModalContainer />
          <ModalBudgetItemForm
            setShowBudgetItemModal={setShowBudgetItemModal}
            handleItemAddition={handleItemAddition}
            prefillItemData={editItem}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ModalBudgetForm;
