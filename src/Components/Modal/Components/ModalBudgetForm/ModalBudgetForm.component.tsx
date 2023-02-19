import React, { useRef, useState } from "react";
import ModalContainer from "../ModalContainer";
import ModalBudgetItemForm from "./Components/ModalBudgetItemForm.component";
import { UseMutationResult } from "react-query";
import "./ModalBudgetForm.style.scss";

import { BudgetItemType, BudgetType, CategoryType } from "../../../../TypeDefs";
import { Record } from "pocketbase";
import { useOnClickOutside } from "../../../../Hooks";

type Props = {
  mutation: UseMutationResult<any, unknown, any, unknown>;
  prefillData?: BudgetType | CategoryType | Record | null;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalBudgetForm = ({ mutation, prefillData, setShowModal }: Props) => {
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
  const [formErrors, setFormErrors] = useState<{
    title: string | null;
    items: string | null;
  }>({ title: null, items: null });

  const modalBudgetFormRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(modalBudgetFormRef, setShowModal);

  const handleItemAddition = (item: BudgetItemType) => {
    if (editItem) {
      setItems(
        items.map((obj) => {
          if (obj.id === item.id) {
            obj.title = item.title.trim();
            obj.amount = item.amount;
            obj.balance = item.amount - editItem.amount + editItem.balance;
            obj.category = item.category;
            obj.description = item.description.trim();

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
    setItems(items.filter((itemObj) => itemObj.id !== itemId));
  };

  const handleItemEdit = (item: BudgetItemType) => {
    setEditItem(item);
    setShowBudgetItemModal(!showBudgetItemModal);
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (title.length < 1 || items.length < 1) {
      setFormErrors({
        title: title.length < 1 ? "required" : null,
        items: items.length < 1 ? "minimum of one item required" : null,
      });
      return;
    }

    if (prefillData) {
      mutation.mutate({
        budgetId: prefillData.id,
        title: title.trim(),
        total: items.reduce((prev, curr) => prev + curr.amount, 0),
        balance: items.reduce((prev, curr) => {
          const prefillDataItem = (
            (prefillData as BudgetType).items as BudgetItemType[]
          ).find((obj) => obj.id === curr.id);
          return (
            prev +
            curr.amount -
            (prefillDataItem?.amount || 0) +
            (prefillDataItem?.balance || 0)
          );
        }, 0),
        description: description.trim(),
        items: items.map((item) => {
          const prefillDataItem = (
            (prefillData as BudgetType).items as BudgetItemType[]
          ).find((obj) => obj.id === item.id);
          return {
            ...item,
            balance:
              item.amount -
              (prefillDataItem?.amount || 0) +
              (prefillDataItem?.balance || 0),
          };
        }),
      });
      setShowModal(false);
      return;
    }

    mutation.mutate({
      title: title.trim(),
      total: items.reduce((prev, curr) => prev + curr.amount, 0),
      items,
      description: description.trim(),
    });
    setShowModal(false);
  };

  return (
    <>
      {showBudgetItemModal ? null : (
        <ModalContainer>
          <div id="modal-budget-form" ref={modalBudgetFormRef}>
            <h2>Budget</h2>

            <form>
              <div className="form-body">
                {/* title  */}
                <div className="title">
                  <label htmlFor="title-input">Title</label>
                  <input
                    type="text"
                    id="title-input"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                  <p className="validation-message">{formErrors.title}</p>
                </div>

                {/* budget  */}
                <div className="budget-items">
                  <label htmlFor="">Item(s)</label>
                  <div className="budget-items-container">
                    {items.map((item) => {
                      return (
                        <div className="item" key={item.id}>
                          <span
                            className="material-icons"
                            onClick={() => handleItemDelete(item.id)}
                          >
                            remove
                          </span>
                          <div
                            className="title-amount"
                            onClick={() => handleItemEdit({ ...item })}
                          >
                            <div className="item-title">
                              {item.title.trim()}
                            </div>
                            <div className="amount">{item.amount}</div>
                          </div>
                        </div>
                      );
                    })}

                    <div
                      className="add-item"
                      onClick={() =>
                        setShowBudgetItemModal(!showBudgetItemModal)
                      }
                    >
                      + add item
                    </div>
                  </div>
                  <p className="validation-message">{formErrors.items}</p>
                </div>

                {/* description  */}
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
            </form>
            <button type="submit" onClick={(e) => onSubmit(e)}>
              {prefillData ? "Update" : "Add Budget"}
            </button>
          </div>
        </ModalContainer>
      )}
      {showBudgetItemModal ? (
        <div ref={modalBudgetFormRef}>
          <ModalBudgetItemForm
            setShowBudgetItemModal={setShowBudgetItemModal}
            handleItemAddition={handleItemAddition}
            prefillItemData={editItem}
          />
        </div>
      ) : null}
    </>
  );
};

export default ModalBudgetForm;
