import React, { useState, useEffect } from "react";

export default function App() {
  const [curOne, setCurOne] = useState("INR");
  const [curTwo, setCurTwo] = useState("USD");
  const [input, setInput] = useState(null);
  const [res, setRes] = useState("Converted Amount Here");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  function handleChange(e) {
    setInput(e.target.value);
  }

  useEffect(() => {
    let controller = new AbortController();
    if (!input) {
      return;
    }
    if (input < 0) return;

    async function convertCurrency() {
      setLoading(true);
      try {
        const host = "api.frankfurter.app";
        let response = await fetch(
          `https://${host}/latest?amount=${input}&from=${curOne}&to=${curTwo}`,
          { signal: controller.signal }
        );
        // Handle no connectivity
        if (!response.ok) throw new Error("Something went wrong.");

        let b = await response.json();
        setRes(b.rates[curTwo]);
      } catch (e) {
        console.log(e.message);
        setErr("Error Converting Currency.");
      } finally {
        setLoading(false);
      }
    }
    convertCurrency();

    return () => {
      controller.abort();
      setErr("");
      setRes("Enter appropriate amount.");
    };
  }, [input, curOne, curTwo]);

  return (
    <div className="App">
      <input
        type="number"
        name="amount"
        id="amount"
        value={input}
        onChange={(e) => handleChange(e)}
      />
      <select
        name="currencyOne"
        id="currencyOne"
        value={curOne}
        onChange={(e) => setCurOne(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        name="currencyTwo"
        id="currencyTwo"
        value={curTwo}
        onChange={(e) => setCurTwo(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>

      <p>
        <strong>Output:</strong>
      </p>
      {loading ? <p>Loading...</p> : err ? <p>{err}</p> : <p>{res}</p>}
    </div>
  );
}
