import React, { useEffect, useState } from "react";
import axios from "axios";
import { GenerateRandomCategory } from "./Utilities/GenerateRandomCategory";

//${process.env.REACT_APP_API_URI}${category[0]}
const Quotes = () => {
  const [quotes, setQuotes] = useState();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchQuotesByCategory  = async (category) => {
   
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URI}${category}`,
        {
          headers: {
            "X-Api-Key": process.env.REACT_APP_API_SECRET_KEY,
          },
        }
      );
      if (response.status === 200) {
        setQuotes(response.data[0]);
      }
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  const fetchRandomQuote = async () => {
    const randomCategory = GenerateRandomCategory();
    setSelectedCategory(randomCategory);
    fetchQuotesByCategory(randomCategory);
  };
  useEffect(() => {
    // Fetch initial quotes
    fetchRandomQuote();

    // Set up a timer to fetch new quotes every 10 seconds
    const timer = setInterval(() => {
      fetchRandomQuote();
    }, 600000);

    return () => {
      //   Clear the timer when the component unmounts
      clearInterval(timer);
    };
  }, []);

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const changeCategory = (category) => {
    setSelectedCategory(category);
    fetchQuotesByCategory(category);
    setIsVisible(false);
  };

  const categories = ["car", "change", "communications", "computers", "cool", "courage","fitness",
  "food"];

  return (
    <div className="quotes">
      {quotes && <p>{quotes.quote}</p>}

      {quotes && <p>- {quotes.author}</p>}
      <div className="category">
        <button className="category_btn" onClick={toggleVisibility}>Category</button>
        {isVisible && (
          <div className="categories">
            
             {categories.map((category, index) => (
               <li key={index}>
               <button className="cat_btn" onClick={() => changeCategory(category)}>
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
