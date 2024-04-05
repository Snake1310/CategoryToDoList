import PropTypes from "prop-types";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { LuPencilLine, LuTrash2 } from "react-icons/lu";

import CategoryElement from "../CategoryElement/CategoryElement";
import styles from "./Category.module.css";

const Category = ({
  index,
  onHandleSort,
  title,
  listElements,
  listElementsCount,
  onEditCategory,
  onRemoveCategory,
  onAddElement,
  onRemoveElement,
  onEditElement,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleAddElement = () => {
    const element = prompt("Introduceti titlul elementului:");
    if (element) {
      onAddElement(element);
    }
  };

  const handleEdit = () => {
    const newTitle = prompt("Introduceti noul titlu pentru element:");
    if (newTitle) {
      onEditCategory(newTitle);
    }
  };

  const generateUniqueIds = (elements) => {
    return elements.map((element, index) => ({
      id: index,
      title: element,
    }));
  };

  const elementsWithIds = generateUniqueIds(listElements);

  // This function activates on the component that is being dragged and sets the index of the dragged component on event
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // This function activates on the component over which the initial component is being dragged and this time index = the index of the component I am dragging over
  // The initial index of the component that is being dragged is saved in draggedIndex from event.dataTransfer.getData()
  const handleDrop = (e) => {
    const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"));
    onHandleSort(draggedIndex, index);
  };

  return (
    <div
      className={styles["category-container"]}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className={styles["category-title-container"]}>
        <div
          className={styles["category-title"]}
          onClick={handleToggleDropdown}
        >
          <h2>{title}</h2>
          <span>{listElementsCount}</span>
          {isOpen ? <FaChevronDown /> : <FaChevronUp />}
        </div>
        <div>
          <LuPencilLine onClick={handleEdit} className={styles.icon} />
          <LuTrash2 onClick={onRemoveCategory} className={styles.icon} />
        </div>
      </div>
      <div
        className={`${styles["category-content-container"]} ${
          isOpen ? styles["open"] : ""
        }`}
      >
        <ul>
          {elementsWithIds.map((element) => (
            <CategoryElement
              key={element.id}
              id={element.id}
              element={element.title}
              onRemove={onRemoveElement}
              onEdit={(newTitle) => onEditElement(element.id, newTitle)}
            />
          ))}
        </ul>{" "}
        <button onClick={handleAddElement}>Adaugă item</button>
      </div>
    </div>
  );
};

Category.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  onHandleSort: PropTypes.func.isRequired,
  listElements: PropTypes.array.isRequired,
  listElementsCount: PropTypes.number.isRequired,
  onEditCategory: PropTypes.func.isRequired,
  onRemoveCategory: PropTypes.func.isRequired,
  onAddElement: PropTypes.func.isRequired,
  onRemoveElement: PropTypes.func.isRequired,
  onEditElement: PropTypes.func.isRequired,
};

export default Category;
