import React, { useState } from "react";
import DisplayBox from "./DisplayBox";

const LoanBox = () => {
  const [loanAmount, setLoanAmount] = useState(0);
  const [loanTerm, setLoanTerm] = useState(0);
  const [installment, setInstallment] = useState(0);
  const [display, setDisplay] = useState(false);

  const calculateLoan = (loanTerm, loanAmount) => {
    const numberOfPayments = loanTerm * 12;
    const monthlyInterest = 5 / 100 / 12;
    const sum = monthlyInterest + 1;
    const sumPower = Math.pow(sum, -numberOfPayments);
    const toDivide = 1 - sumPower;
    const monthlyInterestOnLoan = monthlyInterest * loanAmount;
    const monthlyInstallment = monthlyInterestOnLoan / toDivide;
    setDisplay(true);
    setInstallment(monthlyInstallment.toFixed(2));
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
          <hr />
        </div>
        <div>
          <span>3</span>
          <label htmlFor="interest">Annual Interest</label>
          <input type="text" name="interest" value="5%" readOnly />
          <hr />
        </div>

        <button onClick={() => calculateLoan(loanTerm, loanAmount)}>
          Calculate
        </button>
      </div>
      {display && (
        <DisplayBox installment={installment} closeModal={closeModal} />
      )}
    </>
  );
};

export default LoanBox;
