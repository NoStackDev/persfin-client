import React, { useRef, useState } from "react";
import {
  useInflowCategoriesQuery,
  useOutflowCategoriesQuery,
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
import { Record as pbRecord } from "pocketbase";
import { useOnClickOutside } from "../../../../../../Hooks";
import ModalContainer from "../../../ModalContainer";
import { ModalCreateCategoryForm } from "../..";

type Props = {
  categoryType: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
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

const ManageCategoryForm = ({ categoryType, setShowModal }: Props) => {
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
    setShowEditModal(true);
  };

  const handleDeleteClick = (category: CategoryType | pbRecord) => {
    deleteMutation[categoryType].mutate({ categoryId: category.id });
  };

  return (
    <>
      <ModalContainer>
        <div id="modal-manage-category" ref={manageCategoryFormRef}>
          {!showEditModal ? (
            <>
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
            </>
          ) : null}

          {showEditModal ? (
            <ModalCreateCategoryForm
              categoryType={categoryType}
              setShowModal={setShowEditModal}
              mutation={updateMutation[categoryType]}
              prefillData={selectedCategory}
            />
          ) : null}
        </div>
      </ModalContainer>

      <Spinner
        mutation={updateMutation[categoryType]}
        loadingMessage={"updating category"}
        successMessage={"updated category"}
        failMessage={"failed to update category"}
      />
      <Spinner
        mutation={deleteMutation[categoryType]}
        loadingMessage={"deleting category"}
        successMessage={"deleted category"}
        failMessage={"failed to delete category"}
      />
    </>
  );
};

export default ManageCategoryForm;
