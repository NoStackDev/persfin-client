import { useRef, useState } from "react";
import "./ModalInflowForm.style.scss";
import { UseMutationResult } from "react-query";
import { useInflowCategoriesQuery } from "../../../../Queries";
import { CategoryType } from "../../../../TypeDefs";
import { Record } from "pocketbase";
import { useOnClickOutside } from "../../../../Hooks";
import { CreateInflowCategory } from "../../../../Mutations";
import { CreateCategoryForm } from "../ModalCategoryForm";
import Spinner from "../../../Spinner";

type Props = {
  setShowMainModal: React.Dispatch<React.SetStateAction<boolean>>;
  mutation: UseMutationResult<any, unknown, any, unknown>;
};

const ModalInflowForm = ({ setShowMainModal, mutation }: Props) => {
  const [inputValues, setInputValues] = useState<{
    title: string;
    amount: number;
    category: CategoryType | Record | null;
    description: string;
  }>({
    title: "",
    amount: 0,
    category: null,
    description: "",
  });

  const [formErrors, setFormErrors] = useState<{
    title: string | null;
    amount: string | null;
  }>({ title: null, amount: null });

  const [showCategoryOptions, setShowCategoryOptions] =
    useState<boolean>(false);

  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);

  const modalInflowFormRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(modalInflowFormRef, setShowMainModal);
  const categoryOptionsRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(categoryOptionsRef, setShowCategoryOptions);

  //queries
  const { data: categoryData } = useInflowCategoriesQuery();

  //mutations
  const createCategoryMutation = CreateInflowCategory();

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (inputValues.title.length < 1 || inputValues.amount <= 0) {
      setFormErrors({
        title: inputValues.title.length < 1 ? "required" : null,
        amount: inputValues.amount <= 0 ? "must be greater than 0" : null,
      });
      return;
    }

    mutation.mutate({
      title: inputValues.title.trim(),
      amount: inputValues.amount,
      category: inputValues.category?.id,
      description: inputValues.description.trim(),
    });
    setShowMainModal(false);
  };

  const onCategoryChange = (category: CategoryType | Record | null) => {
    setInputValues({ ...inputValues, category });
    setShowCategoryOptions(!showCategoryOptions);
  };

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) {
      return;
    }
    setInputValues({ ...inputValues, amount: Number(e.target.value) });
  };

  return (
    <>
      <div id="modal-inflow-form" ref={modalInflowFormRef}>
        {showCreateCategoryModal ? null : (
          <>
            <h2>Inflow</h2>

            <form>
              <div className="form-body">
                {/* title  */}
                <div className="title">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setInputValues({ ...inputValues, title: e.target.value })
                    }
                    value={inputValues.title}
                  />
                  <p className="validation-message">{formErrors.title}</p>
                </div>

                {/* amount  */}
                <div className="amount">
                  <label htmlFor="amount">amount</label>
                  <input
                    type="text"
                    onChange={(e) => onAmountChange(e)}
                    value={inputValues.amount}
                  />
                  <p className="validation-message">{formErrors.amount}</p>
                </div>

                {/* category  */}
                <div className="category" ref={categoryOptionsRef}>
                  <label htmlFor="category-options-container">Category</label>
                  <div
                    className="category-selected"
                    onClick={() => setShowCategoryOptions(!showCategoryOptions)}
                  >
                    {inputValues.category
                      ? inputValues.category.title.trim()
                      : "Others"}
                  </div>
                  <div
                    className={`category-options-container show-${showCategoryOptions}`}
                  >
                    <div
                      className="category-options"
                      onClick={() => onCategoryChange(null)}
                    >
                      {inputValues.category ? "Others" : null}
                    </div>

                    {categoryData?.map((ele) => {
                      return ele.id !== inputValues.category?.id ? (
                        <div
                          className="category-options"
                          onClick={(e) => onCategoryChange(ele)}
                          key={ele.id}
                        >
                          {ele.title.trim()}
                        </div>
                      ) : null;
                    })}

                    <div
                      className="category-options add-category"
                      onClick={(e) => setShowCreateCategoryModal(true)}
                    >
                      add category
                    </div>
                  </div>
                </div>

                {/* description  */}
                <div className="description">
                  <label htmlFor="description">Description</label>
                  <textarea
                    name="description"
                    id="description-text-area"
                    rows={2}
                    onChange={(e) =>
                      setInputValues({
                        ...inputValues,
                        description: e.target.value,
                      })
                    }
                    value={inputValues.description}
                  ></textarea>
                </div>
              </div>
            </form>
            <button type="submit" onClick={(e) => onSubmit(e)}>
              Add Inflow
            </button>
          </>
        )}

        {showCreateCategoryModal ? (
          <CreateCategoryForm
            mutation={createCategoryMutation}
            categoryType={"inflow"}
            setShowMainModal={setShowCreateCategoryModal}
          />
        ) : null}
      </div>
      <Spinner
        mutation={createCategoryMutation}
        loadingMessage={"adding category"}
        successMessage={"added category"}
        failMessage={"failed to add category"}
      />
    </>
  );
};

export default ModalInflowForm;
