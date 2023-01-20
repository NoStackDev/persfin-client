import React, { useState } from "react";
import {
  FetchInflowCategories,
  FetchOutflowCategories,
} from "../../../../../../Queries";
import { CategoryType } from "../../../../../../TypeDefs";
import { UseMutationResult, UseQueryResult } from "react-query";
import "./ManageCategoryForm.style.scss";
import {
  DeleteInflowCategory,
  DeleteOutflowCategory,
  UpdateInflowCategory,
  UpdateOutflowCategory,
} from "../../../../../../Mutations";
import Spinner from "../../../../../Spinner";
import Modal from "../../../../Modal.component";
import { Record as pbRecord } from "pocketbase";

type Props = {
  categoryType: string;
  setShowMainModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const renderCategoryItem = (
  category: CategoryType | pbRecord,
  handleEditClick: (category: CategoryType | pbRecord) => void,
  handleDeleteClick: (category: CategoryType | pbRecord) => void
) => {
  return (
    <div key={category.id} className="category">
      <div>
        <span>{category.title}</span>
      </div>
      <div>
        <span
          className="material-icons edit"
          onClick={() => handleEditClick(category)}
        >
          edit
        </span>
        <span
          className="material-icons delete"
          onClick={() => handleDeleteClick(category)}
        >
          delete
        </span>
      </div>
    </div>
  );
};

const ManageCategoryForm = ({ categoryType }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryType | pbRecord | null
  >(null);
  const [showMainModal, setShowMainModal] = useState<boolean>(false);

  // queries
  const CategoryQuery: Record<
    string,
    UseQueryResult<(CategoryType | pbRecord)[], unknown>
  > = {
    inflowCategories: FetchInflowCategories(),
    outflowCategories: FetchOutflowCategories(),
  };

  // mutation
  const deleteMutation: Record<
    string,
    UseMutationResult<any, unknown, any, unknown>
  > = {
    inflowCategories: DeleteInflowCategory(),
    outflowCategories: DeleteOutflowCategory(),
  };
  const updateMutation: Record<
    string,
    UseMutationResult<any, unknown, any, unknown>
  > = {
    inflowCategories: UpdateInflowCategory(),
    outflowCategories: UpdateOutflowCategory(),
  };

  const handleEditClick = (category: CategoryType | pbRecord) => {
    setSelectedCategory(category);
    setShowMainModal(true);
  };

  const handleDeleteClick = (category: CategoryType | pbRecord) => {
    deleteMutation[categoryType].mutate({ categoryId: category.id });
  };

  return (
    <>
      <div id="modal-manage-category">
        <form action="">
          <h2>Manage Category</h2>
          <div className="form-body">
            <div className="category-type">
              <input
                type="text"
                value={categoryType.includes("inflow") ? "Inflow" : "Outflow"}
                readOnly
              />
            </div>
            <div className="categories-container">
              {CategoryQuery[categoryType].data?.map((category) => {
                return renderCategoryItem(
                  category,
                  handleEditClick,
                  handleDeleteClick
                );
              })}
              <div key={"others"} className="category">
                <div>
                  <span>others</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      {showMainModal ? (
        <Modal
          quickActionId={6}
          setShowMainModal={setShowMainModal}
          mutation={updateMutation[categoryType]}
          prefillData={selectedCategory}
        />
      ) : null}
      <Spinner
        mutation={updateMutation[categoryType]}
        message={"updating category"}
      />
      <Spinner
        mutation={deleteMutation[categoryType]}
        message={"deleting category"}
      />
    </>
  );
};

export default ManageCategoryForm;
