import React, { useState } from "react";
import { FetchCategories } from "../../../../../../Queries";
import { CategoryType } from "../../../../../../TypeDefs";
import { UseMutationResult } from "react-query";
import "./ManageCategoryForm.style.scss";
import { DeleteCategory, UpdateCategory } from "../../../../../../Mutations";
import Spinner from "../../../../../Spinner";
import Modal from "../../../../Modal.component";

type Props = {
  categoryType: string;
  setShowMainModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const renderCategoryItem = (
  categoryType: string,
  category: CategoryType,
  handleEditClick: (categoryId: string) => void,
  handleDeleteClick: (categoryId: string) => void
) => {
  if (categoryType !== category.categoryType) {
    return null;
  }
  return (
    <div key={category._id} className="category">
      <div>
        <span>{category.title}</span>
      </div>
      <div>
        <span
          className="material-icons edit"
          onClick={() => handleEditClick(category._id)}
        >
          edit
        </span>
        <span
          className="material-icons delete"
          onClick={() => handleDeleteClick(category._id)}
        >
          delete
        </span>
      </div>
    </div>
  );
};

const ManageCategoryForm = ({ categoryType }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null
  );
  const [showMainModal, setShowMainModal] = useState<boolean>(false);
  const userId = "636ac4a250bbc5afa6004a8c";

  // queries
  const {
    isLoading: isLoadingCategoriesData,
    isSuccess: isSuccessCategoriesData,
    data: categoriesData,
  } = FetchCategories(userId);

  // mutation
  const deleteMutation = DeleteCategory();
  const updateMutation = UpdateCategory();

  const handleEditClick = (categoryId: string) => {
    if (!categoriesData) {
      return;
    }
    const category = categoriesData.find(
      (obj: CategoryType) => obj._id === categoryId
    );
    setSelectedCategory({...category});
    setShowMainModal(true);
  };

  const handleDeleteClick = (categoryId: string) => {
    deleteMutation.mutate({ category: categoryId });
  };

  return (
    <>
      <div id="modal-manage-category">
        <form action="">
          <h2>Manage Category</h2>
          <div className="form-body">
            <div className="category-type">
              <input type="text" value={categoryType} readOnly />
            </div>
            <div className="categories-container">
              {categoriesData.map((category: CategoryType) => {
                return renderCategoryItem(
                  categoryType,
                  category,
                  handleEditClick,
                  handleDeleteClick
                );
              })}
            </div>
          </div>
        </form>
      </div>
      {showMainModal ? (
        <Modal
          quickActionId={6}
          setShowMainModal={setShowMainModal}
          mutation={updateMutation}
          prefillData={selectedCategory}
        />
      ) : null}
      <Spinner mutation={updateMutation} message={"updating category"} />
      <Spinner mutation={deleteMutation} message={"deleting category"} />
    </>
  );
};

export default ManageCategoryForm;
