import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, updateItem } from "./redtool/slices/crudSlice";

const CrudTable = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.crud.items);

  const [newItemName, setNewItemName] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingItemName, setEditingItemName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

/*   useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("crudItems"));
    if (storedItems) {
      storedItems.forEach((item) => {
        dispatch(addItem(item));
      });
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("crudItems", JSON.stringify(items));
  }, [items]); */

  const handleAddItem = () => {
    if (newItemName) {
      dispatch(addItem({ id: Date.now(), name: newItemName }));
      setNewItemName("");
    }
  };

  const handleUpdateItem = (id) => {
    if (editingItemName) {
      dispatch(updateItem({ id, name: editingItemName }));
      setEditingItemId(null);
      setEditingItemName("");
    }
  };

  const handleDeleteItem = () => {
    dispatch(removeItem(deleteItemId));
    setShowDeleteModal(false);
  };

  const orderedItems = [...items].sort((a, b) => a.id - b.id);

  const filteredItems = orderedItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex items-center justify-center pt-[70px]">
      <div className="p-5 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-2xl text-green-800 mb-4 text-center">Table</h2>

        <div className="mb-4 w-[500px]">
          <input
            type="text"
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center mb-4">
          <input
            className="w-[395px] border border-gray-300 rounded-md px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            type="text"
            placeholder="Enter item name"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          <button
            onClick={handleAddItem}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            Add Item
          </button>
        </div>

        <div className="overflow-x-auto w-[500px]">
          <table className=" bg-white rounded-lg shadow-lg w-[500px]">
            <thead>
              <tr className="bg-green-100">
                <th className="text-left py-2 px-4 text-gray-700">ID</th>
                <th className="text-left py-2 px-4 text-gray-700">Name</th>
                <th className="text-left py-2 px-4 text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 hover:bg-green-50 transition duration-150"
                  >
                    <td className="py-2 px-4">{item.id}</td>
                    <td className="py-2 px-4">
                      {editingItemId === item.id ? (
                        <input
                          className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                          type="text"
                          value={editingItemName}
                          onChange={(e) => setEditingItemName(e.target.value)}
                        />
                      ) : (
                        item.name
                      )}
                    </td>
                    <td className="py-2 px-4">
                      {editingItemId === item.id ? (
                        <>
                          <button
                            onClick={() => handleUpdateItem(item.id)}
                            className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-blue-600 transition duration-300"
                          >
                            <i className="fa-solid fa-bookmark"></i>
                          </button>
                          <button
                            onClick={() => setEditingItemId(null)}
                            className="bg-gray-500 text-white px-2 py-1 rounded-md hover:bg-gray-600 transition duration-300"
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setEditingItemId(item.id);
                              setEditingItemName(item.name);
                            }}
                            className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-yellow-600 transition duration-300"
                          >
                            <i className="fa-solid fa-pen"></i>
                          </button>
                          <button
                            onClick={() => {
                              setDeleteItemId(item.id);
                              setShowDeleteModal(true);
                            }}
                            className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition duration-300"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">
                    No items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3 max-w-md">
            <p className="mb-6 text-gray-600">Do you really want to delete this item?</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-500 text-white px-6 py-2 rounded-md mr-4 hover:bg-gray-600"
              >
                No
              </button>
              <button
                onClick={handleDeleteItem}
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrudTable;
