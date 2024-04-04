import PropTypes from "prop-types";
import { useState } from "react";
import { LuPencilLine, LuTrash2 } from "react-icons/lu";
import styles from "./CategoryElement.module.css";

const CategoryElement = ({ id, element, onRemove, onEdit }) => {
  const handleEdit = () => {
    const newTitle = prompt("Introduceti noul titlu pentru element:");
    if (newTitle) {
      onEdit(newTitle);
    }
  };

  const handleRemove = () => {
    onRemove(id);
  };
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <li className={styles["list-item"]}>
      <div className={styles["list-item-content"]}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span onClick={handleCheckboxChange}>{element}</span>
      </div>
      <div>
        <LuPencilLine onClick={handleEdit} className={styles.icon} />
        <LuTrash2 onClick={handleRemove} className={styles.icon} />
      </div>
    </li>
  );
};

CategoryElement.propTypes = {
  id: PropTypes.number.isRequired,
  element: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default CategoryElement;
