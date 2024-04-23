import { useState } from "react";
import Card from "./Card";
import DropIndicator from "./DropIndicator";
import AddCard from "./AddCard";

const Column = ({ title, headingColor, column, cards, setCards, setIsCardMenuActive }) => {
  const [active, setActive] = useState(false);
  const filteredCards = cards.filter((data) => data.column === column);

  const TransferData = (e, card) => {
    e.dataTransfer.setData("cardId", card.id);
    // console.log(e.dataTransfer.types);
  };

  const highlightIndicator = (e) => {
    e.preventDefault();
    const indicators = getIndicators();
    clearHighlights(indicators);
    const nearsetIndicator = getNearsetIndicator(e, indicators);
    nearsetIndicator.element.style.opacity = "1";
  };

  const getNearsetIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 50;
    const nearsetIndicator = indicators.reduce(
      (closet, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + DISTANCE_OFFSET);
        if (offset < 0 && offset > closet.offset) {
          return { offset: offset, element: child };
        } else {
          return closet;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );
    return nearsetIndicator;
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column=${column}]`));
  };

  const clearHighlights = (elements) => {
    const indicators = elements || getIndicators();

    indicators.forEach((indictor) => {
      indictor.style.opacity = "0";
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
    clearHighlights();
  };

  const handleOnDrop = (e) => {
    setActive(false);
    clearHighlights();

    const cardId = e.dataTransfer.getData("cardId"); //The card that we want to transfer
    const indicators = getIndicators();
    const { element } = getNearsetIndicator(e, indicators);
    const position = element.dataset.before || "-1";
    console.log(position);

    if (position !== cardId) {
      let cardsCopy = [...cards];
      let cardToTransfer = cardsCopy.find((card) => card.id === parseInt(cardId));

      cardToTransfer = { ...cardToTransfer, column };
      console.log(cardsCopy);
      cardsCopy = cardsCopy.filter((card) => card.id !== +cardId); // To remove the card form the old position
      console.log(cardsCopy);

      if (position === "-1") {
        cardsCopy.push(cardToTransfer);
      } else {
        const insertAtIndex = cardsCopy.findIndex((element) => element.id === parseInt(position));
        console.log(insertAtIndex);

        cardsCopy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(cardsCopy);
    }
  };

  return (
    <div className='w-56 shrink-0'>
      <div className='mb-3 flex items-center justify-between'>
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className='text-sm text-neutral-400'>{filteredCards.length}</span>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleOnDrop}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((cardData) => (
          <Card
            TransferData={TransferData}
            key={cardData.id}
            {...cardData}
            setIsCardMenuActive={setIsCardMenuActive}
          />
        ))}
        <DropIndicator beforeId={"-1"} column={column} />
        {column === "backlog" ? <AddCard cards={cards} setCards={setCards} /> : <></>}
      </div>
    </div>
  );
};

export default Column;
