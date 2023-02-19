import React, { useRef, useState } from "react";
import {
  useInflowCategoriesQuery,
  useOutflowCategoriesQuery,
} from "../../../../../../Queries";
import { CategoryType } from "../../../../../../TypeDefs";
import { UseMutationResult, UseQueryResult } from "react-query";
import "./ManageCategoryForm.style.scss";
import { Record as pbRecord } from "pocketbase";
import { useOnClickOutside } from "../../../../../../Hooks";
import ModalContainer from "../../../ModalContainer";
import { ModalCreateCategoryForm } from "../..";

type Props = {
  categoryType: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  updateMutation: UseMutationResult<any, unknown, any, unknown>;
  deleteMutation: UseMutationResult<any, unknown, any, unknown>;
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

const ManageCategoryForm = ({
  categoryType,
  setShowModal,
  updateMutation,
  deleteMutation,
}: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryType | pbRecord | null
  >(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const manageCategoryFormRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(manageCategoryFormRef, setShowModal);

  // queries
  const CategoryQuery: Record<
    string,
    UseQueryResult<(CategoryType | pbRecord)[], unknown>
  > = {
    inflowCategories: useInflowCategoriesQuery(),
    outflowCategories: useOutflowCategoriesQuery(),
  };

  const handleEditClick = (category: CategoryType | pbRecord) => {
    setSelectedCategory(category);
    setShowEditModal(true);
  };

  const handleDeleteClick = (category: CategoryType | pbRecord) => {
    deleteMutation.mutate({ categoryId: category.id });
  };

  return (
    <>
      {showEditModal ? null : (
        <ModalContainer>
          <div id="modal-manage-category" ref={manageCategoryFormRef}>
            <h2>Manage Category</h2>

            <form action="">
              <div className="form-body">
                <div className="category-type">
                  <input
                    type="text"
                    value={
                      categoryType.includes("inflow") ? "Inflow" : "Outflow"
                    }
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
        </ModalContainer>
      )}

      {showEditModal ? (
        <div ref={manageCategoryFormRef}>
          <ModalCreateCategoryForm
            categoryType={categoryType}
            setShowModal={setShowEditModal}
            mutation={updateMutation}
            prefillData={selectedCategory}
          />
        </div>
      ) : null}
    </>
  );
};

export default ManageCategoryForm;
