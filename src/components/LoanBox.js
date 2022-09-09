import React, { useState, useEffect } from "react";
import DisplayBox from "./DisplayBox";

const LoanBox = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [installment, setInstallment] = useState(0);
  const [display, setDisplay] = useState(false);
  const [amountErrors, setAmountErrors] = useState(" ");
  const [termErrors, setTermErrors] = useState(" ");

  useEffect(() => {
    validateFields();
  }, [loanAmount, loanTerm]);

  const validateFields = () => {
    if (loanAmount == "") {
      setAmountErrors((prevState) => "Loan Amount cannot be empty");
    } else if (loanAmount <= 0) {
      setAmountErrors(
        (prevState) => "Loan Amount cannot be less than or equal to 0"
      );
    } else if (isNaN(loanAmount)) {
      setAmountErrors((prevState) => "Loan Amount must be a valid number");
    } else {
      setAmountErrors((prevState) => "");
    }

    if (loanTerm == "") {
      setTermErrors((prevState) => "Loan Term cannot be empty");
    } else if (loanTerm <= 0) {
      setTermErrors(
        (prevState) => "Loan Term cannot be less than or equal to 0"
      );
    } else if (isNaN(loanTerm)) {
      setTermErrors((prevState) => "Loan term must be a valid number");
    } else {
      setTermErrors((prevState) => "");
    }
  };

  const calculateLoan = () => {
    const numberOfPayments = loanTerm * 12;
    const monthlyInterest = 5 / 100 / 12;
    const sum = monthlyInterest + 1;
    const sumPower = Math.pow(sum, -numberOfPayments);
    const toDivide = 1 - sumPower;
    const monthlyInterestOnLoan = monthlyInterest * loanAmount;
    const monthlyInstallment = monthlyInterestOnLoan / toDivide;

    if (amountErrors === "" && termErrors === "") {
      setDisplay(true);
      setInstallment(monthlyInstallment.toFixed(2));
    }
  };

  const closeModal = () => setDisplay(false);

  return (
    <>
      <div className="loan-box">
        <h2>Simple Loan Calculator</h2>
        <div>
          <span>1</span>
          <label htmlFor="loan-amount">Loan Amount</label>
          <input
            type="text"
            name="loan-amount"
            onChange={(e) => setLoanAmount(e.target.value)}
            value={loanAmount}
          />
          <p>{amountErrors}</p>
          <hr />
        </div>
        <div>
          <span>2</span>
          <label htmlFor="years">Number of Years</label>
          <input
            type="text"
            name="years"
            onChange={(e) => setLoanTerm(e.target.value)}
            value={loanTerm}
          />
          <p>{termErrors}</p>
          <hr />
        </div>
        <div>
          <span>3</span>
          <label htmlFor="interest">Annual Interest</label>
          <input type="text" name="interest" value="5%" readOnly />
          <hr />
        </div>

        <button onClick={calculateLoan}>Calculate</button>
      </div>
      {display && (
        <DisplayBox installment={installment} closeModal={closeModal} />
      )}
    </>
  );
};

export default LoanBox;
