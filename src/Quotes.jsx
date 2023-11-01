import React, { useEffect, useState } from "react";
import axios from "axios";
import { GenerateRandomCategory } from "./Utilities/GenerateRandomCategory";

//${process.env.REACT_APP_API_URI}${category[0]}
const Quotes = () => {
  const [quotes, setQuotes] = useState();

  const fetchRandomQuote = async () => {
    const randomCategory = GenerateRandomCategory();
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URI}${randomCategory}`,
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

  return (
    <div className="quotes">
      {quotes && <p>{quotes.quote}</p>}

      {quotes && <p>- {quotes.author}</p>}
    </div>
  );
};

export default Quotes;
