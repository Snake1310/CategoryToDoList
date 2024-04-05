import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import style from "./App.module.css";
import Category from "./Category/Category.jsx";

function App() {
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem("categories");
    return savedCategories ? JSON.parse(savedCategories) : [];
  });

  const updateCategories = (newCategories) => {
    setCategories(newCategories);
    localStorage.setItem("categories", JSON.stringify(newCategories));
  };

  const addCategory = () => {
    const title = prompt("Introduceti titlul categoriei:");
    if (title) {
      const newCategory = {
        title: title,
        listElements: [],
        listElementsCount: 0,
      };
      updateCategories([...categories, newCategory]);
    }
  };

  const editCategory = (categoryIndex, newTitle) => {
    const newCategories = [...categories];
    newCategories[categoryIndex] = {
      ...newCategories[categoryIndex],
      title: newTitle,
    };
    updateCategories(newCategories);
  };

  const removeCategory = (index) => {
    const newCategories = [...categories];
    newCategories.splice(index, 1);
    updateCategories(newCategories);
  };

  const addElement = (categoryIndex, element) => {
    const newCategories = [...categories];
    newCategories[categoryIndex] = {
      ...newCategories[categoryIndex],
      listElements: [...newCategories[categoryIndex].listElements, element],
      listElementsCount: newCategories[categoryIndex].listElementsCount + 1,
    };
    updateCategories(newCategories);
  };

  const removeElement = (categoryIndex, listElementIndex) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].listElements.splice(listElementIndex, 1);
    newCategories[categoryIndex].listElementsCount--;
    updateCategories(newCategories);
  };

  const editElement = (categoryIndex, listElementIndex, newTitle) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].listElements[listElementIndex] = newTitle;
    updateCategories(newCategories);
  };

  const handleSort = (draggedIndex, dropIndex) => {
    const newCategories = [...categories];
    const draggedCategory = newCategories[draggedIndex];
    newCategories.splice(draggedIndex, 1);
    newCategories.splice(dropIndex, 0, draggedCategory);
    updateCategories(newCategories);
  };

  return (
    <div className="App">
      <h1 style={{ padding: "20px 0" }}>To do</h1>
      {categories.map((category, index) => (
        <Category
          key={index}
          onHandleSort={handleSort}
          index={index}
          title={category.title}
          listElements={category.listElements}
          listElementsCount={category.listElementsCount}
          onEditCategory={(newTitle) => editCategory(index, newTitle)}
          onRemoveCategory={() => removeCategory(index)}
          onAddElement={(element) => addElement(index, element)}
          onRemoveElement={(listElementIndex) =>
            removeElement(index, listElementIndex)
          }
          onEditElement={(listElementIndex, newTitle) =>
            editElement(index, listElementIndex, newTitle)
          }
        />
      ))}
      <button onClick={addCategory} className={style.button}>
        <FaPlus />
        &nbsp; Adaugă categorie
      </button>
    </div>
  );
}

export default App;