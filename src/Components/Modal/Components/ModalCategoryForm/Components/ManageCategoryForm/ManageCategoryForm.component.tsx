import React from "react";
import { FetchCategories } from "../../../../../../Queries";
import { CategoryType } from "../../../../../../Types";
import { UseMutationResult } from "react-query";
import "./ManageCategoryForm.style.scss";

type Props = {
  categoryType: string;
  setShowMainModal: React.Dispatch<React.SetStateAction<boolean>>;
  mutation: UseMutationResult<any, unknown, any, unknown>;
};

const ManageCategoryForm = ({ categoryType, setShowMainModal }: Props) => {
  const userId = "636ac4a250bbc5afa6004a8c";

  // queries
  const {
    isLoading: isLoadingCategoriesData,
    isSuccess: isSuccessCategoriesData,
    data: categoriesData,
  } = FetchCategories(userId);

  return (
    <div id="modal-manage-category">
      <form action="">
        <h2>Manage Category</h2>
        <div className="form-body">
          <div className="category-type">
            <label htmlFor="">Category Type</label>
            <input type="text" value={categoryType} readOnly />
          </div>
          <div className="categories-container">
            {categoriesData.map((category: CategoryType) => {
              return (
                <div key={category._id} className="category">
                  <div>
                    <span>{category.title}</span>
                  </div>
                  <div>
                    <span className="material-icons edit">edit</span>
                    <span className="material-icons delete">delete</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ManageCategoryForm;
