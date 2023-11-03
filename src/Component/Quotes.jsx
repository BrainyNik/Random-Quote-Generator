import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  GenerateRandomCategory,
  categories,
} from "../Utilities/GenerateRandomCategory";

const QUOTES_PER_FETCH = 10;
const RANDOM_FETCH_INTERVAL = 20000;

const Quotes = () => {
  const [quote, setQuote] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    JSON.parse(localStorage.getItem("currentCategory")) || "random"
  );
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const changeCategory = (category) => {
    setSelectedCategory(category);
    localStorage.setItem("currentCategory", JSON.stringify(category));
    setIsVisible(false);
  };

  const fetchQuotesByCategory = async (category, append = false) => {
    if (category === "random") {
      category = GenerateRandomCategory();
    }
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URI}${category}&limit=${QUOTES_PER_FETCH}`,
        {
          headers: {
            "X-Api-Key": process.env.REACT_APP_API_SECRET_KEY,
          },
        }
      );

      if (response.status === 200) {
        const quotes = response.data;

        setQuote(quotes.shift());
        if (append) {
          const existingQuotes =
            JSON.parse(localStorage.getItem("Quotes")) || [];
          localStorage.setItem(
            "Quotes",
            JSON.stringify(existingQuotes.concat(quotes))
          );
        } else {
          localStorage.setItem("Quotes", JSON.stringify(quotes));
        }
      }
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  const fetchQuoteFromLocalStorage = useCallback(() => {
    const qArr = JSON.parse(localStorage.getItem("Quotes"));

    if (qArr.length === 0) {
      fetchQuotesByCategory(selectedCategory, true);
    } else {
      const quoteToDisplay = qArr[0];
      const remainingQuotes = qArr.slice(1);
      setQuote(quoteToDisplay);
      localStorage.setItem("Quotes", JSON.stringify(remainingQuotes));
    }
  }, [selectedCategory]);

  useEffect(() => {
    let timer;

    const fetchInterval = RANDOM_FETCH_INTERVAL;

    const currentCategory = selectedCategory;

    fetchQuotesByCategory(currentCategory);

    timer = setInterval(() => {
      fetchQuoteFromLocalStorage(selectedCategory);
    }, fetchInterval);

    return () => {
      clearInterval(timer);
    };
  }, [selectedCategory, fetchQuoteFromLocalStorage]);

  return (
    <div className="quotes">
      
      {quote ? (
        <p>{quote.quote}</p>
      ) : (
        <div class="loadingio-spinner-ellipsis-mty16tstggo">
          <div class="ldio-d4jd6rw09ab">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      {quote ? <p>- {quote.author}</p> : ""}

      <div className="category">
        <button className="category_btn" onClick={toggleVisibility}>
          {selectedCategory ? `Category : ${selectedCategory}` : "Categories"}
        </button>
        {isVisible && (
          <div className="categories">
            {categories.map((category, index) => (
              <li key={index}>
                <button
                  className="cat_btn"
                  onClick={() => changeCategory(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quotes;
