import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PieChart from "./components/PieChart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

const App = () => {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showExpenseReport, setShowExpenseReport] = useState(false);
  const [showEditExpenseReport, setShowEditExpenseReport] = useState(false);

  const [expenses, setExpenses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");

  const [id, setId] = useState("");
  const [idName, setIdName] = useState("");
  const [idAmount, setIdAmount] = useState(0);
  const [idDate, setIdDate] = useState("");

  const [delId, setDelId] = useState("");

  const [updatedName, setUpdatedName] = useState();
  const [updatedAmount, setUpdatedAmount] = useState();
  const [updatedDate, setUpdatedDate] = useState();

  const handleCloseAddExpense = () => setShowAddExpense(false);
  const handleShowAddExpense = () => setShowAddExpense(true);

  const handleCloseExpenseReport = () => setShowExpenseReport(false);
  const handleShowExpenseReport = () => setShowExpenseReport(true);

  const handleCloseEditExpenseReport = () => setShowEditExpenseReport(false);
  const handleShowEditExpenseReport = () => setShowEditExpenseReport(true);

  const handleAddExpense = async () => {
    try {
      await axios.post("http://localhost:5000/expenses", {
        name: name,
        amount: amount,
        date: date,
      });
      window.location.reload();
      toast.success("Expense Added Successfully");
      setShowAddExpense(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong!");
    }
  };

  const handleEditExpenseReport = async () => {
    try {
      await axios.put(`http://localhost:5000/expenses/${id}`, {
        name: updatedName,
        amount: updatedAmount,
        date: updatedDate,
      });
      toast.success("Expense Updated Successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong!");
    }
  };

  const handleDeleteExpenseReport = async (id) => {
    try {
      console.log(id);
      await axios.delete(`http://localhost:5000/expenses/${id}`);
      window.location.reload();
      toast.success("Expense Deleted Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong!");
    }
  };

  useEffect(() => {
    const getExpenses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/expenses");
        setExpenses(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getExpenses();
  }, []);

  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const filteredExpenses = expenses.filter((expense) =>
    expense.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col justify-center items-center mt-[3%] w-[80%] mr-[5%] ml-[5%]">
        <h1 className="h-12 text-3xl font-medium font-pacifico bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-indigo-500">
          Expense Tracker
        </h1>
        <div className="relative flex items-center justify-between mt-5 w-[100%]">
          <div className="relative flex justify-between w-[300px]">
            <button
              className="bg-[#33cc33] p-[10px] border-none rounded-lg outline-none cursor-pointer text-[#fff] text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-110"
              onClick={handleShowAddExpense}
            >
              Add Expense
            </button>

            <Modal
              size="lg"
              show={showAddExpense}
              onHide={handleCloseAddExpense}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>ADD EXPENSE</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="flex flex-col items-center justify-center mb-3 mt-2">
                  <div className="flex flex-row items-center justify-start mb-3">
                    <label htmlFor="" className="font-semibold text-[18px]">
                      Expense Name
                    </label>
                    <input
                      type="text"
                      className="border-1 ml-6 border-[#555] p-[5px] border-solid rounded w-52"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-row items-center justify-start mb-3">
                    <label htmlFor="" className="font-semibold text-[18px]">
                      Expense Amount
                    </label>
                    <input
                      placeholder="₹ 0.0"
                      type="Number"
                      className="border-1 ml-2 border-[#555] p-[5px] border-solid rounded w-52"
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-row items-center justify-start">
                    <label htmlFor="" className="font-semibold text-[18px]">
                      Date Added
                    </label>
                    <input
                      type="date"
                      className="border-1 ml-12 border-[#555] p-[5px] border-solid rounded w-52"
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={handleAddExpense} variant="primary">
                  Add Expense
                </Button>
              </Modal.Footer>
            </Modal>

            <button
              onClick={handleShowExpenseReport}
              className="bg-[#33ccff] p-[10px] border-none rounded-lg outline-none cursor-pointer text-[#fff] text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-110"
            >
              Expense Report
            </button>
            <Modal
              size="lg"
              show={showExpenseReport}
              onHide={handleCloseExpenseReport}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>EXPENSE REPORT</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="flex flex-col items-center justify-center">
                  <PieChart expenses={expenses} />
                  <div className="mt-2">
                    <span className="font-medium">Total Expense : </span>
                    <span className=" ml-1 pl-2 pr-2 text-white font-medium bg-slate-500 rounded-lg shadow-2xl">
                      ₹ {totalExpense}
                    </span>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
          <div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col ">
          {filteredExpenses.map((expense) => (
            <div
              key={expense._id}
              className="rounded-lg relative flex justify-between items-center w-[80vw] h-[100px] bg-gradient-to-r from-black to-slate-400 my-[20px] py-[10px] shadow-lg"
            >
              <h2 className="m-[20px] text-[#555] text-[18px] text-white font-medium">
                {expense.name}
              </h2>
              <span className="m-[20px] text-[18px] text-white">
                {expense.date}
              </span>
              <span className="m-[20px] text-[18px] text-white font-medium">
                ₹ {expense.amount}
              </span>
              <div className="m-[20px]">
                <FaTrash
                  onClick={() => {
                    setDelId(expense._id);
                    handleDeleteExpenseReport(expense._id);
                  }}
                  className="m-[20px] text-[20px] text-[#33ccff] cursor-pointer"
                />
                <FaEdit
                  onClick={() => {
                    handleShowEditExpenseReport();
                    setId(expense._id);
                    setIdAmount(expense._amount);
                    setIdDate(expense._date);
                  }}
                  className="m-[20px] text-[20px] text-[#33cc33] cursor-pointer"
                />
              </div>
            </div>
          ))}
          <Modal
            size="lg"
            show={showEditExpenseReport}
            onHide={handleCloseEditExpenseReport}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>UPDATE EXPENSE</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="flex flex-col items-center justify-center mb-3 mt-2">
                <div className="flex flex-row items-center justify-start mb-3">
                  <label htmlFor="" className="font-semibold text-[18px]">
                    Expense Name
                  </label>
                  <input
                    type="text"
                    placeholder={idName}
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setUpdatedName(idName);
                      } else {
                        setUpdatedName(e.target.value);
                      }
                    }}
                    className="border-1 ml-6 border-[#555] p-[5px] border-solid rounded w-52"
                  />
                </div>
                <div className="flex flex-row items-center justify-start mb-3">
                  <label htmlFor="" className="font-semibold text-[18px]">
                    Expense Amount
                  </label>
                  <input
                    placeholder="₹ 0.0"
                    type="Number"
                    onChange={(e) => {
                      if (e.target.value === 0.0) {
                        setUpdatedAmount(idAmount);
                      } else {
                        setUpdatedAmount(e.target.value);
                      }
                    }}
                    className="border-1 ml-2 border-[#555] p-[5px] border-solid rounded w-52"
                  />
                </div>
                <div className="flex flex-row items-center justify-start">
                  <label htmlFor="" className="font-semibold text-[18px]">
                    Date Added
                  </label>
                  <input
                    type="date"
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setUpdatedDate(idDate);
                      } else {
                        setUpdatedDate(e.target.value);
                      }
                    }}
                    className="border-1 ml-12 border-[#555] p-[5px] border-solid rounded w-52"
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleEditExpenseReport} variant="primary">
                Confirm Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
