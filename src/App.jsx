import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import style from "./App.module.css";
import Category from "./Category/Category.jsx";

function App() {
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem("categories");
    return savedCategories ? JSON.parse(savedCategories) : [];
  });

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const addCategory = () => {
    const title = prompt("Introduceti titlul categoriei:");
    if (title) {
      setCategories((prevCategories) => [
        ...prevCategories,
        { title, listElements: [] },
      ]);
    }
  };

  const editCategory = (categoryIndex, newTitle) => {
    setCategories((prevCategories) => {
      const newCategories = [...prevCategories];
      newCategories[categoryIndex] = {
        ...newCategories[categoryIndex],
        title: newTitle,
      };
      return newCategories;
    });
  };

  const removeCategory = (index) => {
    setCategories((prevCategories) =>
      prevCategories.filter((_, i) => i !== index)
    );
  };

  const addElement = (categoryIndex, element) => {
    setCategories((prevCategories) => {
      const newCategories = [...prevCategories];
      newCategories[categoryIndex] = {
        ...newCategories[categoryIndex],
        listElements: [...newCategories[categoryIndex].listElements, element],
      };
      return newCategories;
    });
  };

  const removeElement = (categoryIndex, listElementIndex) => {
    setCategories((prevCategories) => {
      const newCategories = [...prevCategories];
      newCategories[categoryIndex].listElements.splice(listElementIndex, 1);
      return newCategories;
    });
  };

  const editElement = (categoryIndex, listElementIndex, newTitle) => {
    setCategories((prevCategories) => {
      const newCategories = [...prevCategories];
      newCategories[categoryIndex].listElements[listElementIndex] = newTitle;
      return newCategories;
    });
  };
  
  const handleSort = (draggedIndex, dropIndex) => {
    console.log(draggedIndex, dropIndex)
    const newCategories = [...categories];
    const draggedCategory = newCategories[draggedIndex];
    newCategories.splice(draggedIndex, 1);
    newCategories.splice(dropIndex, 0, draggedCategory);
    setCategories(newCategories);
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